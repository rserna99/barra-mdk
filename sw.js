const CACHE_NAME = 'v0_app_barra_mdk_offline';

// Llista dels arxius que s'han de guardar en cache 
// perque pugui funcionar la app sense conexio a internet
const CORE_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'js/bootstrap.min.js',
  'js/jquery.min.js',
  'js/main.js',
  'css/tipo/Arkitech_Medium_Stencil.ttf',
  'css/tipo/Roboto.ttf',
  'css/bootstrap.min.css',
  'css/main.css',
  'img/birra.svg',
  'img/calimotxo.svg',
  'img/cubata.svg',
  'img/got.svg',
  'img/logo.png',
  'img/logo.svg',
  'img/refresc.svg',
  'img/vermut.svg',
  'img/xarrup.svg'
];

// EVENTO DE INSTALACIÓN
// Aquí guardamos solo lo mínimo necesario para que la app arranque
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Instalando: Guardando archivos críticos');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// EVENTO DE ACTIVACIÓN
// Limpia cachés antiguas si cambias el nombre en CACHE_NAME
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// EVENTO FETCH (La magia del Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // 1. Si está en caché, lo devuelve
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. Si no está en caché, lo pide a la red
      return fetch(event.request).then(networkResponse => {
        // Si la respuesta es válida, la guardamos dinámicamente en la caché
        // para que la próxima vez funcione offline (carpetas js, css, img...)
        if (networkResponse && networkResponse.status === 200) {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(() => {
        // Opcional: Aquí podrías devolver una página de "offline.html" si falla todo
      });
    })
  );
});