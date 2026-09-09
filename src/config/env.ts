/**
 * Single, typed entry point for environment variables. Import `env` instead of
 * reading `import.meta.env` around the codebase so a missing or renamed
 * variable fails in one obvious place.
 */
function required(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const env = {
  apiUrl: required(
    import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
    'VITE_API_URL',
  ),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
