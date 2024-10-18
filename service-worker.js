const CACHE_NAME = 'v1_dextro';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/img/dexter.png',
    '/img/icons/icon-16x16.png',
    '/img/icons/icon-48x48.png',
    '/img/icons/icon-72x72.png',
    '/img/icons/icon-96x96.png',
    '/img/icons/icon-128x128.png',
    '/img/icons/icon-144x144.png',
    '/img/icons/icon-152x152.png',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-384x384.png',
    '/img/icons/icon-512x512.png',
    '/sound/dexter.mp3',
];

// Durante la fase de instalación, cachea los recursos estáticos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activa el service worker y elimina cachés antiguos si es necesario
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta las solicitudes de la red y sirve archivos desde la caché
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});