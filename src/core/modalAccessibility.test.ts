import { describe, expect, it } from 'vitest'
import { applyModalIsolation, getNextFocusableIndex } from './modalAccessibility.ts'

function createTarget(initialAriaHidden: string | null = null) {
  const attrs = new Map<string, string>()
  if (initialAriaHidden !== null) {
    attrs.set('aria-hidden', initialAriaHidden)
  }

  return {
    attrs,
    target: {
      inert: false,
      getAttribute(name: string) {
        return attrs.get(name) ?? null
      },
      setAttribute(name: string, value: string) {
        attrs.set(name, value)
      },
      removeAttribute(name: string) {
        attrs.delete(name)
      },
    } as unknown as HTMLElement,
  }
}

describe('modal accessibility helpers', () => {
  it('marks the app root inert and restores its previous state', () => {
    const { attrs, target } = createTarget()

    const restore = applyModalIsolation(target)

    expect(target.inert).toBe(true)
    expect(attrs.has('inert')).toBe(true)
    expect(attrs.get('aria-hidden')).toBe('true')

    restore()

    expect(target.inert).toBe(false)
    expect(attrs.has('inert')).toBe(false)
    expect(attrs.has('aria-hidden')).toBe(false)
  })

  it('preserves an existing aria-hidden value when restoring isolation', () => {
    const { attrs, target } = createTarget('false')

    const restore = applyModalIsolation(target)
    restore()

    expect(target.inert).toBe(false)
    expect(attrs.get('aria-hidden')).toBe('false')
  })

  it('cycles focus within the drawer', () => {
    expect(
      getNextFocusableIndex({
        currentIndex: 0,
        focusableCount: 3,
        shiftKey: true,
      }),
    ).toBe(2)
    expect(
      getNextFocusableIndex({
        currentIndex: 2,
        focusableCount: 3,
        shiftKey: false,
      }),
    ).toBe(0)
    expect(
      getNextFocusableIndex({
        currentIndex: -1,
        focusableCount: 3,
        shiftKey: false,
      }),
    ).toBe(0)
  })
})
