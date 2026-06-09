# Signature Capture SEO Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address the shared SEO review for this repository only by positioning the app as a free signature background remover that exports transparent PNG files without uploading signatures.

**Architecture:** Keep the existing Vite/React app as the product landing surface. Update the source-controlled metadata, README, prerender script, FAQ content, structured data, and tests so the same SEO positioning is visible to users, crawlers, and social previews.

**Tech Stack:** React 19, React Router, Vite, TypeScript, Vitest, static prerender script, existing `PageMeta` metadata helper.

---

## Scope Notes

The shared review also discussed CSV-Splitter and external `codeant.studio` landing pages. Those are out of scope for this plan. This plan only changes files in `D:\project\signature-capture`.

Items already partly done:
- `index.html`, `src/pages/Capture.tsx`, and `scripts/prerender-static-routes.mjs` already use "Free Signature Background Remover".
- `README.md` already mentions transparent PNG output and local browser processing.
- `public/social-preview.png` already exists.
- `public/robots.txt` and `public/sitemap.xml` already exist.

Remaining work:
- Make the README H1 match the reviewed positioning.
- Use the review's stronger "Transparent PNG, No Upload" wording consistently.
- Add crawlable homepage text below the capture tool without changing the first-screen tool workflow.
- Expand FAQ around the long-tail queries from the review.
- Add FAQ schema and tests so prerendered pages keep the SEO data.

## File Structure

- Modify `README.md`: change H1 and first paragraph to use the target keyword phrase.
- Modify `index.html`: update fallback title, description, Open Graph, Twitter metadata, and root SoftwareApplication description.
- Modify `src/pages/Capture.tsx`: update runtime metadata and add below-tool landing copy.
- Modify `src/pages/FAQ.tsx`: add FAQ structured data and render new FAQ entries.
- Modify `src/core/i18n.tsx`: add English copy keys used by the homepage and FAQ. Keep existing non-English keys unchanged; the fallback behavior already returns English when a key is missing from a locale.
- Modify `scripts/prerender-static-routes.mjs`: keep static route metadata and structured data aligned with runtime metadata.
- Add `tests/seo-positioning.test.mjs`: assert the target title, description, README H1, FAQ questions, and prerender schema behavior are present.

---

### Task 1: Align Primary SEO Title And README Positioning

**Files:**
- Modify: `README.md`
- Modify: `index.html`
- Modify: `src/pages/Capture.tsx`
- Modify: `scripts/prerender-static-routes.mjs`
- Test: `tests/seo-positioning.test.mjs`

- [ ] **Step 1: Write the failing SEO positioning test**

Create `tests/seo-positioning.test.mjs`:

```js
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const targetTitle = 'Free Signature Background Remover | Transparent PNG, No Upload'
const targetDescription =
  'Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload.'

describe('SEO positioning copy', () => {
  it('uses the reviewed signature background remover positioning in metadata sources', () => {
    const index = readFileSync('index.html', 'utf8')
    const capture = readFileSync('src/pages/Capture.tsx', 'utf8')
    const prerender = readFileSync('scripts/prerender-static-routes.mjs', 'utf8')

    for (const source of [index, capture, prerender]) {
      expect(source).toContain(targetTitle)
      expect(source).toContain(targetDescription)
    }
  })

  it('uses the reviewed positioning in the README heading and opening copy', () => {
    const readme = readFileSync('README.md', 'utf8')

    expect(readme).toContain(
      '# Signature Capture: Free Open Source Signature Background Remover',
    )
    expect(readme).toContain(
      'Free open source browser app for removing the paper background from a handwritten signature and saving it as a transparent PNG.',
    )
  })
})
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm test -- tests/seo-positioning.test.mjs
```

Expected: FAIL because the README H1 and exact metadata strings have not been updated yet.

- [ ] **Step 3: Update README heading and opening positioning**

In `README.md`, replace the first eight lines with:

```md
# Signature Capture: Free Open Source Signature Background Remover

[![Live app](https://img.shields.io/badge/live-signature.codeant.studio-2e7d32)](https://signature.codeant.studio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Free open source browser app for removing the paper background from a handwritten signature and saving it as a transparent PNG.

The app uses your phone or desktop camera, crops the signature guide area, removes the paper background locally in your browser, and lets you download the cleaned image. Captured images are not uploaded.
```

- [ ] **Step 4: Update root metadata fallback**

In `index.html`, use these exact values:

