import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { useI18n } from '../core/i18n.tsx'
import { copyPngDataUrlToClipboard } from '../core/clipboard.ts'
import { getCaptureGeometry } from '../core/captureGeometry.ts'
import { processSignatureImage } from '../core/imageProcessing.ts'
import {
  getPreviewImageDataUrl,
  getSavedImageDataUrl,
} from '../core/signatureState.ts'
import {
  clearVideoStream,
  replaceVideoStream,
  stopMediaStream,
} from '../core/mediaStreams.ts'

// Width-to-height ratio for the signature frame
const SIGNATURE_RECT_RATIO = 3 // 3:1 by default
const INITIAL_PREVIEW_Y = 10 // distance from top of the video in pixels
const GUIDE_BORDER = 2 // width of the dashed guide outline in pixels

function SignatureCapture() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buttonRowRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLSelectElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const { t } = useI18n()
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [rawImage, setRawImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [previewRect, setPreviewRect] = useState({
    width: 256,
    height: 128,
    x: 0,
    y: 0,
  })
  const [videoHeight, setVideoHeight] = useState(0)
  const [videoWidth, setVideoWidth] = useState(0)
  const [videoReady, setVideoReady] = useState(false)
  const [buttonHeight, setButtonHeight] = useState(0)
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('')
  const [isMirrored, setIsMirrored] = useState(true)
  const [selectOpen, setSelectOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [cameraErrorKey, setCameraErrorKey] = useState<string | null>(null)
  const toastTimeout = useRef<number | null>(null)
  const autoToastShown = useRef(false)
  const overlayGap = videoWidth < 640 ? 4 : 6
  const cameraErrorMessage = cameraErrorKey ? t(cameraErrorKey) : null

  const showToast = (message: string, timeout: number = 1500) => {
    setToastMessage(message)
    if (toastTimeout.current) {
      window.clearTimeout(toastTimeout.current)
    }
    toastTimeout.current = window.setTimeout(() => setToastMessage(null), timeout)
  }

  /** Returns a single MediaDeviceInfo object:
   * Prefer rear cameras when present, otherwise fall back to a front camera
   * or the first available device. Auxiliary lenses (macro, depth, etc.) are
   * ignored since they often return unusable frames.
   */
  const chooseDefaultDevice = (videos: MediaDeviceInfo[]) => {
    const skip = /(depth|tele|macro|bokeh|aux)/i
    const rear = videos.find(
      (d) => /back|rear|environment/i.test(d.label) && !skip.test(d.label),
    )
    if (rear) return rear
    const front = videos.find(
      (d) => /front|user|face/i.test(d.label) && !skip.test(d.label),
    )
    return front || videos.find((d) => !skip.test(d.label)) || videos[0]
  }

  /**
   * Inspect camera capabilities and pick the best option for close up text
   * capture. Mobile platforms simply prefer the primary rear camera (or front
   * if no rear exists). Desktop platforms open each candidate briefly and
   * score based on focus distance and maximum resolution.
   */
  const chooseBestCamera = async (
    videos: MediaDeviceInfo[],
  ): Promise<MediaDeviceInfo> => {
    const skip = /(depth|tele|macro|bokeh|aux)/i
    const cleaned = videos.filter((d) => !skip.test(d.label))

    const nav = navigator as Navigator & {
      userAgentData?: { mobile?: boolean }
    }
    const isMobile =
      nav.userAgentData?.mobile ||
      /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent)

    if (isMobile) {
      const rear = cleaned.find((d) => /back|rear|environment/i.test(d.label))
      if (rear) return rear
      const front = cleaned.find((d) => /front|user|face/i.test(d.label))
      return front || cleaned[0] || videos[0]
    }

    type Candidate = { device: MediaDeviceInfo; score: number }
    const candidates: Candidate[] = []
    for (const device of cleaned) {
      let s: MediaStream | null = null
      try {
        s = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: device.deviceId } },
        })
        const track = s.getVideoTracks()[0]
        const caps = track.getCapabilities() as MediaTrackCapabilities & {
          focusDistance?: { min: number }
          width?: { max: number }
        }
        const focusScore =
          caps.focusDistance && typeof caps.focusDistance.min === 'number'
            ? -caps.focusDistance.min
            : 0
        const resScore =
          caps.width && typeof caps.width.max === 'number'
            ? caps.width.max / 1000
            : 0
        const score = focusScore + resScore
        candidates.push({ device, score })
      } catch (err) {
        console.error('Capability check failed', err)
      } finally {
        s?.getTracks().forEach((t) => t.stop())
      }
    }

    candidates.sort((a, b) => b.score - a.score)
    return candidates[0]?.device || cleaned[0] || videos[0]
  }

  /**
   * Request access to the user's webcam and start the video stream.
   */
  const startStream = async (deviceId?: string) => {
    const constraints = deviceId
      ? { video: { deviceId } }
      : { video: { facingMode: { ideal: 'environment' } } }
    setVideoReady(false)
    const s = await navigator.mediaDevices.getUserMedia(constraints)
    streamRef.current = replaceVideoStream(videoRef.current, streamRef.current, s)
    const track = s.getVideoTracks()[0]
    const facing = track.getSettings().facingMode
    setIsMirrored(facing !== 'environment')
    setStream(s)
  }

  const startCamera = async (deviceId?: string) => {
    try {
      setCameraErrorKey(null)
      const idToUse = deviceId ?? selectedDeviceId
      await startStream(idToUse || undefined)

      // Refresh device list after camera permission has been granted
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videos = devices.filter((d) => d.kind === 'videoinput')
      setVideoDevices(videos)

      if (deviceId) {
        setSelectedDeviceId(deviceId)
      }

      if (!deviceId && !selectedDeviceId && videos[0]) {
        const preferred = await chooseBestCamera(videos)
        setSelectedDeviceId(preferred.deviceId)
        await startStream(preferred.deviceId)
        if (!autoToastShown.current) {
          autoToastShown.current = true
          showToast(t('camera_selected_message'), 3000)
        }
      }
    } catch (err) {
      console.error(err)
      setCameraErrorKey('camera_permission_denied')
    }
  }

  /** Stop all webcam tracks */
  const stopCamera = () => {
    streamRef.current = clearVideoStream(videoRef.current, streamRef.current)
    setVideoReady(false)
    setStream(null)
    dropdownRef.current?.blur()
  }

  /** Handle click on the camera toggle/select icon */
  const handleCameraButtonClick = async () => {
    if (videoDevices.length > 1) {
      setSelectOpen(true)
    } else if (stream) {
      stopCamera()
    } else {
      await startCamera()
    }
  }

  // Automatically start the camera on mount
  useEffect(() => {
    startCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load available video devices
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videos = devices.filter((d) => d.kind === 'videoinput')
        setVideoDevices(videos)
        if (!selectedDeviceId && videos[0]) {
          const preferred = chooseDefaultDevice(videos)
          setSelectedDeviceId(preferred.deviceId)
        }
      } catch (err) {
        console.error(err)
      }
    }
    loadDevices()
  }, [selectedDeviceId])

  // Stop the camera when the component unmounts
  useEffect(() => {
    return () => {
      stopMediaStream(streamRef.current)
      streamRef.current = null
    }
  }, [])

  // Keep the preview area in sync with the overlay size
  useEffect(() => {
    const updateRect = () => {
      const video = videoRef.current
      if (!video) return
      setVideoReady(video.videoWidth > 0 && video.videoHeight > 0)
      const visibleStageWidth =
        video.closest<HTMLElement>('.capture-shell')?.clientWidth ||
        video.parentElement?.clientWidth ||
        video.clientWidth
      const vw = Math.min(video.clientWidth, visibleStageWidth)
      const vh = video.clientHeight
      setVideoHeight(vh)
      setVideoWidth(vw)
      const isMobilePortrait = window.matchMedia(
        '(max-width: 640px) and (orientation: portrait)',
      ).matches
      const isTabletOrDesktop = window.matchMedia('(min-width: 768px)').matches
      const widthPercent = isMobilePortrait ? 0.82 : isTabletOrDesktop ? 0.78 : 0.78
      const width = vw * widthPercent
      const height = width / SIGNATURE_RECT_RATIO

      const x = Math.max(0, (vw - width) / 2)
      const y = isMobilePortrait ? 8 : INITIAL_PREVIEW_Y

      setPreviewRect({ width, height, x, y })
    }
    const video = videoRef.current
    updateRect()
    video?.addEventListener('loadedmetadata', updateRect)
    window.addEventListener('resize', updateRect)
    return () => {
      video?.removeEventListener('loadedmetadata', updateRect)
      window.removeEventListener('resize', updateRect)
    }
  }, [buttonHeight, overlayGap, stream])

  // Measure button row height to keep vertical spacing consistent
  useLayoutEffect(() => {
    const updateHeight = () => {
      setButtonHeight(buttonRowRef.current?.offsetHeight ?? 0)
      setVideoHeight(videoRef.current?.clientHeight ?? 0)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  // When the camera selector is shown, automatically open the dropdown
  useEffect(() => {
    if (!selectOpen) return
    const el = dropdownRef.current
    if (!el) return
    el.focus()
    const withPicker = el as HTMLSelectElement & {
      showPicker?: () => void
    }
    if (typeof withPicker.showPicker === 'function') {
      withPicker.showPicker()
    } else {
      el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    }
  }, [selectOpen])

  /**
   * Grab a frame from the video element and store it in the hidden canvas.
   */
  const capture = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const geometry = getCaptureGeometry({
      clientWidth: video.clientWidth,
      clientHeight: video.clientHeight,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      previewRect,
      isMirrored,
    })

    if (!geometry) {
      showToast(t('camera_not_ready'))
      return
    }

    canvas.width = geometry.outputWidth
    canvas.height = geometry.outputHeight
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!
    ctx.drawImage(
      video,
      geometry.sourceX,
      geometry.sourceY,
      geometry.sourceWidth,
      geometry.sourceHeight,
      0,
      0,
      geometry.outputWidth,
      geometry.outputHeight,
    )
    // Save the captured frame so the user can process or download it
    const dataURL = canvas.toDataURL('image/png')
    setRawImage(dataURL)
    setProcessedImage(null)
  }

  // Image processing function imported from core module
  const copyToClipboard = async (dataUrl: string, notify = true) => {
    const copied = await copyPngDataUrlToClipboard(dataUrl)
    if (notify) {
      showToast(copied ? t('signature_copied') : t('signature_clipboard_unavailable'))
    }
    return copied
  }

  const timestampFilename = () => {
    const now = new Date()
    const pad = (value: number) => String(value).padStart(2, '0')
    return [
      'signature_',
      now.getFullYear(),
      '-',
      pad(now.getMonth() + 1),
      '-',
      pad(now.getDate()),
      'T',
      pad(now.getHours()),
      ':',
      pad(now.getMinutes()),
      ':',
      pad(now.getSeconds()),
      '.png',
    ].join('')
  }

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = timestampFilename()
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const processRawSignature = () =>
    new Promise<string>((resolve, reject) => {
      const canvas = canvasRef.current
      if (!canvas || !rawImage) {
        reject(new Error('No captured image to process'))
        return
      }

      const ctx = canvas.getContext('2d', { willReadFrequently: true })!
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        resolve(processSignatureImage(ctx, canvas.width, canvas.height))
      }
      img.onerror = () => reject(new Error('Could not load captured image'))
      img.src = rawImage
    })

  const abstractSignature = async () => {
    if (!rawImage) return
    const processedDataURL = await processRawSignature()
    setProcessedImage(processedDataURL)
    await copyToClipboard(processedDataURL)
  }

  const saveSignature = async () => {
    if (!rawImage) return
    const processedDataURL =
      getSavedImageDataUrl({
        rawImageDataUrl: rawImage,
        processedImageDataUrl: processedImage,
      }) ?? (await processRawSignature())
    setProcessedImage(processedDataURL)
    const copied = await copyToClipboard(processedDataURL, false)
    downloadImage(processedDataURL)
    showToast(
      copied ? t('signature_saved_and_copied') : t('signature_saved'),
      2400,
    )
  }

  // Common button styling utility classes
  const buttonBase =
    'btn btn-metal h-9 w-9 justify-center sm:w-auto sm:min-w-[104px] gap-2 px-0 sm:px-4 whitespace-nowrap lg:h-9';

  const requiredOverlayHeight =
    previewRect.y +
    previewRect.height * 2 +
    GUIDE_BORDER * 2 +
    buttonHeight +
    overlayGap * 2
  const bottomPadding = Math.max(0, requiredOverlayHeight - videoHeight)

  const rightOverlayWidth = Math.max(0, videoWidth - (previewRect.x + previewRect.width))
  const bottomOverlayHeight = Math.max(0, videoHeight - (previewRect.y + previewRect.height))
  const previewImage = getPreviewImageDataUrl({
    rawImageDataUrl: rawImage,
    processedImageDataUrl: processedImage,
  })
  const canCapture = Boolean(stream && videoReady)
  
  return (
    <div className="page-container capture-page relative flex h-full flex-col items-center">
      {/* Main Content */}
      <div className="w-full flex-grow">
        <div className="capture-shell">
            {toastMessage && (
              <div className="capture-toast-anchor">
                <div className="capture-toast">{toastMessage}</div>
              </div>
            )}
            {/* Video Preview */}
            <div
              ref={stageRef}
              className="capture-stage"
              style={{
                paddingBottom: bottomPadding,
                minHeight: requiredOverlayHeight,
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`capture-video ${
                  isMirrored ? 'transform scale-x-[-1]' : ''
                }`}
              />
              {/* Blur overlays around the signature box */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div
                  className="capture-scrim inset-x-0 top-0"
                  style={{ height: previewRect.y }}
                />
                <div
                  className="capture-scrim left-0"
                  style={{ top: previewRect.y, width: previewRect.x, height: previewRect.height }}
                />
                <div
                  className="capture-scrim right-0"
                  style={{ top: previewRect.y, width: rightOverlayWidth, height: previewRect.height }}
                />
                <div
                  className="capture-scrim inset-x-0"
                  style={{ top: previewRect.y + previewRect.height, height: bottomOverlayHeight }}
                />
              </div>
              <div
                className={`capture-guide ${
                  isMirrored ? 'transform scale-x-[-1]' : ''
                }`}
                style={{
                  width: previewRect.width + GUIDE_BORDER * 2,
                  height: previewRect.height + GUIDE_BORDER * 2,
                  top: previewRect.y - GUIDE_BORDER,
                  left: previewRect.x - GUIDE_BORDER,
                }}
              >
                <span
                  className={`capture-guide-label ${
                    isMirrored ? 'scale-x-[-1]' : ''
                  }`}
                >
                  {t('place_signature')}
                </span>
                {selectOpen ? (
                <select
                  ref={dropdownRef}
                  className={`select-control absolute top-2 z-10 max-w-[220px] ${isMirrored ? 'left-2 transform scale-x-[-1]' : 'right-2'
                    } pointer-events-auto`}
                  value={selectedDeviceId}
                  onBlur={() => setSelectOpen(false)}
                  onChange={async (e) => {
                    const id = e.target.value
                    if (id === '__toggle__') {
                      if (stream) {
                        stopCamera()
                      } else {
                        await startCamera()
                      }
                    } else {
                      if (stream) {
                        await startStream(id)
                        setSelectedDeviceId(id)
                      } else {
                        await startCamera(id)
                      }
                    }
                    setSelectOpen(false)
                  }}
                >
                  <option value="" disabled>
                    {t('select_camera')}
                  </option>
                  <option value="__toggle__">
                    {stream ? t('stop_camera') : t('start_camera')}
                  </option>
                  {videoDevices.map((d, i) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || `Camera ${i + 1}`}
                    </option>
                  ))}
                </select>
                ) : (
                  <button
                    type="button"
                    onClick={handleCameraButtonClick}
                    className={`capture-icon-button ${
                      isMirrored ? 'left-2 transform scale-x-[-1]' : 'right-2'
                  }`}
                  aria-label={t('select_camera')}
                >
                    <i className="ri-arrow-left-right-line icon-accent" />
                  </button>
                )}
              </div>

              {/* Controls Overlay */}
              <div
                ref={buttonRowRef}
                className="capture-controls"
                style={{ top: previewRect.y + previewRect.height + overlayGap }}
              >
                <button
                  onClick={capture}
                  disabled={!canCapture}
                  className={buttonBase}
                  aria-label={t('capture_btn')}
                  title={t('capture_btn')}
                >
                  <i className="ri-camera-lens-line ri-lg" aria-hidden="true"></i>
                  <span className="btn-hide-portrait">{t('capture_btn')}</span>
                </button>
                <button
                  onClick={abstractSignature}
                  disabled={!rawImage}
                  className={`${buttonBase} ${!rawImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label={t('clean')}
                  title={t('clean')}
                >
                  <i className="ri-eraser-line ri-lg" aria-hidden="true"></i>
                  <span className="btn-hide-portrait">{t('clean')}</span>
                </button>
                <button
                  onClick={saveSignature}
                  disabled={!rawImage}
                  className={`${buttonBase} ${!rawImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label={t('save')}
                  title={t('save')}
                >
                  <i className="ri-download-2-line ri-lg" aria-hidden="true"></i>
                  <span className="btn-hide-portrait">{t('save')}</span>
                </button>
              </div>

              {cameraErrorMessage && !stream && (
                <div className="camera-error-panel">
                  <p>{cameraErrorMessage}</p>
                  <button
                    type="button"
                    className="camera-error-action"
                    onClick={() => startCamera()}
                  >
                    {t('camera_retry')}
                  </button>
                </div>
              )}

              {/* Preview Overlay */}
              {previewImage ? (
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
                  style={{
                    top:
                      previewRect.y +
                      previewRect.height +
                      buttonHeight +
                      overlayGap * 2,
                    width: previewRect.width,
                    height: previewRect.height,
                  }}
                >
                  <div className="preview-frame">
                    <img
                      src={previewImage}
                      alt={processedImage ? 'Signature preview' : 'Captured preview'}
                      className={`w-full h-full object-contain ${
                        isMirrored ? 'transform scale-x-[-1]' : ''
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="preview-empty pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
                  style={{
                    top:
                      previewRect.y +
                      previewRect.height +
                      buttonHeight +
                      overlayGap * 2,
                  }}
                >
                  <i className="ri-ball-pen-line ri-lg"></i>
                  <span>{t('preview_placeholder')}</span>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

    </div>
  )
}

export default SignatureCapture
