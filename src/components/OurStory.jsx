import { couple, images, story } from '../data/wedding'
import Lines from './Lines'
import SectionHeader from './SectionHeader'

export default function OurStory() {
  const people = [
    { ...couple.groom, photo: images.groom },
    { ...couple.bride, photo: images.bride },
  ]

  return (
    <section id="our-story" className="section" tabIndex={-1} aria-labelledby="our-story-title">
      <SectionHeader index="07" title="OUR STORY" id="our-story-title" />

      {story.paragraphs.map((lines, i) => (
        <p className="body-text" key={i}>
          <Lines lines={lines} />
        </p>
      ))}

      <div className="portraits">
        {people.map((person) => (
          <figure className="portrait" key={person.role}>
            <img src={person.photo} alt={`${person.roleKo} ${person.name} 사진`} loading="lazy" />
            <figcaption>
              <span>{person.role}</span>
              <strong>{person.name}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
