export function processSignatureImage(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  thresholdOffset = 0
): string {
  // 1. Get image data and convert to grayscale
  const imageData = ctx.getImageData(0, 0, width, height)
  const grayscale = new Uint8ClampedArray(width * height)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i]
    const g = imageData.data[i + 1]
    const b = imageData.data[i + 2]
    // Use integer arithmetic to compute the grayscale value while
    // clamping the result to the 0-255 range.
    grayscale[i >> 2] = ((r * 299 + g * 587 + b * 114 + 500) / 1000) | 0
  }

  // 2. Otsu thresholding
  // Build histogram
  const hist = new Array(256).fill(0)
  for (let i = 0; i < grayscale.length; i++) {
    hist[grayscale[i]]++
  }
  // Calculate Otsu threshold
  const total = width * height
  let sum = 0
  for (let t = 0; t < 256; t++) sum += t * hist[t]
  let sumB = 0, wB = 0, wF = 0, mB, mF, max = 0, threshold = 0
  for (let t = 0; t < 256; t++) {
    wB += hist[t]
    if (wB === 0) continue
    wF = total - wB
    if (wF === 0) break
    sumB += t * hist[t]
    mB = sumB / wB
    mF = (sum - sumB) / wF
    const between = wB * wF * Math.pow(mB - mF, 2)
    if (between > max) {
      max = between
      threshold = t
    }
  }
  // Apply threshold with offset
  threshold = Math.min(255, threshold + thresholdOffset)

  // 3. Apply binary threshold to alpha channel (invert)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const gray = grayscale[i / 4]
    imageData.data[i + 3] = gray < threshold ? 255 : 0 // Alpha channel
  }

  // 4. Morphological closing (dilate then erode) to keep strokes connected
  const temp1 = new Uint8ClampedArray(width * height)
  const temp2 = new Uint8ClampedArray(width * height)

  // Dilate
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let max = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const idx = (y + dy) * width + (x + dx)
          max = Math.max(max, imageData.data[idx * 4 + 3])
        }
      }
      temp1[y * width + x] = max
    }
  }

  // Erode
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let min = 255
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const idx = (y + dy) * width + (x + dx)
          min = Math.min(min, temp1[idx])
        }
      }
      temp2[y * width + x] = min
    }
  }

  // Copy back as a binary black signature on a transparent background
  for (let i = 0; i < imageData.data.length; i += 4) {
    const idx = Math.floor(i / 4)
    const alpha = temp2[idx]
    const color = alpha > 0 ? 0 : 255
    imageData.data[i] = color
    imageData.data[i + 1] = color
    imageData.data[i + 2] = color
    imageData.data[i + 3] = alpha
  }

  // 5. Put processed image back to canvas
  ctx.putImageData(imageData, 0, 0)

  // 6. Convert to PNG and return
  return ctx.canvas.toDataURL('image/png')
}
