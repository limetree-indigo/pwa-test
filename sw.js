const WEB_CACHE = 'web-app-cache-v1.0'
const filesToCache = [
  '/',
  '/style.css',
  '/imgs/icons/icon-192x192.png',
  '/imgs/icons/icon-512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(WEB_CACHE).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('fetch', function(e) {
  // console.log(`[Service Worker] Fetched resourece ${e.request.url}`)
  // console.log(self.location.origin)
})

self.addEventListener('notificationclick', function(event) {
  const url = event.notification.data.url
  const promiseChain = clients.openWindow(url)
  event.waitUntil(promiseChain)
})


