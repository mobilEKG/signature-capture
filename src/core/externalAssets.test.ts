import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('external assets', () => {
  it('does not load third-party stylesheets in the app shell', () => {
    const html = readFileSync('index.html', 'utf8')
    const css = readFileSync('src/index.css', 'utf8')

    expect(html).not.toMatch(/https:\/\/cdn\.jsdelivr\.net/)
    expect(css).not.toMatch(/https:\/\/fonts\.googleapis\.com/)
  })

  it('does not hard-code Cloudflare Web Analytics into every app shell', () => {
    const html = readFileSync('index.html', 'utf8')

    expect(html).not.toContain('static.cloudflareinsights.com/beacon.min.js')
    expect(html).not.toContain('e90178fe80504cbf86325251a58668c1')
  })

  it('discloses Cloudflare Web Analytics in the privacy copy', () => {
    const i18n = readFileSync('src/core/i18n.tsx', 'utf8')
    const privacyPage = readFileSync('src/pages/Privacy.tsx', 'utf8')

    expect(i18n.match(/privacy_analytics:/g)).toHaveLength(4)
    expect(i18n).toContain('Cloudflare Web Analytics')
    expect(privacyPage).toContain("t('privacy_analytics')")
  })
})
