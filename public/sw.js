
const CACHE_NAME = 'y-realty-v1';
const STATIC_CACHE = 'y-realty-static-v1';
const DYNAMIC_CACHE = 'y-realty-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/lovable-uploads/602cfbe2-3949-47ef-85ba-55108fea7906.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
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

// Fetch event - avoid hijacking document navigations
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle same-origin GET requests
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // IMPORTANT: Let the browser handle document/navigation requests
  // This prevents unexpected redirects to '/'
  if (request.destination === 'document' || request.mode === 'navigate') {
    return; // no respondWith -> default network behavior
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', request.url);
          return cachedResponse;
        }

        // Clone the request for caching
        const fetchRequest = request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                console.log('[SW] Caching new resource:', request.url);
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return a placeholder for images
            if (request.destination === 'image') {
              return new Response('', {
                status: 200,
                statusText: 'OK',
                headers: new Headers({
                  'Content-Type': 'image/svg+xml'
                })
              });
            }

            // For other assets, fail softly
            return Response.error();
          });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(
      // Handle offline contact form submissions
      handleOfflineFormSync()
    );
  }
});

async function handleOfflineFormSync() {
  try {
    // Get stored form data from IndexedDB
    const db = await openDB();
    const transaction = db.transaction(['offline-forms'], 'readonly');
    const store = transaction.objectStore('offline-forms');
    const requests = await store.getAll();
    
    // Try to submit each stored form
    for (const formData of requests) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData.data)
        });
        
        // Remove from storage after successful submission
        const deleteTransaction = db.transaction(['offline-forms'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('offline-forms');
        await deleteStore.delete(formData.id);
      } catch (error) {
        console.log('[SW] Failed to sync form data:', error);
      }
    }
  } catch (error) {
    console.log('[SW] Background sync failed:', error);
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
