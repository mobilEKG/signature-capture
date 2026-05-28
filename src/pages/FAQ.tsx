import { Helmet } from 'react-helmet-async'
import { useI18n } from '../core/i18n.tsx'
import {
  REPOSITORY_LABEL,
  REPOSITORY_URL,
  canonicalUrl,
} from '../core/metadata.ts'

export default function FAQ() {
  const { t } = useI18n()
  const title = t('faq_meta_title')
  const description = t('faq_meta_description')
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl('/faq')} />
        <meta property="og:image" content={canonicalUrl('/social-preview.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={canonicalUrl('/social-preview.png')} />
        <link rel="canonical" href={canonicalUrl('/faq')} />
      </Helmet>
      <div className="page-container">
      <article className="article-panel">
      <h1 className="article-title">
        <i className="ri-question-answer-line ri-lg" aria-hidden="true"></i>
        {t('faq_heading')}
      </h1>
      <dl className="space-y-4">
        <div className="article-card p-4">
          <dt className="article-card-title">
            <i className="ri-file-image-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            {t('faq_q2')}
          </dt>
          <dd className="mt-1">{t('faq_a2')}</dd>
        </div>
        <div className="article-card p-4">
          <dt className="article-card-title">
            <i className="ri-computer-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            {t('faq_q3')}
          </dt>
          <dd className="mt-1">{t('faq_a3')}</dd>
        </div>
        <div className="article-card p-4">
          <dt className="article-card-title">
            <i className="ri-shield-check-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            {t('faq_q4')}
          </dt>
          <dd className="mt-1">{t('faq_a4')}</dd>
        </div>
        <div className="article-card p-4">
          <dt className="article-card-title">
            <i className="ri-code-s-slash-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            {t('faq_q_open_source')}
          </dt>
          <dd className="mt-1">
            {t('faq_a_open_source')}{' '}
            <a
              className="text-link"
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
            >
              {REPOSITORY_LABEL}
            </a>
          </dd>
        </div>
        <div className="article-card p-4">
          <dt className="article-card-title">
            <i className="ri-camera-off-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            {t('faq_q5')}
          </dt>
          <dd className="mt-1">{t('faq_a5')}</dd>
        </div>
      </dl>
      </article>
    </div>
    </>
  )
}
