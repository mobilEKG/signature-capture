import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('capture control accessibility', () => {
  const source = readFileSync('src/components/SignatureCapture.tsx', 'utf8')

  it('keeps icon-only capture controls accessible when mobile CSS hides visible labels', () => {
    for (const key of ['capture_btn', 'clean', 'save']) {
      expect(source).toContain(`aria-label={t('${key}')}`)
    }
  })

  it('renders a persistent camera permission recovery message', () => {
    expect(source).toContain('cameraErrorMessage')
    expect(source).toContain('camera_permission_denied')
    expect(source).toContain('camera_retry')
  })
})
