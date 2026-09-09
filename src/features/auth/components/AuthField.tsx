import type { ReactNode } from 'react'
import { cn } from '@/functions'

type AuthFieldProps = {
  id: string
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon: ReactNode
  /** Message shown in the rose bar beneath the field; also marks it invalid. */
  error?: string | null
  autoComplete?: string
  autoFocus?: boolean
  trailing?: ReactNode
}

/**
 * The one input used by every auth panel: leading icon, optional trailing
 * control, and its own error bar so the message sits with the field it blames.
 */
function AuthField({
  id,
  type,
  placeholder,
  value,
  onChange,
  icon,
  error = null,
  autoComplete,
  autoFocus,
  trailing,
}: AuthFieldProps) {
  const invalid = Boolean(error)

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/55">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={invalid}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'w-full rounded-md border bg-white/10 py-2.5 pl-10 text-[13px] text-white transition duration-150 ease-glass',
            'placeholder:text-white/50 focus:outline-none focus:ring-1',
            trailing ? 'pr-10' : 'pr-3',
            invalid
              ? 'border-rose-500 ring-1 ring-rose-500/70 focus:ring-rose-400'
              : 'border-white/15 focus:border-brand-400/70 focus:ring-brand-400/60',
          )}
        />
        {trailing ? (
          <span className="absolute top-1/2 right-2 -translate-y-1/2">
            {trailing}
          </span>
        ) : null}
      </div>

      {error ? (
        <p
          role="alert"
          className="animate-fade-in mt-1.5 rounded bg-rose-600 px-2.5 py-1 text-[10px] leading-snug text-white"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default AuthField
