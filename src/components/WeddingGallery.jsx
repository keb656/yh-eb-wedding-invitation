import { galleryImages } from '../data/wedding'
import SectionHeader from './SectionHeader'

export default function WeddingGallery() {
  return (
    <section id="wedding" className="section section--wide" tabIndex={-1} aria-labelledby="wedding-title">
      <div className="section-inner">
        <SectionHeader index="08" title="WEDDING" id="wedding-title" subtitle="GALLERY" />
      </div>

      <ul className="gallery">
        {galleryImages.map((image, i) => (
          <li key={i} className={`gallery__item gallery__item--${image.layout === 'half' ? 'half' : 'full'}`}>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </section>
  )
}
