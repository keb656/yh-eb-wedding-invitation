export default function SectionHeader({ index, title, subtitle, id }) {
  return (
    <header className="section-header">
      <p className="section-index">{index}</p>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}
