#!/bin/bash

# ============================================
# ROOTED TALES - ANDROID SETUP SCRIPT
# ============================================
# This script automates the Android conversion process
# Run this after creating all the Android files

set -e  # Exit on error

echo "🌲 Rooted Tales - Android Setup Script"
echo "========================================"
echo ""

# ============================================
# CHECK PREREQUISITES
# ============================================
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm $(npm --version)"

# Check Java
if ! command -v java &> /dev/null; then
    echo "⚠️  Java is not installed. You'll need JDK 11+ to build Android."
    echo "   Download from: https://adoptium.net/"
else
    echo "✅ Java $(java -version 2>&1 | head -n 1)"
fi

echo ""

# ============================================
# STEP 1: INSTALL DEPENDENCIES
# ============================================
echo "📦 Step 1: Installing Capacitor and plugins..."
echo "This may take a few minutes..."
echo ""

# Core Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android || {
    echo "❌ Failed to install Capacitor core"
    exit 1
}

# Essential plugins
npm install \
    @capacitor/filesystem \
    @capacitor/network \
    @capacitor/preferences \
    @capacitor/app \
    @capacitor/status-bar \
    @capacitor/splash-screen \
    @capacitor/local-notifications \
    @capacitor/haptics \
    @capacitor/share \
    @capacitor/browser || {
    echo "❌ Failed to install essential plugins"
    exit 1
}

# Recommended plugins
npm install \
    @capacitor/screen-orientation \
    @capacitor-community/keep-awake \
    @capacitor-community/text-to-speech || {
    echo "⚠️  Failed to install some recommended plugins (non-critical)"
}

# Payment plugin
npm install @revenuecat/purchases-capacitor || {
    echo "⚠️  Failed to install payment plugin (non-critical)"
}

echo ""
echo "✅ All dependencies installed!"
echo ""

# ============================================
# STEP 2: BUILD WEB APP
# ============================================
echo "🔨 Step 2: Building web application..."
echo ""

npm run build || {
    echo "❌ Failed to build web app"
    exit 1
}

echo ""
echo "✅ Web app built successfully!"
echo ""

# ============================================
# STEP 3: INITIALIZE CAPACITOR (if needed)
# ============================================
if [ ! -f "capacitor.config.ts" ]; then
    echo "⚙️  Step 3: Initializing Capacitor..."
    npx cap init "Rooted Tales" "com.xenwinx.rootedtales" --web-dir=dist || {
        echo "❌ Failed to initialize Capacitor"
        exit 1
    }
    echo "✅ Capacitor initialized!"
else
    echo "✅ Capacitor config already exists"
fi
echo ""

# ============================================
# STEP 4: ADD ANDROID PLATFORM
# ============================================
if [ ! -d "android" ]; then
    echo "📱 Step 4: Adding Android platform..."
    npx cap add android || {
        echo "❌ Failed to add Android platform"
        exit 1
    }
    echo "✅ Android platform added!"
else
    echo "✅ Android platform already exists"
fi
echo ""

# ============================================
# STEP 5: SYNC TO ANDROID
# ============================================
echo "🔄 Step 5: Syncing web assets to Android..."
npx cap sync android || {
    echo "❌ Failed to sync to Android"
    exit 1
}
echo "✅ Synced to Android!"
echo ""

# ============================================
# STEP 6: CREATE MISSING RESOURCES
# ============================================
echo "🎨 Step 6: Creating missing drawable resources..."

# Create res/drawable directory if it doesn't exist
mkdir -p android/app/src/main/res/drawable

# Create notification icon if it doesn't exist
if [ ! -f "android/app/src/main/res/drawable/ic_notification.xml" ]; then
    cat > android/app/src/main/res/drawable/ic_notification.xml << 'EOF'
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24"
    android:tint="?attr/colorControlNormal">
    <path
        android:fillColor="@android:color/white"
        android:pathData="M12,22c1.1,0 2,-0.9 2,-2h-4c0,1.1 0.89,2 2,2zM18,16v-5c0,-3.07 -1.64,-5.64 -4.5,-6.32V4c0,-0.83 -0.67,-1.5 -1.5,-1.5s-1.5,0.67 -1.5,1.5v0.68C7.63,5.36 6,7.92 6,11v5l-2,2v1h16v-1l-2,-2z"/>
