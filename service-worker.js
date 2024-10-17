const CACHE_NAME = 'v1_dextro';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/img/dexter.png',
    '/sound/dexter.mp3'
];

// Instalación del Service Worker y almacenar en cache los recursos necesarios
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos en cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepta las solicitudes de red para servir archivos desde el cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Actualiza el Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
