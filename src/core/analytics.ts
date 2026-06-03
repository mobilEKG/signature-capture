export const CLOUDFLARE_ANALYTICS_SRC =
  'https://static.cloudflareinsights.com/beacon.min.js'

const localHostnames = new Set(['localhost', '127.0.0.1', '::1', '[::1]'])

interface AnalyticsInput {
  token: string | undefined
  hostname: string
}

interface AnalyticsConfig {
  src: string
  token: string
}

export function getCloudflareAnalyticsConfig({
  token,
  hostname,
}: AnalyticsInput): AnalyticsConfig | null {
  const trimmedToken = token?.trim()

  if (!trimmedToken || localHostnames.has(hostname)) {
    return null
  }

  return {
    src: CLOUDFLARE_ANALYTICS_SRC,
    token: trimmedToken,
  }
}

export function installCloudflareAnalytics({
  token,
  hostname = window.location.hostname,
  targetDocument = document,
}: {
  token: string | undefined
  hostname?: string
  targetDocument?: Document
}) {
  const config = getCloudflareAnalyticsConfig({ token, hostname })

  if (!config || targetDocument.querySelector(`script[src="${config.src}"]`)) {
    return
  }

  const script = targetDocument.createElement('script')
  script.defer = true
  script.src = config.src
  script.dataset.cfBeacon = JSON.stringify({ token: config.token })
  targetDocument.head.appendChild(script)
}
