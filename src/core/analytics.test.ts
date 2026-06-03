import { describe, expect, it } from 'vitest'
import {
  CLOUDFLARE_ANALYTICS_SRC,
  getCloudflareAnalyticsConfig,
} from './analytics.ts'

describe('Cloudflare analytics config', () => {
  it('does not load analytics without an explicit token', () => {
    expect(
      getCloudflareAnalyticsConfig({
        token: '',
        hostname: 'signature.codeant.studio',
      }),
    ).toBeNull()
  })

  it.each(['localhost', '127.0.0.1', '::1', '[::1]'])(
    'does not load analytics on local hostname %s even when a token exists',
    (hostname) => {
      expect(
        getCloudflareAnalyticsConfig({
          token: 'token-from-host',
          hostname,
        }),
      ).toBeNull()
    },
  )

  it('loads analytics only for an explicit token on a public hostname', () => {
    expect(
      getCloudflareAnalyticsConfig({
        token: 'token-from-host',
        hostname: 'signature.codeant.studio',
      }),
    ).toEqual({
      src: CLOUDFLARE_ANALYTICS_SRC,
      token: 'token-from-host',
    })
  })
})
