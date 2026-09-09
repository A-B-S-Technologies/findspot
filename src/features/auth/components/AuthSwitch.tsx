type AuthSwitchProps = {
  prompt: string
  actionLabel: string
  onAction: () => void
}

/** The "Already have an account? Login" line at the foot of each panel. */
function AuthSwitch({ prompt, actionLabel, onAction }: AuthSwitchProps) {
  return (
    <p className="mt-3 text-center text-[11px] text-white/70">
      {prompt}{' '}
      <button
        type="button"
        onClick={onAction}
        className="font-semibold text-white transition duration-150 ease-glass hover:underline"
      >
        {actionLabel}
      </button>
    </p>
  )
}

export default AuthSwitch
