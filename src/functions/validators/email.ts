// Deliberately permissive: the server is the real authority on whether an
// address exists. This only catches obvious typos before a request is sent.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}
