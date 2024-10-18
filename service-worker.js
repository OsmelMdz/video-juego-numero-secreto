const CACHE_NAME = 'v1_dextro';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/img/dexter.png',
    '/img/icons/icon-48x48.png',
    '/img/icons/icon-72x72.png',
    '/img/icons/icon-96x96.png',
    '/img/icons/icon-128x128.png',
    '/img/icons/icon-144x144.png',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-384x384.png',
    '/img/icons/icon-512x512.png',
    '/sound/dexter.mp3',
];

// Evento de instalación
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache abierta:', CACHE_NAME);
            return cache.addAll(urlsToCache).catch(error => {
                console.error('Error al añadir a la caché:', error);
            });
        })
    );
});

// Evento de activación
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Cache eliminada:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento de recuperación
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log('Sirviendo desde caché:', event.request.url);
                return response;
            }
            console.log('Fetch a la red:', event.request.url);
            return fetch(event.request).catch(error => {
                console.error('Error al recuperar el recurso:', error);
            });
        })
    );
});
