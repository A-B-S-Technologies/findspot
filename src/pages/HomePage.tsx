import { Header, MainNav } from '@/components/layout'
import { useAppSelector } from '@/app/hooks'
import { AccountMenu, UserMenu, selectIsAuthenticated } from '@/features/auth'
import { Hero } from '@/features/home'

/**
 * Route-level composition: a page wires features together and owns nothing
 * else. Features stay unaware of where they are rendered.
 */
function HomePage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="relative">
        <Header
          action={
            isAuthenticated ? <MainNav menu={<UserMenu />} /> : <AccountMenu />
          }
        />
        <Hero />
      </div>
    </main>
  )
}

export default HomePage
