import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { CloseIcon } from '@/components/icons'
import { cn, normalizeForSearch } from '@/functions'
import { useAnchoredPanel, useOnClickOutside } from '@/hooks'
import {
  LAGUNA_CITY_COUNT,
  LAGUNA_LOCATIONS,
  LAGUNA_MUNICIPALITY_COUNT,
} from '../constants'

const LISTBOX_ID = 'location-listbox'

type LocationFieldProps = {
  value: string
  onChange: (value: string) => void
}

/**
 * A combobox, not a select: the field stays free text, and the list below it
 * narrows as you type. Enter takes the highlighted match, which starts on the
 * first one — so typing "pag" and pressing Enter lands on Pagsanjan.
 */
function LocationField({ value, onChange }: LocationFieldProps) {
  const [open, setOpen] = useState(false)
  const [rawActiveIndex, setActiveIndex] = useState(0)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { panelRef, maxHeight } = useAnchoredPanel(open, anchorRef, {
    minHeight: 240,
  })

  const matches = useMemo(() => {
    const query = normalizeForSearch(value)
    if (!query) return [...LAGUNA_LOCATIONS]
    return LAGUNA_LOCATIONS.filter((name) =>
      normalizeForSearch(name).includes(query),
    )
  }, [value])

  useOnClickOutside(wrapperRef, () => setOpen(false), open)

  // Clamped rather than reset in an effect: if the query narrows the list past
  // the highlighted row, fall back to the first match on the same render.
  const activeIndex = rawActiveIndex < matches.length ? rawActiveIndex : 0

  // Keep the highlighted option inside the scrolling list.
  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  const select = (name: string) => {
    onChange(name)
    setOpen(false)
  }

  // Clearing leaves the list open on the full set, so the next choice is one
  // click away rather than needing the field to be reopened.
  const clear = () => {
    onChange('')
    setActiveIndex(0)
    setOpen(true)
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      if (!matches.length) return
      const delta = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((index) => (index + delta + matches.length) % matches.length)
      return
    }

    if (event.key === 'Enter' && open && matches.length) {
      // Take the match rather than submitting the search behind it.
      event.preventDefault()
      select(matches[activeIndex] ?? matches[0])
      return
    }

    if (event.key === 'Escape' && open) {
      event.stopPropagation()
      setOpen(false)
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div
        ref={anchorRef}
        className="relative px-5 py-3 sm:px-4 sm:py-5 lg:px-6"
      >
        <label
          htmlFor="location"
          className="block truncate text-[14px] font-semibold text-white lg:text-[15px]"
        >
          Location
        </label>
        <input
          ref={inputRef}
          id="location"
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={open}
          aria-controls={LISTBOX_ID}
          aria-autocomplete="list"
          aria-activedescendant={
            open && matches.length ? `location-option-${activeIndex}` : undefined
          }
          value={value}
          placeholder="add destination"
          onChange={(event) => {
            onChange(event.target.value)
            setActiveIndex(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            'mt-1 w-full bg-transparent text-[12px] text-white placeholder:text-white/65 focus:outline-none lg:text-[13px]',
            // Room for the clear button sitting over the end of the line
            value && 'pr-6',
          )}
        />

        {value ? (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear location"
            className="absolute right-3 bottom-2.5 rounded-full p-1.5 text-white/60 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:bottom-4"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      {open ? (
        <div
          ref={panelRef}
          style={{ maxHeight }}
          className="glass-panel animate-pop-in absolute top-full left-0 z-40 mt-2 flex w-[min(22rem,calc(100vw-1.5rem))] origin-top flex-col overflow-hidden rounded-2xl bg-surface-800/95 backdrop-blur-xl"
        >
          <div className="shrink-0 px-4 pt-3 pb-2">
            <p className="text-[13px] font-semibold text-white">Laguna</p>
            <p className="text-[11px] text-white/55">
              {value
                ? `${matches.length} ${matches.length === 1 ? 'match' : 'matches'}`
                : `${LAGUNA_CITY_COUNT} cities and ${LAGUNA_MUNICIPALITY_COUNT} municipalities`}
            </p>
          </div>

          {matches.length ? (
            <ul
              ref={listRef}
              id={LISTBOX_ID}
              role="listbox"
              aria-label="Places in Laguna"
              className="grid min-h-0 grid-cols-2 gap-x-2 overflow-y-auto overscroll-contain px-2 pb-2"
            >
              {matches.map((name, index) => (
                <li key={name}>
                  <button
                    type="button"
                    role="option"
                    id={`location-option-${index}`}
                    data-index={index}
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => select(name)}
                    className={cn(
                      'w-full truncate rounded-md px-2 py-1.5 text-left text-[13px] transition duration-150 ease-glass',
                      index === activeIndex
                        ? 'bg-white/15 text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white',
                      name === value && 'font-semibold text-white',
                    )}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 pb-3 text-[12px] text-white/60">
              No place in Laguna matches that. Your text is kept as typed.
            </p>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default LocationField
