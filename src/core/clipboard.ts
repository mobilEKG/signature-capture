interface ClipboardWriter {
  write: (items: unknown[]) => Promise<void>
}

interface ClipboardItemConstructor {
  new (items: Record<string, Blob>): unknown
}

interface ClipboardDeps {
  clipboard?: ClipboardWriter
  ClipboardItem?: ClipboardItemConstructor
  fetch?: (input: RequestInfo | URL) => Promise<{ blob: () => Promise<Blob> }>
}

const defaultDeps = (): ClipboardDeps => ({
  clipboard: navigator.clipboard as ClipboardWriter | undefined,
  ClipboardItem: 'ClipboardItem' in window
    ? (window.ClipboardItem as ClipboardItemConstructor)
    : undefined,
  fetch,
})

export async function copyPngDataUrlToClipboard(
  dataUrl: string,
  deps: ClipboardDeps = defaultDeps(),
) {
  const clipboard = deps.clipboard
  const ClipboardItem = deps.ClipboardItem
  const fetchData = deps.fetch

  if (!clipboard || !ClipboardItem || !fetchData) {
    return false
  }

  try {
    const response = await fetchData(dataUrl)
    const blob = await response.blob()
    const item = new ClipboardItem({ [blob.type]: blob })
    await clipboard.write([item])
    return true
  } catch (err) {
    console.error('Clipboard copy failed', err)
    return false
  }
}
