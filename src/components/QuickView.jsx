import { useCallback, useState } from 'react'
import { mapUrls, venue, wedding } from '../data/wedding'
import { useOverlay } from '../hooks/useOverlay'
import { scrollToSection } from '../utils/scroll'

/** 한눈에 보기: 날짜/시간 · 예식장+지도 · 스냅 업로드 — 딱 세 가지만 */
export default function QuickView() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const panelRef = useOverlay(open, close)

  const goToSnap = () => {
    setOpen(false)
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection('event')))
  }

  return (
    <>
      <button
        type="button"
        className="quick-toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="quick-view"
        onClick={() => setOpen(true)}
      >
        한눈에 보기
      </button>

      {open && (
        <div className="overlay overlay--sheet" onClick={(e) => e.target === e.currentTarget && close()}>
          <div
            id="quick-view"
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            ref={panelRef}
          >
            <div className="sheet__head">
              <h2 id="quick-view-title">한눈에 보기</h2>
              <button type="button" className="text-button" onClick={close}>
                CLOSE
              </button>
            </div>

            <dl className="sheet__list">
              <div className="sheet__item">
                <dt>DATE</dt>
                <dd>
                  <strong>
                    {wedding.dateEn} {wedding.timeEn}
                  </strong>
                  <span>
                    {wedding.dateKo} {wedding.timeKo}
                  </span>
                </dd>
              </div>

              <div className="sheet__item">
                <dt>VENUE</dt>
                <dd>
                  <strong>{venue.name}</strong>
                  <span>{venue.address}</span>
                  <span className="button-row">
                    <a className="line-button" href={mapUrls.naver} target="_blank" rel="noreferrer">
                      NAVER MAP
                    </a>
                    <a className="line-button" href={mapUrls.kakao} target="_blank" rel="noreferrer">
                      KAKAO MAP
                    </a>
                  </span>
                </dd>
              </div>

              <div className="sheet__item">
                <dt>SNAP</dt>
                <dd>
                  <strong>결혼식에서 담아주신 사진을 보내주세요.</strong>
                  <span className="button-row">
                    <button type="button" className="line-button line-button--solid" onClick={goToSnap}>
                      스냅 업로드
                    </button>
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  )
}
