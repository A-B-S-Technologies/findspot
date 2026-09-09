import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/config/env'
import { STORAGE_KEYS } from '@/constants'
import { storage } from '@/functions'
import { API_TAGS } from './tags'

/**
 * The single RTK Query API for the app. Features do not call `createApi`
 * themselves — they call `baseApi.injectEndpoints`, which keeps one cache, one
 * middleware and one reducer no matter how many features are added.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: API_TAGS,
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    prepareHeaders: (headers) => {
      const token = storage.get(STORAGE_KEYS.authToken)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  // Endpoints are injected by each feature; this stays empty on purpose.
  endpoints: () => ({}),
})
