import SignatureCapture from '../components/SignatureCapture.tsx'
import { REPOSITORY_URL, canonicalUrl } from '../core/metadata.ts'
import PageMeta from '../core/PageMeta.tsx'

const pageTitle =
  'Free Signature Background Remover | Transparent PNG, No Upload'
const pageDescription =
  'Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload.'

const softwareApplicationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Signature Capture',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web browser, iOS, Android, Windows, macOS, Linux',
  url: 'https://signature.codeant.studio/',
  image: 'https://signature.codeant.studio/social-preview.png',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: 'USD',
  },
  description:
    'Free open source browser app that removes the paper background from a handwritten signature and exports a transparent PNG without uploading the image.',
  sameAs: [REPOSITORY_URL],
}

export default function Capture() {
  return (
    <>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/"
        imageUrl={canonicalUrl('/social-preview.png')}
        structuredData={softwareApplicationStructuredData}
      />
      <div className="flex flex-col h-full">
        <section id="tool" className="flex-grow">
          <SignatureCapture />
        </section>
      </div>
    </>
  )
}
