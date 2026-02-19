// Service Worker utilities for mobile app
export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onOfflineReady?: () => void;
  onError?: (error: Error) => void;
}

export function registerServiceWorker(config: ServiceWorkerConfig = {}) {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        config.onSuccess?.(registration);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content is available; please refresh
                console.log('New content is available; please refresh.');
                config.onUpdate?.(registration);
              } else {
                // Content is cached for offline use
                console.log('Content is cached for offline use.');
                config.onOfflineReady?.();
              }
            }
          });
        });

        // Check for waiting service worker
        if (registration.waiting) {
          config.onUpdate?.(registration);
        }
      })
      .catch((error) => {
        console.error('Error during service worker registration:', error);
        config.onError?.(new Error('Service worker registration failed'));
      });
  });

  // Handle service worker messages
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SW_UPDATE_READY') {
      console.log('Service worker update ready');
    }
  });
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

export function skipWaitingAndReload() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // Listen for the controlling service worker to change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      }
    });
  }
}

export function isServiceWorkerSupported(): boolean {
  return 'serviceWorker' in navigator;
}

export function getServiceWorkerStatus(): Promise<'unsupported' | 'registered' | 'unregistered'> {
  return new Promise((resolve) => {
    if (!isServiceWorkerSupported()) {
      resolve('unsupported');
      return;
    }

    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        resolve('registered');
      } else {
        resolve('unregistered');
      }
    });
  });
}

// Mobile-specific service worker features
export function enableBackgroundSync(tag: string, data: any) {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration) => {
      // Store data for background sync
      const syncData = {
        tag,
        data,
        timestamp: Date.now()
      };
      
      // Store in IndexedDB for background sync
      storeForBackgroundSync(syncData);
      
      // Register background sync
      return registration.sync.register(tag);
    }).catch((error) => {
      console.error('Background sync registration failed:', error);
    });
  }
}

function storeForBackgroundSync(data: any) {
  // Simple localStorage fallback for background sync data
  try {
    const existingData = JSON.parse(localStorage.getItem('pendingSync') || '[]');
    existingData.push(data);
    localStorage.setItem('pendingSync', JSON.stringify(existingData));
  } catch (error) {
    console.error('Failed to store sync data:', error);
  }
}

export function getPendingSyncData(): any[] {
  try {
    return JSON.parse(localStorage.getItem('pendingSync') || '[]');
  } catch (error) {
    console.error('Failed to get sync data:', error);
    return [];
  }
}

export function clearPendingSyncData() {
  try {
    localStorage.removeItem('pendingSync');
  } catch (error) {
    console.error('Failed to clear sync data:', error);
  }
}

// Push notification helpers
export function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  return new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      reject(new Error('Push notifications not supported'));
      return;
    }

    navigator.serviceWorker.ready.then((registration) => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY') // Replace with actual VAPID key
      });
    }).then((subscription) => {
      console.log('Push subscription successful:', subscription);
      resolve(subscription);
    }).catch((error) => {
      console.error('Push subscription failed:', error);
      reject(error);
    });
  });
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Network status helpers for mobile
export function isOnline(): boolean {
  return navigator.onLine;
}

export function onNetworkChange(callback: (online: boolean) => void) {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

// App update helpers
export function checkForAppUpdates(): Promise<boolean> {
  return navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration) {
      return registration.update().then(() => {
        return !!registration.waiting;
      });
    }
    return false;
  });
}

export function showUpdateAvailableNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Rooted Tales Update Available', {
      body: 'A new version of the app is ready. Tap to update.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'app-update',
      requireInteraction: true,
      actions: [
        {
          action: 'update',
          title: 'Update Now'
        },
        {
          action: 'dismiss',
          title: 'Later'
        }
      ]
    });
  }
}
