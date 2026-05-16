import SignatureCapture from '../components/SignatureCapture.tsx'
import { Helmet } from 'react-helmet-async'
import { canonicalUrl } from '../core/metadata.ts'

export default function Capture() {
  return (
    <>
      <Helmet>
        <title>Signature Capture</title>
        <meta
          name="description"
          content="Use your webcam to capture and download your handwritten signature."
        />
        <link rel="canonical" href={canonicalUrl('/')} />
      </Helmet>
      <div className="flex flex-col h-full">
        <section id="tool" className="flex-grow">
          <SignatureCapture />
        </section>
      </div>
    </>
  )
}
