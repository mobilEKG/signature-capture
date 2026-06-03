import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const filesWithRemixIcons = [
  'src/components/Header.tsx',
  'src/components/Layout.tsx',
  'src/components/MenuDrawer.tsx',
  'src/components/SignatureCapture.tsx',
  'src/pages/Instructions.tsx',
]

describe('decorative Remix icons', () => {
  it('hides icon font glyphs from assistive technology', () => {
    const missingAriaHidden = filesWithRemixIcons.flatMap((file) => {
      const source = readFileSync(file, 'utf8')
      const iconTags = source.match(/<i\b[\s\S]*?>/g) ?? []

      return iconTags
        .filter((tag) => tag.includes('ri-'))
        .filter((tag) => !tag.includes('aria-hidden="true"'))
        .map((tag) => `${file}: ${tag}`)
    })

    expect(missingAriaHidden).toEqual([])
  })
})
