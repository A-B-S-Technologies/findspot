import { useState } from 'react'
import { SearchIcon } from '@/components/icons'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { cn, isBrokenDateRange, today } from '@/functions'
import {
  searchFieldChanged,
  searchSubmitted,
  selectSearchDraft,
} from '../searchSlice'
import type { SearchCriteria } from '../searchSlice'

type InputType = 'text' | 'date' | 'number'

type FieldProps = {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: InputType
  min?: string
  divider?: boolean
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  min,
  divider = false,
}: FieldProps) {
  const [focused, setFocused] = useState(false)

  // An empty, unfocused date field renders as text so the custom placeholder
  // shows instead of the browser's "mm/dd/yyyy".
  const inputType: InputType =
    type === 'date' && !focused && !value ? 'text' : type

  return (
    <div
      className={cn(
        'min-w-0 px-6 py-4 text-left sm:py-5',
        divider &&
          'border-t border-white/25 sm:border-t-0 sm:border-l sm:border-white/25',
      )}
    >
      <label
        htmlFor={id}
        className="block cursor-pointer text-[15px] font-semibold text-white"
      >
        {label}
      </label>
      <input
        id={id}
        type={inputType}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="mt-1 w-full bg-transparent text-[13px] text-white placeholder:text-white/65 focus:outline-none [color-scheme:dark]"
      />
    </div>
  )
}

function SearchBar() {
  const dispatch = useAppDispatch()
  const draft = useAppSelector(selectSearchDraft)

  const setField = (field: keyof SearchCriteria) => (value: string) =>
    dispatch(searchFieldChanged({ field, value }))

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (isBrokenDateRange(draft.checkIn, draft.checkOut)) return
    dispatch(searchSubmitted())
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[660px] rounded-[36px] border border-white/25 bg-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1.05fr_0.95fr_0.95fr_0.95fr_92px] sm:items-center">
        <Field
          id="location"
          label="Location"
          placeholder="add destination"
          value={draft.location}
          onChange={setField('location')}
        />
        <Field
          id="check-in"
          label="Check in"
          placeholder="add date"
          type="date"
          min={today()}
          value={draft.checkIn}
          onChange={setField('checkIn')}
          divider
        />
        <Field
          id="check-out"
          label="Check out"
          placeholder="add date"
          type="date"
          min={draft.checkIn || today()}
          value={draft.checkOut}
          onChange={setField('checkOut')}
          divider
        />
        <Field
          id="people"
          label="People"
          placeholder="add people"
          type="number"
          min="1"
          value={draft.people}
          onChange={setField('people')}
          divider
        />

        <div className="flex items-center justify-center pb-5 sm:py-3 sm:pr-4 sm:pl-0">
          <button
            type="submit"
            aria-label="Search"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <SearchIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
