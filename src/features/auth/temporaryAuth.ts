import type { LoginResponse } from './types'

/**
 * TEMPORARY SCAFFOLDING - remove when POST /auth/login exists.
 *
 * With this on, the Login button signs the user in immediately: no email, no
 * password, no request. It exists so the authenticated screens can be built
 * and reviewed before the API is ready.
 *
 * To remove: set this to false (or delete this file) and drop the branch it
 * guards at the top of `LoginForm`'s submit handler. Nothing else depends on it.
 */
export const BYPASS_LOGIN = true

export function createTemporarySession(email: string): LoginResponse {
  const name = email.includes('@') ? email.split('@')[0] : email.trim()

  return {
    token: 'temporary-local-session',
    user: {
      id: 'temporary-user',
      name: name || 'Traveller',
      email: email.trim() || 'traveller@findspot.test',
    },
  }
}
