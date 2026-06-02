import { describe, expect, it } from 'vitest'
import { getPreviewImageDataUrl, getSavedImageDataUrl } from './signatureState.ts'

describe('signature image state helpers', () => {
  it('shows the raw capture while no cleaned image exists', () => {
    expect(
      getPreviewImageDataUrl({
        rawImageDataUrl: 'data:image/png;base64,raw',
        processedImageDataUrl: null,
      }),
    ).toBe('data:image/png;base64,raw')
  })

  it('does not treat the raw preview as a saved transparent PNG', () => {
    expect(
      getSavedImageDataUrl({
        rawImageDataUrl: 'data:image/png;base64,raw',
        processedImageDataUrl: null,
      }),
    ).toBeNull()
  })

  it('prefers the cleaned image for preview and save when available', () => {
    const state = {
      rawImageDataUrl: 'data:image/png;base64,raw',
      processedImageDataUrl: 'data:image/png;base64,processed',
    }

    expect(getPreviewImageDataUrl(state)).toBe('data:image/png;base64,processed')
    expect(getSavedImageDataUrl(state)).toBe('data:image/png;base64,processed')
  })
})
