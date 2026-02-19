@echo off
REM ============================================
REM ROOTED TALES - ANDROID SETUP SCRIPT (Windows)
REM ============================================
REM This script automates the Android conversion process

echo 🌲 Rooted Tales - Android Setup Script
echo ========================================
echo.

REM ============================================
REM CHECK PREREQUISITES
REM ============================================
echo 📋 Checking prerequisites...

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)
node --version
echo ✅ Node.js installed

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)
npm --version
echo ✅ npm installed

REM Check Java
where java >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Java is not installed. You'll need JDK 11+ to build Android.
    echo    Download from: https://adoptium.net/
) else (
    java -version
    echo ✅ Java installed
)

echo.

REM ============================================
REM STEP 1: INSTALL DEPENDENCIES
REM ============================================
echo 📦 Step 1: Installing Capacitor and plugins...
echo This may take a few minutes...
echo.

call npm install @capacitor/core @capacitor/cli @capacitor/android
if %errorlevel% neq 0 (
    echo ❌ Failed to install Capacitor core
    pause
    exit /b 1
)

call npm install @capacitor/filesystem @capacitor/network @capacitor/preferences @capacitor/app @capacitor/status-bar @capacitor/splash-screen @capacitor/local-notifications @capacitor/haptics @capacitor/share @capacitor/browser
if %errorlevel% neq 0 (
    echo ❌ Failed to install essential plugins
    pause
    exit /b 1
)

call npm install @capacitor/screen-orientation @capacitor-community/keep-awake @capacitor-community/text-to-speech
if %errorlevel% neq 0 (
    echo ⚠️  Failed to install some recommended plugins (non-critical)
)

call npm install @revenuecat/purchases-capacitor
if %errorlevel% neq 0 (
    echo ⚠️  Failed to install payment plugin (non-critical)
)

echo.
echo ✅ All dependencies installed!
echo.

REM ============================================
REM STEP 2: BUILD WEB APP
REM ============================================
echo 🔨 Step 2: Building web application...
echo.

call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build web app
    pause
    exit /b 1
)

echo.
echo ✅ Web app built successfully!
echo.

REM ============================================
REM STEP 3: INITIALIZE CAPACITOR
REM ============================================
if not exist "capacitor.config.ts" (
    echo ⚙️  Step 3: Initializing Capacitor...
    call npx cap init "Rooted Tales" "com.xenwinx.rootedtales" --web-dir=dist
    if %errorlevel% neq 0 (
        echo ❌ Failed to initialize Capacitor
        pause
        exit /b 1
    )
    echo ✅ Capacitor initialized!
) else (
    echo ✅ Capacitor config already exists
)
echo.

REM ============================================
REM STEP 4: ADD ANDROID PLATFORM
REM ============================================
if not exist "android" (
    echo 📱 Step 4: Adding Android platform...
    call npx cap add android
    if %errorlevel% neq 0 (
        echo ❌ Failed to add Android platform
        pause
        exit /b 1
    )
    echo ✅ Android platform added!
) else (
    echo ✅ Android platform already exists
)
echo.

REM ============================================
REM STEP 5: SYNC TO ANDROID
REM ============================================
echo 🔄 Step 5: Syncing web assets to Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ❌ Failed to sync to Android
    pause
    exit /b 1
)
echo ✅ Synced to Android!
echo.

REM ============================================
REM STEP 6: CREATE MISSING RESOURCES
REM ============================================
echo 🎨 Step 6: Creating missing drawable resources...

if not exist "android\app\src\main\res\drawable" (
    mkdir android\app\src\main\res\drawable
)

if not exist "android\app\src\main\res\drawable\ic_notification.xml" (
    (
        echo ^<vector xmlns:android="http://schemas.android.com/apk/res/android"
        echo     android:width="24dp"
        echo     android:height="24dp"
        echo     android:viewportWidth="24"
        echo     android:viewportHeight="24"
        echo     android:tint="?attr/colorControlNormal"^>
        echo     ^<path
        echo         android:fillColor="@android:color/white"
        echo         android:pathData="M12,22c1.1,0 2,-0.9 2,-2h-4c0,1.1 0.89,2 2,2zM18,16v-5c0,-3.07 -1.64,-5.64 -4.5,-6.32V4c0,-0.83 -0.67,-1.5 -1.5,-1.5s-1.5,0.67 -1.5,1.5v0.68C7.63,5.36 6,7.92 6,11v5l-2,2v1h16v-1l-2,-2z"/^>
        echo ^</vector^>
    ) > android\app\src\main\res\drawable\ic_notification.xml
    echo ✅ Created ic_notification.xml
) else (
    echo ✅ ic_notification.xml already exists
)

