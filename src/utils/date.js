const DAY = 24 * 60 * 60 * 1000

/** 한국 시간 기준 'YYYY-MM-DD' */
const seoulDateKey = (date) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)

const keyToUTC = (key) => {
  const [y, m, d] = key.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

/** 오늘부터 예식일까지 남은 일수 (양수: 남음, 0: 당일, 음수: 지남) */
export function daysUntil(target, now = new Date()) {
  return Math.round((keyToUTC(seoulDateKey(new Date(target))) - keyToUTC(seoulDateKey(now))) / DAY)
}

export function formatDDay(days) {
  if (days === 0) return 'D-DAY'
  return days > 0 ? `D-${days}` : `D+${Math.abs(days)}`
}

/** 달력 표시용: 해당 월의 주 단위 배열 (빈 칸은 null) */
export function monthMatrix(target) {
  const [y, m] = seoulDateKey(new Date(target)).split('-').map(Number)
  const firstWeekday = new Date(Date.UTC(y, m - 1, 1)).getUTCDay()
  const lastDate = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: lastDate }, (_, i) => i + 1)]
  while (cells.length % 7) cells.push(null)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return { year: y, month: m, day: Number(seoulDateKey(new Date(target)).slice(8)), weeks }
}
