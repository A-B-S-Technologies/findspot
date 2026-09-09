import { useState } from 'react'
import type { FormEvent } from 'react'
import { MailIcon, UserIcon } from '@/components/icons'
import { useAppDispatch } from '@/app/hooks'
import { STORAGE_KEYS } from '@/constants'
import {
  MIN_PASSWORD_LENGTH,
  isLongEnough,
  isValidEmail,
  passwordsMatch,
  storage,
} from '@/functions'
import { getApiErrorMessage } from '@/services/api'
import { useRegisterMutation } from '../api/authApi'
import { credentialsReceived } from '../authSlice'
import AuthField from './AuthField'
import AuthPanel from './AuthPanel'
import AuthSwitch from './AuthSwitch'
import FormError from './FormError'
import PasswordField from './PasswordField'
import SubmitButton from './SubmitButton'

type RegisterFormProps = {
  onSuccess: () => void
  onLogin: () => void
}

function RegisterForm({ onSuccess, onLogin }: RegisterFormProps) {
  const dispatch = useAppDispatch()
  const [register, { isLoading }] = useRegisterMutation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const nameError = submitted && !name.trim() ? 'Please enter your name.' : null
  const emailError =
    submitted && !isValidEmail(email)
      ? 'The email format is incorrect. Please use a valid email address.'
      : null
  const passwordError =
    submitted && !isLongEnough(password)
      ? `Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`
      : null
  // Only worth flagging once the password itself is usable.
  const confirmationError =
    submitted &&
    isLongEnough(password) &&
    !passwordsMatch(password, confirmation)
      ? 'Both passwords must match.'
      : null

  const isValid =
    Boolean(name.trim()) &&
    isValidEmail(email) &&
    isLongEnough(password) &&
    passwordsMatch(password, confirmation)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError(null)

    if (!isValid) return

    try {
      const result = await register({
        name: name.trim(),
        email,
        password,
      }).unwrap()
      dispatch(credentialsReceived(result))
      storage.set(STORAGE_KEYS.authToken, result.token)
      onSuccess()
    } catch (error) {
      setServerError(getApiErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthPanel title="Register" subtitle="create your new account">
        <div className="mt-6 space-y-3">
          <AuthField
            id="register-name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={setName}
            error={nameError}
            autoComplete="name"
            autoFocus
            icon={<UserIcon className="h-4 w-4" />}
          />

          <AuthField
            id="register-email"
            type="email"
            placeholder="fullname@gmail.com"
            value={email}
            onChange={setEmail}
            error={emailError}
            autoComplete="email"
            icon={<MailIcon className="h-4 w-4" />}
          />

          <PasswordField
            id="register-password"
            value={password}
            onChange={setPassword}
            error={passwordError}
            autoComplete="new-password"
          />

          <PasswordField
            id="register-confirm-password"
            value={confirmation}
            onChange={setConfirmation}
            placeholder="Confirm Password"
            error={confirmationError}
            autoComplete="new-password"
          />
        </div>

        <FormError message={serverError} />

        <SubmitButton
          label="Signup"
          pendingLabel="Creating account…"
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

export default RegisterForm
