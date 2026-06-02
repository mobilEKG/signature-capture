import { Helmet } from 'react-helmet-async'
import { useI18n } from '../core/i18n.tsx'
import { canonicalUrl } from '../core/metadata.ts'

export default function Privacy() {
  const { t } = useI18n()
  const title = t('privacy_meta_title')
  const description = t('privacy_meta_description')
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl('/privacy')} />
        <meta property="og:image" content={canonicalUrl('/social-preview.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={canonicalUrl('/social-preview.png')} />
        <link rel="canonical" href={canonicalUrl('/privacy')} />
      </Helmet>
      <div className="page-container">
      <article className="article-panel">
      <h1 className="article-title">
        <i
          className="ri-shield-user-line ri-lg"
          aria-hidden="true"
        ></i>
        {t('privacy_heading')}
      </h1>
      <section className="space-y-4">
        <p>{t('privacy_intro')}</p>
        <h2 className="article-section-title">
          <i
            className="ri-lock-line ri-lg icon-accent"
            aria-hidden="true"
          ></i>
          {t('privacy_privacy_heading')}
        </h2>
        <ul className="space-y-2">
          <li>
            <i className="ri-computer-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            <span>{t('privacy_local_processing')}</span>
          </li>
          <li>
            <i className="ri-user-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            <span>{t('privacy_no_data')}</span>
          </li>
          <li>
            <i className="ri-line-chart-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            <span>{t('privacy_analytics')}</span>
          </li>
        </ul>
        <h2 className="article-section-title">
          <i
            className="ri-file-warning-line ri-lg icon-accent"
            aria-hidden="true"
          ></i>
          {t('privacy_terms_heading')}
        </h2>
        <ul className="space-y-2">
          <li>
            <i className="ri-shield-check-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            <span>{t('privacy_no_warranties')}</span>
          </li>
        </ul>
      </section>
      </article>
    </div>
    </>
  )
}
