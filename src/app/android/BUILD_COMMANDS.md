# 🛠️ Rooted Tales - Android Build Commands Reference

Quick reference guide for all build commands and npm scripts.

---

## 📦 Installation Commands

### Initial Setup

```bash
# Install all Node.js dependencies
npm install

# Install Capacitor globally (optional)
npm install -g @capacitor/cli

# Install Android-specific Capacitor packages
npm install @capacitor/android @capacitor/core @capacitor/cli
```

---

## 🔨 Build Commands

### Web Build

```bash
# Development build (with source maps)
npm run build

# Production build (optimized)
npm run build

# Preview production build locally
npm run preview
```

**Output:** Creates `dist/` folder with compiled web assets

---

## 📱 Android Commands

### Sync & Copy

```bash
# Copy web assets to Android project
npx cap copy android

# Sync native dependencies and web assets
npx cap sync android

# Full sync (after installing new plugins)
npm run android:sync
```

### Open in Android Studio

```bash
# Open Android project in Android Studio
npx cap open android

# Alternative using npm script
npm run android:open
```

### Build & Run

```bash
# Build web + sync + run on device/emulator
npm run android:run

# Build web + sync + build Android app
npm run android:build
```

---

## 🔐 Keystore Creation

### Generate Release Keystore (First Time Only)

```bash
# Navigate to app directory
cd android/app

# Generate keystore
keytool -genkey -v -keystore release-key.keystore \
  -alias rootedtales-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# You'll be prompted for:
# - Keystore password
# - Key password  
# - Name, organization, etc.
```

**IMPORTANT:** 
- Save passwords securely!
- Backup keystore file!
- Never commit to git!

### View Keystore Information

```bash
# View SHA fingerprints
keytool -list -v -keystore release-key.keystore -alias rootedtales-key

# View SHA-1 (for Firebase, Google Sign-In)
keytool -list -v -keystore release-key.keystore -alias rootedtales-key | grep SHA1

# View SHA-256 (for app signing)
keytool -list -v -keystore release-key.keystore -alias rootedtales-key | grep SHA256
```

---

## 🏗️ Release Build Commands

### Build Release APK

```bash
# Navigate to android folder
cd android

# Clean previous builds
./gradlew clean

# Build release APK
./gradlew assembleRelease

# Output location:
# android/app/build/outputs/apk/release/app-release.apk
```

### Build Release AAB (Recommended for Play Store)

```bash
# Navigate to android folder
cd android

# Clean previous builds
./gradlew clean

# Build release AAB (App Bundle)
./gradlew bundleRelease

# Output location:
# android/app/build/outputs/bundle/release/app-release.aab
```

### Using npm Script

```bash
# Build release (from project root)
npm run release:android

# This runs: npm run build && cap sync android && cap build android --release
```

---

## 🧹 Maintenance Commands

### Clean Build

```bash
# Clean Android build cache
cd android
./gradlew clean

# Deep clean (if having issues)
./gradlew clean
./gradlew cleanBuildCache
rm -rf .gradle
rm -rf build
rm -rf app/build
```

### Refresh Dependencies

```bash
# Refresh Gradle dependencies
cd android
./gradlew build --refresh-dependencies

# Force refresh
./gradlew build --refresh-dependencies --recompile-scripts
```

### Rebuild Everything

```bash
# Full rebuild from scratch
npm run build
npx cap sync android
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## 🧪 Debug Commands

### Build Debug Version

```bash
# Build debug APK
cd android
./gradlew assembleDebug

# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Install on Device

```bash
# List connected devices
adb devices

# Install debug APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Install and replace existing
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Install to specific device
adb -s DEVICE_ID install app-debug.apk
```

### Debugging

```bash
# View logcat (all logs)
adb logcat

# Filter by package name
adb logcat | grep com.xenwinx.rootedtales

# Clear logcat
adb logcat -c

# View crash logs only
adb logcat *:E

# Save logcat to file
adb logcat > logcat.txt
```

### App Management

```bash
# Uninstall app
adb uninstall com.xenwinx.rootedtales

# Clear app data
adb shell pm clear com.xenwinx.rootedtales

# View app info
adb shell dumpsys package com.xenwinx.rootedtales

# Launch app
adb shell am start -n com.xenwinx.rootedtales/.MainActivity
```

---

## 🔍 Analysis Commands

### App Size Analysis

```bash
# Analyze APK size
cd android
./gradlew :app:bundleReleaseReport

# View size breakdown in:
# android/app/build/outputs/logs/bundle-size-report.txt
```

### Build Performance

```bash
# Build with performance profiling
./gradlew assembleRelease --profile --offline --build-cache

# Report location:
# android/build/reports/profile/
```

### Dependency Tree

```bash
# View all dependencies
cd android
./gradlew app:dependencies

# View compile dependencies only
./gradlew app:dependencies --configuration releaseCompileClasspath
```

---

## 📊 Testing Commands

### Run Tests

