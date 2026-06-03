export function applyModalIsolation(target: HTMLElement | null) {
  if (!target) {
    return () => {}
  }

  const previousInert = target.inert
  const previousInertAttribute = target.getAttribute('inert')
  const previousAriaHidden = target.getAttribute('aria-hidden')

  target.inert = true
  target.setAttribute('inert', '')
  target.setAttribute('aria-hidden', 'true')

  return () => {
    target.inert = previousInert

    if (previousInertAttribute === null) {
      target.removeAttribute('inert')
    } else {
      target.setAttribute('inert', previousInertAttribute)
    }

    if (previousAriaHidden === null) {
      target.removeAttribute('aria-hidden')
    } else {
      target.setAttribute('aria-hidden', previousAriaHidden)
    }
  }
}

interface NextFocusableIndexInput {
  currentIndex: number
  focusableCount: number
  shiftKey: boolean
}

export function getNextFocusableIndex({
  currentIndex,
  focusableCount,
  shiftKey,
}: NextFocusableIndexInput) {
  if (focusableCount <= 0) {
    return null
  }

  if (currentIndex < 0) {
    return shiftKey ? focusableCount - 1 : 0
  }

  if (shiftKey) {
    return currentIndex <= 0 ? focusableCount - 1 : currentIndex - 1
  }

  return currentIndex >= focusableCount - 1 ? 0 : currentIndex + 1
}
