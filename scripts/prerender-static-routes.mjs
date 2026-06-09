import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const distRoot = join(repoRoot, 'dist')
const siteUrl = 'https://signature.codeant.studio'
const defaultImage = `${siteUrl}/social-preview.png`

const routes = [
  {
    path: '/',
    title: 'Free Signature Background Remover | Transparent PNG, No Upload',
    description:
      'Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload.',
  },
  {
    path: '/instructions',
    title: 'Instructions - Signature Capture',
    description:
      'Quick guide for capturing a handwritten signature, removing the paper background, and saving a transparent PNG locally in your browser.',
  },
  {
    path: '/faq',
    title: 'FAQ - Signature Capture',
    description:
      'Answers about transparent PNG signature downloads, browser-only processing, camera permissions, privacy, and open-source self-hosting.',
    structuredData: () => faqStructuredData,
  },
  {
    path: '/about',
    title: 'About - Signature Capture',
    description:
      'Learn about Signature Capture, a free open source browser app for turning handwritten signatures into transparent PNG images.',
  },
  {
    path: '/privacy',
    title: 'Privacy - Signature Capture',
    description:
      'Privacy practices for Signature Capture. Signature images are processed locally in your browser and are not uploaded to a server.',
  },
]


const faqContent = [
  {
    question: 'How do I remove the white background from a signature?',
    answer:
      'Use a dark pen on white paper, place the signature inside the guide box, tap Capture, then Clean. The app removes the paper background and keeps the signature strokes.',
  },
  {
    question: 'How do I make a handwritten signature transparent?',
    answer:
      'After capture, the Clean and Save actions export the signature as a PNG with transparent background pixels.',
  },
  {
    question: 'Can I use the PNG in Word, PDF, or forms?',
    answer:
      'Yes. The transparent PNG is designed for document overlays, forms, Word files, PDF workflows, and other places that accept image signatures.',
  },
  {
    question: 'Is this a digital signature or only a signature image?',
    answer:
      'This creates a transparent signature image. It is not a cryptographic digital signature and does not verify document identity or integrity.',
  },
  {
    question: 'What format will I receive?',
    answer: 'Your signature downloads as a high-quality PNG with a transparent background.',
  },
  {
    question: 'Do I need special software?',
    answer: 'No, everything works directly in your browser.',
  },
  {
    question: 'Can I install it on Android or iOS?',
    answer:
      'Yes. The site includes the PWA install pieces: HTTPS hosting, web app manifest, app icons, start URL, fullscreen display mode, and service worker. Use Android 10+ with a current install-capable browser, or iOS/iPadOS 16.4+ with Safari; camera capture still requires browser camera permission.',
  },
  {
    question: 'Is my signature safe?',
    answer:
      'Your signature image never leaves your device unless you choose to download it. We do not store or transmit your signature data.',
  },
  {
    question: 'Is the project open source?',
    answer: 'Yes. You can inspect the code, run it locally, and deploy your own copy.',
  },
  {
    question: 'What if my camera does not work?',
    answer:
      'Check that your browser has permission to access the camera and refresh the page, or troubleshoot your camera settings.',
  },
]

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqContent.slice(0, 4).map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

const homeSeoContent = {
  heading: 'Free signature background remover',
  intro:
    'Turn a handwritten signature on paper into a transparent PNG directly in your browser. Use your camera, clean the paper background, then download or copy the finished signature image.',
  stepsHeading: 'How it works',
  cards: [
    {
      title: 'Capture',
      body: 'Place your handwritten signature inside the guide box and capture a frame from your phone or desktop camera.',
    },
    {
      title: 'Remove the white paper background',
      body: 'The app crops the guide area and converts the signature strokes into a black-on-transparent PNG.',
    },
    {
      title: 'Download a transparent PNG',
      body: 'Save the finished signature image for Word documents, PDFs, forms, and document overlays.',
    },
    {
      title: 'No upload',
      body: 'Signature images are processed locally in your browser. The app does not ask for an account and does not upload your signature.',
    },
  ],
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Signature Capture',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web browser, iOS, Android, Windows, macOS, Linux',
  url: `${siteUrl}/`,
  image: defaultImage,
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: 'USD',
  },
  description:
    'Free open source browser app that removes the paper background from a handwritten signature and exports a transparent PNG without uploading the image.',
}

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const replaceTag = (html, pattern, replacement) => html.replace(pattern, replacement)

