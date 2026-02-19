import { useEffect, useCallback } from 'react';
import { DeviceInfo } from './deviceUtils';

export function useMobileOptimizations(deviceInfo: DeviceInfo) {
  // Performance optimizations
  useEffect(() => {
    if (deviceInfo.isMobile) {
      // Reduce animations on low-end devices
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (reducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
      }

      // Optimize scrolling
      document.body.style.overscrollBehavior = 'none';
      document.body.style.webkitOverflowScrolling = 'touch';
      
      // Disable rubber band effect
      document.body.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  }, [deviceInfo.isMobile]);

  // Battery optimization
  useEffect(() => {
    let batteryOptimized = false;
    
    // @ts-ignore
    if (navigator.getBattery) {
      // @ts-ignore
      navigator.getBattery().then((battery) => {
        const optimizeForBattery = () => {
          if (battery.level < 0.2 && !batteryOptimized) {
            // Reduce animations and performance-heavy features
            document.documentElement.classList.add('battery-saver');
            batteryOptimized = true;
          } else if (battery.level > 0.5 && batteryOptimized) {
            document.documentElement.classList.remove('battery-saver');
            batteryOptimized = false;
          }
        };
        
        battery.addEventListener('levelchange', optimizeForBattery);
        optimizeForBattery();
      });
    }
  }, []);

  // Network optimization
  useEffect(() => {
    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      const optimizeForConnection = () => {
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                                connection.effectiveType === '2g' || 
                                connection.saveData;
        
        if (isSlowConnection) {
          document.documentElement.classList.add('slow-connection');
        } else {
          document.documentElement.classList.remove('slow-connection');
        }
      };
      
      connection.addEventListener('change', optimizeForConnection);
      optimizeForConnection();
    }
  }, []);

  // Memory management
  const cleanupMemory = useCallback(() => {
    // Clear unused cached data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('old-') || name.includes('temp-')) {
            caches.delete(name);
          }
        });
      });
    }
    
    // Force garbage collection if available
    // @ts-ignore
    if (window.gc) {
      // @ts-ignore
      window.gc();
    }
  }, []);

  // Cleanup on memory pressure
  useEffect(() => {
    const handleMemoryPressure = () => {
      cleanupMemory();
    };
    
    // @ts-ignore
    if (performance.memory) {
      const checkMemory = () => {
        // @ts-ignore
        const used = performance.memory.usedJSHeapSize;
        // @ts-ignore
        const total = performance.memory.totalJSHeapSize;
        
        if (used / total > 0.8) {
          handleMemoryPressure();
        }
      };
      
      const interval = setInterval(checkMemory, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [cleanupMemory]);
}

export function vibrate(pattern: number | number[] = 100): void {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function hapticFeedback(type: 'light' | 'medium' | 'heavy' = 'light'): void {
  // For Capacitor apps
  // @ts-ignore
  if (window.Capacitor?.Plugins?.Haptics) {
    // @ts-ignore
    const { Haptics, ImpactStyle } = window.Capacitor.Plugins;
    
    let style;
    switch (type) {
      case 'light':
        style = ImpactStyle.Light;
        break;
      case 'medium':
        style = ImpactStyle.Medium;
        break;
      case 'heavy':
        style = ImpactStyle.Heavy;
        break;
    }
    
    Haptics.impact({ style });
    return;
  }
  
  // Fallback to vibration
  const patterns = {
    light: 50,
    medium: 100,
    heavy: 200
  };
  
  vibrate(patterns[type]);
}

export function keepScreenAwake(): () => void {
  let wakeLock: any = null;
  
  const requestWakeLock = async () => {
    try {
      // @ts-ignore
      if ('wakeLock' in navigator) {
        // @ts-ignore
        wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.warn('Screen wake lock failed:', err);
    }
  };
  
  requestWakeLock();
  
  // Return cleanup function
  return () => {
    if (wakeLock) {
      wakeLock.release();
      wakeLock = null;
    }
  };
}

export function shareContent(data: {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.share) {
      navigator.share(data)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    } else {
      // Fallback to copying to clipboard
      if (navigator.clipboard && data.text) {
        navigator.clipboard.writeText(data.text)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      } else {
        resolve(false);
      }
    }
  });
}

export function detectInstallPrompt(): Promise<boolean> {
  return new Promise((resolve) => {
    let deferredPrompt: any = null;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      resolve(true);
    });
    
    // Timeout after 5 seconds
    setTimeout(() => {
      if (!deferredPrompt) {
        resolve(false);
      }
    }, 5000);
  });
}

export function showInstallPrompt(): Promise<boolean> {
  return new Promise((resolve) => {
    // @ts-ignore
    if (window.deferredPrompt) {
      // @ts-ignore
      window.deferredPrompt.prompt();
      // @ts-ignore
      window.deferredPrompt.userChoice.then((choiceResult: any) => {
        resolve(choiceResult.outcome === 'accepted');
        // @ts-ignore
        window.deferredPrompt = null;
      });
    } else {
      resolve(false);
    }
  });
}

export function preventScrollBounce(): void {
  // Prevent rubber band scrolling on iOS
  document.body.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const target = touch.target as HTMLElement;
      
      // Allow scrolling on scrollable elements
      const scrollableElement = target.closest('[data-scroll="true"]') || 
                               target.closest('.overflow-auto') ||
                               target.closest('.overflow-y-auto') ||
                               target.closest('.overflow-scroll');
      
      if (!scrollableElement) {
        e.preventDefault();
      }
    }
  }, { passive: false });
}

export function optimizeImages(): void {
  // Use intersection observer to lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

export function preloadCriticalResources(urls: string[]): void {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (url.endsWith('.css')) {
      link.as = 'style';
    } else if (url.endsWith('.js')) {
      link.as = 'script';
    } else if (url.match(/\.(woff2?|ttf|otf)$/)) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      link.as = 'image';
    }
    
    link.href = url;
    document.head.appendChild(link);
  });
}

export function checkAppUpdate(): Promise<boolean> {
  return new Promise((resolve) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.update().then(() => {
            if (registration.waiting) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        } else {
          resolve(false);
        }
      });
    } else {
      resolve(false);
    }
  });
}

export function applyAppUpdate(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    });
  }
}
