import { useCallback, useState } from 'react'
import { couple, sections, wedding } from '../data/wedding'
import { useOverlay } from '../hooks/useOverlay'
import { scrollToSection } from '../utils/scroll'

export default function Menu() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const panelRef = useOverlay(open, close)

  const go = (id) => {
    setOpen(false)
    // 스크롤 잠금 해제 후 이동
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)))
  }

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
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
                      {section.label}
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
