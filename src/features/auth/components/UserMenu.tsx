import { useCallback, useRef, useState } from 'react'
import { MenuIcon } from '@/components/icons'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { STORAGE_KEYS } from '@/constants'
import { storage } from '@/functions'
import { useKeyboardShortcuts, useOnClickOutside } from '@/hooks'
import { loggedOut, selectAuthUser } from '../authSlice'

/**
 * The signed-in hamburger and its menu. Log out clears the session locally;
 * the `logout` endpoint can be called from here once the API exists.
 */
function UserMenu() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser)

  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useOnClickOutside(containerRef, close, open)
  useKeyboardShortcuts({ Escape: close })

  const handleLogout = () => {
    dispatch(loggedOut())
    storage.remove(STORAGE_KEYS.authToken)
    close()
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className="rounded-md p-1.5 text-white/90 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {open ? (
        <div
          role="menu"
          className="animate-pop-in absolute top-full right-0 z-40 mt-3 w-56 origin-top-right rounded-2xl border border-white/10 bg-surface-900/95 p-2 shadow-[0_24px_60px_rgb(3_14_28/0.55)] backdrop-blur-xl"
        >
          {user ? (
            <div className="border-b border-white/10 px-3 pt-1 pb-3">
              <p className="truncate text-[13px] font-semibold text-white">
                {user.name}
              </p>
              <p className="truncate text-[11px] text-white/55">{user.email}</p>
            </div>
          ) : null}

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="mt-1 w-full rounded-lg px-3 py-2 text-left text-[13px] text-white/85 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Log out
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default UserMenu
