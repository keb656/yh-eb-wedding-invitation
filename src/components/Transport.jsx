import { busStops, charterBus, sectionIndex, shuttle, subway } from '../data/wedding'
import SectionHeader from './SectionHeader'

export default function Transport() {
  const { toVenue, toDaejeon } = charterBus

  return (
    <section id="transport" className="section" tabIndex={-1} aria-labelledby="transport-title">
      <SectionHeader index={sectionIndex('transport')} title="TRANSPORT" id="transport-title" />

      <div className="info-group info-group--first">
        <h3 className="info-group__title">SUBWAY · 지하철</h3>
        <ul className="info-list">
          {subway.map((s) => (
            <li key={s.line}>
              <span className="info-list__label">[{s.line}]</span>
              <span>{s.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-group">
        <h3 className="info-group__title">SHUTTLE · 셔틀버스</h3>
        <ul className="info-list">
          {shuttle.map((s) => (
            <li key={s.label}>
              <span className="info-list__label">{s.label}</span>
              <span>
                {s.route}
                <br />
                <span className="times">{s.times.join(' / ')}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-group">
        <h3 className="info-group__title">BUS · 시내버스</h3>
        {busStops.map((stop) => (
          <div className="bus-stop" key={stop.stop}>
            <p className="bus-stop__name">[{stop.stop}]</p>
            <ul className="bus-list">
              {stop.buses.map((bus) => (
                <li key={bus}>{bus}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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