</vector>
EOF
    echo "✅ Created ic_notification.xml"
else
    echo "✅ ic_notification.xml already exists"
fi

# Create splash icon if it doesn't exist
if [ ! -f "android/app/src/main/res/drawable/splash_icon.xml" ]; then
    cat > android/app/src/main/res/drawable/splash_icon.xml << 'EOF'
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="288dp"
    android:height="288dp"
    android:viewportWidth="288"
    android:viewportHeight="288">
    <!-- Rooted Tales Logo - Replace with your actual logo -->
    <path
        android:fillColor="#4ade80"
        android:pathData="M144,50 L200,100 L200,200 L144,250 L88,200 L88,100 Z"/>
    <path
        android:fillColor="#1a2f1a"
        android:pathData="M144,100 L170,120 L170,180 L144,200 L118,180 L118,120 Z"/>
</vector>
EOF
    echo "✅ Created splash_icon.xml"
else
    echo "✅ splash_icon.xml already exists"
fi

echo ""

# ============================================
# STEP 7: CREATE KEYSTORE PROPERTIES
# ============================================
echo "🔐 Step 7: Creating keystore.properties template..."

if [ ! -f "android/keystore.properties" ]; then
    cat > android/keystore.properties << 'EOF'
# ============================================
# KEYSTORE CONFIGURATION
# ============================================
# Replace these values with your actual keystore information
# NEVER commit this file to Git!

storePassword=YOUR_STORE_PASSWORD_HERE
keyPassword=YOUR_KEY_PASSWORD_HERE
keyAlias=rooted-tales
storeFile=../rooted-tales.keystore

# To create a keystore, run:
# keytool -genkey -v -keystore rooted-tales.keystore -alias rooted-tales -keyalg RSA -keysize 2048 -validity 10000
EOF
    echo "✅ Created keystore.properties template"
    echo "⚠️  IMPORTANT: Update android/keystore.properties with your actual keystore info!"
else
    echo "✅ keystore.properties already exists"
fi

# Add to .gitignore
if ! grep -q "keystore.properties" .gitignore 2>/dev/null; then
    echo "" >> .gitignore
    echo "# Android keystore (sensitive!)" >> .gitignore
    echo "android/keystore.properties" >> .gitignore
    echo "android/*.keystore" >> .gitignore
    echo "✅ Added keystore files to .gitignore"
fi

echo ""

# ============================================
# SUMMARY
# ============================================
echo ""
echo "========================================"
echo "✅ ANDROID SETUP COMPLETE!"
echo "========================================"
echo ""
echo "Your Rooted Tales Android app is ready!"
echo ""
echo "📱 Next Steps:"
echo ""
echo "1. Open in Android Studio:"
echo "   npx cap open android"
echo ""
echo "2. Wait for Gradle sync to complete (2-5 minutes)"
echo ""
echo "3. Connect a device or start an emulator"
echo ""
echo "4. Click the green 'Run' button in Android Studio"
echo ""
echo "5. Your app will install and launch! 🎉"
echo ""
echo "========================================"
echo "📚 Documentation:"
echo "========================================"
echo ""
echo "• ANDROID_SETUP_INSTRUCTIONS.md - Detailed setup guide"
echo "• CAPACITOR_SETUP_GUIDE.md - Full Capacitor guide"
echo "• CAPACITOR_PLUGINS.md - Plugin documentation"
echo "• PLAYSTORE_CHECKLIST.md - Play Store submission"
echo ""
echo "========================================"
echo "⚠️  Important Reminders:"
echo "========================================"
echo ""
echo "• Create your keystore before building release APK"
echo "• Never commit keystore files or passwords to Git"
echo "• Test on multiple devices and Android versions"
echo "• Replace placeholder icons with your actual app icon"
echo ""
echo "========================================"
echo "Need help? Email: hub@xenwinx.com"
echo "========================================"
echo ""
