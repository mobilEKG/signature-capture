import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './core/i18n.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </I18nProvider>
  </StrictMode>
)
