import { useCallback, useState } from 'react'
import { SearchBar } from '@/features/search'
import { useKeyboardShortcuts } from '@/hooks'
import { cn } from '@/functions'
import { HERO_SLIDES } from '../constants'

function Hero() {
  const [index, setIndex] = useState(0)

  const go = useCallback(
    (step: number) =>
      setIndex(
        (current) => (current + step + HERO_SLIDES.length) % HERO_SLIDES.length,
      ),
    [],
  )

  useKeyboardShortcuts({
    ArrowLeft: () => go(-1),
    ArrowRight: () => go(1),
  })

  const slide = HERO_SLIDES[index]

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      {HERO_SLIDES.map((item, i) => (
        <div
          key={item.id}
          aria-hidden={i !== index}
          className={cn(
            'absolute inset-0 -z-10 bg-cover bg-center transition-opacity duration-700 ease-out',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
          style={{ backgroundImage: `url(${item.image})` }}
        />
      ))}

      {/* Cool blue wash that gives the photo its uniform, readable tone */}
      <div className="absolute inset-0 -z-10 bg-slate-900/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1b3a6b]/70 via-[#1b3a6b]/25 to-[#0f2647]/60" />

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute top-1/2 left-2 z-20 hidden -translate-y-1/2 rounded-full p-3 text-3xl text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-6 sm:block"
      >
        &#8249;
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute top-1/2 right-2 z-20 hidden -translate-y-1/2 rounded-full p-3 text-3xl text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-6 sm:block"
      >
        &#8250;
      </button>

      <div className="mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-6 py-24 text-center sm:px-16 sm:py-28">
        <h1 className="text-[1.9rem] leading-[1.15] font-bold text-white drop-shadow-sm sm:text-6xl sm:leading-[1.1] lg:text-[4.25rem]">
          {slide.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-[470px] text-[15px] leading-relaxed text-white/90">
          {slide.description}
        </p>

        <div className="mt-10 w-full sm:mt-12">
          <SearchBar />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center gap-2">
        {HERO_SLIDES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === index ? 'w-8 bg-white' : 'w-4 bg-white/45 hover:bg-white/70',
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
