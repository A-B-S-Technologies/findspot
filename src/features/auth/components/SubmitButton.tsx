type SubmitButtonProps = {
  label: string
  pendingLabel: string
  pending: boolean
  type?: 'submit' | 'button'
  onClick?: () => void
}

function SubmitButton({
  label,
  pendingLabel,
  pending,
  type = 'submit',
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={pending}
      className="bg-brand-500 hover:bg-brand-600 focus-visible:ring-brand-400 mt-6 w-full rounded-md py-2.5 text-[13px] font-semibold text-white shadow transition duration-150 ease-glass focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  )
}

export default SubmitButton
