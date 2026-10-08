import { busStops, charterBus } from '../data/wedding'
import SectionHeader from './SectionHeader'

export default function Bus() {
  const { toVenue, toDaejeon } = charterBus

  return (
    <section id="bus" className="section" tabIndex={-1} aria-labelledby="bus-title">
      <SectionHeader index="04" title="BUS" id="bus-title" />

      {busStops.map((stop) => (
        <div className="info-group" key={stop.stop}>
          <h3 className="info-group__title">[{stop.stop}]</h3>
          <ul className="bus-list">
            {stop.buses.map((bus) => (
              <li key={bus}>{bus}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="info-group">
        <h3 className="info-group__title">CHARTER BUS · 대절버스</h3>

        <dl className="spec">
          <div className="spec__row spec__row--head">
            <dt>{toVenue.title}</dt>
          </div>
          <div className="spec__row">
            <dt>출발 위치</dt>
            <dd>{toVenue.departPlace}</dd>
          </div>
          <div className="spec__row">
            <dt>출발 시간</dt>
            <dd>{toVenue.departTime}</dd>
          </div>

          <div className="spec__row spec__row--head">
            <dt>{toDaejeon.title}</dt>
          </div>
          <div className="spec__row">
            <dt>출발 위치</dt>
            <dd>{toDaejeon.departPlace}</dd>
          </div>
          <div className="spec__row">
            <dt>출발 시간</dt>
            <dd>{toDaejeon.departTime}</dd>
          </div>
          <div className="spec__row">
            <dt>대전 하차 위치</dt>
            <dd>{toDaejeon.arrivePlace}</dd>
          </div>
          <div className="spec__row">
            <dt>대전 도착 예상</dt>
            <dd>{toDaejeon.arriveTime}</dd>
          </div>
        </dl>

        {charterBus.note && <p className="note">{charterBus.note}</p>}
      </div>
    </section>
  )
}
