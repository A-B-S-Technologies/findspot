/**
 * Single, typed entry point for environment variables. Import `env` instead of
 * reading `import.meta.env` around the codebase, so a renamed or missing
 * variable is dealt with in one obvious place.
 *
 * Nothing here throws today: there is no API to point at yet, so a missing
 * `VITE_API_URL` falls back to a local default rather than taking the whole
 * app down at startup. Bring the hard check back when the backend is real and
 * a wrong base URL should stop a deploy — see `.env.example`.
 */

// `||` rather than `??` on purpose: an empty value in a `.env` file should
// fall back too, not sail through as a blank base URL.
const DEFAULT_API_URL = 'http://localhost:8000/api'

export const env = {
  apiUrl: import.meta.env.VITE_API_URL || DEFAULT_API_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
