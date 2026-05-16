import { Helmet } from 'react-helmet-async'
import { useI18n } from '../core/i18n.tsx'
import { canonicalUrl } from '../core/metadata.ts'

export default function Instructions() {
  const { t } = useI18n()
  return (
    <>
      <Helmet>
        <title>{t('instructions_meta_title')}</title>
        <meta name="description" content={t('instructions_meta_description')} />
        <link rel="canonical" href={canonicalUrl('/instructions')} />
      </Helmet>
      <div className="page-container">
      <article className="article-panel">
      <h1 className="article-title">
        <i
          className="ri-guide-line ri-lg"
          aria-hidden="true"
        ></i>
        {t('instructions_heading')}
      </h1>
      <h2 className="article-section-title">
        <i
          className="ri-eye-line ri-lg icon-accent"
          aria-hidden="true"
        ></i>
        {t('instructions_glance_heading')}
      </h2>      
      <p className="article-card p-4">
        <i className="ri-camera-line ri-lg mr-1"></i>{'\u2192 '}{t('instructions_flow_1')}{' '}
        <i className="ri-camera-lens-line ri-lg mr-1"></i>{'\u2192 '}{t('instructions_flow_2')}{' '}
        <i className="ri-eraser-line ri-lg mr-1"></i>{'\u2192 '}{t('instructions_flow_3')}{' '}
        <i className="ri-download-2-line ri-lg mr-1"></i>{'\u2192 '}{t('instructions_flow_4')}
      </p>
      <h2 className="article-section-title">
        <i
          className="ri-lightbulb-flash-line ri-lg icon-accent"
          aria-hidden="true"
        ></i>
        {t('instructions_tips_heading')}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
      <p className="article-card p-3">
        <i className="ri-pencil-line ri-lg mr-1 icon-accent"></i>
        {t('instructions_tip_pen')}
      </p>
      <p className="article-card p-3">
        <i className="ri-sun-line ri-lg mr-1 icon-accent"></i>
        {t('instructions_tip_light')}
      </p>
      <p className="article-card p-3">
        <i className="ri-focus-3-line ri-lg mr-1 icon-accent"></i>
        {t('instructions_tip_hold')}
      </p>
      <p className="article-card p-3">
        <i className="ri-smartphone-line ri-lg mr-1 icon-accent"></i>
        {t('instructions_tip_back_cam')}
      </p>
      <p className="article-card p-3 sm:col-span-2">
        <i className="ri-landscape-line ri-lg mr-1 icon-accent"></i>
        {t('instructions_tip_landscape')}
      </p>
      <p className="article-card p-3 sm:col-span-2">
        <i className="ri-code-s-slash-line ri-lg mr-1 icon-accent"></i>
        {t('instructions_tip_open_source')}
      </p>
      </div>
      </article>
    </div>
    </>
  )
}
