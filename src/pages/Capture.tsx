import SignatureCapture from '../components/SignatureCapture.tsx'
import { useI18n } from '../core/i18n.tsx'
import { REPOSITORY_URL, canonicalUrl } from '../core/metadata.ts'
import PageMeta from '../core/PageMeta.tsx'

const pageTitle =
  'Free Signature Background Remover | Transparent PNG, No Upload'
const pageDescription =
  'Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload.'

const homeSeoCards = [
  {
    titleKey: 'home_seo_capture_title',
    bodyKey: 'home_seo_capture_body',
  },
  {
    titleKey: 'home_seo_remove_background',
    bodyKey: 'home_seo_remove_background_body',
  },
  {
    titleKey: 'home_seo_transparent_png',
    bodyKey: 'home_seo_transparent_png_body',
  },
  {
    titleKey: 'home_seo_no_upload',
    bodyKey: 'home_seo_no_upload_body',
  },
] as const

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
  const { t } = useI18n()

  return (
    <>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/"
        imageUrl={canonicalUrl('/social-preview.png')}
        structuredData={softwareApplicationStructuredData}
      />
      <section id="tool" className="h-full min-h-full">
        <SignatureCapture />
      </section>
      <article className="page-container pb-6 pt-4">
        <div className="article-panel">
          <h1 className="article-title">{t('home_seo_heading')}</h1>
          <p>{t('home_seo_intro')}</p>
          <h2 className="article-card-title mt-4">
            {t('home_seo_steps_heading')}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {homeSeoCards.map((card) => (
              <section className="article-card p-4" key={card.titleKey}>
                <h3 className="article-card-title">{t(card.titleKey)}</h3>
                <p>{t(card.bodyKey)}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}
