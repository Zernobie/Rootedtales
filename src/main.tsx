/**
 * Rooted Tales – Main Entry Point
 * 
 * This file:
 * 1. Renders the React application
 * 2. Applies mobile‑specific optimizations
 * 3. Handles splash screen removal
 * 4. Preloads critical assets on mobile
 * 5. Captures global errors in production
 */

// ---------------------------------------------------------------------
// 1. IMPORTS – React, DOM, and your app
// ---------------------------------------------------------------------
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// ---------------------------------------------------------------------
// 2. STYLES – both main index.css and theme globals.css
//    (you may delete one if they conflict – both are kept for safety)
// ---------------------------------------------------------------------
import './index.css';                // Tailwind + base styles (from clean setup)
import './styles/globals.css';       // Theme variables, custom cursor, etc. (from original)

// ---------------------------------------------------------------------
// 3. MOBILE UTILITIES – device detection, safe areas, touch optimization
// ---------------------------------------------------------------------
import {
  optimizeForMobile,
  enableSafeAreaSupport,
  getDeviceInfo
} from './utils/deviceUtils';

// ---------------------------------------------------------------------
// 4. INITIALIZE MOBILE OPTIMIZATIONS
//    Runs as soon as the DOM is ready
// ---------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  optimizeForMobile();          // Sets viewport, disables scaling, adjusts touch targets
  enableSafeAreaSupport();      // Adds CSS variables for notches, home indicators
});

// ---------------------------------------------------------------------
// 5. SPLASH SCREEN REMOVAL
//    Looks for an element with class 'splash-screen' and deletes it
//    Called immediately and also after render as a fallback
// ---------------------------------------------------------------------
const removeLoadingScreen = () => {
  const loadingScreen = document.querySelector('.splash-screen');
  if (loadingScreen) {
    loadingScreen.remove();
  }
};

// ---------------------------------------------------------------------
// 6. APP VISIBILITY HANDLER
//    Logs when the app is paused/resumed (useful for mobile WebView)
// ---------------------------------------------------------------------
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('App resumed');
  } else {
    console.log('App paused');
  }
});

// ---------------------------------------------------------------------
// 7. REACT ROOT RENDERING
//    Uses React 18's createRoot API, StrictMode enabled
// ---------------------------------------------------------------------
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html has <div id="root"></div>');
}

const root = createRoot(rootElement);

// Remove splash screen immediately (before first paint)
removeLoadingScreen();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ---------------------------------------------------------------------
// 8. MOBILE PERFORMANCE – PRELOAD CRITICAL ASSETS
//    Only runs on mobile devices to save bandwidth on desktop
// ---------------------------------------------------------------------
const deviceInfo = getDeviceInfo();
if (deviceInfo.isMobile) {
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

// ---------------------------------------------------------------------
// 10. PRODUCTION – GLOBAL ERROR HANDLING
//     Catches uncaught errors and unhandled promise rejections
//     Replace console.error with your preferred error‑tracking service
// ---------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // TODO: Send to Sentry / LogRocket / etc.
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // TODO: Send to error tracking service
  });
}
