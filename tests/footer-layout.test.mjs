import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('footer layout', () => {
  it('keeps the footer toggle within the footer height', () => {
    const css = readFileSync('src/index.css', 'utf8')
    const layout = readFileSync('src/components/Layout.tsx', 'utf8')

    expect(layout).toContain("minHeight: infoOpen ? '36px' : '32px'")
    expect(css).toContain('@apply absolute right-3 top-1/2')
    expect(css).toContain('-translate-y-1/2')
  })
})
