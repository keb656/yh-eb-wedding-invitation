import { useCallback, useEffect, useState } from 'react'
import { couple, sections, wedding } from '../data/wedding'
import { useOverlay } from '../hooks/useOverlay'
import { scrollToSection } from '../utils/scroll'

export default function Menu() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const panelRef = useOverlay(open, close)
  const [onPhoto, setOnPhoto] = useState(true)

  // 버튼이 첫 화면 사진 위에 있는 동안은 흰 글씨, 지나가면 어두운 글씨
  useEffect(() => {
    const hero = document.querySelector('.hero')
    if (!hero) return undefined
    const observer = new IntersectionObserver(([entry]) => setOnPhoto(entry.isIntersecting), {
      rootMargin: '0px 0px -99% 0px', // 화면 맨 위쪽 기준
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    // 스크롤 잠금 해제 후 이동
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)))
  }

  return (
    <>
      <button
        type="button"
        className={`menu-toggle${onPhoto ? ' is-on-photo' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
      >
        MENU
      </button>

      {open && (
        <div className="overlay overlay--menu" onClick={(e) => e.target === e.currentTarget && close()}>
          <div
            id="site-menu"
            className="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="전체 메뉴"
            ref={panelRef}
          >
            <div className="menu-panel__head">
              <span>MENU</span>
              <button type="button" className="text-button" onClick={close}>
                CLOSE
              </button>
            </div>

            <nav aria-label="섹션 바로가기">
              <ol className="menu-list">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <button type="button" onClick={() => go(section.id)}>
                      <span className="menu-list__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="menu-list__en">{section.label}</span>
                      <span className="menu-list__ko">{section.labelKo}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <p className="menu-panel__foot">
              {couple.groom.nameEn} &amp; {couple.bride.nameEn}
              <br />
              {wedding.dateEn}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
