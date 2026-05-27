import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { describe, expect, it, vi } from 'vitest'

const source = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8')

function createWorker(fetchImpl = vi.fn(async () => new Response('network'))) {
  const handlers = new Map()
  const entries = new Map()

  const cache = {
    addAll: vi.fn(async (urls) => {
      for (const url of urls) {
        entries.set(url, new Response(`cached ${url}`))
      }
    }),
    match: vi.fn(async (request) => {
      const key = typeof request === 'string' ? request : request.url
      return entries.get(key)
    }),
    put: vi.fn(async (request, response) => {
      const key = typeof request === 'string' ? request : request.url
      entries.set(key, response)
    }),
  }

  const caches = {
    open: vi.fn(async () => cache),
    keys: vi.fn(async () => []),
    delete: vi.fn(async () => true),
    match: vi.fn(async (request) => cache.match(request)),
  }

  const self = {
    addEventListener: (type, handler) => handlers.set(type, handler),
    skipWaiting: vi.fn(),
    clients: { claim: vi.fn() },
    location: { origin: 'https://signature.codeant.studio' },
  }

  vm.runInNewContext(source, {
    self,
    caches,
    fetch: fetchImpl,
    Response,
    URL,
    Promise,
    console,
  })

  return { cache, caches, handlers }
}

async function waitForLifecycle(handler) {
  let pending
  handler({ waitUntil: (promise) => { pending = promise } })
  await pending
}

describe('service worker', () => {
  it('precaches the app shell during install', async () => {
    const worker = createWorker()

    await waitForLifecycle(worker.handlers.get('install'))

    expect(worker.caches.open).toHaveBeenCalled()
    expect(worker.cache.addAll).toHaveBeenCalledWith(
      expect.arrayContaining(['/', '/index.html', '/manifest.webmanifest']),
    )
  })

  it('falls back to cached index for offline navigation requests', async () => {
    const worker = createWorker(vi.fn(async () => {
      throw new Error('offline')
    }))
    await waitForLifecycle(worker.handlers.get('install'))

    let responsePromise
    worker.handlers.get('fetch')({
      request: {
        method: 'GET',
        mode: 'navigate',
        url: 'https://signature.codeant.studio/about',
      },
      respondWith: (promise) => {
        responsePromise = promise
      },
    })

    await expect(responsePromise.then((response) => response.text())).resolves.toBe(
      'cached /index.html',
    )
  })
})
