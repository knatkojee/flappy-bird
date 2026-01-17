const CACHE_NAME = 'flappy-bird-cache-v2'

const PRECACHE_URLS = ['/', '/index.html', '/bird.svg', '/mock_avatar.svg']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  if (request.url.includes('/api/')) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match('/index.html')
        })
    )
    return
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request)
        .then(networkResponse => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseClone)
            })
          }
          return networkResponse
        })
        .catch(() => {
          return new Response('Offline', { status: 503 })
        })
    })
  )
})
