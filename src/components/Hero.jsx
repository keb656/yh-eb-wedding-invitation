import { useEffect, useRef } from 'react'
import { couple, images, venue, wedding } from '../data/wedding'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Hero.css'

/** 하늘색 실크 리본 매듭 (가운데 knot 기준 좌우 고리 + 꼬리) */
function RibbonBow() {
  return (
    <svg className="bow" viewBox="0 0 240 170" aria-hidden="true">
      <defs>
        <linearGradient id="silk-loop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a7cbe9" />
          <stop offset="0.32" stopColor="#dcedfa" />
          <stop offset="0.55" stopColor="#b7d6f0" />
          <stop offset="1" stopColor="#87b2d9" />
        </linearGradient>
        <linearGradient id="silk-tail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#93bce0" />
          <stop offset="0.45" stopColor="#d3e8f8" />
          <stop offset="1" stopColor="#8db6db" />
        </linearGradient>
        <linearGradient id="silk-knot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c4def3" />
          <stop offset="0.5" stopColor="#e3f1fb" />
          <stop offset="1" stopColor="#8fb8dd" />
        </linearGradient>
      </defs>

      <path className="bow-tail bow-tail--left" fill="url(#silk-tail)" d="M112 80 C104 106 94 132 80 160 L92 154 L98 166 C110 140 120 112 126 82 Z" />
      <path className="bow-tail bow-tail--right" fill="url(#silk-tail)" d="M128 80 C136 106 146 132 160 160 L148 154 L142 166 C130 140 120 112 114 82 Z" />

      <g className="bow-loop bow-loop--left">
        <path fill="url(#silk-loop)" d="M112 64 C82 28 26 30 24 62 C22 94 80 98 112 78 Z" />
        <path className="bow-fold" d="M106 68 C84 50 50 50 46 62 C48 76 84 80 106 74 Z" />
      </g>
      <g className="bow-loop bow-loop--right">
        <path fill="url(#silk-loop)" d="M128 64 C158 28 214 30 216 62 C218 94 160 98 128 78 Z" />
        <path className="bow-fold" d="M134 68 C156 50 190 50 194 62 C192 76 156 80 134 74 Z" />
      </g>

      <rect className="bow-knot" fill="url(#silk-knot)" x="108" y="57" width="24" height="27" rx="7" />
    </svg>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()

  // 섹션이 화면에 고정(sticky)된 동안의 스크롤 진행도(0~1)를 --p로 전달
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
      const distance = section.offsetHeight - window.innerHeight
      const scrolled = -section.getBoundingClientRect().top
      const progress = distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0
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
      <div className="hero-sticky">
        <img className="hero-image" src={images.hero} alt={images.heroAlt} fetchPriority="high" />

        <article className="postcard">
          <header className="postcard__head">
            <span>POST CARD</span>
            <span className="postcard__stamp" aria-hidden="true">
              SEOUL
              <br />
              2027
            </span>
          </header>

          <h1 className="postcard__names">
            {couple.groom.nameEn}
            <span className="postcard__amp" aria-hidden="true">&amp;</span>
            <span className="visually-hidden"> 그리고 </span>
            {couple.bride.nameEn}
          </h1>

          <div className="ribbon" aria-hidden="true">
            <p className="postcard__reveal">
              <strong>저희, 결혼합니다</strong>
              <span>WE ARE GETTING MARRIED</span>
            </p>
            <span className="ribbon__band ribbon__band--left" />
            <span className="ribbon__band ribbon__band--right" />
            <RibbonBow />
          </div>

          <div className="postcard__info">
            <p className="postcard__date">
              {wedding.dateEn} · {wedding.timeEn}
            </p>
            <p className="postcard__venue">
              {venue.nameEn} / {venue.placeEn}
            </p>
          </div>

          <footer className="postcard__foot">SAVE THE DATE</footer>
        </article>

        <div className="scroll-indicator" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </div>
    </section>
  )
}
