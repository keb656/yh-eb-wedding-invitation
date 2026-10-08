import { useCallback, useState } from 'react'
import { couple, galleryImages, images, parents, sectionIndex, story } from '../data/wedding'
import Lightbox from './Lightbox'
import Lines from './Lines'
import SectionHeader from './SectionHeader'

const people = [
  { ...couple.groom, photo: images.groom, family: parents.groom },
  { ...couple.bride, photo: images.bride, family: parents.bride },
]

export default function OurStory() {
  const [active, setActive] = useState(null) // 열린 사진 index
  const close = useCallback(() => setActive(null), [])

  return (
    <section id="our-story" className="section" tabIndex={-1} aria-labelledby="our-story-title">
      <SectionHeader index={sectionIndex('our-story')} title="OUR STORY" id="our-story-title" />

      <ol className="timeline">
        {story.timeline.map((item) => (
          <li key={item.label}>
            <span className="timeline__label">{item.label}</span>
            <p>
              <Lines lines={item.lines} />
            </p>
          </li>
        ))}
      </ol>

      {people.map((person) => (
        <article className="profile" key={person.role} aria-label={`${person.roleKo} ${person.name}`}>
          <img className="profile__photo" src={person.photo} alt={`${person.roleKo} ${person.name} 사진`} loading="lazy" />
          <header className="profile__head">
            <span className="profile__role">{person.role}</span>
            <h3>
              {person.name}
              <span>{person.nameEn}</span>
            </h3>
            <p className="profile__family">
              {person.family.father} · {person.family.mother}의 {person.family.relation}
            </p>
          </header>
          {person.intro.map((lines, i) => (
            <p className="body-text" key={i}>
              <Lines lines={lines} />
            </p>
          ))}
        </article>
      ))}

      <div className="gallery-block">
        <h3 className="info-group__title">WEDDING · 웨딩 사진</h3>
        <p className="note">사진을 누르면 크게 볼 수 있습니다.</p>
        <ul className="gallery">
          {galleryImages.map((image, i) => (
            <li key={i} className={`gallery__item gallery__item--${image.layout === 'half' ? 'half' : 'full'}`}>
              <button type="button" onClick={() => setActive(i)} aria-label={`${image.alt} 크게 보기`}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox images={galleryImages} index={active} onChange={setActive} onClose={close} />
    </section>
  )
}
