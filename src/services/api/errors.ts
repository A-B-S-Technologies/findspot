import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { ApiErrorBody } from '@/types'

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.'

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}

function hasMessage(data: unknown): data is ApiErrorBody {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as ApiErrorBody).message === 'string'
  )
}

/**
 * Turns an RTK Query error union into a sentence that can go in front of a
 * user, so components never have to unpack the error shape themselves.
 */
export function getApiErrorMessage(error: unknown): string {
  if (isFetchBaseQueryError(error)) {
    if (error.status === 'FETCH_ERROR') {
      return 'Cannot reach the server. Check your connection and try again.'
    }
    if (error.status === 'PARSING_ERROR' || error.status === 'CUSTOM_ERROR') {
      return DEFAULT_MESSAGE
    }
    if (hasMessage(error.data)) {
      return error.data.message
    }
    if (error.status === 401) {
      return 'That email and password do not match an account.'
    }
    return DEFAULT_MESSAGE
  }

  const serialized = error as SerializedError | undefined
  return serialized?.message ?? DEFAULT_MESSAGE
}
