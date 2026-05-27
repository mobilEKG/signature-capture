import { describe, expect, it, vi } from 'vitest'
import { copyPngDataUrlToClipboard } from './clipboard.ts'

class TestClipboardItem {
  constructor(public readonly items: Record<string, Blob>) {}
}

describe('copyPngDataUrlToClipboard', () => {
  it('returns false when clipboard image writes are unsupported', async () => {
    await expect(
      copyPngDataUrlToClipboard('data:image/png;base64,abc', {
        clipboard: undefined,
        ClipboardItem: undefined,
        fetch: vi.fn(),
      }),
    ).resolves.toBe(false)
  })

  it('returns false when clipboard write fails', async () => {
    const blob = new Blob(['png'], { type: 'image/png' })

    await expect(
      copyPngDataUrlToClipboard('data:image/png;base64,abc', {
        clipboard: {
          write: vi.fn(async () => {
            throw new Error('denied')
          }),
        },
        ClipboardItem: TestClipboardItem,
        fetch: vi.fn(async () => ({ blob: async () => blob })),
      }),
    ).resolves.toBe(false)
  })

  it('returns true after writing the PNG blob to the clipboard', async () => {
    const blob = new Blob(['png'], { type: 'image/png' })
    const write = vi.fn(async () => {})

    await expect(
      copyPngDataUrlToClipboard('data:image/png;base64,abc', {
        clipboard: { write },
        ClipboardItem: TestClipboardItem,
        fetch: vi.fn(async () => ({ blob: async () => blob })),
      }),
    ).resolves.toBe(true)

    expect(write).toHaveBeenCalledTimes(1)
    expect(write.mock.calls[0][0][0]).toBeInstanceOf(TestClipboardItem)
  })
})
