import { mapUrls, sectionIndex, venue } from '../data/wedding'
import { useCopy } from '../hooks/useCopy'
import NaverMap from './NaverMap'
import SectionHeader from './SectionHeader'

function CopyIcon({ done }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      {done ? (
        <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      ) : (
        <>
          <rect x="5" y="5" width="8.5" height="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 10.5V2.5h8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </>
      )}
    </svg>
  )
}

export default function Location() {
  const { copiedKey, message, copy } = useCopy()
  const copied = copiedKey === 'address'

  return (
    <section id="location" className="section" tabIndex={-1} aria-labelledby="location-title">
      <SectionHeader index={sectionIndex('location')} title="LOCATION" id="location-title" />

      <address className="venue">
        <strong>{venue.name}</strong>
        <span className="venue__address">
          {venue.address}
          <button
            type="button"
            className="icon-button"
            onClick={() => copy('address', venue.address, '주소가 복사되었습니다')}
            aria-label={copied ? '주소 복사됨' : '주소 복사'}
            title="주소 복사"
          >
            <CopyIcon done={copied} />
          </button>
        </span>
      </address>

      <NaverMap />

      <div className="map-links">
        <a className="line-button" href={mapUrls.naver} target="_blank" rel="noreferrer">
          NAVER MAP
        </a>
        <a className="line-button" href={mapUrls.kakao} target="_blank" rel="noreferrer">
          KAKAO MAP
        </a>
      </div>

      <p className={`toast${message ? ' is-visible' : ''}`} role="status" aria-live="polite">
        {message}
      </p>
    </section>
  )
}
