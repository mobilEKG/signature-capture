import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('localized accessibility labels', () => {
  it('localizes the mobile menu and footer toggle labels', () => {
    const header = readFileSync('src/components/Header.tsx', 'utf8')
    const layout = readFileSync('src/components/Layout.tsx', 'utf8')
    const i18n = readFileSync('src/core/i18n.tsx', 'utf8')

    expect(header).toContain("aria-label={t('open_menu')}")
    expect(layout).toContain("aria-label={infoOpen ? t('hide_info') : t('show_info')}")

    for (const key of ['open_menu', 'hide_info', 'show_info']) {
      expect(i18n.match(new RegExp(`${key}:`, 'g'))).toHaveLength(4)
    }
  })
})
