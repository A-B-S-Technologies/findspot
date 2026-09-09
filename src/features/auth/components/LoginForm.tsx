import { useState } from 'react'
import type { FormEvent } from 'react'
import { MailIcon } from '@/components/icons'
import { useAppDispatch } from '@/app/hooks'
import { STORAGE_KEYS } from '@/constants'
import { isValidEmail, storage } from '@/functions'
import { getApiErrorMessage } from '@/services/api'
import { useLoginMutation } from '../api/authApi'
import { credentialsReceived } from '../authSlice'
import { BYPASS_LOGIN, createTemporarySession } from '../temporaryAuth'
import AuthField from './AuthField'
import AuthPanel from './AuthPanel'
import AuthSwitch from './AuthSwitch'
import FormError from './FormError'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'

const EMAIL_ERROR =
  'The email format is incorrect. Please use a valid email address.'

type LoginFormProps = {
  onSuccess: () => void
  onForgotPassword: () => void
  onRegister: () => void
}

function LoginForm({
  onSuccess,
  onForgotPassword,
  onRegister,
}: LoginFormProps) {
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  // Errors only appear once the user has tried to submit, so a field is not
  // red while they are still typing into it.
  const emailError =
    !BYPASS_LOGIN && submitted && !isValidEmail(email) ? EMAIL_ERROR : null
  const passwordError =
    !BYPASS_LOGIN && submitted && !password
      ? 'Please enter your password.'
      : null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError(null)

    // TEMPORARY: sign in with whatever was typed, including nothing at all.
    // Delete this block along with `temporaryAuth.ts` once the API is live.
    if (BYPASS_LOGIN) {
      const session = createTemporarySession(email)
      dispatch(credentialsReceived(session))
      storage.set(STORAGE_KEYS.authToken, session.token)
      onSuccess()
      return
    }

    if (!isValidEmail(email) || !password) return

    try {
      const result = await login({ email, password }).unwrap()
      dispatch(credentialsReceived(result))
      // Persisted here rather than in the reducer, which must stay pure. Move
      // this to listener middleware if more places start signing users in.
      storage.set(STORAGE_KEYS.authToken, result.token)
      onSuccess()
    } catch (error) {
      setServerError(getApiErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthPanel title="Welcome back" subtitle="login to your account">
        <div className="mt-6 space-y-3">
          <AuthField
            id="login-email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={setEmail}
            error={emailError}
            autoComplete="email"
            autoFocus
            icon={<MailIcon className="h-4 w-4" />}
          />

          <PasswordField
            id="login-password"
            value={password}
            onChange={setPassword}
            error={passwordError}
          />
        </div>

        <div className="mt-2 text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[11px] text-white/70 transition duration-150 ease-glass hover:text-white"
          >
            Forgot Password?
          </button>
        </div>

        <FormError message={serverError} />

        <SubmitButton
          label="Login"
          pendingLabel="Logging in…"
          pending={isLoading}
        />

        <AuthSwitch
          prompt="Don't have an account?"
          actionLabel="Signup"
          onAction={onRegister}
        />
      </AuthPanel>
    </form>
  )
}

export default LoginForm
