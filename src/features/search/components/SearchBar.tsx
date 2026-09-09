import { useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from '@/components/icons'
import { DateRangePicker } from '@/components/ui'
import type { DateRange } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { cn, formatDateLabel, isBrokenDateRange } from '@/functions'
import { useAnchoredPanel, useKeyboardShortcuts, useOnClickOutside } from '@/hooks'
import {
  searchFieldChanged,
  searchSubmitted,
  selectSearchDraft,
} from '../searchSlice'
import type { SearchCriteria } from '../searchSlice'
import LocationField from './LocationField'

type CellProps = {
  divider?: boolean
  /**
   * The cell sitting in the pill's rounded corner. It carries the matching
   * radius itself so the bar does not need `overflow-hidden`, which would clip
   * any panel opened from inside a cell.
   */
  leading?: boolean
  children: ReactNode
}

function Cell({ divider = false, leading = false, children }: CellProps) {
  return (
    <div
      className={cn(
        'glass-field min-w-0 text-left',
        divider && 'glass-divider border-t sm:border-t-0 sm:border-l',
        leading && 'rounded-t-[36px] sm:rounded-t-none sm:rounded-l-[36px]',
      )}
    >
      {children}
    </div>
  )
}

type DateTriggerProps = {
  label: string
  value: string
  open: boolean
  onOpen: () => void
  onClear: () => void
}

/**
 * Opens the calendar, and carries its own clear button once a date is set —
 * the calendar itself has no Save or Clear controls.
 */
function DateTrigger({ label, value, open, onOpen, onClear }: DateTriggerProps) {
  return (
    <div className="relative px-5 py-3 sm:px-4 sm:py-5 lg:px-6">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="block w-full rounded text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <span className="block truncate text-[14px] font-semibold text-white lg:text-[15px]">
          {label}
        </span>
        {/* Room reserved on the right for the clear button sitting over it */}
        <span
          className={cn(
            'mt-1 block truncate text-[12px] lg:text-[13px]',
            value ? 'pr-6 text-white' : 'text-white/65',
          )}
        >
          {value ? formatDateLabel(value) : 'add date'}
        </span>
      </button>

      {value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Clear ${label.toLowerCase()} date`}
          className="absolute right-3 bottom-2.5 rounded-full p-1.5 text-white/60 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:bottom-4"
        >
          <CloseIcon className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  )
}

const MIN_PEOPLE = 1
const MAX_PEOPLE = 30

type PeopleFieldProps = {
  value: string
  onChange: (value: string) => void
}

/**
 * Still a real number input, so it can be typed into and read by assistive
 * tech — the stepper buttons replace the native spinners hidden in `index.css`.
 */
function PeopleField({ value, onChange }: PeopleFieldProps) {
  const count = Number(value)
  const current = Number.isFinite(count) && count > 0 ? count : 0

  const step = (delta: number) => {
    const next = current + delta
    // Stepping below the minimum empties the field rather than sticking at 1.
    if (next < MIN_PEOPLE) {
      onChange('')
      return
    }
    onChange(String(Math.min(next, MAX_PEOPLE)))
  }

  return (
    <div className="px-5 py-3 sm:px-4 sm:py-5 lg:px-6">
      <label
        htmlFor="people"
        className="block truncate text-[14px] font-semibold text-white lg:text-[15px]"
      >
        People
      </label>

      <div className="mt-1 flex items-center gap-1">
        <input
          id="people"
          type="number"
          inputMode="numeric"
          min={MIN_PEOPLE}
          max={MAX_PEOPLE}
          value={value}
          placeholder="add people"
          onChange={(event) => onChange(event.target.value)}
          className="w-full min-w-0 bg-transparent text-[12px] text-white placeholder:text-white/65 focus:outline-none lg:text-[13px]"
        />

        {current > 0 ? (
          <StepButton
            label="Fewer people"
            onClick={() => step(-1)}
            icon={<MinusIcon className="h-3 w-3" />}
          />
        ) : null}
        <StepButton
          label="More people"
          onClick={() => step(1)}
          disabled={current >= MAX_PEOPLE}
          icon={<PlusIcon className="h-3 w-3" />}
        />
      </div>
    </div>
  )
}

type StepButtonProps = {
  label: string
  onClick: () => void
  icon: ReactNode
  disabled?: boolean
}

function StepButton({ label, onClick, icon, disabled = false }: StepButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/25 text-white/75 transition duration-150 ease-glass hover:border-white/50 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/25 disabled:hover:bg-transparent"
    >
      {icon}
    </button>
  )
}

function SearchBar() {
  const dispatch = useAppDispatch()
  const draft = useAppSelector(selectSearchDraft)

  const [calendarOpen, setCalendarOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const closeCalendar = useCallback(() => setCalendarOpen(false), [])

  const { panelRef, maxHeight: calendarMaxHeight } = useAnchoredPanel(
    calendarOpen,
    formRef,
  )

  useOnClickOutside(containerRef, closeCalendar, calendarOpen)
  useKeyboardShortcuts({ Escape: closeCalendar })

  const setField = (field: keyof SearchCriteria) => (value: string) =>
    dispatch(searchFieldChanged({ field, value }))

  const handleDatesChange = (range: DateRange) => {
    dispatch(searchFieldChanged({ field: 'checkIn', value: range.checkIn }))
    dispatch(searchFieldChanged({ field: 'checkOut', value: range.checkOut }))
  }

  // A range cannot start midway, so dropping check-in drops the whole range;
  // dropping check-out only reopens the second half.
  const clearCheckIn = () => handleDatesChange({ checkIn: '', checkOut: '' })
  const clearCheckOut = () =>
    dispatch(searchFieldChanged({ field: 'checkOut', value: '' }))

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (isBrokenDateRange(draft.checkIn, draft.checkOut)) return
    dispatch(searchSubmitted())
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[660px]">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="glass-panel w-full rounded-[36px]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_0.85fr_0.85fr_1.2fr_84px] sm:items-center lg:grid-cols-[1.1fr_0.85fr_0.85fr_1.2fr_92px]">
          <Cell leading>
            <LocationField
              value={draft.location}
              onChange={setField('location')}
            />
          </Cell>

          <Cell divider>
            <DateTrigger
              label="Check in"
              value={draft.checkIn}
              open={calendarOpen}
              onOpen={() => setCalendarOpen(true)}
              onClear={clearCheckIn}
            />
          </Cell>

          <Cell divider>
            <DateTrigger
              label="Check out"
              value={draft.checkOut}
              open={calendarOpen}
              onOpen={() => setCalendarOpen(true)}
              onClear={clearCheckOut}
            />
          </Cell>

          <Cell divider>
            <PeopleField
              value={draft.people}
              onChange={setField('people')}
            />
          </Cell>

          <div className="flex items-center justify-center pb-4 sm:py-3 sm:pr-4 sm:pl-0">
            <button
              type="submit"
              aria-label="Search"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full lg:h-14 lg:w-14 bg-white text-slate-800 shadow-lg transition duration-150 ease-glass hover:scale-105 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <SearchIcon className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>
          </div>
        </div>
      </form>

      {/*
        Anchored under the bar and centred on the check-in / check-out seam.
        Height is capped to the space below so it never runs off-screen.
      */}
      {calendarOpen ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Choose your dates"
          style={{ maxHeight: calendarMaxHeight }}
          className="absolute top-full left-1/2 z-40 mt-3 w-[min(23rem,calc(100vw-1.5rem))] -translate-x-1/2 overflow-y-auto overscroll-contain"
        >
          <DateRangePicker
            value={{ checkIn: draft.checkIn, checkOut: draft.checkOut }}
            onChange={handleDatesChange}
            onClose={closeCalendar}
            onRangeComplete={closeCalendar}
            caption={draft.location || undefined}
          />
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
