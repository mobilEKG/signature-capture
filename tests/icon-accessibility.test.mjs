import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
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

  it('keeps every source icon in the optimized font subset', () => {
    const sourceFiles = collectSourceFiles('src')
      .filter((file) => file !== 'src/remixicon-subset.css')
    const usedIconClasses = new Set()

    for (const file of sourceFiles) {
      const source = readFileSync(file, 'utf8')
      for (const match of source.matchAll(/\b(ri-[a-z0-9-]+)\b/g)) {
        if (match[1] !== 'ri-lg') usedIconClasses.add(match[1])
      }
    }

    const subset = readFileSync('src/remixicon-subset.css', 'utf8')
    const missing = [...usedIconClasses]
      .filter((iconClass) => !subset.includes(`.${iconClass}:before`))
      .sort()

    expect(missing).toEqual([])
  })
})

function collectSourceFiles(directory) {
  return readdirSync(directory, { recursive: true })
    .map((entry) => join(directory, entry.toString()))
    .filter((file) => statSync(file).isFile())
    .filter((file) => /\.(css|ts|tsx)$/.test(file))
}
