import { Header } from '@/components/layout'
import { Hero } from '@/features/home'

/**
 * Route-level composition: a page wires features together and owns nothing
 * else. Features stay unaware of where they are rendered.
 */
function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <div className="relative">
        <Header />
        <Hero />
      </div>
    </main>
  )
}

export default HomePage
