import {
  WEEKDAY_LABELS,
  buildMonthGrid,
  cn,
  formatDateLabel,
  isWithinRange,
} from '@/functions'

type CalendarMonthProps = {
  month: Date
  checkIn: string
  checkOut: string
  /** Days before this ISO date cannot be picked. */
  minDate: string
  onSelect: (iso: string) => void
  /** Which way the month changed, so the grid animates that way. */
  direction: 'next' | 'prev'
}

function CalendarMonth({
  month,
  checkIn,
  checkOut,
  minDate,
  onSelect,
  direction,
}: CalendarMonthProps) {
  const cells = buildMonthGrid(month)

  return (
    <div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] font-semibold text-white/70">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="py-1">
            {label}
          </span>
        ))}
      </div>

      {/* Keyed by month so React remounts it and the entrance replays */}
      <div
        key={month.toISOString()}
        className={cn(
          'mt-1 grid grid-cols-7 gap-y-1',
          direction === 'next' ? 'animate-month-next' : 'animate-month-prev',
        )}
      >
        {cells.map((iso, index) => {
          if (!iso) {
            return <span key={`pad-${index}`} aria-hidden="true" />
          }

          const isStart = iso === checkIn
          const isEnd = iso === checkOut
          const isEdge = isStart || isEnd
          const inRange = isWithinRange(iso, checkIn, checkOut)
          const disabled = Boolean(minDate) && iso < minDate

          return (
            <div
              key={iso}
              className={cn(
                'relative flex justify-center py-0.5',
                // The connecting bar lives on the cell, so the range reads as
                // one continuous band rather than separate pills.
                (inRange || (isEdge && checkIn && checkOut)) && 'bg-white/15',
                isStart && checkOut && 'rounded-l-full',
                isEnd && 'rounded-r-full',
              )}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => onSelect(iso)}
                aria-label={formatDateLabel(iso)}
                aria-current={isEdge ? 'date' : undefined}
                className={cn(
                  'relative flex h-8 w-8 items-center justify-center rounded-full text-[12px] transition duration-150 ease-glass',
                  disabled && 'cursor-not-allowed text-white/25',
                  !disabled && !isEdge && 'text-white hover:bg-white/20',
                  isEdge && 'text-surface-900 bg-white font-semibold',
                )}
              >
                {Number(iso.slice(8, 10))}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarMonth
