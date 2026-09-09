/**
 * localStorage wrapper that never throws. Access can fail in private windows or
 * when a browser blocks site data, and an uncaught error there would take the
 * whole render down.
 */
export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },

  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      /* storage unavailable — the caller treats this as "not persisted" */
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* see above */
    }
  },
}
