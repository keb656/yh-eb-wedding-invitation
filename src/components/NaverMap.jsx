import { useEffect, useRef, useState } from 'react'
import { naverMap, venue } from '../data/wedding'
import { loadScript } from '../utils/loadScript'

/** 네이버 지도 (Maps JavaScript API v3). clientId가 없으면 안내 박스를 보여줍니다. */
export default function NaverMap() {
  const containerRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const { clientId, lat, lng, zoom } = naverMap

  useEffect(() => {
    if (!clientId) return undefined
    let cancelled = false

    loadScript(`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`)
      .then(() => {
        const maps = window.naver?.maps
        if (cancelled || !maps || !containerRef.current) return
        const position = new maps.LatLng(lat, lng)
        const map = new maps.Map(containerRef.current, {
          center: position,
          zoom,
          scrollWheel: false,
          zoomControl: true,
          zoomControlOptions: { position: maps.Position.TOP_RIGHT, style: maps.ZoomControlStyle.SMALL },
        })
        new maps.Marker({ position, map, title: venue.name })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [clientId, lat, lng, zoom])

  if (!clientId || failed) {
    return (
      <div className="map">
        <div className="map__placeholder">
          <span>MAP</span>
          <small>{failed ? '지도를 불러오지 못했습니다.' : venue.address}</small>
        </div>
      </div>
    )
  }

  return <div className="map" ref={containerRef} role="region" aria-label={`${venue.name} 지도`} />
}
