import { Helmet } from 'react-helmet-async'
import { useI18n } from '../core/i18n.tsx'
import {
  REPOSITORY_LABEL,
  REPOSITORY_URL,
  canonicalUrl,
} from '../core/metadata.ts'

export default function About() {
  const { t } = useI18n()
  const title = t('about_meta_title')
  const description = t('about_meta_description')
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl('/about')} />
        <meta property="og:image" content={canonicalUrl('/social-preview.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={canonicalUrl('/social-preview.png')} />
        <link rel="canonical" href={canonicalUrl('/about')} />
      </Helmet>
      <div className="page-container">
      <article className="article-panel">
      <h1 className="article-title">
        <i className="ri-information-line ri-lg" aria-hidden="true"></i>
        {t('about_heading')}
      </h1>
      <p>
        {t('about_p1')}
      </p>
      <p>{t('about_p2')}</p>
      <p>
        {t('source_repository')}:{' '}
        <a
          className="text-link"
          href={REPOSITORY_URL}
          target="_blank"
          rel="noreferrer"
        >
          {REPOSITORY_LABEL}
        </a>
      </p>
      </article>
      </div>
    </>
  )
}
