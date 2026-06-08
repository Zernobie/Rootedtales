import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xenwinx.rootedtales',
  appName: 'Rooted Tales',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // For development with live reload - comment out for production
    // url: 'http://192.168.1.100:5173',
    // cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'AAB' // Android App Bundle for Play Store
    },
    // Enable AndroidX
    allowMixedContent: false,
    // Capture all console logs
    captureInput: true,
    // Web view settings
    webContentsDebuggingEnabled: true
  },
  plugins: {
    // Splash Screen Configuration
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: "#1a2f1a",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#4ade80",
      splashFullScreen: true,
      splashImmersive: true,
    },
    
    // Local Notifications Configuration
    LocalNotifications: {
      smallIcon: "ic_notification",
      iconColor: "#4ade80",
      sound: "notification.wav"
    },
    
    // Status Bar Configuration
    StatusBar: {
      backgroundColor: "#1a2f1a",
      style: "LIGHT"
    },
    
    // Filesystem Configuration
    Filesystem: {
      androidPermissions: [
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE'
      ]
    },
    
    // Keyboard Configuration
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true
    },
    
    // Push Notifications (if you add later)
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