```html
<meta name="description" content="Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload." />
<meta property="og:title" content="Free Signature Background Remover | Transparent PNG, No Upload" />
<meta property="og:description" content="Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload." />
<meta name="twitter:title" content="Free Signature Background Remover | Transparent PNG, No Upload" />
<meta name="twitter:description" content="Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload." />
<title>Free Signature Background Remover | Transparent PNG, No Upload</title>
```

Also replace the SoftwareApplication JSON-LD `description` value with:

```json
"description": "Free open source browser app that removes the paper background from a handwritten signature and exports a transparent PNG without uploading the image."
```

- [ ] **Step 5: Update runtime homepage metadata**

In `src/pages/Capture.tsx`, replace the `pageTitle`, `pageDescription`, and structured data description with:

```ts
const pageTitle =
  'Free Signature Background Remover | Transparent PNG, No Upload'
const pageDescription =
  'Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload.'

// inside softwareApplicationStructuredData
description:
  'Free open source browser app that removes the paper background from a handwritten signature and exports a transparent PNG without uploading the image.',
```

- [ ] **Step 6: Update prerendered homepage metadata**

In `scripts/prerender-static-routes.mjs`, update the root route:

```js
{
  path: '/',
  title: 'Free Signature Background Remover | Transparent PNG, No Upload',
  description:
    'Capture a handwritten signature with your phone or desktop camera, remove the paper background locally in your browser, and download a transparent PNG. Free, open source, no upload.',
},
```

Update `structuredData.description`:

```js
description:
  'Free open source browser app that removes the paper background from a handwritten signature and exports a transparent PNG without uploading the image.',
```

- [ ] **Step 7: Verify Task 1**

Run:

```bash
npm test -- tests/seo-positioning.test.mjs
```

Expected: PASS.

- [ ] **Step 8: Commit Task 1**

```bash
git add README.md index.html src/pages/Capture.tsx scripts/prerender-static-routes.mjs tests/seo-positioning.test.mjs
git commit -m "docs: align signature background remover positioning"
```

---

### Task 2: Add Crawlable Homepage Landing Copy Below The Tool

**Files:**
- Modify: `src/pages/Capture.tsx`
- Modify: `src/core/i18n.tsx`
- Modify: `tests/seo-positioning.test.mjs`

- [ ] **Step 1: Extend the test for homepage long-tail copy**

Append this test to `tests/seo-positioning.test.mjs`:

```js
it('renders crawlable homepage copy for the reviewed long-tail queries', () => {
  const capture = readFileSync('src/pages/Capture.tsx', 'utf8')
  const i18n = readFileSync('src/core/i18n.tsx', 'utf8')

  for (const key of [
    'home_seo_heading',
    'home_seo_remove_background',
    'home_seo_transparent_png',
    'home_seo_no_upload',
  ]) {
    expect(capture).toContain(`t('${key}')`)
    expect(i18n).toContain(`${key}:`)
  }
})
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm test -- tests/seo-positioning.test.mjs
```

Expected: FAIL because the homepage landing copy keys and markup do not exist yet.

- [ ] **Step 3: Add English homepage copy keys**

In `src/core/i18n.tsx`, add these keys to the `en` object near the existing `home_footer_*` keys:

```ts
home_seo_heading: 'Free signature background remover',
home_seo_intro:
  'Turn a handwritten signature on paper into a transparent PNG directly in your browser. Use your camera, clean the paper background, then download or copy the finished signature image.',
home_seo_steps_heading: 'How it works',
home_seo_capture_title: 'Capture',
home_seo_capture_body:
  'Place your handwritten signature inside the guide box and capture a frame from your phone or desktop camera.',
home_seo_remove_background: 'Remove the white paper background',
home_seo_remove_background_body:
  'The app crops the guide area and converts the signature strokes into a black-on-transparent PNG.',
home_seo_transparent_png: 'Download a transparent PNG',
home_seo_transparent_png_body:
  'Save the finished signature image for Word documents, PDFs, forms, and document overlays.',
home_seo_no_upload: 'No upload',
home_seo_no_upload_body:
  'Signature images are processed locally in your browser. The app does not ask for an account and does not upload your signature.',
```

- [ ] **Step 4: Render below-tool landing copy**

In `src/pages/Capture.tsx`, get the translator and add an article after the capture tool section:

```tsx
import { useI18n } from '../core/i18n.tsx'
```

Inside `Capture()` before `return`:

```tsx
const { t } = useI18n()
```

Replace:

```tsx
<div className="flex flex-col h-full">
  <section id="tool" className="flex-grow">
    <SignatureCapture />
  </section>
</div>
```

with:

