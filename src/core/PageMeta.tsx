import { useEffect } from 'react'
import {
  applyPageMetadata,
  type PageMetadataSpec,
} from './pageMetadata.ts'

export default function PageMeta(props: PageMetadataSpec) {
  const {
    title,
    description,
    canonicalPath,
    imageUrl,
    structuredData,
  } = props

  useEffect(() => {
    applyPageMetadata(document, props)
  }, [title, description, canonicalPath, imageUrl, structuredData, props])

  return null
}
