import { Helmet } from 'react-helmet-async'
import { useI18n } from '../core/i18n.tsx'
import { canonicalUrl } from '../core/metadata.ts'

export default function About() {
  const { t } = useI18n()
  return (
    <>
      <Helmet>
        <title>{t('about_meta_title')}</title>
        <meta name="description" content={t('about_meta_description')} />
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
      </article>
      </div>
    </>
  )
}
