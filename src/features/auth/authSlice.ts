import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { STORAGE_KEYS } from '@/constants'
import { storage } from '@/functions'
import type { AuthUser, LoginResponse } from './types'

type AuthState = {
  user: AuthUser | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  // Survives a refresh; `baseApi` reads the same key when signing requests.
  token: storage.get(STORAGE_KEYS.authToken),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    credentialsReceived(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    loggedOut(state) {
      state.user = null
      state.token = null
    },
  },
})

export const { credentialsReceived, loggedOut } = authSlice.actions

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token)

export const authReducer = authSlice.reducer
