export type AuthUser = {
  id: string
  name: string
  email: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: AuthUser
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type ForgotPasswordPayload = {
  email: string
}

export type ResetPasswordPayload = {
  token: string
  password: string
}

/** Which panel the account popover is showing. */
export type AuthView =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'verification-sent'
  | 'reset-password'
