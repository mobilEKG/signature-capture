import { NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { useI18n } from '../core/i18n.tsx'
import type { Language } from '../core/i18n.tsx'

interface Props {
  links: { to: string; label: string }[]
  onClose: () => void
}

export default function MenuDrawer({ links, onClose }: Props) {
  const { t, lang, setLang } = useI18n()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        id="mobile-menu-drawer"
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex items-center justify-between">
          <h2 id="mobile-menu-title" className="drawer-title">
            {t('menu')}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="surface-button h-9 w-9"
            onClick={onClose}
            aria-label={t('close_menu')}
          >
            <i className="ri-close-line ri-lg"></i>
          </button>
        </div>

        <nav className="drawer-nav" aria-label={t('menu')}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `drawer-link ${
                  isActive
                    ? 'drawer-link-active'
                    : 'drawer-link-inactive'
                }`
              }
              onClick={onClose}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <select
          className="select-control w-full"
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          aria-label={t('language')}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="zh">中文</option>
        </select>
      </aside>
    </div>,
    document.body,
  )
}
