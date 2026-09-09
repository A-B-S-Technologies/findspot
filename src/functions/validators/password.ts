export const MIN_PASSWORD_LENGTH = 8

export function isLongEnough(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH
}

export function passwordsMatch(password: string, confirmation: string): boolean {
  return password.length > 0 && password === confirmation
}
