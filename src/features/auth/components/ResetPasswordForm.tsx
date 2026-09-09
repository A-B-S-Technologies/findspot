import { useState } from 'react'
import type { FormEvent } from 'react'
import { MIN_PASSWORD_LENGTH, isLongEnough, passwordsMatch } from '@/functions'
import { getApiErrorMessage } from '@/services/api'
import { useResetPasswordMutation } from '../api/authApi'
import AuthPanel from './AuthPanel'
import FormError from './FormError'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'

type ResetPasswordFormProps = {
  /** Single-use token from the emailed link. */
  token: string
  onSuccess: () => void
}

function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const passwordError =
    submitted && !isLongEnough(password)
      ? `Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`
      : null
  const confirmationError =
    submitted &&
    isLongEnough(password) &&
    !passwordsMatch(password, confirmation)
      ? 'Both passwords must match.'
      : null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError(null)

    if (!isLongEnough(password) || !passwordsMatch(password, confirmation)) {
      return
    }

    try {
      await resetPassword({ token, password }).unwrap()
      onSuccess()
    } catch (error) {
      setServerError(getApiErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthPanel
        title="Reset Your Password"
        subtitle="Please provide your password, making sure it is not the same as the one used before"
      >
        <div className="mt-5 space-y-3">
          <PasswordField
            id="reset-password"
            value={password}
            onChange={setPassword}
            placeholder="New Password"
            error={passwordError}
            autoComplete="new-password"
            autoFocus
          />

          <PasswordField
            id="reset-confirm-password"
            value={confirmation}
            onChange={setConfirmation}
            placeholder="Confirm New Password"
            error={confirmationError}
            autoComplete="new-password"
          />
        </div>

        <FormError message={serverError} />

        <SubmitButton
          label="Change Password"
          pendingLabel="Saving…"
          pending={isLoading}
        />
      </AuthPanel>
    </form>
  )
}

export default ResetPasswordForm
