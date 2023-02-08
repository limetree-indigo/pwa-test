const WEB_CACHe = 'web-app-cache-v1.0'
const filesToCache = [
  '/',
  '/style.css',
  '/imgs/icons/icon-192x192.png',
  '/imgs/icons/icon-512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(WEB_CACHe).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('fetch', function(e) {
    // 여기에 코드를 넣지 않아도 설치는 가능하다.
  })