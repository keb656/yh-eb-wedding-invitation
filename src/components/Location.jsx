import { mapUrls, shuttle, subway, venue } from '../data/wedding'
import { useCopy } from '../hooks/useCopy'
import SectionHeader from './SectionHeader'

export default function Location() {
  const { copiedKey, message, copy } = useCopy()

  return (
    <section id="location" className="section" tabIndex={-1} aria-labelledby="location-title">
      <SectionHeader index="03" title="LOCATION" id="location-title" />

      <address className="venue">
        <strong>{venue.name}</strong>
        <span>{venue.address}</span>
      </address>

      <div className="map">
        {mapUrls.embed ? (
          <iframe title={`${venue.name} 지도`} src={mapUrls.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <div className="map__placeholder">
            <span>MAP</span>
            <small>{venue.address}</small>
          </div>
        )}
      </div>

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

      <div className="info-group">
        <h3 className="info-group__title">SUBWAY</h3>
        <ul className="info-list">
          {subway.map((s) => (
            <li key={s.line}>
              <span className="info-list__label">[{s.line}]</span>
              <span>{s.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-group">
        <h3 className="info-group__title">SHUTTLE</h3>
        <ul className="info-list">
          {shuttle.map((s) => (
            <li key={s.label}>
              <span className="info-list__label">{s.label}</span>
              <span>
                {s.route}
                <br />
                <span className="times">{s.times.join(' / ')}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
