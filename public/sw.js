const CACHE_NAME = 'signature-cache-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/app-icon.svg',
];

// Toggle this flag to control whether caches are cleared on each load
let FRESH_FETCH = true;

self.addEventListener('install', (event) => {
  if (FRESH_FETCH) {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    );
  } else {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
    );
  }
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  if (FRESH_FETCH) {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    );
  } else {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
      )
    );
  }
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (FRESH_FETCH) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  }
});

// Allow the main app to toggle the cache strategy at runtime
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_FRESH_FETCH') {
    FRESH_FETCH = Boolean(event.data.value);
  }
});
