self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('Tabela-fipe').then((cache) => cache.addAll([
            '/index.html',
            '/css/style.css',
            '/js/solucao.js',
            '/manifest.json'
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
