import { Link } from 'react-router-dom'
import PageMeta from '../core/PageMeta.tsx'
import { canonicalUrl } from '../core/metadata.ts'

const title = 'Page Not Found - Signature Capture'
const description = 'The requested Signature Capture page could not be found.'

export default function NotFound() {
  return (
    <>
      <PageMeta
        title={title}
        description={description}
        canonicalPath="/404"
        imageUrl={canonicalUrl('/social-preview.png')}
      />
      <div className="page-container">
        <article className="article-panel">
          <h1 className="article-title">
            <i className="ri-error-warning-line ri-lg" aria-hidden="true"></i>
            Page not found
          </h1>
          <p>
            This route does not exist. Return to the capture tool to create a
            transparent PNG signature.
          </p>
          <p>
            <Link to="/" className="text-link">
              Open Signature Capture
            </Link>
          </p>
        </article>
      </div>
    </>
  )
}
