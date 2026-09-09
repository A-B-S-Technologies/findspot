import { toISODate } from '../formatters/date'

export const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const

/** First day of the month `date` falls in, at local midnight. */
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1)
}

/** `November 2023` */
export function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/**
 * The cells of a month grid, Sunday first. Padding before the 1st and after
 * the last day is `null` so the grid keeps its shape without borrowing days
 * from the neighbouring months.
 */
export function buildMonthGrid(month: Date): (string | null)[] {
  const first = startOfMonth(month)
  const leading = first.getDay()
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate()

  const cells: (string | null)[] = Array(leading).fill(null)

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toISODate(new Date(month.getFullYear(), month.getMonth(), day)))
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

/** The month an ISO date belongs to, or the current month when unset. */
export function monthOf(iso: string): Date {
  if (!iso) return startOfMonth(new Date())
  const parsed = new Date(`${iso}T00:00:00`)
  return Number.isNaN(parsed.getTime())
    ? startOfMonth(new Date())
    : startOfMonth(parsed)
}
