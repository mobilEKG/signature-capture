interface SignatureImageState {
  rawImageDataUrl: string | null
  processedImageDataUrl: string | null
}

export function getPreviewImageDataUrl({
  rawImageDataUrl,
  processedImageDataUrl,
}: SignatureImageState) {
  return processedImageDataUrl ?? rawImageDataUrl
}

export function getSavedImageDataUrl({
  processedImageDataUrl,
}: SignatureImageState) {
  return processedImageDataUrl
}
