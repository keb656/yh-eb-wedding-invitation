import { invitation, parents, sectionIndex } from '../data/wedding'
import Lines from './Lines'
import SectionHeader from './SectionHeader'

export default function Invitation() {
  return (
    <section id="invitation" className="section" tabIndex={-1} aria-labelledby="invitation-title">
      <SectionHeader index={sectionIndex('invitation')} title="INVITATION" id="invitation-title" />

      <p className="invitation-lead">
        <Lines lines={invitation.lead} />
      </p>

      {invitation.body.map((lines, i) => (
        <p className="body-text" key={i}>
          <Lines lines={lines} />
        </p>
      ))}

      <div className="parents">
        {[parents.groom, parents.bride].map((p) => (
          <p key={p.child}>
            <span className="parents__names">
              {p.father} · {p.mother}
            </span>
            <span className="parents__relation">의 {p.relation}</span>
            <strong>{p.child}</strong>
          </p>
        ))}
      </div>
    </section>
  )
}
