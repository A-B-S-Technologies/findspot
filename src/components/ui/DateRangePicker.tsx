import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@/components/icons'
import {
  addMonths,
  formatMonthLabel,
  isBefore,
  monthOf,
  nightsBetween,
  today,
} from '@/functions'
import CalendarMonth from './CalendarMonth'

export type DateRange = {
  checkIn: string
  checkOut: string
}

type DateRangePickerProps = {
  value: DateRange
  /** Fires on every pick — the fields outside show the selection as it is made. */
  onChange: (range: DateRange) => void
  onClose: () => void
  /** Fires once a full range is picked, so the caller can dismiss the panel. */
  onRangeComplete?: () => void
  /** Shown under the night count, e.g. the place being booked. */
  caption?: string
}

/**
 * Two-step range picker: the first click sets check-in, the next one sets
 * check-out. Clicking a day before the current check-in restarts the range
 * rather than refusing the click — it is almost always what was meant.
 *
 * There is no Save: every pick is committed straight to the caller, which is
 * what makes the dates appear in the fields outside as you go.
 */
function DateRangePicker({
  value,
  onChange,
  onClose,
  onRangeComplete,
  caption,
}: DateRangePickerProps) {
  const minDate = today()
  const [month, setMonth] = useState(() => monthOf(value.checkIn))
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const changeMonth = (delta: number) => {
    setDirection(delta > 0 ? 'next' : 'prev')
    setMonth((current) => addMonths(current, delta))
  }

  const handleSelect = (iso: string) => {
    const startingOver = !value.checkIn || Boolean(value.checkOut)

    if (startingOver || !isBefore(value.checkIn, iso)) {
      onChange({ checkIn: iso, checkOut: '' })
      return
    }

    onChange({ ...value, checkOut: iso })
    onRangeComplete?.()
  }

  const nights = nightsBetween(value.checkIn, value.checkOut)

  return (
    <div className="glass-panel animate-pop-in w-full overflow-hidden rounded-3xl bg-surface-800/95 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close calendar"
          className="rounded-full p-1.5 text-white/70 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-white">
            {nights > 0
              ? `${nights} ${nights === 1 ? 'night' : 'nights'}`
              : 'Select dates'}
          </p>
          {caption ? (
            <p className="truncate text-[12px] text-white/60">{caption}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <p
          aria-live="polite"
          className="rounded-md bg-white/10 px-4 py-2 text-[15px] font-semibold text-white"
        >
          {formatMonthLabel(month)}
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="rounded-full p-1.5 text-white/80 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <ChevronUpIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="rounded-full p-1.5 text-white/80 transition duration-150 ease-glass hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <CalendarMonth
          month={month}
          checkIn={value.checkIn}
          checkOut={value.checkOut}
          minDate={minDate}
          onSelect={handleSelect}
          direction={direction}
        />
      </div>
    </div>
  )
}

export default DateRangePicker
