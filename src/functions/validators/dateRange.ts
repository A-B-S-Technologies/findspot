/**
 * True when both dates are set and check-out is strictly after check-in.
 * An incomplete range is not "invalid" yet — it is just unfinished, so callers
 * that only want to block a bad submit should use `isBrokenDateRange`.
 */
export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false
  return new Date(checkIn) < new Date(checkOut)
}

/** True only when both dates are filled in and the range runs backwards. */
export function isBrokenDateRange(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false
  return !isValidDateRange(checkIn, checkOut)
}
