import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import AppProviders from '@/app/providers'
// Relative on purpose: the entry stylesheet sits next to this file, and this
// import must resolve even before the '@' alias is in play.
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
