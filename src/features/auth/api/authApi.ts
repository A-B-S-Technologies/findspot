import { baseApi } from '@/services/api'
import type {
  ForgotPasswordPayload,
  LoginCredentials,
  LoginResponse,
  RegisterPayload,
  ResetPasswordPayload,
} from '../types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // A new session sees different data than the last one did.
      invalidatesTags: ['User', 'Spot'],
    }),

    register: builder.mutation<LoginResponse, RegisterPayload>({
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User', 'Spot'],
    }),

    /** Sends the "we emailed you a reset link" mail. */
    requestPasswordReset: builder.mutation<void, ForgotPasswordPayload>({
      query: (payload) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),

    /** Consumes the token from that mail and sets the new password. */
    resetPassword: builder.mutation<void, ResetPasswordPayload>({
      query: (payload) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: payload,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      invalidatesTags: ['User', 'Spot'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi
