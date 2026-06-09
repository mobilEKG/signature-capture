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

  if (route.path !== '/') {
    next = next.replace(
      /<script type="application\/ld\+json">.*?<\/script>/s,
      '',
    )
  } else {
    next = next.replace(
      /<script type="application\/ld\+json">.*?<\/script>/s,
      `<script type="application/ld+json">\n      ${JSON.stringify(structuredData, null, 6)}\n    </script>`,
    )
  }

  return next
}

const template = await readFile(join(distRoot, 'index.html'), 'utf8')

for (const route of routes) {
  const html = renderHead(template, route)
  if (route.path === '/') {
    await writeFile(join(distRoot, 'index.html'), html)
    continue
  }

  const routeDir = join(distRoot, route.path.slice(1))
  await mkdir(routeDir, { recursive: true })
  await writeFile(join(routeDir, 'index.html'), html)
}
