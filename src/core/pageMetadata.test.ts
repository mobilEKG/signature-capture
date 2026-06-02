import { describe, expect, it } from 'vitest'
import { applyPageMetadata } from './pageMetadata.ts'

interface FakeElement {
  tagName: string
  textContent: string
  attrs: Map<string, string>
  setAttribute: (name: string, value: string) => void
  getAttribute: (name: string) => string | null
  remove: () => void
}

function createFakeDocument() {
  const elements: FakeElement[] = []
  const createElement = (tagName: string): FakeElement => {
    const element: FakeElement = {
      tagName,
      textContent: '',
      attrs: new Map(),
      setAttribute(name, value) {
        element.attrs.set(name, value)
      },
      getAttribute(name) {
        return element.attrs.get(name) ?? null
      },
      remove() {
        const index = elements.indexOf(element)
        if (index >= 0) {
          elements.splice(index, 1)
        }
      },
    }
    return element
  }

  const matches = (element: FakeElement, selector: string) => {
    if (selector === 'meta[name="description"]') {
      return element.tagName === 'meta' && element.getAttribute('name') === 'description'
    }
    if (selector.startsWith('meta[property="')) {
      const property = selector.match(/property="([^"]+)"/)?.[1]
      return element.tagName === 'meta' && element.getAttribute('property') === property
    }
    if (selector.startsWith('meta[name="twitter:')) {
      const name = selector.match(/name="([^"]+)"/)?.[1]
      return element.tagName === 'meta' && element.getAttribute('name') === name
    }
    if (selector === 'link[rel="canonical"]') {
      return element.tagName === 'link' && element.getAttribute('rel') === 'canonical'
    }
    if (selector === 'script[type="application/ld+json"]') {
      return element.tagName === 'script' && element.getAttribute('type') === 'application/ld+json'
    }
    return false
  }

  return {
    document: {
      title: '',
      head: {
        appendChild(element: FakeElement) {
          elements.push(element)
        },
      },
      createElement,
      querySelector(selector: string) {
        return elements.find((element) => matches(element, selector)) ?? null
      },
      querySelectorAll(selector: string) {
        return elements.filter((element) => matches(element, selector))
      },
    } as unknown as Document,
    elements,
  }
}

describe('applyPageMetadata', () => {
  it('updates title, canonical, and social metadata for the current route', () => {
    const { document, elements } = createFakeDocument()

    applyPageMetadata(document, {
      title: 'Instructions - Signature Capture',
      description: 'Route-specific instructions.',
      canonicalPath: '/instructions',
      imageUrl: 'https://signature.codeant.studio/social-preview.png',
    })

    expect(document.title).toBe('Instructions - Signature Capture')
    expect(
      elements.find((element) => element.getAttribute('name') === 'description')?.getAttribute('content'),
    ).toBe('Route-specific instructions.')
    expect(
      elements.find((element) => element.getAttribute('property') === 'og:url')?.getAttribute('content'),
    ).toBe('https://signature.codeant.studio/instructions')
    expect(
      elements.find((element) => element.getAttribute('rel') === 'canonical')?.getAttribute('href'),
    ).toBe('https://signature.codeant.studio/instructions')
  })

  it('removes structured data when the current route has none', () => {
    const { document } = createFakeDocument()

    applyPageMetadata(document, {
      title: 'Home',
      description: 'Home description.',
      canonicalPath: '/',
      imageUrl: 'https://signature.codeant.studio/social-preview.png',
      structuredData: { '@context': 'https://schema.org', '@type': 'SoftwareApplication' },
    })

    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1)

    applyPageMetadata(document, {
      title: 'Privacy',
      description: 'Privacy description.',
      canonicalPath: '/privacy',
      imageUrl: 'https://signature.codeant.studio/social-preview.png',
    })

    expect(document.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(0)
  })
})
