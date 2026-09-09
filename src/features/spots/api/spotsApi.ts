import { baseApi } from '@/services/api'
import { compactParams } from '@/functions'
import type { Paginated } from '@/types'
import type { Spot, SpotSearchParams } from '../types'

/**
 * Spot endpoints injected into the shared `baseApi`. Injecting (rather than
 * creating a second API) keeps one cache and one middleware for the whole app.
 */
export const spotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchSpots: builder.query<Paginated<Spot>, SpotSearchParams>({
      query: (params) => ({
        url: '/spots',
        params: compactParams({ ...params }),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Spot' as const, id })),
              { type: 'Spot' as const, id: 'LIST' },
            ]
          : [{ type: 'Spot' as const, id: 'LIST' }],
    }),

    getSpotById: builder.query<Spot, string>({
      query: (id) => `/spots/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Spot', id }],
    }),
  }),
})

export const {
  useSearchSpotsQuery,
  useLazySearchSpotsQuery,
  useGetSpotByIdQuery,
} = spotsApi
