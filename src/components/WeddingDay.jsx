import { useState } from 'react'
import { couple, sectionIndex, venue, wedding } from '../data/wedding'
import { downloadICS, googleCalendarUrl } from '../utils/calendar'
import { daysUntil, formatDDay, monthMatrix } from '../utils/date'
import SectionHeader from './SectionHeader'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const calendarEvent = {
  uid: 'yh-eb-wedding-20270109@invitation',
  title: `${couple.groom.name} ♥ ${couple.bride.name} 결혼식`,
  description: `${wedding.dateKo} ${wedding.timeKo}\n${venue.name}`,
  location: `${venue.name}, ${venue.address}`,
  start: wedding.start,
  end: wedding.end,
}

const calendar = monthMatrix(wedding.start)

export default function WeddingDay() {
  const [days] = useState(() => daysUntil(wedding.start))

  const message =
    days > 0 ? `결혼식까지 ${days}일 남았습니다.` : days === 0 ? '오늘, 결혼합니다.' : `결혼한 지 ${Math.abs(days)}일이 지났습니다.`

  return (
    <section id="wedding-day" className="section" tabIndex={-1} aria-labelledby="wedding-day-title">
      <SectionHeader index={sectionIndex('wedding-day')} title="WEDDING DAY" id="wedding-day-title" />

      <div className="day-block">
        <p className="day-block__date">{wedding.dateEn}</p>
        <p className="day-block__time">{wedding.timeEn}</p>
        <p className="day-block__ko">
          {wedding.dateKo} {wedding.timeKo}
        </p>
      </div>

      <table className="mini-calendar">
        <caption>
          {calendar.year}. {String(calendar.month).padStart(2, '0')}
        </caption>
        <thead>
          <tr>
            {WEEKDAYS.map((d, i) => (
              <th key={i} scope="col">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => (
                <td key={di} className={day === calendar.day ? 'is-wedding' : undefined}>
                  {day ?? ''}
                  {day === calendar.day && <span className="visually-hidden"> 결혼식</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="dday" role="status">
        <p className="dday__count">{formatDDay(days)}</p>
        <p className="dday__text">{message}</p>
      </div>

      <div className="button-row button-row--center">
        <button type="button" className="line-button line-button--solid" onClick={() => downloadICS(calendarEvent, 'kim-younghwan-kim-eunbi-wedding.ics')}>
          캘린더에 저장
        </button>
        <a className="line-button" href={googleCalendarUrl(calendarEvent)} target="_blank" rel="noreferrer">
          GOOGLE CALENDAR
        </a>
      </div>
      <p className="note note--center">카카오톡 등 앱 내 브라우저에서 저장이 안 되면 GOOGLE CALENDAR를 이용해주세요.</p>
    </section>
  )
}