```tsx
<div className="flex flex-col h-full">
  <section id="tool" className="flex-grow">
    <SignatureCapture />
  </section>
  <article className="page-container pb-6">
    <div className="article-panel">
      <h1 className="article-title">{t('home_seo_heading')}</h1>
      <p>{t('home_seo_intro')}</p>
      <h2 className="article-card-title mt-4">{t('home_seo_steps_heading')}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <section className="article-card p-4">
          <h3 className="article-card-title">{t('home_seo_capture_title')}</h3>
          <p>{t('home_seo_capture_body')}</p>
        </section>
        <section className="article-card p-4">
          <h3 className="article-card-title">{t('home_seo_remove_background')}</h3>
          <p>{t('home_seo_remove_background_body')}</p>
        </section>
        <section className="article-card p-4">
          <h3 className="article-card-title">{t('home_seo_transparent_png')}</h3>
          <p>{t('home_seo_transparent_png_body')}</p>
        </section>
        <section className="article-card p-4">
          <h3 className="article-card-title">{t('home_seo_no_upload')}</h3>
          <p>{t('home_seo_no_upload_body')}</p>
        </section>
      </div>
    </div>
  </article>
</div>
```

- [ ] **Step 5: Verify Task 2**

Run:

```bash
npm test -- tests/seo-positioning.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/pages/Capture.tsx src/core/i18n.tsx tests/seo-positioning.test.mjs
git commit -m "feat: add crawlable homepage SEO copy"
```

---

### Task 3: Expand FAQ Long-Tail Coverage And Add FAQ Schema

**Files:**
- Modify: `src/core/i18n.tsx`
- Modify: `src/pages/FAQ.tsx`
- Modify: `scripts/prerender-static-routes.mjs`
- Modify: `tests/seo-positioning.test.mjs`

- [ ] **Step 1: Extend the test for reviewed FAQ questions**

Append this test to `tests/seo-positioning.test.mjs`:

```js
it('includes FAQ entries for reviewed signature background remover searches', () => {
  const faq = readFileSync('src/pages/FAQ.tsx', 'utf8')
  const i18n = readFileSync('src/core/i18n.tsx', 'utf8')
  const prerender = readFileSync('scripts/prerender-static-routes.mjs', 'utf8')

  for (const key of [
    'faq_q_remove_white_background',
    'faq_q_make_transparent',
    'faq_q_use_in_documents',
    'faq_q_digital_signature',
  ]) {
    expect(faq).toContain(`t('${key}')`)
    expect(i18n).toContain(`${key}:`)
  }

  expect(faq).toContain("'@type': 'FAQPage'")
  expect(prerender).toContain("'@type': 'FAQPage'")
})
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm test -- tests/seo-positioning.test.mjs
```

Expected: FAIL because the new FAQ content and FAQ schema do not exist yet.

- [ ] **Step 3: Add English FAQ keys**

In `src/core/i18n.tsx`, add these keys to the `en` object near the existing FAQ keys:

```ts
faq_q_remove_white_background:
  'How do I remove the white background from a signature?',
faq_a_remove_white_background:
  'Use a dark pen on white paper, place the signature inside the guide box, tap Capture, then Clean. The app removes the paper background and keeps the signature strokes.',
faq_q_make_transparent:
  'How do I make a handwritten signature transparent?',
faq_a_make_transparent:
  'After capture, the Clean and Save actions export the signature as a PNG with transparent background pixels.',
faq_q_use_in_documents:
  'Can I use the PNG in Word, PDF, or forms?',
faq_a_use_in_documents:
  'Yes. The transparent PNG is designed for document overlays, forms, Word files, PDF workflows, and other places that accept image signatures.',
faq_q_digital_signature:
  'Is this a digital signature or only a signature image?',
faq_a_digital_signature:
  'This creates a transparent signature image. It is not a cryptographic digital signature and does not verify document identity or integrity.',
```

- [ ] **Step 4: Render the new FAQ cards**

In `src/pages/FAQ.tsx`, add this helper before `return`:

```tsx
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: t('faq_q_remove_white_background'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t('faq_a_remove_white_background'),
      },
    },
    {
      '@type': 'Question',
      name: t('faq_q_make_transparent'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t('faq_a_make_transparent'),
      },
    },
    {
      '@type': 'Question',
      name: t('faq_q_use_in_documents'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t('faq_a_use_in_documents'),
      },
    },
    {
      '@type': 'Question',
      name: t('faq_q_digital_signature'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t('faq_a_digital_signature'),
      },
    },
  ],
}
```

Pass it to `PageMeta`:

```tsx
structuredData={faqStructuredData}
```

Add these cards at the top of the `<dl>`:

