import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type Options = {
  /** Breathing room kept between the panel and the edges of the viewport. */
  gap?: number
}

/**
 * Sizing and scroll for a panel anchored under a field.
 *
 * The panel is capped to the height of the screen rather than to the room left
 * beneath its anchor, then the page is scrolled far enough to show it. Capping
 * to the room below looked reasonable on a laptop and broke on a phone: with
 * the search bar near the fold the panel became a short scrolling window, and
 * a swipe over it scrolled its own contents — taking its header out of view —
 * instead of moving the page. Letting it keep its natural height and moving
 * the page instead means nothing inside it can be scrolled away.
 */
export function useAnchoredPanel(open: boolean, { gap = 16 }: Options = {}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number>()

  useLayoutEffect(() => {
    if (!open) return

    const measure = () =>
      setMaxHeight(Math.max(200, window.innerHeight - gap * 2))

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [open, gap])

  /**
   * Depends on `maxHeight`, so the cap is already on the element by the time
   * this runs and the measurement is the final one. Measured synchronously on
   * purpose: deferring to `requestAnimationFrame` meant the scroll silently
   * never happened whenever that frame was not serviced.
   */
  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    if (!panel) return

    const overflow = Math.round(
      panel.getBoundingClientRect().bottom - window.innerHeight + gap,
    )
    if (overflow <= 0) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollBy({ top: overflow, behavior: reduced ? 'auto' : 'smooth' })
  }, [open, maxHeight, gap])

  return { panelRef, maxHeight }
}
