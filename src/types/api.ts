/** Shape returned by the API for a paged collection. */
export type Paginated<T> = {
  items: T[]
  page: number
  perPage: number
  total: number
}

/** Error body the API returns on a 4xx/5xx. */
export type ApiErrorBody = {
  message: string
  errors?: Record<string, string[]>
}
