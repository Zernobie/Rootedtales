# Rooted Tales - Android Deployment Guide

## 📱 Complete Android Conversion Package

**Version:** 1.0.0  
**Package Name:** com.xenwinx.rootedtales  
**Company:** XenWinx  
**Contact:** hub@xenwinx.com

---

## 🎯 Package Contents

This complete Android conversion package includes:

✅ **Android Native Configuration**
- AndroidManifest.xml with all permissions and configurations
- MainActivity.java with WebView optimizations
- RootedTalesApplication.java for app initialization
- Build configuration files (build.gradle, settings.gradle)
- ProGuard rules for code optimization

✅ **Capacitor Configuration**
- capacitor.config.json with all plugin settings
- Native plugin integrations (Splash, StatusBar, Keyboard, etc.)
- Deep linking support

✅ **Resources & Assets**
- App icons (launcher icons)
- Splash screen with brand colors
- Theme colors and styles
- String resources

✅ **Latest App Features**
- 12 interactive children's books with professional covers
- 4 themed experiences (Forest, Ocean, Sunset, Night)
- E-commerce functionality with subscription tiers
- Badge collection system with themed icons
- Character gallery
- Physical journal product ($39.99)
- Comprehensive FAQ/Support system
- User authentication & profiles
- Audio settings with TTS
- Admin functionality

---

## 📋 Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   node --version
   ```

2. **Android Studio** (Latest stable version)
   - Download: https://developer.android.com/studio
   - Install Android SDK (API 34)
   - Install Android SDK Build-Tools
   - Install Android Emulator (optional for testing)

3. **Java Development Kit (JDK 17)**
   ```bash
   java -version
   ```

4. **Capacitor CLI**
   ```bash
   npm install -g @capacitor/cli
   ```

5. **Gradle** (Usually bundled with Android Studio)

---

## 🚀 Build Instructions

### Step 1: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Capacitor and plugins
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard
npm install @capacitor/status-bar @capacitor/splash-screen
npm install @capacitor/preferences @capacitor/network @capacitor/share
npm install @capacitor/filesystem @capacitor/device @capacitor/browser
```

### Step 2: Build Web Assets

```bash
# Build the React application
npm run build

# This creates the 'dist' folder with optimized web assets
```

### Step 3: Initialize Capacitor (If not already done)

```bash
# Initialize Capacitor
npx cap init "Rooted Tales" "com.xenwinx.rootedtales"

# Copy web assets to Android
npx cap copy android

# Sync changes
npx cap sync android
```

### Step 4: Open in Android Studio

```bash
# Open the Android project in Android Studio
npx cap open android
```

### Step 5: Configure Signing

1. In Android Studio, go to **Build > Generate Signed Bundle / APK**
2. Create a new keystore or use an existing one:
   - **Keystore path:** `/android/release-key.keystore`
   - **Keystore password:** [YOUR_PASSWORD]
   - **Key alias:** `rootedtales-key`
   - **Key password:** [YOUR_PASSWORD]
   
3. Save keystore credentials securely!

**Creating Keystore via Command Line:**
```bash
cd android/app
keytool -genkey -v -keystore release-key.keystore -alias rootedtales-key -keyalg RSA -keysize 2048 -validity 10000
```

### Step 6: Build Release APK/AAB

#### Option A: Using Android Studio
1. **Build > Generate Signed Bundle / APK**
2. Select **Android App Bundle** (recommended for Play Store)
3. Select your keystore and enter credentials
4. Choose **release** build variant
5. Click **Finish**

#### Option B: Using Command Line
```bash
cd android

# For APK
./gradlew assembleRelease

# For Android App Bundle (AAB) - RECOMMENDED
./gradlew bundleRelease
```

**Output locations:**
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🎨 App Icons & Assets

### Launcher Icons

Create launcher icons for all densities:

