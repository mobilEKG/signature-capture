import { describe, expect, it } from 'vitest'
import {
  getCameraActionIconClass,
  getCameraActionLabelKey,
} from './cameraControls.ts'

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

  it('uses a distinct icon for every camera action', () => {
    expect(
      getCameraActionIconClass({ cameraCount: 2, hasStream: true }),
    ).toBe('ri-camera-switch-line')
    expect(
      getCameraActionIconClass({ cameraCount: 1, hasStream: false }),
    ).toBe('ri-camera-line')
    expect(
      getCameraActionIconClass({ cameraCount: 1, hasStream: true }),
    ).toBe('ri-camera-off-line')
  })
})
