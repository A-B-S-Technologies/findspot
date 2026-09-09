import { useEffect, useRef } from 'react'

type KeyHandlers = Record<string, () => void>

/**
 * Runs a handler when its key is pressed, e.g. `{ ArrowLeft: prev }`.
 * Handlers are held in a ref so passing a fresh object each render does not
 * resubscribe the listener.
 */
export function useKeyboardShortcuts(handlers: KeyHandlers): void {
  const handlersRef = useRef(handlers)

  useEffect(() => {
    handlersRef.current = handlers
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      handlersRef.current[event.key]?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
