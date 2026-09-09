import { useState } from 'react'
import type { FormEvent } from 'react'
import { MailIcon } from '@/components/icons'
import { isValidEmail } from '@/functions'
import { getApiErrorMessage } from '@/services/api'
import { useRequestPasswordResetMutation } from '../api/authApi'
import AuthField from './AuthField'
import AuthPanel from './AuthPanel'
import AuthSwitch from './AuthSwitch'
import FormError from './FormError'
import SubmitButton from './SubmitButton'

type ForgotPasswordFormProps = {
  /** Receives the address so the next panel can name it. */
  onSent: (email: string) => void
  onLogin: () => void
}

function ForgotPasswordForm({ onSent, onLogin }: ForgotPasswordFormProps) {
  const [requestReset, { isLoading }] = useRequestPasswordResetMutation()

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const emailError =
    submitted && !isValidEmail(email)
      ? 'The email format is incorrect. Please use a valid email address.'
      : null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError(null)

    if (!isValidEmail(email)) return

    try {
      await requestReset({ email }).unwrap()
      onSent(email)
    } catch (error) {
      setServerError(getApiErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthPanel
        title="Forgot Password?"
        subtitle="Enter the email address you used when you joined and we'll send you instruction to reset your password"
      >
        <div className="mt-5">
          <AuthField
            id="forgot-email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={setEmail}
            error={emailError}
            autoComplete="email"
            autoFocus
            icon={<MailIcon className="h-4 w-4" />}
          />
        </div>

        <FormError message={serverError} />

        <SubmitButton
          label="Reset Password"
          pendingLabel="Sending…"
          pending={isLoading}
        />

        <AuthSwitch
          prompt="Already have an account?"
          actionLabel="Login"
          onAction={onLogin}
        />
      </AuthPanel>
    </form>
  )
}

export default ForgotPasswordForm
