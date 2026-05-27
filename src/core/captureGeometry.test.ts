import { describe, expect, it } from 'vitest'
import { getCaptureGeometry } from './captureGeometry.ts'

const previewRect = {
  width: 300,
  height: 100,
  x: 50,
  y: 25,
}

describe('getCaptureGeometry', () => {
  it('returns null until video metadata is available', () => {
    expect(
      getCaptureGeometry({
        clientWidth: 400,
        clientHeight: 300,
        videoWidth: 0,
        videoHeight: 0,
        previewRect,
        isMirrored: false,
      }),
    ).toBeNull()
  })

  it('maps the visible preview rectangle back to source pixels', () => {
    expect(
      getCaptureGeometry({
        clientWidth: 400,
        clientHeight: 300,
        videoWidth: 800,
        videoHeight: 600,
        previewRect,
        isMirrored: false,
      }),
    ).toEqual({
      sourceX: 100,
      sourceY: 50,
      sourceWidth: 600,
      sourceHeight: 200,
      outputWidth: 600,
      outputHeight: 200,
    })
  })

  it('mirrors the source x coordinate for mirrored previews', () => {
    expect(
      getCaptureGeometry({
        clientWidth: 400,
        clientHeight: 300,
        videoWidth: 800,
        videoHeight: 600,
        previewRect,
        isMirrored: true,
      })?.sourceX,
    ).toBe(100)
  })
})
