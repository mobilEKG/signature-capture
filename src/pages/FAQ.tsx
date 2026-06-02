import { useI18n } from '../core/i18n.tsx'
import {
  REPOSITORY_LABEL,
  REPOSITORY_URL,
  canonicalUrl,
} from '../core/metadata.ts'
import PageMeta from '../core/PageMeta.tsx'

export default function FAQ() {
  const { t } = useI18n()
  const title = t('faq_meta_title')
  const description = t('faq_meta_description')
  return (
    <>
      <PageMeta
        title={title}
        description={description}
        canonicalPath="/faq"
        imageUrl={canonicalUrl('/social-preview.png')}
      />
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
            <i className="ri-install-line ri-lg mr-1 align-middle icon-accent" aria-hidden="true"></i>
            {t('faq_q_install')}
          </dt>
          <dd className="mt-1">{t('faq_a_install')}</dd>
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
