const CACHE_NAME = 'skibidimath-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/privacy.html',
    '/contact.html',
    '/terms.html',
    '/style.css',
    '/app.js'
];

// Install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch from cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