```bash
# Run unit tests
cd android
./gradlew test

# Run instrumented tests (requires device/emulator)
./gradlew connectedAndroidTest

# Run specific test
./gradlew test --tests com.xenwinx.rootedtales.ExampleUnitTest
```

### Lint Checks

```bash
# Run Android Lint
cd android
./gradlew lint

# Run lint and generate report
./gradlew lintRelease

# Report location:
# android/app/build/reports/lint-results-release.html
```

---

## 🚀 Deployment Commands

### Prepare for Play Store

```bash
# 1. Build web assets
npm run build

# 2. Sync with Android
npx cap sync android

# 3. Open Android Studio to sign and build
npx cap open android

# In Android Studio:
# Build > Generate Signed Bundle / APK
# Select "Android App Bundle"
# Choose release keystore
# Build
```

### Command Line Release Build (After Keystore Setup)

```bash
# Full release process
npm run build
npx cap sync android
cd android
./gradlew bundleRelease

# AAB will be at:
# android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🔄 Update Commands (For App Updates)

### Preparing an Update

```bash
# 1. Update version in android/app/build.gradle
# Edit: versionCode and versionName

# 2. Build web assets with changes
npm run build

# 3. Sync changes
npx cap sync android

# 4. Build new release
cd android
./gradlew bundleRelease

# 5. Test the new AAB
# 6. Upload to Play Console
```

---

## 💡 Useful Development Commands

### Live Reload (Development)

```bash
# Start dev server
npm run dev

# In another terminal, open Android Studio
npx cap open android

# In Android Studio, run app on emulator
# Changes will reload automatically
```

### Check Capacitor Plugins

```bash
# List installed plugins
npx cap ls

# Update Capacitor
npx cap update

# Doctor (check for issues)
npx cap doctor

# Plugin information
npx cap plugin
```

---

## 🛠️ Troubleshooting Commands

### Common Issues

**Issue: Gradle build fails**
```bash
cd android
./gradlew clean
rm -rf .gradle
./gradlew build --refresh-dependencies
```

**Issue: WebView shows blank screen**
```bash
npm run build
npx cap copy android
npx cap sync android
```

**Issue: Plugins not working**
```bash
npx cap sync android
npx cap update
cd android
./gradlew clean
```

**Issue: Capacitor version mismatch**
```bash
npm install @capacitor/core@latest @capacitor/cli@latest
npm install @capacitor/android@latest
npx cap sync
```

---

## 📝 Command Aliases (Optional)

Add these to your `~/.bashrc` or `~/.zshrc`:

```bash
# Rooted Tales shortcuts
alias rt-build="npm run build"
alias rt-sync="npx cap sync android"
alias rt-open="npx cap open android"
alias rt-release="cd android && ./gradlew bundleRelease && cd .."
alias rt-clean="cd android && ./gradlew clean && cd .."
alias rt-logcat="adb logcat | grep rootedtales"
alias rt-install="adb install -r android/app/build/outputs/apk/debug/app-debug.apk"
alias rt-uninstall="adb uninstall com.xenwinx.rootedtales"
```

Usage:
```bash
rt-build      # Build web assets
rt-sync       # Sync to Android
rt-open       # Open in Android Studio
rt-release    # Build release AAB
```

---

## 🎯 Quick Reference Table

| Task | Command | Location |
|------|---------|----------|
| Install deps | `npm install` | Root |
| Build web | `npm run build` | Root |
| Sync Android | `npx cap sync android` | Root |
| Open Android Studio | `npx cap open android` | Root |
| Build debug APK | `./gradlew assembleDebug` | /android |
| Build release AAB | `./gradlew bundleRelease` | /android |
| Clean build | `./gradlew clean` | /android |
| View logs | `adb logcat` | Anywhere |
| Install app | `adb install [apk-path]` | Anywhere |

---

## 📚 Additional Resources

**Official Documentation:**
- Capacitor: https://capacitorjs.com/docs
- Android Developers: https://developer.android.com
- Gradle: https://docs.gradle.org

**Tools:**
- Android Studio: https://developer.android.com/studio
- ADB Guide: https://developer.android.com/tools/adb

---

## ✅ Pre-Deployment Command Sequence

**Final build before Play Store submission:**

```bash
# 1. Ensure everything is committed
git status
git commit -am "Prepare for release v1.0.0"

# 2. Build web assets
npm run build

# 3. Sync with Android
npx cap sync android

# 4. Navigate to Android directory
cd android

# 5. Clean previous builds
./gradlew clean

# 6. Build release AAB
./gradlew bundleRelease

# 7. Verify output exists
ls -lh app/build/outputs/bundle/release/app-release.aab

# 8. Test on device (optional)
# Use Android Studio to install signed AAB

# 9. Ready for upload to Play Console! 🚀
```

---

**Last Updated:** December 29, 2025  
**App Version:** 1.0.0  
**Package:** com.xenwinx.rootedtales

---

**Need help?** Contact hub@xenwinx.com or review DEPLOYMENT_GUIDE.md
