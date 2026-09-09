import type { IconProps } from './types'

function MessageIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a7.5 7.5 0 0 1-8.2 7.47L7 21l1-3.6A7.5 7.5 0 1 1 21 11.5Z" />
    </svg>
  )
}

export default MessageIcon
