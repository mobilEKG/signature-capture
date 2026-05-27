interface VideoStreamTarget {
  srcObject: MediaProvider | null
}

export function stopMediaStream(stream: MediaStream | null | undefined) {
  stream?.getTracks().forEach((track) => track.stop())
}

export function replaceVideoStream(
  video: VideoStreamTarget | null,
  previous: MediaStream | null,
  next: MediaStream,
) {
  if (previous !== next) {
    stopMediaStream(previous)
  }

  if (video) {
    video.srcObject = next
  }

  return next
}

export function clearVideoStream(
  video: VideoStreamTarget | null,
  previous: MediaStream | null,
) {
  stopMediaStream(previous)

  if (video) {
    video.srcObject = null
  }

  return null
}
