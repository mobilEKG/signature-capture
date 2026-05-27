import { describe, expect, it, vi } from 'vitest'
import { replaceVideoStream, stopMediaStream } from './mediaStreams.ts'

const createStream = (stops: ReturnType<typeof vi.fn>[]) =>
  ({
    getTracks: () => stops.map((stop) => ({ stop })),
  }) as unknown as MediaStream

describe('media stream helpers', () => {
  it('stops every track in a stream', () => {
    const stops = [vi.fn(), vi.fn()]

    stopMediaStream(createStream(stops))

    expect(stops[0]).toHaveBeenCalledTimes(1)
    expect(stops[1]).toHaveBeenCalledTimes(1)
  })

  it('stops the previous stream before assigning the next stream', () => {
    const previousStops = [vi.fn(), vi.fn()]
    const previous = createStream(previousStops)
    const next = createStream([vi.fn()])
    const video = { srcObject: previous as MediaStream | null }

    const current = replaceVideoStream(video, previous, next)

    expect(current).toBe(next)
    expect(video.srcObject).toBe(next)
    expect(previousStops[0]).toHaveBeenCalledTimes(1)
    expect(previousStops[1]).toHaveBeenCalledTimes(1)
  })

  it('does not stop the next stream when replacing itself', () => {
    const stops = [vi.fn()]
    const stream = createStream(stops)
    const video = { srcObject: stream as MediaStream | null }

    replaceVideoStream(video, stream, stream)

    expect(stops[0]).not.toHaveBeenCalled()
  })
})