if not exist "android\app\src\main\res\drawable\splash_icon.xml" (
    (
        echo ^<vector xmlns:android="http://schemas.android.com/apk/res/android"
        echo     android:width="288dp"
        echo     android:height="288dp"
        echo     android:viewportWidth="288"
        echo     android:viewportHeight="288"^>
        echo     ^<path
        echo         android:fillColor="#4ade80"
        echo         android:pathData="M144,50 L200,100 L200,200 L144,250 L88,200 L88,100 Z"/^>
        echo     ^<path
        echo         android:fillColor="#1a2f1a"
        echo         android:pathData="M144,100 L170,120 L170,180 L144,200 L118,180 L118,120 Z"/^>
        echo ^</vector^>
    ) > android\app\src\main\res\drawable\splash_icon.xml
    echo ✅ Created splash_icon.xml
) else (
    echo ✅ splash_icon.xml already exists
)

echo.

REM ============================================
REM STEP 7: CREATE KEYSTORE PROPERTIES
REM ============================================
echo 🔐 Step 7: Creating keystore.properties template...

if not exist "android\keystore.properties" (
    (
        echo # ============================================
        echo # KEYSTORE CONFIGURATION
        echo # ============================================
        echo # Replace these values with your actual keystore information
        echo # NEVER commit this file to Git!
        echo.
        echo storePassword=YOUR_STORE_PASSWORD_HERE
        echo keyPassword=YOUR_KEY_PASSWORD_HERE
        echo keyAlias=rooted-tales
        echo storeFile=../rooted-tales.keystore
        echo.
        echo # To create a keystore, run:
        echo # keytool -genkey -v -keystore rooted-tales.keystore -alias rooted-tales -keyalg RSA -keysize 2048 -validity 10000
    ) > android\keystore.properties
    echo ✅ Created keystore.properties template
    echo ⚠️  IMPORTANT: Update android\keystore.properties with your actual keystore info!
) else (
    echo ✅ keystore.properties already exists
)

REM Add to .gitignore
findstr /C:"keystore.properties" .gitignore >nul 2>nul
if %errorlevel% neq 0 (
    (
        echo.
        echo # Android keystore ^(sensitive!^)
        echo android/keystore.properties
        echo android/*.keystore
    ) >> .gitignore
    echo ✅ Added keystore files to .gitignore
)

echo.

REM ============================================
REM SUMMARY
REM ============================================
echo.
echo ========================================
echo ✅ ANDROID SETUP COMPLETE!
echo ========================================
echo.
echo Your Rooted Tales Android app is ready!
echo.
echo 📱 Next Steps:
echo.
echo 1. Open in Android Studio:
echo    npx cap open android
echo.
echo 2. Wait for Gradle sync to complete (2-5 minutes)
echo.
echo 3. Connect a device or start an emulator
echo.
echo 4. Click the green 'Run' button in Android Studio
echo.
echo 5. Your app will install and launch! 🎉
echo.
echo ========================================
echo 📚 Documentation:
echo ========================================
echo.
echo • ANDROID_SETUP_INSTRUCTIONS.md - Detailed setup guide
echo • CAPACITOR_SETUP_GUIDE.md - Full Capacitor guide
echo • CAPACITOR_PLUGINS.md - Plugin documentation
echo • PLAYSTORE_CHECKLIST.md - Play Store submission
echo.
echo ========================================
echo ⚠️  Important Reminders:
echo ========================================
echo.
echo • Create your keystore before building release APK
echo • Never commit keystore files or passwords to Git
echo • Test on multiple devices and Android versions
echo • Replace placeholder icons with your actual app icon
echo.
echo ========================================
echo Need help? Email: hub@xenwinx.com
echo ========================================
echo.

pause
