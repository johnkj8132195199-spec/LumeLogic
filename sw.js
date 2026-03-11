// LumeLogic Service Worker - V19
const cacheName = 'lumelogic-pro-v19';
const assets = [
  './',
  './index.html',
  './icon.png'
];

// 1. Install & Save files to Phone Memory
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('LumeLogic Guard: Files Cached');
      return cache.addAll(assets);
    })
  );
});

// 2. Clear old versions if you update the code
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// 3. Serve the App Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
