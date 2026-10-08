import { useEffect, useRef } from 'react'
import { useOverlay } from '../hooks/useOverlay'

/**
 * 사진 원본 보기 팝업 (확대 불가)
 * - 핀치/더블탭 확대 차단, 좌우 스와이프·화살표 키로 이동
 */
export default function Lightbox({ images, index, onChange, onClose }) {
  const open = index !== null
  const panelRef = useOverlay(open, onClose)
  const touchStart = useRef(null)
  const total = images.length

  const go = (step) => onChange((index + step + total) % total)

  // 화살표 키 이동
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') onChange((i) => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') onChange((i) => (i + 1) % total)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onChange, total])

  // 확대 제스처 차단 (iOS Safari는 touch-action만으로 막히지 않아 직접 처리)
  useEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return undefined
    const blockMultiTouch = (e) => {
      if (e.touches.length > 1) e.preventDefault()
    }
    const blockGesture = (e) => e.preventDefault()
    panel.addEventListener('touchmove', blockMultiTouch, { passive: false })
    panel.addEventListener('gesturestart', blockGesture)
    return () => {
      panel.removeEventListener('touchmove', blockMultiTouch)
      panel.removeEventListener('gesturestart', blockGesture)
    }
  }, [open, panelRef])

  if (!open) return null
  const image = images[index]

  const onTouchStart = (e) => {
    touchStart.current = e.touches.length === 1 ? e.touches[0].clientX : null
  }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="사진 크게 보기"
      ref={panelRef}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar">
        <span>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button type="button" className="text-button" onClick={onClose}>
          CLOSE
        </button>
      </div>

      <figure className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img src={image.full ?? image.src} alt={image.alt} draggable="false" />
      </figure>

      {total > 1 && (
        <div className="lightbox__nav">
          <button type="button" className="text-button" onClick={() => go(-1)} aria-label="이전 사진">
            PREV
          </button>
          <button type="button" className="text-button" onClick={() => go(1)} aria-label="다음 사진">
            NEXT
          </button>
        </div>
      )}
    </div>
  )
}
