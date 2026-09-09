import type { ReactNode } from 'react'

type HeaderProps = {
  /** Rendered at the right end of the nav — the account menu on most pages. */
  action?: ReactNode
}

function Header({ action }: HeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <a
          href="#"
          className="text-lg font-bold tracking-[0.2em] text-white sm:text-xl"
        >
          FINDSPOT
        </a>

        {action}
      </nav>
    </header>
  )
}

export default Header
