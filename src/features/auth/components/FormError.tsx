type FormErrorProps = {
  message: string | null
}

/** Form-level failure (a rejected request), as opposed to a field's own error. */
function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <p
      role="alert"
      className="animate-fade-in mt-4 rounded bg-rose-600 px-2.5 py-1.5 text-[10px] leading-snug text-white"
    >
      {message}
    </p>
  )
}

export default FormError
