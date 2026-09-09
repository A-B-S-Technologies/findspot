/**
 * Range maths on `YYYY-MM-DD` strings. Comparing them lexicographically is
 * exactly the same as comparing the dates, and avoids timezone surprises.
 */
export function isBefore(a: string, b: string): boolean {
  return Boolean(a) && Boolean(b) && a < b
}

export function isWithinRange(iso: string, start: string, end: string): boolean {
  if (!start || !end) return false
  return iso > start && iso < end
}

/** Whole nights between two ISO dates; 0 when the range is incomplete. */
export function nightsBetween(start: string, end: string): number {
  if (!start || !end || !isBefore(start, end)) return 0

  const from = new Date(`${start}T00:00:00`).getTime()
  const to = new Date(`${end}T00:00:00`).getTime()
  return Math.round((to - from) / 86_400_000)
}
