import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('PWA install guidance copy', () => {
  const instructionsPage = readFileSync('src/pages/Instructions.tsx', 'utf8')
  const faqPage = readFileSync('src/pages/FAQ.tsx', 'utf8')
  const i18n = readFileSync('src/core/i18n.tsx', 'utf8')

  it('surfaces Android and iOS home screen install instructions', () => {
    expect(instructionsPage).toContain('instructions_pwa_heading')
    expect(instructionsPage).toContain('instructions_pwa_android')
    expect(instructionsPage).toContain('instructions_pwa_ios')
    expect(faqPage).toContain('faq_q_install')
    expect(faqPage).toContain('faq_a_install')
    expect(i18n).toContain('Android 10+')
    expect(i18n).toContain('iOS/iPadOS 16.4+')
    expect(i18n).toContain('iPhone')
    expect(i18n).toContain('Add to Home Screen')
    expect(i18n).toContain('HTTPS')
    expect(i18n).toContain('web app manifest')
    expect(i18n).toContain('service worker')
    expect(i18n).toContain('camera permission')
  })
})
