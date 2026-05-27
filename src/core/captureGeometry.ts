export interface PreviewRect {
  width: number
  height: number
  x: number
  y: number
}

export interface CaptureGeometry {
  sourceX: number
  sourceY: number
  sourceWidth: number
  sourceHeight: number
  outputWidth: number
  outputHeight: number
}

interface CaptureGeometryInput {
  clientWidth: number
  clientHeight: number
  videoWidth: number
  videoHeight: number
  previewRect: PreviewRect
  isMirrored: boolean
}

const isPositiveFinite = (value: number) => Number.isFinite(value) && value > 0

export function getCaptureGeometry({
  clientWidth,
  clientHeight,
  videoWidth,
  videoHeight,
  previewRect,
  isMirrored,
}: CaptureGeometryInput): CaptureGeometry | null {
  if (
    !isPositiveFinite(clientWidth) ||
    !isPositiveFinite(clientHeight) ||
    !isPositiveFinite(videoWidth) ||
    !isPositiveFinite(videoHeight) ||
    !isPositiveFinite(previewRect.width) ||
    !isPositiveFinite(previewRect.height)
  ) {
    return null
  }

  const scale = Math.max(clientWidth / videoWidth, clientHeight / videoHeight)
  if (!isPositiveFinite(scale)) {
    return null
  }

  const renderedWidth = videoWidth * scale
  const renderedHeight = videoHeight * scale
  const offsetX = (clientWidth - renderedWidth) / 2
  const offsetY = (clientHeight - renderedHeight) / 2

  const sourceWidth = previewRect.width / scale
  const sourceHeight = previewRect.height / scale
  const sourceY = (previewRect.y - offsetY) / scale
  const unmirroredSourceX = (previewRect.x - offsetX) / scale
  const sourceX = isMirrored
    ? videoWidth - unmirroredSourceX - sourceWidth
    : unmirroredSourceX

  const outputScale = 1 / scale
  const outputWidth = Math.round(previewRect.width * outputScale)
  const outputHeight = Math.round(previewRect.height * outputScale)

  if (
    !isPositiveFinite(sourceWidth) ||
    !isPositiveFinite(sourceHeight) ||
    !isPositiveFinite(outputWidth) ||
    !isPositiveFinite(outputHeight)
  ) {
    return null
  }

  return {
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    outputWidth,
    outputHeight,
  }
}
