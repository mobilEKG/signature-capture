import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { installCloudflareAnalytics } from './core/analytics.ts'
import { I18nProvider } from './core/i18n.tsx'

installCloudflareAnalytics({
  token: import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
)
