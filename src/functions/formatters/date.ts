/** `Date` -> `YYYY-MM-DD`, the value format of an `<input type="date">`. */
export function toISODate(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Today as `YYYY-MM-DD`, for `min` on date inputs. */
export function today(): string {
  return toISODate(new Date())
}

/** `YYYY-MM-DD` -> `Sep 12`. Returns '' for empty or unparseable input. */
export function formatDateLabel(value: string): string {
  if (!value) return ''

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}
