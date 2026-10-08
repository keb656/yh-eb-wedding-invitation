import { useEffect, useRef } from 'react'
import { couple, images, venue, wedding } from '../data/wedding'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()

  // 스크롤 진행도(0~1)를 CSS 변수 --p로 전달 → CSS에서 transform/opacity 계산
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    if (reducedMotion) {
      section.style.setProperty('--p', '0')
      return undefined
    }

    let frame = 0
    const update = () => {
      frame = 0
      const height = section.offsetHeight || window.innerHeight
      const progress = Math.min(Math.max(window.scrollY / height, 0), 1)
      section.style.setProperty('--p', progress.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <section className="hero" ref={sectionRef} aria-label="메인">
      <img className="hero-image" src={images.hero} alt={images.heroAlt} fetchPriority="high" />

      <div className="hero-overlay">
        <p className="hero-eyebrow">THE WEDDING OF</p>
        <h1 className="hero-title">
          {couple.groom.nameEn}
          <span className="hero-amp" aria-hidden="true">&amp;</span>
          <span className="visually-hidden"> 그리고 </span>
          {couple.bride.nameEn}
        </h1>
        <div className="hero-info">
          <p>
            {wedding.dateEn} {wedding.timeEn}
          </p>
          <p>
            {venue.nameEn} / {venue.placeEn}
          </p>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>SCROLL</span>
        <i />
      </div>
    </section>
  )
}
