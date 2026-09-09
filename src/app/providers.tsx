import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

/**
 * Every app-wide provider goes here (store today; a router, theme or query
 * client later) so `main.tsx` stays a one-liner.
 */
function AppProviders({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

export default AppProviders
