import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const targetTitle = 'Free Signature Background Remover | Transparent PNG, No Upload'
const targetDescription =
  'Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload.'

describe('SEO positioning copy', () => {
  it('uses the reviewed signature background remover positioning in metadata sources', () => {
    const index = readFileSync('index.html', 'utf8')
    const capture = readFileSync('src/pages/Capture.tsx', 'utf8')
    const prerender = readFileSync('scripts/prerender-static-routes.mjs', 'utf8')

    for (const source of [index, capture, prerender]) {
      expect(source).toContain(targetTitle)
      expect(source).toContain(targetDescription)
    }
  })

  it('uses the reviewed positioning in the README heading and opening copy', () => {
    const readme = readFileSync('README.md', 'utf8')

    expect(readme).toContain(
      '# Signature Capture: Free Open Source Signature Background Remover',
    )
    expect(readme).toContain(
      'Free open source browser app for removing the paper background from a handwritten signature and saving it as a transparent PNG.',
    )
  })

  it('renders crawlable homepage copy for the reviewed long-tail queries', () => {
    const capture = readFileSync('src/pages/Capture.tsx', 'utf8')
    const i18n = readFileSync('src/core/i18n.tsx', 'utf8')
    const prerender = readFileSync('scripts/prerender-static-routes.mjs', 'utf8')

    expect(capture).toContain('homeSeoCards.map')
    expect(capture).toContain('className="h-full min-h-full"')
    expect(prerender).toContain('data-prerendered-home-seo')
    expect(prerender).toContain('renderBody(renderHead(template, route), route)')

    for (const key of [
      'home_seo_heading',
      'home_seo_remove_background',
      'home_seo_transparent_png',
      'home_seo_no_upload',
    ]) {
      expect(capture).toContain(key)
      expect(i18n).toContain(`${key}:`)
    }

    for (const copy of [
      'Free signature background remover',
      'Remove the white paper background',
      'Download a transparent PNG',
      'Signature images are processed locally in your browser.',
    ]) {
      expect(prerender).toContain(copy)
    }
  })

  it('includes FAQ entries for reviewed signature background remover searches', () => {
    const faq = readFileSync('src/pages/FAQ.tsx', 'utf8')
    const i18n = readFileSync('src/core/i18n.tsx', 'utf8')
    const prerender = readFileSync('scripts/prerender-static-routes.mjs', 'utf8')

    for (const key of [
      'faq_q_remove_white_background',
      'faq_q_make_transparent',
      'faq_q_use_in_documents',
      'faq_q_digital_signature',
    ]) {
      expect(faq).toContain(`t('${key}')`)
      expect(i18n).toContain(`${key}:`)
    }

    expect(faq).toContain("'@type': 'FAQPage'")
    expect(prerender).toContain("'@type': 'FAQPage'")
    expect(prerender).toContain('data-prerendered-faq')
    expect(prerender).toContain('renderFAQBody()')
  })

  it('localizes the new SEO and FAQ copy in every supported language', () => {
    const i18n = readFileSync('src/core/i18n.tsx', 'utf8')

    for (const lang of ['en', 'es', 'fr', 'zh']) {
      const block = i18n.match(new RegExp(String.raw`\n  ${lang}: \{([\s\S]*?)\n  \}`))?.[1]
      expect(block, `${lang} translation block`).toBeTruthy()

      for (const key of [
        'home_seo_heading',
        'home_seo_intro',
        'home_seo_steps_heading',
        'home_seo_capture_title',
        'home_seo_capture_body',
        'home_seo_remove_background',
        'home_seo_remove_background_body',
        'home_seo_transparent_png',
        'home_seo_transparent_png_body',
        'home_seo_no_upload',
        'home_seo_no_upload_body',
        'faq_q_remove_white_background',
        'faq_a_remove_white_background',
        'faq_q_make_transparent',
        'faq_a_make_transparent',
        'faq_q_use_in_documents',
        'faq_a_use_in_documents',
        'faq_q_digital_signature',
        'faq_a_digital_signature',
      ]) {
        expect(block, `${lang} has ${key}`).toContain(`${key}:`)
      }
    }
  })
})
