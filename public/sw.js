
const CACHE_VERSION = 'y-realty-v2';
const STATIC_CACHE = `y-realty-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `y-realty-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `y-realty-images-${CACHE_VERSION}`;

// Cache durations (in seconds)
const CACHE_DURATION = {
  STATIC: 365 * 24 * 60 * 60, // 1 year for static assets
  IMAGES: 365 * 24 * 60 * 60, // 1 year for images
  DYNAMIC: 7 * 24 * 60 * 60   // 1 week for dynamic content
};

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png',
  '/lovable-uploads/4aab176d-95ee-4ae9-bda7-892530d680f6.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== IMAGE_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // IMPORTANT: Let the browser handle document/navigation requests
  if (request.destination === 'document' || request.mode === 'navigate') {
    return;
  }

  // Cache-first strategy for static assets (JS, CSS, Images)
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const responseToCache = response.clone();
          const cacheName = getCacheName(url.pathname);
          
          caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        });
      })
    );
    return;
  }

  // Network-first for dynamic content
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          if (request.destination === 'image') {
            return new Response('', {
              status: 200,
              statusText: 'OK',
              headers: new Headers({
                'Content-Type': 'image/svg+xml'
              })
            });
          }

          return Response.error();
        });
      })
  );
});

// Helper functions
function isStaticAsset(pathname) {
  return pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i) ||
         pathname.startsWith('/assets/') ||
         pathname.startsWith('/lovable-uploads/');
}

function getCacheName(pathname) {
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg)$/i) || pathname.startsWith('/lovable-uploads/')) {
    return IMAGE_CACHE;
  }
  if (pathname.startsWith('/assets/')) {
    return STATIC_CACHE;
  }
  return DYNAMIC_CACHE;
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(handleOfflineFormSync());
  }
});

async function handleOfflineFormSync() {
  try {
    const db = await openDB();
    const transaction = db.transaction(['offline-forms'], 'readonly');
    const store = transaction.objectStore('offline-forms');
    const requests = await store.getAll();
    
    for (const formData of requests) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData.data)
        });
        
        const deleteTransaction = db.transaction(['offline-forms'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('offline-forms');
        await deleteStore.delete(formData.id);
      } catch {
        // Failed to sync this form, will retry later
      }
    }
  } catch {
    // Background sync failed, will retry later
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('YRealtyOfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offline-forms')) {
        db.createObjectStore('offline-forms', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}
