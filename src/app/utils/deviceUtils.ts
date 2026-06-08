import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isStandalone: boolean;
  hasNotchSupport: boolean;
  screenHeight: number;
  screenWidth: number;
  pixelRatio: number;
  platform: string;
  userAgent: string;
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => getDeviceInfo());

  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };

    const handleOrientationChange = () => {
      // Delay to ensure screen dimensions are updated
      setTimeout(() => {
        setDeviceInfo(getDeviceInfo());
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return deviceInfo;
}

export function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent || '';
  const platform = navigator.platform || '';
  
  // Screen dimensions
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Device type detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || 
                   (screenWidth <= 768 && screenHeight <= 1024);
  const isTablet = /iPad|Android/i.test(userAgent) && 
                   (screenWidth >= 768 || screenHeight >= 768);
  const isDesktop = !isMobile && !isTablet;
  
  // Platform detection
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent);
  
  // PWA detection
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                      window.matchMedia('(display-mode: fullscreen)').matches ||
                      // @ts-ignore
                      window.navigator.standalone === true;
  
  // Notch detection (iPhone X and newer)
  const hasNotchSupport = isIOS && 
                         (screenHeight >= 812 || screenWidth >= 812) && 
                         CSS.supports('padding-top: env(safe-area-inset-top)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isAndroid,
    isIOS,
    isStandalone,
    hasNotchSupport,
    screenHeight,
    screenWidth,
    pixelRatio,
    platform,
    userAgent
  };
}

export function getViewportHeight(): number {
  // Use visual viewport if available (better for mobile)
  if (window.visualViewport) {
    return window.visualViewport.height;
  }
  return window.innerHeight;
}

export function getViewportWidth(): number {
  if (window.visualViewport) {
    return window.visualViewport.width;
  }
  return window.innerWidth;
}

export function isInCapacitor(): boolean {
  // @ts-ignore
  return !!(window.Capacitor?.isNativePlatform?.());
}

export function isInCordova(): boolean {
  // @ts-ignore
  return !!(window.cordova);
}

export function supportsNativeFeature(feature: string): boolean {
  switch (feature) {
    case 'camera':
      return !!(navigator.mediaDevices?.getUserMedia);
    case 'geolocation':
      return !!(navigator.geolocation);
    case 'vibration':
      return !!(navigator.vibrate);
    case 'notifications':
      return !!(window.Notification);
    case 'serviceWorker':
      return 'serviceWorker' in navigator;
    case 'backgroundSync':
      return 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype;
    case 'pushNotifications':
      return 'serviceWorker' in navigator && 'PushManager' in window;
    case 'webShare':
      return !!(navigator.share);
    case 'clipboard':
      return !!(navigator.clipboard);
    case 'deviceMotion':
      return 'DeviceMotionEvent' in window;
    case 'deviceOrientation':
      return 'DeviceOrientationEvent' in window;
    case 'battery':
      // @ts-ignore
      return !!(navigator.getBattery);
    case 'networkInformation':
      // @ts-ignore
      return !!(navigator.connection);
    default:
      return false;
  }
}

export function requestFullscreen(): void {
  const element = document.documentElement;
  
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) {
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    (element as any).mozRequestFullScreen();
  } else if ((element as any).msRequestFullscreen) {
    (element as any).msRequestFullscreen();
  }
}

export function exitFullscreen(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
}

export function preventZoom(): void {
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Prevent pinch zoom
  document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  // Prevent wheel zoom
  document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }, { passive: false });
}

export function enableSafeAreaSupport(): void {
  // Add CSS variables for safe area insets
  const root = document.documentElement;
  
  if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
    root.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
    root.style.setProperty('--safe-area-right', 'env(safe-area-inset-right)');
    root.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
    root.style.setProperty('--safe-area-left', 'env(safe-area-inset-left)');
  } else {
    root.style.setProperty('--safe-area-top', '0px');
    root.style.setProperty('--safe-area-right', '0px');
    root.style.setProperty('--safe-area-bottom', '0px');
    root.style.setProperty('--safe-area-left', '0px');
  }
}

export function optimizeForMobile(): void {
  // Disable text selection
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  
  // Disable context menu on long press
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  
  // Optimize touch events
  document.body.style.touchAction = 'manipulation';
  
  // Prevent zoom
  preventZoom();
  
  // Enable safe area support
  enableSafeAreaSupport();
}