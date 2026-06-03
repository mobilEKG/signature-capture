export type CameraActionLabelKey =
  | 'select_camera'
  | 'start_camera'
  | 'stop_camera'

export type CameraActionIconClass =
  | 'ri-camera-switch-line'
  | 'ri-camera-line'
  | 'ri-camera-off-line'

interface CameraActionLabelInput {
  cameraCount: number
  hasStream: boolean
}

export function getCameraActionLabelKey({
  cameraCount,
  hasStream,
}: CameraActionLabelInput): CameraActionLabelKey {
  if (cameraCount > 1) {
    return 'select_camera'
  }

  return hasStream ? 'stop_camera' : 'start_camera'
}

export function getCameraActionIconClass({
  cameraCount,
  hasStream,
}: CameraActionLabelInput): CameraActionIconClass {
  if (cameraCount > 1) {
    return 'ri-camera-switch-line'
  }

  return hasStream ? 'ri-camera-off-line' : 'ri-camera-line'
}
