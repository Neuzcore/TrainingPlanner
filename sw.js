/* Kadenz Trainingsplaner — Service Worker
 * Strategie: Stale-while-revalidate für App-Shell + statische Assets.
 * Cloud-Worker-Requests (workers.dev) gehen immer direkt ans Netzwerk.
 */

const CACHE = 'kadenz-v9';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Cloud-Worker immer direkt ans Netzwerk — keine Caching-Tricks für API-Daten
  if (url.hostname.includes('workers.dev')) return;

  // Stale-while-revalidate für alles andere
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const networkFetch = fetch(req).then((response) => {
        if (response && response.ok && (response.type === 'basic' || response.type === 'cors')) {
          cache.put(req, response.clone()).catch(() => {});
        }
        return response;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});
