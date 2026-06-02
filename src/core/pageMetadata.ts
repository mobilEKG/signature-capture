import { canonicalUrl } from './metadata.ts'

export interface PageMetadataSpec {
  title: string
  description: string
  canonicalPath: string
  imageUrl: string
  structuredData?: unknown
}

function ensureMeta(
  documentRef: Document,
  attributeName: 'name' | 'property',
  attributeValue: string,
) {
  const selector = `meta[${attributeName}="${attributeValue}"]`
  const existing = documentRef.querySelector<HTMLMetaElement>(selector)
  if (existing) {
    return existing
  }

  const meta = documentRef.createElement('meta')
  meta.setAttribute(attributeName, attributeValue)
  documentRef.head.appendChild(meta)
  return meta
}

function setMeta(
  documentRef: Document,
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string,
) {
  ensureMeta(documentRef, attributeName, attributeValue).setAttribute(
    'content',
    content,
  )
}

function ensureCanonical(documentRef: Document) {
  const existing = documentRef.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )
  if (existing) {
    return existing
  }

  const link = documentRef.createElement('link')
  link.setAttribute('rel', 'canonical')
  documentRef.head.appendChild(link)
  return link
}

export function applyPageMetadata(
  documentRef: Document,
  {
    title,
    description,
    canonicalPath,
    imageUrl,
    structuredData,
  }: PageMetadataSpec,
) {
  const canonical = canonicalUrl(canonicalPath)
  documentRef.title = title

  setMeta(documentRef, 'name', 'description', description)
  setMeta(documentRef, 'property', 'og:title', title)
  setMeta(documentRef, 'property', 'og:description', description)
  setMeta(documentRef, 'property', 'og:url', canonical)
  setMeta(documentRef, 'property', 'og:image', imageUrl)
  setMeta(documentRef, 'name', 'twitter:card', 'summary_large_image')
  setMeta(documentRef, 'name', 'twitter:title', title)
  setMeta(documentRef, 'name', 'twitter:description', description)
  setMeta(documentRef, 'name', 'twitter:image', imageUrl)
  ensureCanonical(documentRef).setAttribute('href', canonical)

  documentRef
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((script) => script.remove())

  if (structuredData) {
    const script = documentRef.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.textContent = JSON.stringify(structuredData)
    documentRef.head.appendChild(script)
  }
}
