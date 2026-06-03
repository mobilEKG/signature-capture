import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('Codex automation workflows', () => {
  it('matches Codex review authors by exact login instead of substring', () => {
    const workflow = readFileSync('.github/workflows/codex-auto-fix.yml', 'utf8')

    expect(workflow).not.toContain('includes("codex")')
    expect(workflow).toContain('codexReviewerLogins.has(reviewAuthor)')
  })
})