```tsx
{[
  ['faq_q_remove_white_background', 'faq_a_remove_white_background', 'ri-eraser-line'],
  ['faq_q_make_transparent', 'faq_a_make_transparent', 'ri-contrast-drop-line'],
  ['faq_q_use_in_documents', 'faq_a_use_in_documents', 'ri-file-copy-2-line'],
  ['faq_q_digital_signature', 'faq_a_digital_signature', 'ri-shield-keyhole-line'],
].map(([questionKey, answerKey, icon]) => (
  <div className="article-card p-4" key={questionKey}>
    <dt className="article-card-title">
      <i className={`${icon} ri-lg mr-1 align-middle icon-accent`} aria-hidden="true"></i>
      {t(questionKey)}
    </dt>
    <dd className="mt-1">{t(answerKey)}</dd>
  </div>
))}
```

- [ ] **Step 5: Add prerendered FAQ schema**

In `scripts/prerender-static-routes.mjs`, add a `structuredData` property to the `/faq` route:

```js
structuredData: {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I remove the white background from a signature?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a dark pen on white paper, place the signature inside the guide box, tap Capture, then Clean. The app removes the paper background and keeps the signature strokes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make a handwritten signature transparent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After capture, the Clean and Save actions export the signature as a PNG with transparent background pixels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use the PNG in Word, PDF, or forms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The transparent PNG is designed for document overlays, forms, Word files, PDF workflows, and other places that accept image signatures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this a digital signature or only a signature image?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This creates a transparent signature image. It is not a cryptographic digital signature and does not verify document identity or integrity.',
      },
    },
  ],
},
```

Then change the JSON-LD replacement logic in `renderHead` so it writes `route.structuredData` when present:

```js
const routeStructuredData =
  route.path === '/' ? structuredData : route.structuredData

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
```

- [ ] **Step 6: Verify Task 3**

Run:

```bash
npm test -- tests/seo-positioning.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit Task 3**

```bash
git add src/core/i18n.tsx src/pages/FAQ.tsx scripts/prerender-static-routes.mjs tests/seo-positioning.test.mjs
git commit -m "feat: expand signature background remover FAQ"
```

---

### Task 4: Full Verification And Static Build Check

**Files:**
- Verify: whole repo
- Inspect: `dist/index.html`
- Inspect: `dist/faq/index.html`

- [ ] **Step 1: Run the full unit suite**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: no ESLint errors.

- [ ] **Step 3: Build and prerender**

Run:

```bash
npm run build
```

Expected: TypeScript build, Vite build, and `scripts/prerender-static-routes.mjs` complete successfully.

- [ ] **Step 4: Inspect prerendered SEO output**

Run:

```bash
node -e "const fs=require('fs'); for (const file of ['dist/index.html','dist/faq/index.html']) { const html=fs.readFileSync(file,'utf8'); console.log(file); console.log(html.match(/<title>.*?<\\/title>/s)?.[0]); console.log(html.includes('Free Signature Background Remover | Transparent PNG, No Upload')); console.log(html.includes('FAQPage')); }"
```

Expected output includes:

```text
dist/index.html
<title>Free Signature Background Remover | Transparent PNG, No Upload</title>
true
false
dist/faq/index.html
<title>FAQ - Signature Capture</title>
false
true
```

- [ ] **Step 5: Commit verification adjustments if needed**

If verification required edits, commit them:

```bash
git add README.md index.html src/pages/Capture.tsx src/pages/FAQ.tsx src/core/i18n.tsx scripts/prerender-static-routes.mjs tests/seo-positioning.test.mjs
git commit -m "test: verify SEO positioning output"
```

If no edits were needed, do not create an empty commit.

---

## Self-Review

**Spec coverage:** The plan covers the current repo's app title, README H1, meta description, homepage content, FAQ keywords, no-upload/privacy positioning, schema markup, static prerendering, and verification. CSV-Splitter and external site work are intentionally excluded.

**Placeholder scan:** No task uses TBD, TODO, or "implement later". Each code-changing step includes exact copy or code blocks.

**Type consistency:** `PageMeta` already accepts `structuredData?: unknown`, so passing FAQ JSON-LD from `src/pages/FAQ.tsx` is compatible. The prerender script keeps root SoftwareApplication schema and adds route-specific FAQPage schema for `/faq`.

---

Plan complete and saved to `docs/superpowers/plans/2026-06-09-seo-positioning.md`. Two execution options:

**1. Subagent-Driven (recommended)** - dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - execute tasks in this session using executing-plans, batch execution with checkpoints
