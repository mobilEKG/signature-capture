import SignatureCapture from '../components/SignatureCapture.tsx'
import { Helmet } from 'react-helmet-async'
import { canonicalUrl } from '../core/metadata.ts'

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
}

export default function Capture() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl('/')} />
        <meta property="og:image" content={canonicalUrl('/social-preview.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={canonicalUrl('/social-preview.png')} />
        <link rel="canonical" href={canonicalUrl('/')} />
        <script type="application/ld+json">
          {JSON.stringify(softwareApplicationStructuredData)}
        </script>
      </Helmet>
      <div className="flex flex-col h-full">
        <section id="tool" className="flex-grow">
          <SignatureCapture />
        </section>
      </div>
    </>
  )
}
