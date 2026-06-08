# 📱 Rooted Tales - Complete User Flow & Android Export Guide

**Version**: 2.0  
**Date**: April 8, 2026  
**Developer**: Xenwinx Studio  

---

## 📋 TABLE OF CONTENTS

1. [Complete User Flow](#complete-user-flow)
2. [Files to Export for Android](#files-to-export-for-android)
3. [How to Earn Badges](#how-to-earn-badges)
4. [Bottom Navigation (Collapsing)](#bottom-navigation)
5. [Export Checklist](#export-checklist)

---

## 🚀 COMPLETE USER FLOW

### **Step 1: App Launch**

```
📱 Open App
   ↓
🎨 Splash Screen (2 seconds)
   ↓
🌟 Landing Page (First Time) OR Home Screen (Returning User)
```

**Files Involved**:
- `/components/SplashScreen.tsx` - Initial loading screen
- `/components/LandingPage.tsx` - First-time user welcome
- `/App.tsx` - Main app logic and routing

---

### **Step 2: Authentication Flow**

```
Landing Page
   ↓
🔐 Click "Get Started"
   ↓
📧 Auth Screen (Sign Up / Sign In)
   ↓
✅ Authenticated
   ↓
🏠 Home Screen
```

**Files Involved**:
- `/components/AuthScreen.tsx` - Login/signup interface
- `/components/LoginThemeSelector.tsx` - Theme selection during signup
- `/utils/supabase/info.tsx` - Supabase authentication utilities

**User Actions**:
1. Enter email & password
2. Choose theme (Forest, Ocean, Night, Sunset)
3. Create account OR sign in
4. System creates user profile in database

---

### **Step 3: Home Screen (Main Hub)**

```
🏠 HOME SCREEN
├── 👤 Welcome Message
├── 🎯 Quick Actions
│   ├── Continue Reading (if available)
│   ├── Browse Library
│   ├── Play Games
│   └── Character Gallery
├── 📊 Progress Overview
│   ├── Reading Streak
│   ├── Books Completed
│   └── Badges Earned
├── 🏆 Daily Rewards
└── 🎨 Featured Content
```

**Files Involved**:
- `/components/LandingPage.tsx` - Home screen UI
- `/components/DailyReward.tsx` - Daily login rewards
- `/components/ThemeUserBadge.tsx` - User badge display

**User Can**:
- View their reading progress
- Claim daily rewards
- Navigate to any section
- See achievements

---

### **Step 4: Library Flow (DETAILED)**

This is the main reading experience!

#### **4A: Browse Library**

```
🏠 Home → Tap "Library" in Bottom Nav
   ↓
📚 LIBRARY SCREEN
├── 🔍 Search Bar
├── 🎛️ Filter/Sort Options
│   ├── All Books
│   ├── In Progress
│   ├── Completed
│   └── Bookmarked
├── 📖 Book Display (3 Views)
│   ├── 🎠 Carousel View (Default)
│   ├── 🔲 Grid View
│   └── 📋 List View
└── 📚 12 Books Available
```

**Files Involved**:
- `/components/LibraryScreen.tsx` - Main library interface
- `/data/bookPages.ts` - All 12 books data (669 pages total)

**Book Collection**:
1. The Adventures of Rusty the Red Panda (27 pages)
2. Akai's Heart-warming Panda Reunion (75 pages)
3. Akai and Kaito in the Great Ocean Odyssey (54 pages)
4. Akai and The Curious Raccoons (52 pages)
5. Akai and The Quokka Quest (60 pages)
6. Akai and the Tale of The Sea Otter (61 pages)
7. Akai Remarkable Adventure with The Cozy Koala (85 pages)
8. Akai and Hedge: The Treasure of Friendship (64 pages)
9. Akai with The Playful Monkeys (51 pages)
10. Akai and The Joyful Elephant (44 pages)
11. Akai's lessons with The Wise Owls (47 pages)
12. Akai and The Lost Reindeer (49 pages)

---

#### **4B: Select a Book**

```
📚 Library → Tap Any Book
   ↓
📖 BOOK OVERVIEW SCREEN
├── 📸 Book Cover
├── 📝 Title & Description
├── 📊 Reading Progress
│   ├── Pages Read: X / Y
│   └── Percentage: Z%
├── 🔖 Bookmarks (if any)
├── ⏱️ Estimated Reading Time
└── 🎯 Action Buttons
    ├── ▶️ Start Reading (if new)
    ├── 📖 Continue Reading (if in progress)
    └── 🔄 Read Again (if completed)
```

**Files Involved**:
- `/components/BookOverview.tsx` - Book detail screen

**User Can**:
- View book details
- Check reading progress
- See bookmarks
- Start/continue/restart book

---

#### **4C: Immersive Reading Experience**

```
📖 Book Overview → Tap "Start Reading"
   ↓
📱 IMMERSIVE READER (Full Screen)
├── 📄 Page Display
│   └── Full-page image (from Supabase)
├── 🎮 Navigation Controls
│   ├── ← Previous Page
│   ├── Page Counter (Page X of Y)
│   └── → Next Page
├── 🔧 Reader Controls (Top Bar)
│   ├── ← Back to Library
│   ├── 🔖 Add Bookmark
│   ├── ⚙️ Settings
│   └── 📋 View Bookmarks
└── 🎨 3D Page Flip Animation
```

**Files Involved**:
- `/components/ImmersiveBookReader.tsx` - Main reader container
- `/components/FlipPage.tsx` - 3D page flip component
- `/components/BookmarkPanel.tsx` - Bookmark management

**Reading Features**:
1. **Page Flip Animation**: Realistic 3D page turn
2. **Swipe Gestures**: Swipe left/right to flip pages
3. **Tap Navigation**: Tap left/right edges to navigate
4. **Zoom**: Pinch to zoom 100%-200%
5. **Bookmarks**: Save favorite pages
6. **Auto-Save**: Progress saved automatically
7. **Settings**: Speed, sound, background music

---

#### **4D: Page Controls & Settings**

```
⚙️ SETTINGS MENU (While Reading)
├── 🎵 Sound Effects (On/Off)
├── 🎶 Background Music (On/Off)
├── ⏩ Page Flip Speed (Slow/Normal/Fast)
├── 🔊 Volume Control
└── 💾 Auto-Save (Always On)

🔖 BOOKMARKS PANEL
├── 📋 List of Bookmarked Pages
├── 🖼️ Page Thumbnail Preview
├── 🗑️ Remove Bookmark
└── 🔍 Jump to Page
```

**Files Involved**:
- `/components/BookSettings.tsx` - Reading settings
- `/components/BookmarkPanel.tsx` - Bookmark list

---

#### **4E: Exit Reading**

```
📖 Reading → Tap "Back" Button
   ↓
⚠️ EXIT CONFIRMATION
├── "Save progress and exit?"
├── ✅ Yes (Save & Exit)
└── ❌ Cancel (Continue Reading)
   ↓
💾 Progress Automatically Saved
   ↓
📚 Return to Library
```

**Files Involved**:
- `/components/ImmersiveBookReader.tsx` - Exit logic
- `/utils/dataSync.ts` - Progress sync to Supabase

**Auto-Save Features**:
- Current page saved every 5 seconds
- Bookmarks saved immediately
- Exit saves final position
- Data synced to Supabase cloud

---

### **Step 5: Character Gallery Flow**

```
🏠 Home → Tap "Gallery" in Bottom Nav
   ↓
🎭 CHARACTER GALLERY
├── 🦊 All Characters (Grid/List)
│   ├── Rusty (Red Panda)
│   ├── Akai (Red Panda)
│   ├── Kaito (Companion)
│   ├── Raccoons
│   ├── Quokkas
│   ├── Sea Otters
│   ├── Koalas
│   ├── Hedge (Hedgehog)
│   ├── Monkeys
│   ├── Elephants
│   ├── Wise Owls
│   └── Reindeer
├── 🔓 Unlock Progress
└── 🎮 Connected to Mini Games
```

**Files Involved**:
- `/components/CharacterGallery.tsx` - Character showcase
- `/utils/dataSync.ts` - Character unlock sync

**Unlock Mechanics**:
- Read books to unlock characters
- Win mini games to unlock bonus characters
- Complete achievements for special characters

---

### **Step 6: Mini Games Flow**

```
🏠 Home → Tap "Games" (via menu or quick action)
   ↓
🎮 MINI GAMES HUB
├── 🧩 Available Games
│   ├── 🌲 Maze Hunt
│   ├── 🎯 Memory Match
│   └── 🏃 Forest Run
├── 🏆 High Scores
└── 🎁 Rewards
   ↓
🎯 SELECT GAME → PLAY → WIN → EARN BADGES
   ↓
🔓 UNLOCK CHARACTERS (Synced to Gallery)
```

**Files Involved**:
- `/components/MiniGames.tsx` - Games hub
- `/components/MazeHuntGameRedesigned.tsx` - Maze game
- `/components/GameCompletionPopup.tsx` - Win screen
- `/utils/dataSync.ts` - Game-to-Gallery sync

**Game Rewards**:
- Win games → Earn badges
- High scores → Unlock special characters
- Daily challenges → Bonus rewards

---

### **Step 7: Store & E-Commerce**

```
🏠 Home → Tap "Store" in Bottom Nav
   ↓
🛍️ EBOOK STORE
├── 📚 Browse Books
├── 🛒 Shopping Cart
├── 💳 Checkout
│   ├── Payment Processing
│   ├── Secure Transaction
│   └── Download Book
└── 📥 Download Manager
```

**Files Involved**:
- `/components/EbookStore.tsx` - Store interface
- `/components/ShoppingCart.tsx` - Cart management
- `/components/CheckoutFlow.tsx` - Payment flow
- `/components/SecureCheckout.tsx` - Secure payment
- `/components/DownloadManager.tsx` - Download tracking

**Payment Options**:
- Credit/Debit Cards
- PayPal
- Apple Pay / Google Pay
- Subscription plans

---

### **Step 8: Profile & Achievements**

```
🏠 Home → Tap "Profile" in Bottom Nav
   ↓
👤 USER PROFILE
├── 📸 Profile Picture
├── 🎨 Theme Selection
├── 📊 Statistics
│   ├── 📚 Books Read
│   ├── 📖 Pages Read
│   ├── 🔥 Reading Streak
│   ├── 🎮 Games Won
│   └── ⏱️ Time Spent Reading
├── 🏆 BADGE COLLECTION (Interactive!)
│   ├── View All Badges
│   ├── Click Badge → See Requirements
│   └── Track Progress
├── ⚙️ Settings
│   ├── 🔊 Audio Settings
│   ├── 🌙 Sleep Timer
│   ├── 🎨 Theme Customization
│   └── 📱 App Preferences
└── 🚪 Logout
```

**Files Involved**:
- `/components/EnhancedUserProfile.tsx` - Profile screen
- `/components/BadgeCollection.tsx` - **INTERACTIVE BADGES** (NEW!)
- `/components/AudioSettings.tsx` - Sound settings
- `/components/SleepTimer.tsx` - Sleep timer feature
- `/components/ThemeSelection.tsx` - Theme switcher

---

### **Step 9: Bottom Navigation (NEW - Collapsing!)**

```
BOTTOM NAVIGATION BAR (Always Visible)
├── 🏠 Home
├── 🎭 Gallery
├── 📚 Library
├── 🛍️ Store
└── 👤 Profile

📜 SCROLL BEHAVIOR (NEW!)
├── Scroll Down → Navigation Slides Down (Hidden)
└── Scroll Up → Navigation Slides Up (Visible)
```

**Files Involved**:
- `/components/BottomNavigation.tsx` - **UPDATED** with auto-hide/show

**Auto-Hide Features**:
- Hides when scrolling down (more reading space)
- Shows when scrolling up (easy access)
- Always accessible via swipe-up gesture
- Smooth animation transitions

---

## 📦 FILES TO EXPORT FOR ANDROID

### **Core Application Files**

```
📂 ESSENTIAL EXPORTS FOR ANDROID
│
├── 📱 Components (All .tsx files in /components)
│   ├── BottomNavigation.tsx ⭐ (UPDATED - Collapsing)
│   ├── LibraryScreen.tsx ⭐ (Main library)
│   ├── ImmersiveBookReader.tsx ⭐ (Reader)
│   ├── FlipPage.tsx ⭐ (Page flip animation)
│   ├── BookOverview.tsx
│   ├── BadgeCollection.tsx ⭐ (UPDATED - Interactive)
│   ├── CharacterGallery.tsx
│   ├── MiniGames.tsx
│   ├── AuthScreen.tsx
│   ├── EnhancedUserProfile.tsx
│   ├── SplashScreen.tsx
│   ├── LandingPage.tsx
│   ├── EbookStore.tsx
│   ├── ShoppingCart.tsx
│   ├── CheckoutFlow.tsx
│   ├── DownloadManager.tsx
│   ├── AudioSettings.tsx
│   ├── SleepTimer.tsx
│   ├── ThemeSelection.tsx
│   ├── FAQSupport.tsx
│   ├── SupportChatbot.tsx
│   └── ... (all other components)
│
├── 📊 Data Files
│   ├── /data/bookPages.ts ⭐⭐⭐ (ALL 12 BOOKS - 669 PAGES)
│   └── /data/*.ts (any other data files)
│
├── 🎨 UI Components (/components/ui/)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── progress.tsx
│   ├── badge.tsx
│   └── ... (all shadcn/ui components)
│
├── 🔧 Utilities (/utils/)
│   ├── badgeUtils.ts ⭐ (Badge logic)
│   ├── dataSync.ts ⭐ (Data synchronization)
│   ├── audioHelpers.ts
│   ├── themeUtils.ts
│   ├── deviceUtils.ts
│   ├── mobileUtils.ts
│   └── supabase/ (Supabase utilities)
│
├── 🎨 Styles
│   └── /styles/globals.css ⭐ (Main styles)
│
├── 📱 Main App
│   ├── App.tsx ⭐⭐⭐ (ROOT COMPONENT)
│   ├── /src/main.tsx (Entry point)
│   └── index.html
│
├── 🤖 Android Specific
│   ├── /android/ ⭐⭐⭐ (ENTIRE FOLDER)
│   │   ├── AndroidManifest.xml
│   │   ├── build.gradle
│   │   ├── capacitor.config.json
│   │   └── app/src/main/...
│   │
│   ├── capacitor.config.ts ⭐
│   └── /public/ (Static assets)
│
├── 📚 Documentation
│   ├── COMPLETE_USER_FLOW_AND_EXPORT_GUIDE.md ⭐ (THIS FILE!)
│   ├── LIBRARY_COMPLETE_SUMMARY.md (12 books info)
│   ├── BADGE_EARNING_GUIDE.md (NEW - Badge guide)
│   └── /android/*.md (Android deployment docs)
│
└── 📄 Config Files
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── .env (WITH SUPABASE KEYS)
```

---

### **Critical Data Files for Books**

**⭐ MOST IMPORTANT FILE ⭐**

```typescript
📂 /data/bookPages.ts
├── 12 Books Defined
├── 669 Total Pages
├── Supabase Image URLs
└── Helper Functions
    ├── getBookData(bookId)
    └── getBookTitle(bookId)
```

**This file contains**:
- All 12 book definitions
- All 669 page image URLs (from Supabase)
- Smart URL generation
- ID mapping (numeric & string IDs)

**Example**:
```typescript
// Book 8: Akai and Hedge
'akai-hedge-treasure-friendship': {
  id: 'akai-hedge-treasure-friendship',
  title: 'Akai and Hedge: The Treasure of Friendship',
  contentType: 'image' as const,
  pages: Array.from({ length: 64 }, (_, i) => 
    `https://cxvvicjtyhkynedezmag.supabase.co/storage/v1/object/public/books/Akai%20and%20Hedge:%20The%20Treasure%20of%20Friendship/page-${String(i + 1).padStart(3, '0')}.png`
  ),
}
```

---

### **Android Build Process**

```bash
# Step 1: Install dependencies
npm install

# Step 2: Build for production
npm run build

# Step 3: Sync with Android
npx cap sync android

# Step 4: Open in Android Studio
npx cap open android

# Step 5: Build APK/AAB in Android Studio
```

**Required Android Files**:
1. `/android/` - Entire folder
2. `capacitor.config.ts` - Capacitor configuration
3. `/public/` - Static assets (icons, manifest)
4. Built JavaScript bundle (from `npm run build`)

---

### **Supabase Integration**

**Required Environment Variables** (`.env`):
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Supabase Storage Buckets Used**:
- `books/` - All 669 book page images
- `badges/` - Badge images
- `characters/` - Character images
- `user-uploads/` - Profile pictures

---

## 🏆 HOW TO EARN BADGES

See separate file: **`BADGE_EARNING_GUIDE.md`** (Created separately)

This includes:
- All badge types
- Unlock requirements
- Progress tracking
- Interactive badge viewer
- Click-to-learn feature

---

## 📱 BOTTOM NAVIGATION (COLLAPSING)

See updated file: **`/components/BottomNavigation.tsx`** (Updated separately)

**New Features**:
- Auto-hides when scrolling down
- Auto-shows when scrolling up
- Smooth slide animations
- Always accessible

---

## ✅ EXPORT CHECKLIST

### **Before Exporting**:

- [ ] ✅ All 12 books tested in library
- [ ] ✅ Reading flow works (start → read → bookmark → exit)
- [ ] ✅ Bottom navigation collapses/expands
- [ ] ✅ Badges are interactive (click to view requirements)
- [ ] ✅ Supabase URLs are correct
- [ ] ✅ Authentication works
- [ ] ✅ Data syncs to Supabase
- [ ] ✅ Mini games unlock characters
- [ ] ✅ Progress saves automatically
- [ ] ✅ Store checkout works
- [ ] ✅ Audio settings function
- [ ] ✅ Theme switching works
- [ ] ✅ Profile displays correctly

### **Files to Package**:

- [ ] ✅ `/components/` - All components
- [ ] ✅ `/data/bookPages.ts` - **CRITICAL**
- [ ] ✅ `/utils/` - All utilities
- [ ] ✅ `/styles/globals.css` - Styles
- [ ] ✅ `App.tsx` - Main app
- [ ] ✅ `/android/` - Android build files
- [ ] ✅ `capacitor.config.ts` - Capacitor config
- [ ] ✅ `.env` - Environment variables
- [ ] ✅ `package.json` - Dependencies
- [ ] ✅ Documentation files

### **Android Build Steps**:

1. [ ] Run `npm run build`
2. [ ] Run `npx cap sync android`
3. [ ] Open Android Studio
4. [ ] Test on emulator/device
5. [ ] Generate signed APK/AAB
6. [ ] Test signed build
7. [ ] Upload to Google Play Console

---

## 📊 USER JOURNEY SUMMARY

```
1. 🚀 Launch App → Splash Screen
2. 🔐 Sign In/Up → Choose Theme
3. 🏠 Home Screen → View Progress
4. 📚 Browse Library → 12 Books Available
5. 📖 Select Book → View Details
6. 📱 Start Reading → Immersive Reader
7. 📄 Flip Pages → 3D Animation
8. 🔖 Add Bookmarks → Save Favorites
9. 💾 Auto-Save → Progress Tracked
10. 🏆 Earn Badges → Click to Learn How
11. 🎮 Play Games → Unlock Characters
12. 👤 View Profile → See Achievements
13. 🛍️ Visit Store → Buy More Books
14. 🎨 Customize → Change Theme
15. 📱 Navigate → Bottom Bar (Auto-Hide)
```

---

## 🎉 SUCCESS METRICS

Your app now has:
- ✅ **12 interactive books** (669 pages)
- ✅ **3D page flip** animations
- ✅ **Collapsing navigation** bar
- ✅ **Interactive badges** with explanations
- ✅ **Character gallery** synced with games
- ✅ **E-commerce** integration
- ✅ **Progress tracking** & auto-save
- ✅ **Supabase backend** for all data
- ✅ **Ready for Android** deployment

---

**Document Created**: April 8, 2026  
**Maintained By**: Xenwinx Studio Development Team  
**Version**: 2.0 - Complete Edition  

**Next Steps**:
1. Review badge earning guide
2. Test collapsing navigation
3. Export for Android build
4. Deploy to Google Play Store! 🚀
