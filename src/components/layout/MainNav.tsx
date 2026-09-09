import type { ReactNode } from 'react'
import { HeartIcon, MapIcon, MessageIcon } from '@/components/icons'

type NavItemProps = {
  href: string
  icon: ReactNode
  label: string
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 rounded-md px-1 py-1 text-[13px] text-white/85 transition duration-150 ease-glass hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <span className="shrink-0">{icon}</span>
      {/* Visually icon-only until lg, but always announced */}
      <span className="sr-only lg:not-sr-only">{label}</span>
    </a>
  )
}

type MainNavProps = {
  /** Trailing slot for the account menu. */
  menu?: ReactNode
}

/** The signed-in header nav. Presentational — it knows nothing about auth. */
function MainNav({ menu }: MainNavProps) {
  return (
    <nav className="flex items-center gap-4 sm:gap-6 lg:gap-7">
      <NavItem
        href="#"
        label="Trip History"
        icon={<MapIcon className="h-[18px] w-[18px]" />}
      />
      <NavItem
        href="#"
        label="Message"
        icon={<MessageIcon className="h-[18px] w-[18px]" />}
      />
      <NavItem
        href="#"
        label="Wishlist"
        icon={<HeartIcon className="h-[18px] w-[18px]" />}
      />
      {menu}
    </nav>
  )
}

export default MainNav
