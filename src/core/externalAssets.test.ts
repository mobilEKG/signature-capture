import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('external assets', () => {
  it('does not load third-party stylesheets in the app shell', () => {
    const html = readFileSync('index.html', 'utf8')
    const css = readFileSync('src/index.css', 'utf8')

    expect(html).not.toMatch(/https:\/\/cdn\.jsdelivr\.net/)
    expect(css).not.toMatch(/https:\/\/fonts\.googleapis\.com/)
  })
})
