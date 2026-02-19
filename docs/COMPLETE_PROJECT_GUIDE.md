# 📚 Rooted Tales - Complete Project Guide

**Version:** 1.3.0+  
**Studio:** Xenwinx Studio  
**Platform:** Web (PWA) + Android  
**Framework:** React 18 + TypeScript + Vite + Capacitor 5

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Development Guide](#development-guide)
4. [Android Build & Deployment](#android-build--deployment)
5. [Google Play Store Submission](#google-play-store-submission)
6. [Backend & Supabase](#backend--supabase)
7. [Data Sync System](#data-sync-system)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

### What is Rooted Tales?

Rooted Tales is a mobile-first interactive children's book reading application featuring red pandas and forest animals. The app combines storytelling with gamification, offering an engaging reading experience for children.

### Core Features

✅ **User Authentication** - Login/Register/Guest mode  
✅ **Book Library** - 12 books with carousel views, filtering, and search  
✅ **Interactive Book Reader** - TTS, highlights, bookmarks, audio narration  
✅ **Character Gallery** - 34 animated forest creatures across 4 habitats  
✅ **Mini Games** - 4 fully playable games (Maze Hunt, Trivia, Word Puzzle, Memory Match)  
✅ **E-commerce** - Store, cart, checkout flow  
✅ **Offline Mode** - PWA with service worker  
✅ **Reading History** - Track progress and achievements  
✅ **Theme Personalization** - 4 character themes  
✅ **Audio Settings** - TTS customization, sleep timer  
✅ **User Profiles** - Avatar upload, achievements, badges  
✅ **AI Support Chatbot** - Gaming-themed FAQ assistant  

### Admin Features

- Book Management (upload and manage books)
- Character Gallery Management
- Analytics Dashboard

---

## 🚀 Quick Start

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
Android Studio (for Android builds)
JDK 11+ (for Android builds)
```

### Installation

```bash
# Clone repository
git clone https://github.com/your-repo/rooted-tales.git
cd rooted-tales

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### First-Time Setup

1. **Login Options:**
   - Guest Mode (no registration required)
   - Register new account
   - Login with existing account

2. **Admin Access:**
   - Email: `admin@rootedtales.com`
   - Password: `admin123`

---

## 🛠️ Development Guide

### Project Structure

```
rooted-tales/
├── android/                    # Android Studio project
│   ├── app/                   # Main Android app
│   │   ├── src/main/         # Java source files
│   │   │   ├── java/com/xenwinx/rootedtales/
│   │   │   │   ├── MainActivity.java
│   │   │   │   ├── RootedTalesApplication.java
│   │   │   │   └── services/DownloadService.java
│   │   │   ├── res/          # Android resources
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle      # App build config
│   ├── build.gradle          # Project build config
│   └── capacitor.config.json # Capacitor Android config
│
├── components/                # React components
│   ├── ui/                   # Reusable UI components
│   ├── figma/                # Protected Figma components
│   ├── MiniGames.tsx        # Game hub
│   ├── BookReader.tsx       # Reading interface
│   ├── CharacterGallery.tsx # Character showcase
│   └── ...                  # Other components
│
├── styles/                   # Global CSS
│   └── globals.css
│
├── utils/                    # Utility functions
│   ├── dataSync.ts          # Data fetching utilities
│   ├── useDataSync.ts       # React hooks for data
│   ├── badgeUtils.ts        # Badge system
│   └── themeUtils.ts        # Theme management
│
├── supabase/                # Backend
│   └── functions/
│       └── server/
│           ├── index.tsx    # API endpoints
│           └── kv_store.tsx # Database utilities
│
├── documentation/           # Technical docs
├── legal/                   # Legal documents
├── guidelines/              # Coding guidelines
├── public/                  # Static assets
├── scripts/                 # Build scripts
│
├── App.tsx                  # Main component
├── capacitor.config.ts     # Capacitor config
├── package.json            # Dependencies
└── vite.config.ts          # Vite config
```

### Component Development

#### Adding New Components

**1. Create Component File**
```typescript
// components/MyNewFeature.tsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface MyNewFeatureProps {
  user: User | null;
  onAction?: () => void;
}

export function MyNewFeature({ user, onAction }: MyNewFeatureProps) {
  const [state, setState] = useState(false);
  
  return (
    <Card>
      <CardContent>
        <h2>My New Feature</h2>
        <Button onClick={onAction}>Action</Button>
      </CardContent>
    </Card>
  );
}
```

**2. Import in App.tsx**
```typescript
import { MyNewFeature } from './components/MyNewFeature';

// Add to screen types
type Screen = 'home' | 'library' | 'my-new-feature' | ...;

// Add case in renderScreen
case 'my-new-feature':
  return <MyNewFeature user={user} />;
```

**3. Add Navigation**
```typescript
// In BottomNavigation.tsx
{
  name: 'Feature',
  icon: Sparkles,
  screen: 'my-new-feature'
}
```

### Naming Conventions

- **PascalCase** for components: `MiniGames.tsx`, `BookReader.tsx`
- **camelCase** for utilities: `badgeUtils.ts`, `themeUtils.ts`
- **kebab-case** for CSS: `globals.css`

### Working with Themes

```typescript
// Get current theme
const theme = localStorage.getItem('userTheme') || 'forest';

// Available themes: 'forest', 'ocean', 'sunset', 'starry-night'

// Apply theme in component
<div className={`theme-${theme}`}>
  {/* Content */}
</div>
```

### User State Management

```typescript
// User state is managed via localStorage
const [user, setUser] = useState<User | null>(() => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
});

// Update user data
const updateUser = (updates: Partial<User>) => {
  const updatedUser = { ...user, ...updates };
  setUser(updatedUser);
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
};
```

---

## 📱 Android Build & Deployment

### Build Process

The Android build follows a three-command sequence:

**1. Build Web Assets**
```bash
npm run build
```
- Compiles TypeScript to JavaScript
- Bundles React components
- Optimizes assets
- Outputs to `/dist` folder

**2. Sync to Android**
```bash
npx cap sync android
```
- Copies `/dist` to Android project
- Updates Capacitor plugins
- Prepares Android files

**3. Open in Android Studio**
```bash
npx cap open android
```
- Opens project in Android Studio
- Ready for building/testing

### Creating Release APK

**Option 1: Using Android Studio (Recommended)**

1. Open project: `npx cap open android`
2. Menu: **Build** → **Generate Signed Bundle / APK**
3. Select **APK**
4. Choose keystore (create if first time)
5. Select **release** build variant
6. Click **Finish**

APK location: `android/app/release/app-release.apk`

**Option 2: Using Gradle Command Line**

```bash
cd android
./gradlew assembleRelease

# APK output:
# android/app/build/outputs/apk/release/app-release.apk
```

### Creating Keystore (First Time)

```bash
keytool -genkey -v -keystore rooted-tales-release.keystore \
  -alias rooted-tales \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Store securely:**
- Keystore file: `rooted-tales-release.keystore`
- Alias: `rooted-tales`
- Passwords: Store in password manager

### Testing APK

```bash
# Install on connected device
adb install -r android/app/release/app-release.apk

# Or drag-drop APK to emulator
```

### Build Variants

- **debug** - Development, includes source maps
- **release** - Production, optimized and signed

---

## 🚀 Google Play Store Submission

### Pre-Submission Checklist

#### App Development
- [ ] All features working correctly
- [ ] No crashes or major bugs
- [ ] Tested on multiple devices/Android versions
- [ ] Offline mode working
- [ ] Performance optimized
- [ ] Battery usage reasonable

#### Legal & Compliance
- [ ] Privacy Policy created and hosted
- [ ] Terms of Service created
- [ ] Age rating: PEGI 3 / Everyone
- [ ] COPPA compliance (children's app)
- [ ] GDPR compliance (if targeting EU)
- [ ] Content appropriate for children

### Required Store Assets

#### 1. App Icon
- **Size**: 512×512 pixels
- **Format**: PNG, 32-bit, no transparency
- **Design**: Recognizable at small sizes

#### 2. Feature Graphic
- **Size**: 1024×500 pixels
- **Format**: PNG or JPEG
- **Content**: App name, tagline, key visual (Rusty the Red Panda)

#### 3. Screenshots (Minimum 2, Maximum 8)
- **Size**: 1080×2400 pixels (portrait)
- **Format**: PNG or JPEG

**Recommended Screenshots:**
1. Home Screen - Landing page
2. Library - Book collection
3. Book Reader - Reading interface
4. Character Gallery - Forest friends
5. Mini Games - Game selection
6. Profile - User achievements
7. Store - Book purchases
8. Settings - Customization

#### 4. App Description

**Short Description (80 characters max):**
```
Interactive children's books featuring Rusty the Red Panda and friends!
```

**Full Description (4000 characters max):**
```
🐾 Rooted Tales - Where Reading Comes Alive! 🌲

Join Rusty the Red Panda and his forest friends on magical adventures through 
interactive children's books designed to inspire young readers.

📚 FEATURES:
• 12 beautifully illustrated stories
• 34 lovable forest characters
• 4 educational mini-games
• Read-aloud with Text-to-Speech
• Offline reading mode
• Safe, ad-free environment
• Progress tracking & achievements

🎮 MINI GAMES:
• Maze Hunt - Navigate through forest mazes
• Character Trivia - Learn fun facts
• Word Puzzle - Build vocabulary
• Memory Match - Sharpen memory skills

🌟 PERSONALIZATION:
• Choose your theme (Forest, Ocean, Sunset, Starry Night)
• Customize reading experience
• Earn badges and rewards

✨ PERFECT FOR:
• Ages 3-8
• Beginning readers
• Bedtime stories
• Educational play

🔒 SAFE & SECURE:
• No ads or in-app purchases
• COPPA compliant
• Parent-controlled settings
• Privacy-focused design

Download Rooted Tales today and watch your child's imagination soar! 🚀
```

### App Category & Content Rating

- **Category**: Education > Books & Reference
- **Content Rating**: Everyone (PEGI 3)
- **Target Audience**: Children ages 3-8

### Privacy Policy URL

Host your privacy policy online and provide the URL:
```
https://yourwebsite.com/privacy-policy
```

### Google Play Console Steps

1. **Create App**
   - Sign in to Google Play Console
   - Click "Create app"
   - Select language and app name
   - Declare if it's a game or app
   - Accept declarations

2. **App Content**
   - Privacy Policy URL
   - App Access (all features available)
   - Ads (declare if using ads)
   - Content Rating questionnaire
   - Target audience (children)
   - Data safety form

3. **Store Listing**
   - Upload icon, screenshots, graphics
   - Write descriptions
   - Categorization
   - Contact details

4. **Production Release**
   - Upload signed APK/AAB
   - Set countries/regions
   - Pricing (free or paid)
   - Submit for review

### Review Timeline

- **Initial Review**: 7-14 days
- **Updates**: 1-3 days

---

## 🗄️ Backend & Supabase

### Architecture

Rooted Tales uses a three-tier architecture:

```
Frontend (React) → Server (Supabase Edge Function) → Database (KV Store)
```

### Supabase Edge Function

**Server Endpoint:**
```
https://{projectId}.supabase.co/functions/v1/make-server-eda44699/
```

**Available Routes:**

#### Characters
- `GET /characters` - Get all characters
- `GET /characters/:id` - Get single character
- `POST /characters` - Create character
- `PUT /characters/:id` - Update character
- `DELETE /characters/:id` - Delete character
- `GET /characters/:id/image` - Get character image URL

#### Books
- `GET /books` - Get all books
- `GET /books/:id` - Get single book
- `GET /books/:id/cover` - Get book cover URL

#### Audio
- `GET /audio/background/:soundName` - Get background music
- `GET /audio/effect/:soundName` - Get sound effect

#### Data Seeding
- `POST /seed-data` - Seed initial character and book data

### Storage Buckets

All storage buckets are **private** (use signed URLs):

- `make-eda44699-book-covers` - Book cover images
- `make-eda44699-book-pages` - Book page images
- `make-eda44699-book-content` - Book content files
- `make-eda44699-characters` - Character images
- `make-eda44699-audio-tts` - TTS audio files
- `make-eda44699-audio-effects` - Sound effects
- `make-eda44699-audio-background` - Background music
- `make-eda44699-game-assets` - Game assets
- `make-eda44699-avatars` - User avatars

---

## 🔄 Data Sync System

### Overview

The data sync system provides centralized data management for characters and books with smart caching and fallback mechanisms.

### Key Files

**1. `/utils/dataSync.ts`** - Core data fetching utilities
```typescript
import { fetchCharacters, fetchBooks, Character, Book } from './utils/dataSync';

// Fetch all characters
const characters = await fetchCharacters();

// Fetch all books
const books = await fetchBooks();

// Get specific character
const akai = await getCharacterById('1');

// Get characters by category
const forestCharacters = await getCharactersByCategory('forest');
```

**2. `/utils/useDataSync.ts`** - React hooks
```typescript
import { useDataSync, useCharacters, useBooks } from './utils/useDataSync';

function MyComponent() {
  const { characters, books, isLoading, error, refetch } = useDataSync();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {characters.map(char => <div key={char.id}>{char.name}</div>)}
    </div>
  );
}
```

### Features

✅ **Smart Caching** - 5-minute cache duration  
✅ **Auto Fallback** - Uses local data if backend unavailable  
✅ **Health Check** - Detects if backend is deployed  
✅ **Auto Seeding** - Populates empty database automatically  
✅ **Type Safety** - Full TypeScript support  

### Data Structure

**Character Interface:**
```typescript
interface Character {
  id: string;
  name: string;
  image: string;
  category: 'forest' | 'ocean' | 'mountain' | 'desert';
  description: string;
  animalType: string;
  book: string;
  fact: string;
  skills?: string[];
  personality?: string[];
  habitat?: string;
  favoriteFood?: string;
}
```

**Book Interface:**
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverColor?: string;
  readingTime?: string;
  pages?: number;
  price?: string;
  characters?: string[]; // Character IDs
}
```

### Fallback Data

The app includes comprehensive fallback data:
- **34 Characters** across 4 habitats (forest, ocean, mountain, desert)
- **12 Books** featuring various characters

This ensures the app works perfectly even without a backend connection.

---

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

**Problem:** `npm run build` fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Problem:** TypeScript errors
```bash
# Check TypeScript version
npm list typescript

# Update if needed
npm install -D typescript@latest
```

#### Android Build Issues

**Problem:** Gradle build fails
```bash
cd android
./gradlew clean
./gradlew build
```

**Problem:** SDK not found
```bash
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk    # Windows
```

**Problem:** Out of memory during build
```bash
# Edit android/gradle.properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
```

#### Data Sync Issues

**Problem:** Backend not available
```
ℹ️ Backend not deployed yet - using local fallback data
```
**Solution:** This is normal. The app uses comprehensive fallback data.

**Problem:** Empty character/book lists
```typescript
// Force refresh cache
import { clearDataCache, prefetchData } from './utils/dataSync';

clearDataCache();
await prefetchData();
```

#### Performance Issues

**Problem:** App runs slowly
- Check Chrome DevTools → Performance
- Optimize images (compress to WebP)
- Reduce bundle size (check `npm run build` output)
- Enable code splitting

**Problem:** High memory usage
- Clear localStorage periodically
- Limit cached images
- Optimize component re-renders (React.memo)

---

## 📞 Support & Resources

### Documentation Files

- **Legal Documents:** `/legal/`
  - Privacy Policy
  - EULA Terms of Use
  - App Permissions Explained

- **Technical Docs:** `/documentation/`
  - Backend API Specification
  - E-book Security Implementation

- **Guidelines:** `/guidelines/`
  - Coding Guidelines

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Android
npx cap sync android     # Sync to Android
npx cap open android     # Open Android Studio
cd android && ./gradlew assembleRelease  # Build release APK

# Utilities
npm run lint             # Lint code
npm run type-check       # TypeScript check
```

### Quick Links

- **Android Documentation:** `/android/README.md`
- **Deployment Guide:** `/android/DEPLOYMENT_GUIDE.md`
- **Build Commands:** `/android/BUILD_COMMANDS.md`

---

## 📄 License

© 2024 Xenwinx Studio. All rights reserved.

---

**Last Updated:** February 12, 2026  
**Version:** 1.3.0+
