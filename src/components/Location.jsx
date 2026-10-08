import { mapUrls, sectionIndex, venue } from '../data/wedding'
import { useCopy } from '../hooks/useCopy'
import NaverMap from './NaverMap'
import SectionHeader from './SectionHeader'

export default function Location() {
  const { copiedKey, message, copy } = useCopy()

  return (
    <section id="location" className="section" tabIndex={-1} aria-labelledby="location-title">
      <SectionHeader index={sectionIndex('location')} title="LOCATION" id="location-title" />

      <address className="venue">
        <strong>{venue.name}</strong>
        <span>{venue.address}</span>
      </address>

      <NaverMap />

      <div className="button-row">
        <a className="line-button" href={mapUrls.naver} target="_blank" rel="noreferrer">
          NAVER MAP
        </a>
        <a className="line-button" href={mapUrls.kakao} target="_blank" rel="noreferrer">
          KAKAO MAP
        </a>
        <button type="button" className="line-button" onClick={() => copy('address', venue.address, '주소가 복사되었습니다')}>
          {copiedKey === 'address' ? 'COPIED' : 'COPY ADDRESS'}
        </button>
      </div>
      <p className="note" role="status" aria-live="polite">
        {message}
      </p>
    </section>
  )
}
