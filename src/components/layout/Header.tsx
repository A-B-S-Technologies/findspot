import { UserIcon } from '@/components/icons'

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <a
          href="#"
          className="text-lg font-bold tracking-[0.2em] text-white sm:text-xl"
        >
          FINDSPOT
        </a>

        <button
          type="button"
          aria-label="Account"
          className="rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <UserIcon className="h-6 w-6" />
        </button>
      </nav>
    </header>
  )
}

export default Header
