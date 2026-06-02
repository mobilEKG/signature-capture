import { useI18n } from '../core/i18n.tsx'
import {
  REPOSITORY_LABEL,
  REPOSITORY_URL,
  canonicalUrl,
} from '../core/metadata.ts'
import PageMeta from '../core/PageMeta.tsx'

export default function About() {
  const { t } = useI18n()
  const title = t('about_meta_title')
  const description = t('about_meta_description')
  return (
    <>
      <PageMeta
        title={title}
        description={description}
        canonicalPath="/about"
        imageUrl={canonicalUrl('/social-preview.png')}
      />
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
