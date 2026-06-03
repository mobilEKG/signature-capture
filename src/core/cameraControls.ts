export type CameraActionLabelKey =
  | 'select_camera'
  | 'start_camera'
  | 'stop_camera'

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
