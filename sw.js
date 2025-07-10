// Service Worker для контроля кеша
const CACHE_NAME = 'petshelp-v1.2';
const urlsToCache = [
    '/',
    '/index.html',
    '/favorites.html',
    '/catalog.html',
    '/profile.html',
    '/css/styles.css',
    '/js/common.js',
    '/js/feed.js',
    '/js/catalog.js',
    '/js/profile.js'
];

self.addEventListener('install', function(event) {
    // Принудительно активируем новый service worker
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', function(event) {
    // Берем контроль над всеми клиентами
    self.clients.claim();
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // Удаляем старые кеши
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Если есть в кеше - возвращаем, иначе загружаем из сети
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
