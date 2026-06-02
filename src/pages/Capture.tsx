import SignatureCapture from '../components/SignatureCapture.tsx'
import { REPOSITORY_URL, canonicalUrl } from '../core/metadata.ts'
import PageMeta from '../core/PageMeta.tsx'

const pageTitle =
  'Free Signature Background Remover | Transparent PNG Signature'
const pageDescription =
  'Capture a handwritten signature with your camera and download a transparent PNG. Open source, browser only, no account, no image upload.'

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
    'Open source browser app that captures a handwritten signature and exports a transparent PNG without uploading the image.',
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
