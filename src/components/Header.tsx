import { Link, NavLink } from 'react-router-dom'
import { useCallback, useState } from 'react'
import MenuDrawer from './MenuDrawer.tsx'
import { useI18n } from '../core/i18n.tsx'
import type { Language } from '../core/i18n.tsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useI18n()
  const openMenu = useCallback(() => setOpen(true), [])
  const closeMenu = useCallback(() => setOpen(false), [])

  const links = [
    { to: '/', label: t('capture') },
    { to: '/instructions', label: t('instructions') },
    { to: '/faq', label: t('faq') },
    { to: '/about', label: t('about') },
    { to: '/privacy', label: t('privacy') },
  ]

  return (
    <header className="app-header">
      <div className="page-container flex h-14 items-center justify-between">
        <Link to="/" className="brand-link">
          <span className="brand-mark">
            <img src="/icons/app-icon.svg" alt="" className="h-8 w-8" />
          </span>
          <span className="brand-title">Signature Capture</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <select
          className="select-control hidden md:block"
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          aria-label={t('language')}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="zh">中文</option>
        </select>
        <button
          type="button"
          className="surface-button h-10 w-10 md:hidden"
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu-drawer"
        >
          <i className="ri-menu-line ri-lg" aria-hidden="true"></i>
        </button>
        {open && <MenuDrawer links={links} onClose={closeMenu} />}
      </div>
    </header>
  )
}
