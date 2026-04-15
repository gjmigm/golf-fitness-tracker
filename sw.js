// Golf Fitness Tracker — Service Worker
const CACHE_NAME = 'golf-fitness-v3';

const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/data.js',
  '/js/state.js',
  '/js/app.js',
  '/js/modal.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ─── Install: pre-cache app shell ────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate: clear old caches ──────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch: cache-first for app shell, network-first for external ────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // YouTube and other external requests: network only, don't cache
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Return nothing for external failures (iframe will show broken)
      })
    );
    return;
  }

  // App shell: cache first, fallback to network, fallback to offline page
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Cache successful GET responses
          if (event.request.method === 'GET' && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
