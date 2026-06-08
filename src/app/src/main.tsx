import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import '../../styles/globals.css';

// Mobile app initialization
import { optimizeForMobile, enableSafeAreaSupport, getDeviceInfo } from '../utils/deviceUtils';

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
  optimizeForMobile();
  enableSafeAreaSupport();
});

// Remove loading screen
const removeLoadingScreen = () => {
  const loadingScreen = document.querySelector('.splash-screen');
  if (loadingScreen) {
    loadingScreen.remove();
  }
};

// Handle app visibility
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // App became visible
    console.log('App resumed');
  } else {
    // App became hidden
    console.log('App paused');
  }
});

// Initialize React app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Remove loading screen immediately on app start
removeLoadingScreen();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance optimization - preload critical resources
const deviceInfo = getDeviceInfo();
if (deviceInfo.isMobile) {
  // Preload critical mobile resources
  const criticalResources = [
    '/icons/icon-192x192.png',
    '/manifest.json'
  ];
  
  criticalResources.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = url.endsWith('.png') ? 'image' : 'fetch';
    document.head.appendChild(link);
  });
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  import('react-devtools').catch(() => {
    // React DevTools not available
  });
}

// Error boundary for production
if (process.env.NODE_ENV === 'production') {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Send to error tracking service
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Send to error tracking service
  });
}