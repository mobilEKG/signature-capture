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
})
