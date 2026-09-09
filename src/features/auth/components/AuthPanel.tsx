import type { ReactNode } from 'react'

type AuthPanelProps = {
  title: string
  subtitle?: ReactNode
  children: ReactNode
}

/** Shared heading block so every auth view starts the same way. */
function AuthPanel({ title, subtitle, children }: AuthPanelProps) {
  return (
    <div>
      <div className="text-center">
        <h2 id="auth-heading" className="text-[22px] font-semibold text-white">
          {title}
        </h2>
        {subtitle ? (
          <p className="mx-auto mt-1.5 max-w-[15rem] text-[11px] leading-snug text-white/60">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
}

export default AuthPanel
