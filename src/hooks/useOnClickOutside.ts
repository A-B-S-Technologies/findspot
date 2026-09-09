import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Calls `handler` when a pointer goes down outside `ref`. Listening on
 * pointerdown (not click) closes the popover as the press starts, which is what
 * users expect when they reach for something behind it.
 */
export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (target && !ref.current?.contains(target)) {
        handler()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [ref, handler, enabled])
}