const renderHomepageBody = () => {
  const cardHtml = homeSeoContent.cards
    .map(
      (card) => `
              <section class="article-card p-4">
                <h3 class="article-card-title">${escapeHtml(card.title)}</h3>
                <p>${escapeHtml(card.body)}</p>
              </section>`,
    )
    .join('')

  return `<article class="page-container pb-6 pt-4" data-prerendered-home-seo>
          <div class="article-panel">
            <h1 class="article-title">${escapeHtml(homeSeoContent.heading)}</h1>
            <p>${escapeHtml(homeSeoContent.intro)}</p>
            <h2 class="article-card-title mt-4">${escapeHtml(homeSeoContent.stepsHeading)}</h2>
            <div class="grid gap-3 md:grid-cols-2">${cardHtml}
            </div>
          </div>
        </article>`
}


const renderFAQBody = () => {
  const itemsHtml = faqContent
    .map(
      (item) => `
              <div class="article-card p-4">
                <dt class="article-card-title">${escapeHtml(item.question)}</dt>
                <dd class="mt-1">${escapeHtml(item.answer)}</dd>
              </div>`,
    )
    .join('')

  return `<div class="page-container" data-prerendered-faq>
          <article class="article-panel">
            <h1 class="article-title">Frequently Asked Questions</h1>
            <dl class="space-y-4">${itemsHtml}
            </dl>
          </article>
        </div>`
}

const renderBody = (html, route) => {
  const prerenderedBody =
    route.path === '/'
      ? renderHomepageBody()
      : route.path === '/faq'
        ? renderFAQBody()
        : ''

  if (!prerenderedBody) return html

  return html.replace('<div id="root"></div>', `<div id="root">
        ${prerenderedBody}
      </div>`)
}

const renderHead = (html, route) => {
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)

  let next = html
  next = replaceTag(next, /<title>.*?<\/title>/s, `<title>${title}</title>`)
  next = replaceTag(
    next,
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${description}" />`,
  )
  next = replaceTag(
    next,
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${title}" />`,
  )
  next = replaceTag(
    next,
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${description}" />`,
  )
  next = replaceTag(
    next,
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${canonical}" />`,
  )
  next = replaceTag(
    next,
    /<meta property="og:image" content=".*?" \/>/,
    `<meta property="og:image" content="${defaultImage}" />`,
  )
  next = replaceTag(
    next,
    /<meta name="twitter:card" content=".*?" \/>/,
    '<meta name="twitter:card" content="summary_large_image" />',
  )
  next = replaceTag(
    next,
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${title}" />`,
  )
  next = replaceTag(
    next,
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${description}" />`,
  )
  next = replaceTag(
    next,
    /<meta name="twitter:image" content=".*?" \/>/,
    `<meta name="twitter:image" content="${defaultImage}" />`,
  )
  next = replaceTag(
    next,
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${canonical}" />`,
  )

  const routeStructuredData =
    route.path === '/'
      ? structuredData
      : typeof route.structuredData === 'function'
        ? route.structuredData()
        : route.structuredData

  if (routeStructuredData) {
    next = next.replace(
      /<script type="application\/ld\+json">.*?<\/script>/s,
      `<script type="application/ld+json">\n      ${JSON.stringify(routeStructuredData, null, 6)}\n    </script>`,
    )
  } else {
    next = next.replace(
      /<script type="application\/ld\+json">.*?<\/script>/s,
      '',
    )
  }

  return next
}

const template = await readFile(join(distRoot, 'index.html'), 'utf8')

for (const route of routes) {
  const html = renderBody(renderHead(template, route), route)
  if (route.path === '/') {
    await writeFile(join(distRoot, 'index.html'), html)
    continue
  }

  const routeDir = join(distRoot, route.path.slice(1))
  await mkdir(routeDir, { recursive: true })
  await writeFile(join(routeDir, 'index.html'), html)
}