```
android/app/src/main/res/
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
├── mipmap-xxxhdpi/ic_launcher.png (192x192)
└── mipmap-anydpi-v26/ic_launcher.xml (Adaptive icon)
```

**Recommended Tool:** Use Android Studio's Image Asset Studio:
- Right-click `res` folder
- New > Image Asset
- Configure foreground and background layers
- Use brand colors: Primary #22c55e, Background #1a472a

### Splash Screen

The splash screen is already configured with:
- Background: Forest green gradient (#1a472a)
- Icon: Red panda with tree logo
- Duration: 2 seconds

To customize, edit:
- `android/app/src/main/res/drawable/splash_background.xml`
- `android/app/src/main/res/drawable/splash_icon.xml`

---

## 📦 Google Play Store Submission

### 1. Create Google Play Developer Account

- Visit: https://play.google.com/console
- Pay one-time registration fee ($25 USD)
- Complete account setup

### 2. Create New App

1. Click **Create app**
2. Fill in details:
   - **App name:** Rooted Tales
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free (with in-app purchases)

### 3. Complete Store Listing

#### Store Listing Details

**App name:**
```
Rooted Tales
```

**Short description:** (80 characters max)
```
Interactive children's books about red pandas and forest animals
```

**Full description:** (4000 characters max)
```
🌲 Welcome to Rooted Tales - Interactive Children's Books 🐾

Embark on magical adventures with Akai the red panda and friends! Rooted Tales brings interactive storytelling to life with beautiful illustrations, engaging narratives, and educational content perfect for young readers.

✨ FEATURES

📚 12 Interactive Books
Explore captivating stories featuring:
- Akai's Forest Adventure
- Mei's Ocean Journey  
- Leo's Mountain Quest
- And 9 more enchanting tales!

🎨 Four Magical Themes
- Forest: Lush green woodlands
- Ocean: Deep blue waters
- Sunset: Warm golden horizons
- Starry Night: Mystical evening skies

🏆 Achievement System
- Unlock badges as you read
- Complete themed collections
- Track your reading progress
- Earn special rewards

🎮 Interactive Activities
- Character galleries
- Mini games
- Audio narration with TTS
- Customizable reading preferences

👤 Personalized Experience
- Create your profile
- Choose your favorite theme
- Save reading progress
- Track achievements

💎 Akai's Adventure Club
Join our subscription service for exclusive benefits:
- Premium books and content
- Early access to new stories
- Special character badges
- Ad-free experience

📖 Physical Journal
Order the beautiful Rooted Tales Journal:
- 96 premium pages
- Animal illustrations
- Perfect for young writers
- $39.99 with free shipping

🎓 EDUCATIONAL VALUE

Rooted Tales promotes:
✓ Reading comprehension
✓ Environmental awareness
✓ Character development
✓ Creative thinking
✓ Cultural appreciation

Perfect for children ages 4-10!

🌟 WHY CHOOSE ROOTED TALES?

✓ Safe, ad-supported free content
✓ High-quality illustrations
✓ Engaging storylines
✓ Regular content updates
✓ Parent-friendly controls
✓ No personal data collection

📬 SUPPORT

Need help? Contact us at hub@xenwinx.com
Visit our FAQ section for quick answers

🦊 Join the Rooted Tales family today and discover the magic of reading! 🌲✨

---

Note: Rooted Tales contains optional in-app purchases for premium subscriptions and physical products. All purchases are handled securely through authorized payment providers.
```

#### App Categories

- **Category:** Education
- **Sub-category:** Books & Reference / Children's Books
- **Tags:** children, books, stories, education, reading, red panda, interactive

#### Contact Details

```
Email: hub@xenwinx.com
Website: https://rootedtales.xenwinx.com
Privacy Policy: https://rootedtales.xenwinx.com/privacy
```

#### Graphics Assets Required

**App Icon:**
- 512 x 512 px, 32-bit PNG with alpha
- Must match launcher icon

**Feature Graphic:**
- 1024 x 500 px, JPG or 24-bit PNG (no alpha)
- Showcase app with logo and key features

**Phone Screenshots:** (Minimum 2, maximum 8)
- JPEG or 24-bit PNG (no alpha)
- Min: 320px, Max: 3840px
- Min dimension must be at least 320px
- Max dimension must be at most 3840px
- Aspect ratio: 16:9 to 9:16

Recommended screenshots (385 x 830 px):
1. Home screen with book carousel
2. Book reading interface
3. Character gallery
4. Badge collection
5. Subscription comparison
6. Theme switcher
7. User profile
8. Store page

**Tablet Screenshots:** (Optional but recommended)
- 7-inch and 10-inch tablet screenshots

**Promotional Video:** (Optional)
- YouTube URL showcasing app features

### 4. Content Rating

Complete the content rating questionnaire:
- Target age group: Ages 4-10
- No violence, sexual content, or inappropriate material
- Expected rating: ESRB Everyone, PEGI 3

### 5. App Content

**Privacy Policy:**
```
https://rootedtales.xenwinx.com/privacy-policy
```

**Data Safety:**
- ✓ App doesn't collect or share user data
- ✓ Data is encrypted in transit
- ✓ No third-party data sharing
- ✓ Optional: Users can request data deletion

**Ads:**
- ✓ App contains ads (for free tier)
- Ad providers: [Your ad network]

**In-app purchases:**
- ✓ Contains in-app purchases
  - Premium Subscription: $4.99/month
  - Premium+ Subscription: $6.99/month
  - Physical Journal: $39.99

### 6. Select Countries and Regions

- Worldwide (or select specific countries)
- Primary country: United States

### 7. Pricing & Distribution

- **Price:** Free
- **In-app purchases:** Yes
- **Contains ads:** Yes (free tier only)
- **Target audience:** Children
- **Distribution:** Google Play

### 8. Upload App Bundle

1. Go to **Production > Create new release**
2. Upload the **AAB file** (app-release.aab)
3. Fill in release notes:

```
Version 1.0.0 - Initial Release

🌲 Welcome to Rooted Tales!

✨ Features:
• 12 interactive children's books
• 4 magical themes (Forest, Ocean, Sunset, Night)
• Character galleries and achievements
• Badge collection system
• Subscription tiers (Free, Premium, Premium+)
• Physical journal available for purchase
• User profiles with progress tracking
• Audio narration support
• FAQ and support system

Start your reading adventure today! 🐾📚
```

### 9. Review & Publish

1. Complete all required sections
2. Review **Publishing overview** for any issues
3. Click **Send for review**
4. Google will review your app (typically 1-7 days)
5. Once approved, app will go live!

---

## 🔒 Security Checklist

✅ **Code Obfuscation**
- ProGuard enabled for release builds
- R8 full mode enabled
- Source maps removed

✅ **API Keys**
- All sensitive keys stored in environment variables
- No hardcoded credentials
- Supabase keys properly configured

✅ **Permissions**
- Only necessary permissions requested
- Runtime permission handling
- Clear permission explanations

✅ **Data Protection**
- HTTPS only (no cleartext traffic)
- Data encrypted in transit
- Secure WebView configuration

✅ **App Signing**
- Release signed with proper keystore
- Keystore backed up securely
- SHA-1/SHA-256 fingerprints documented

---

## 🧪 Testing Checklist

### Before Submission

✅ **Functionality**
- [ ] All 12 books load correctly
- [ ] Theme switching works (Forest, Ocean, Sunset, Night)
- [ ] Badge collection displays properly
- [ ] Character gallery functional
- [ ] Subscription pages load
- [ ] Store and cart work correctly
- [ ] User authentication flows
- [ ] Profile creation and editing
- [ ] FAQ/Support system
- [ ] Audio settings and TTS

✅ **Navigation**
- [ ] Bottom navigation (5 tabs)
- [ ] Sidebar navigation
- [ ] Deep linking works
- [ ] Back button behavior correct

✅ **Performance**
- [ ] App starts quickly (<3 seconds)
- [ ] Smooth scrolling
- [ ] No memory leaks
- [ ] Images load efficiently
- [ ] Animations smooth (60fps)

✅ **UI/UX**
- [ ] Mobile dimensions (385x830px)
- [ ] All text readable
- [ ] Buttons properly sized
- [ ] Touch targets adequate
- [ ] No overlapping elements

✅ **Device Testing**
- [ ] Test on Android 7.0 (API 24)
- [ ] Test on Android 11 (API 30)
- [ ] Test on Android 14 (API 34)
- [ ] Test on small phone (4.7")
- [ ] Test on large phone (6.5"+)
- [ ] Test on tablet (optional)

✅ **Error Handling**
- [ ] No internet connection handled
- [ ] Failed API calls handled gracefully
- [ ] Loading states shown
- [ ] Error messages user-friendly

---

## 🔄 Update Process

### For Future Updates

1. **Update version in:**
   ```gradle
   // android/app/build.gradle
   versionCode 2 // Increment by 1
   versionName "1.1.0" // Update semantic version
   ```

2. **Build new web assets:**
   ```bash
   npm run build
   npx cap copy android
   npx cap sync android
   ```

3. **Generate new signed bundle:**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

4. **Upload to Play Console:**
   - Go to Production > Create new release
   - Upload new AAB
   - Add release notes
   - Submit for review

---

## 📊 Analytics & Monitoring

### Recommended Services

**Crash Reporting:**
- Firebase Crashlytics
- Sentry

**Analytics:**
- Google Analytics for Firebase
- Mixpanel

**Performance:**
- Firebase Performance Monitoring
- Android Vitals (built into Play Console)

**User Feedback:**
- In-app feedback form
- Play Store reviews monitoring
- Email support (hub@xenwinx.com)

---

## 🐛 Troubleshooting

### Common Issues

**Build Failed - Gradle sync:**
```bash
cd android
./gradlew clean
./gradlew build --refresh-dependencies
```

**WebView blank screen:**
- Check `capacitor.config.json` webDir points to correct folder
- Ensure `npm run build` completed successfully
- Check browser console for JavaScript errors

**Splash screen not showing:**
- Verify splash screen images exist in drawable folders
- Check `styles.xml` splash theme configuration

**Deep links not working:**
- Verify AndroidManifest.xml intent-filter configuration
- Test with: `adb shell am start -a android.intent.action.VIEW -d "rootedtales://open"`

**Keyboard covering input:**
- Check `android:windowSoftInputMode` in AndroidManifest.xml
- Should be: `adjustResize`

---

## 📞 Support

**Developer:** XenWinx  
**Email:** hub@xenwinx.com  
**Package:** com.xenwinx.rootedtales  
**Version:** 1.0.0

For technical support during deployment, contact hub@xenwinx.com

---

## 📜 License

Copyright © 2025 XenWinx. All rights reserved.

---

## ✅ Final Checklist

Before submitting to Google Play Store:

- [ ] All code committed and backed up
- [ ] Keystore file backed up securely
- [ ] Signing credentials documented
- [ ] Privacy policy URL active
- [ ] Support email functional (hub@xenwinx.com)
- [ ] All screenshots prepared (8 images)
- [ ] Feature graphic created (1024x500px)
- [ ] App icon finalized (512x512px)
- [ ] Store listing descriptions written
- [ ] Content rating completed
- [ ] Pricing configured correctly
- [ ] App tested on multiple devices
- [ ] All features working correctly
- [ ] Release AAB built and signed
- [ ] Google Play Developer account ready

---

**🎉 Your Rooted Tales Android app is ready for deployment!**

Good luck with your launch! 🚀🌲🐾
