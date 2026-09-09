import { CheckCircleIcon } from '@/components/icons'
import AuthSwitch from './AuthSwitch'

type VerificationSentPanelProps = {
  email: string
  onBackToLogin: () => void
  onRegister: () => void
}

/**
 * Confirmation panel. It deliberately does not say whether the address has an
 * account — that would let anyone probe which emails are registered.
 */
function VerificationSentPanel({
  email,
  onBackToLogin,
  onRegister,
}: VerificationSentPanelProps) {
  return (
    <div className="text-center">
      <CheckCircleIcon className="mx-auto h-7 w-7 text-white" />

      <h2 id="auth-heading" className="mt-4 text-[20px] font-semibold text-white">
        Email Verification Sent!
      </h2>

      <p className="mx-auto mt-2 max-w-[16rem] text-[11px] leading-snug text-white/65">
        We sent an email to {email}. If this email is connected to FINDSPOT,
        you&apos;ll be able to reset your password.
      </p>

      <button
        type="button"
        onClick={onBackToLogin}
        className="bg-brand-500 hover:bg-brand-600 focus-visible:ring-brand-400 mt-6 w-full rounded-md py-2.5 text-[13px] font-semibold text-white shadow transition duration-150 ease-glass focus:outline-none focus-visible:ring-2"
      >
        Back to Login
      </button>

      <AuthSwitch
        prompt="Don't have an account?"
        actionLabel="Signup"
        onAction={onRegister}
      />
    </div>
  )
}

export default VerificationSentPanel
