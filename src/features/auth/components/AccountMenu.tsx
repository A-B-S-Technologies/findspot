import { useCallback, useRef, useState } from 'react'
import { UserIcon } from '@/components/icons'
import { getQueryParam } from '@/functions'
import { useKeyboardShortcuts, useOnClickOutside } from '@/hooks'
import type { AuthView } from '../types'
import ForgotPasswordForm from './ForgotPasswordForm'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ResetPasswordForm from './ResetPasswordForm'
import VerificationSentPanel from './VerificationSentPanel'

/**
 * The header's profile button and the panel it opens. Owns which auth view is
 * showing and nothing else — each view talks to the store on its own.
 *
 * Arriving on a link from the reset email (`?reset-token=…`) opens the panel
 * straight onto the reset view.
 */
function AccountMenu() {
  // Read once on mount: the token never changes for the life of the page.
  const [resetToken] = useState(() => getQueryParam('reset-token'))

  const [open, setOpen] = useState(Boolean(resetToken))
  const [view, setView] = useState<AuthView>(
    resetToken ? 'reset-password' : 'login',
  )
  const [sentTo, setSentTo] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    // Next open starts from the top rather than mid-flow.
    setView(resetToken ? 'reset-password' : 'login')
  }, [resetToken])

  useOnClickOutside(containerRef, close, open)
  useKeyboardShortcuts({ Escape: close })

  const renderView = () => {
    switch (view) {
      case 'register':
        return (
          <RegisterForm
            onSuccess={close}
            onLogin={() => setView('login')}
          />
        )

      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSent={(email) => {
              setSentTo(email)
              setView('verification-sent')
            }}
            onLogin={() => setView('login')}
          />
        )

      case 'verification-sent':
        return (
          <VerificationSentPanel
            email={sentTo}
            onBackToLogin={() => setView('login')}
            onRegister={() => setView('register')}
          />
        )

      case 'reset-password':
        return (
          <ResetPasswordForm
            token={resetToken ?? ''}
            onSuccess={() => setView('login')}
          />
        )

      case 'login':
      default:
        return (
          <LoginForm
            onSuccess={close}
            onForgotPassword={() => setView('forgot-password')}
            onRegister={() => setView('register')}
          />
        )
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label="Account"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="rounded-full p-2 text-white/90 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <UserIcon className="h-6 w-6" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-labelledby="auth-heading"
          className="animate-pop-in absolute top-full right-0 z-30 mt-3 max-h-[calc(100vh-6rem)] w-[min(21rem,calc(100vw-1.5rem))] origin-top-right overflow-y-auto rounded-3xl border border-white/10 bg-surface-900/95 p-3 shadow-[0_24px_60px_rgb(3_14_28/0.55)] backdrop-blur-xl sm:p-4"
        >
          {/* Inner card: the lighter panel the form sits on in the design */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-surface-600 via-surface-700 to-surface-800 px-5 py-6 sm:px-6 sm:py-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rotate-12 rounded-full bg-white/10 blur-2xl"
            />
            {/* Keyed so switching views fades rather than snaps */}
            <div key={view} className="animate-fade-in relative">
              {renderView()}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AccountMenu
