import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export type SearchCriteria = {
  location: string
  checkIn: string
  checkOut: string
  people: string
}

export const EMPTY_CRITERIA: SearchCriteria = {
  location: '',
  checkIn: '',
  checkOut: '',
  people: '',
}

type SearchState = {
  /** What the user is currently typing into the hero search bar. */
  draft: SearchCriteria
  /** What was last submitted — this is what a results query should read. */
  applied: SearchCriteria | null
}

const initialState: SearchState = {
  draft: EMPTY_CRITERIA,
  applied: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchFieldChanged(
      state,
      action: PayloadAction<{ field: keyof SearchCriteria; value: string }>,
    ) {
      state.draft[action.payload.field] = action.payload.value
    },
    searchSubmitted(state) {
      state.applied = state.draft
    },
    searchReset(state) {
      state.draft = EMPTY_CRITERIA
      state.applied = null
    },
  },
})

export const { searchFieldChanged, searchSubmitted, searchReset } =
  searchSlice.actions

export const selectSearchDraft = (state: RootState) => state.search.draft
export const selectAppliedSearch = (state: RootState) => state.search.applied

export const searchReducer = searchSlice.reducer
