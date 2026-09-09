import { useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

type Options = {
  /** Never shrink below this, even when the anchor sits near the fold. */
  minHeight?: number
  /** Breathing room between the panel and the bottom of the viewport. */
  gap?: number
}

/**
 * Sizing for a panel anchored under something. The search bar sits mid-hero,
 * so the room beneath it swings wildly by screen: cap the panel to what is
 * actually there, and scroll it into view when it still reaches past the fold.
 */
export function useAnchoredPanel(
  open: boolean,
  anchorRef: RefObject<HTMLElement | null>,
  { minHeight = 280, gap = 24 }: Options = {},
) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<number>()

  useLayoutEffect(() => {
    if (!open) return

    const measure = () => {
      const anchor = anchorRef.current?.getBoundingClientRect()
      if (!anchor) return
      setMaxHeight(
        Math.max(minHeight, Math.round(window.innerHeight - anchor.bottom - gap)),
      )
    }

    measure()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const frame = requestAnimationFrame(() =>
      panelRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: reduced ? 'auto' : 'smooth',
      }),
    )

    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
    }
  }, [open, anchorRef, minHeight, gap])

  return { panelRef, maxHeight }
}
