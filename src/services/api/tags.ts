/**
 * Cache tags every endpoint uses to describe what it reads and invalidates.
 * Declared once so a typo becomes a type error instead of a stale cache.
 */
export const API_TAGS = ['Spot', 'Review', 'User'] as const

export type ApiTag = (typeof API_TAGS)[number]
