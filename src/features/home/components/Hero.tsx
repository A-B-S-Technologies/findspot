import { SearchBar } from '@/features/search'
import { HERO_CONTENT } from '../constants'

function Hero() {
  return (
    <section className="relative isolate min-h-screen">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_CONTENT.image})` }}
      />

      {/* Cool blue wash that gives the photo its uniform, readable tone */}
      <div className="absolute inset-0 -z-10 bg-slate-900/45" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-wash-500/70 via-wash-500/25 to-wash-700/60" />

      <div className="mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-5 py-20 text-center sm:px-10 sm:py-28 lg:px-16">
        <h1 className="text-[1.6rem] leading-[1.15] font-bold text-white drop-shadow-sm xs:text-[1.9rem] sm:text-5xl sm:leading-[1.1] md:text-6xl lg:text-[4.25rem]">
          {HERO_CONTENT.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-[470px] text-[14px] leading-relaxed text-white/90 sm:mt-6 sm:text-[15px]">
          {HERO_CONTENT.description}
        </p>

        <div className="mt-7 w-full sm:mt-12">
          <SearchBar />
        </div>
      </div>
    </section>
  )
}

export default Hero
