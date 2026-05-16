import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from './Header.tsx'
import { Helmet } from 'react-helmet-async'
import { useI18n } from '../core/i18n.tsx'

export default function Layout() {
  const { lang, t } = useI18n()
  const [infoOpen, setInfoOpen] = useState(true)

  return (
    <div className="flex h-screen flex-col bg-metal overflow-hidden">
      <Helmet htmlAttributes={{ lang }} />
      <Header />
      <main className="app-main flex-grow overflow-y-auto pb-10 pt-2 sm:pb-12 sm:pt-3 lg:pb-10">
        <Outlet />
      </main>
      <div className="info-footer">
        <div
          className={`page-container relative ${infoOpen ? 'py-1' : 'py-1'}`}
          style={{ minHeight: infoOpen ? '30px' : '24px' }}
        >
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className="info-toggle"
            aria-label={infoOpen ? 'Hide info' : 'Show info'}
          >
            <i className={`ri-${infoOpen ? 'arrow-down-s-line' : 'arrow-up-s-line'} ri-lg`}></i>
          </button>
          {infoOpen && (
            <section>
              <p className="info-text">
                {t('home_footer_1')} {t('home_footer_read')}
                <Link to="/privacy" className="underline">
                  {t('home_footer_privacy')}
                </Link>
                {t('home_footer_and')}
                <Link to="/about" className="underline">
                  {t('home_footer_about')}
                </Link>
                {t('period_sign')}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
