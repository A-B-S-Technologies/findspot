import { useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon } from '@/components/icons'
import AuthField from './AuthField'

type PasswordFieldProps = {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string | null
  autoComplete?: string
  autoFocus?: boolean
}

function PasswordField({
  id,
  value,
  onChange,
  placeholder = 'Password',
  error = null,
  autoComplete = 'current-password',
  autoFocus,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <AuthField
      id={id}
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      icon={<LockIcon className="h-4 w-4" />}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((shown) => !shown)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="rounded p-1.5 text-white/55 transition duration-150 ease-glass hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
        >
          {visible ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeOffIcon className="h-4 w-4" />
          )}
        </button>
      }
    />
  )
}

export default PasswordField
