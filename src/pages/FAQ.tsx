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
  const priorityFaqs = [
    {
      question: t('faq_q_remove_white_background'),
      answer: t('faq_a_remove_white_background'),
      icon: 'ri-eraser-line',
    },
    {
      question: t('faq_q_make_transparent'),
      answer: t('faq_a_make_transparent'),
      icon: 'ri-contrast-drop-line',
    },
    {
      question: t('faq_q_use_in_documents'),
      answer: t('faq_a_use_in_documents'),
      icon: 'ri-file-copy-2-line',
    },
    {
      question: t('faq_q_digital_signature'),
      answer: t('faq_a_digital_signature'),
      icon: 'ri-shield-keyhole-line',
    },
  ]
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: priorityFaqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }

  return (
    <>
      <PageMeta
        title={title}
        description={description}
        canonicalPath="/faq"
        imageUrl={canonicalUrl('/social-preview.png')}
        structuredData={faqStructuredData}
      />
      <div className="page-container">
      <article className="article-panel">
      <h1 className="article-title">
        <i className="ri-question-answer-line ri-lg" aria-hidden="true"></i>
        {t('faq_heading')}
      </h1>
      <dl className="space-y-4">
        {priorityFaqs.map(({ question, answer, icon }) => (
          <div className="article-card p-4" key={question}>
            <dt className="article-card-title">
              <i
                className={`${icon} ri-lg mr-1 align-middle icon-accent`}
                aria-hidden="true"
              ></i>
              {question}
            </dt>
            <dd className="mt-1">{answer}</dd>
          </div>
        ))}
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
