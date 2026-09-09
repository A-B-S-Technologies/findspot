import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/services/api'
// Import slices from their module, not the feature barrel: the barrel also
// exports components, which would pull React files into the store graph.
import { searchReducer } from '@/features/search/searchSlice'
// Endpoints only register when their module is loaded, so features that no
// mounted component imports yet are pulled in here.
import '@/features/spots/api/spotsApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// Enables refetchOnFocus / refetchOnReconnect on endpoints that opt in.
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
