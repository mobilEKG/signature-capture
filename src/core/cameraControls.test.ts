import { describe, expect, it } from 'vitest'
import { getCameraActionLabelKey } from './cameraControls.ts'

describe('camera action accessibility label', () => {
  it('announces camera selection when multiple cameras are available', () => {
    expect(
      getCameraActionLabelKey({ cameraCount: 2, hasStream: false }),
    ).toBe('select_camera')
    expect(
      getCameraActionLabelKey({ cameraCount: 2, hasStream: true }),
    ).toBe('select_camera')
  })

  it('announces start or stop when there is no camera picker action', () => {
    expect(
      getCameraActionLabelKey({ cameraCount: 1, hasStream: false }),
    ).toBe('start_camera')
    expect(
      getCameraActionLabelKey({ cameraCount: 1, hasStream: true }),
    ).toBe('stop_camera')
  })
})
