# 📚 Rooted Tales - Interactive Children's Book App

<div align="center">

![Version](https://img.shields.io/badge/version-1.3.0-brightgreen)
![Platform](https://img.shields.io/badge/platform-Android-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Capacitor](https://img.shields.io/badge/Capacitor-5.7.4-2563EB)
![License](https://img.shields.io/badge/license-MIT-green)

**A mobile-first interactive reading application featuring red pandas and forest animals**

[Features](#-features) • [Quick Start](#-quick-start) • [Restructure](#-restructuring-required) • [Documentation](#-documentation)

</div>

---

## ⚠️ IMPORTANT: Restructuring Required

**This project export requires a one-time restructuring before use.**

### Quick Restructure (2 minutes):

**Windows:**
```powershell
.\RESTRUCTURE.ps1
```

**macOS/Linux:**
```bash
chmod +x RESTRUCTURE.sh
./RESTRUCTURE.sh
```

The script will:
- ✅ Move `App.tsx`, `main.tsx`, `index.css` to `src/` folder
- ✅ Update all import paths
- ✅ Verify the structure
- ✅ Delete itself when done

**After restructuring, the project is ready for development, GitHub, and Play Store deployment.**

---

## 🎯 Overview

Rooted Tales is a comprehensive children's book reading application built with React, TypeScript, and Capacitor for Android deployment. The app features interactive books, character galleries, mini games, and a complete achievement system with theme personalization.

**Studio:** Xenwinx Studio  
**Platform:** Web (PWA) + Android  
**Target Audience:** Children & Families  

---

## ✨ Features

### 📱 Core Features
- ✅ **User Authentication** - Login, Register, Guest mode
- ✅ **Book Library** - 12+ interactive books with carousel views
- ✅ **Book Reader** - TTS, highlights, bookmarks, progress tracking
- ✅ **Character Gallery** - 34+ animated forest creatures
- ✅ **4 Mini Games** - Fully playable with progression system
- ✅ **E-commerce** - Store, cart, subscriptions, checkout
- ✅ **Offline Mode** - PWA with service worker
- ✅ **Achievement System** - Badges, points, reading streaks

### 🎨 Personalization
- **4 Character Themes** - Forest, Ocean, Sunset, Starry Night
- **Audio Settings** - TTS customization, sleep timer
- **User Profiles** - Avatar upload, achievements, stats
- **Tutorial System** - Onboarding for new users

### 🎮 Mini Games

All 4 games are **fully functional** and sync with user profiles:

1. **Maze Hunt** 🎯 - Navigate mazes to character habitats
2. **Character Trivia** 🧠 - Answer questions about characters
3. **Word Puzzle** 🔤 - Hangman-style name guessing
4. **Memory Match** 🃏 - Card matching with character images

**Game Features:**
- 20 levels × 10 games each = 200 total games
- Points system (10-15 points per game)
- Badge unlocking (5, 10, 25, 50, 100 wins)
- Pause, restart, exit controls
- Progress saved to localStorage

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
Android Studio (for Android builds)
```

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/rooted-tales.git
cd rooted-tales

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Admin Access
- Email: `admin@rootedtales.com`
- Password: `admin123`

---

## 📚 Documentation

### 📖 Complete Guide
**→ [COMPLETE_PROJECT_GUIDE.md](./COMPLETE_PROJECT_GUIDE.md)** - **START HERE!**

This single comprehensive guide contains everything you need:
- Project overview and features
- Complete development workflow
- Android build & deployment instructions
- Google Play Store submission checklist
- Backend & Supabase setup
- Data sync system documentation
- Troubleshooting & support

### 📁 Additional Documentation

**Android Documentation:**
- [android/README.md](./android/README.md) - Android setup
- [android/BUILD_COMMANDS.md](./android/BUILD_COMMANDS.md) - Build instructions
- [android/DEPLOYMENT_GUIDE.md](./android/DEPLOYMENT_GUIDE.md) - Publishing guide

**Legal & Compliance:**
- [legal/PRIVACY_POLICY.md](./legal/PRIVACY_POLICY.md) - COPPA-compliant
- [legal/EULA_TERMS_OF_USE.md](./legal/EULA_TERMS_OF_USE.md) - Terms of use
- [legal/APP_PERMISSIONS_EXPLAINED.md](./legal/APP_PERMISSIONS_EXPLAINED.md) - Permission details

**Technical Documentation:**
- [documentation/BACKEND_API_SPECIFICATION.md](./documentation/BACKEND_API_SPECIFICATION.md) - API docs
- [documentation/EBOOK_SECURITY_IMPLEMENTATION.md](./documentation/EBOOK_SECURITY_IMPLEMENTATION.md) - Security

**Guidelines:**
- [guidelines/Guidelines.md](./guidelines/Guidelines.md) - Coding standards

---

## 🔨 Building for Android

### The Three-Command Sequence

```bash
# 1. Build web assets
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Open Android Studio
npx cap open android
```

### Alternative Commands
```bash
# Quick development build
npm run android:run

# Full production build
npm run android:build

# Just open Android Studio
npm run android:open
```

For complete Android build instructions, see the **[COMPLETE_PROJECT_GUIDE.md](./COMPLETE_PROJECT_GUIDE.md)**.

---

## 🏗️ Project Structure

```
rooted-tales/
├── android/              # Android Studio project
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── MiniGames.tsx   # Game hub (all 4 games)
│   ├── BookReader.tsx  # Reading interface
│   └── ...             # Other features
├── styles/              # Global CSS and Tailwind
├── utils/               # Utility functions
│   ├── dataSync.ts     # Data fetching utilities
│   └── useDataSync.ts  # React hooks for data
├── supabase/            # Backend edge functions
├── documentation/       # Technical docs
├── legal/              # Privacy, EULA, permissions
├── guidelines/         # Coding standards
├── public/             # Static assets
├── scripts/            # Build utilities
├── App.tsx             # Main app component
├── capacitor.config.ts # Capacitor configuration
└── package.json        # Dependencies
```

---

## 🎮 Character System

### 34 Characters Across 4 Habitats

- **Forest** (15): Akai, Quinn, Koa, Hedge, Maru, Orin, Niko, Aoi, Basilisk, Strix, Snowflake, Calico, Thorne
- **Ocean** (11): Raiku, Ellie, Kaito, Mizuto, Lumi, Calyx, Sage, Kai, Willow, Nami
- **Mountain** (8): Raine, Amaruq, Isen, Kazan, Nyra, Tatsu, Frost, Arctic
- **Desert** (3): Daichi, Blaze, Rajin

All characters sync between:
- Character Gallery
- Mini Games (trivia, word puzzle, memory match)
- Book content

---

## 🏆 Achievement System

### Badge Categories

**🌲 Forest Explorer** (Book Reading)
- First Steps (1) → Explorer (5) → Adventurer (10) → Champion (25) → Forest Master (50)

**🌊 Ocean Navigator** (Characters)
- Curious Observer (5) → Creature Collector (10) → Habitat Explorer (20) → Wildlife Expert (30) → Ocean Master (34)

**🎮 Sunset Gamer** (Mini Games)
- Game Starter (5) → Skill Sharer (10) → Challenge Champion (25) → Arcade Ace (50) → Sunset Master (100)

**⭐ Starry Scholar** (Reading Sessions)
- Night Reader (5) → Story Seeker (10) → Book Lover (25) → Reading Hero (50) → Starry Master (100)

---

## 🛠️ Tech Stack

### Core Libraries
- **React** 18.2.0 - UI framework
- **TypeScript** 5.2.2 - Type safety
- **Vite** 5.2.0 - Build tool
- **Tailwind CSS** v4 - Styling
- **Motion** 10.18.0 - Animations
- **Lucide React** 0.400.0 - Icons
- **Sonner** 1.4.41 - Toast notifications

### Mobile Platform
- **Capacitor** 5.7.4 - Native bridge
- **Android** SDK 24+ (Android 7.0+)
- Target SDK 34 (Android 14)

### Capacitor Plugins
- Splash Screen, Status Bar, Keyboard
- Filesystem, Storage, Network
- Camera, Haptics, Share
- Push Notifications, Local Notifications

---

## 🎨 Theme System

### 4 Character Themes

1. **Mystical Forest** - Green/Emerald (Default)
2. **Ocean Depth** - Blue/Cyan
3. **Sunset Glow** - Orange/Pink/Yellow
4. **Starry Night** - Purple/Indigo

Themes affect:
- UI colors and gradients
- Badge icons and colors
- Navigation appearance
- Background animations

---

## 🔐 Security & Privacy

- **ProGuard Obfuscation** - Code protection
- **COPPA Compliant** - Children's privacy
- **localStorage** - Local data only
- **No tracking** - Privacy-first design
- **Secure checkout** - E-commerce ready

---

## 🐛 Troubleshooting

### Common Issues

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Android sync issues:**
```bash
npx cap sync android --force
```

**Games not working:**
- Clear browser cache and localStorage
- Reload the application
- Check browser console for errors

**For more solutions, see [COMPLETE_PROJECT_GUIDE.md](./COMPLETE_PROJECT_GUIDE.md#troubleshooting)**

---

## 📞 Support

### Resources
- **React Docs:** https://react.dev
- **Capacitor Docs:** https://capacitorjs.com
- **Android Developer:** https://developer.android.com
- **Play Console:** https://play.google.com/console

### Issues
For bugs or feature requests, please open an issue on GitHub.

---

## 🎉 Getting Started

### Recommended First Steps

1. ✅ Read this README
2. 📚 **Read [COMPLETE_PROJECT_GUIDE.md](./COMPLETE_PROJECT_GUIDE.md)** ← **Most Important!**
3. 💻 Install dependencies and run `npm run dev`
4. ��� Follow Android build instructions when ready
5. 🚀 Start building!

---

## 🌟 Key Features Highlights

- ✅ **All 4 games fully functional** and playable
- ✅ **34 characters** with images and data
- ✅ **4 themes** with complete UI integration
- ✅ **Achievement system** with badges and points
- ✅ **E-commerce** ready with store and checkout
- ✅ **Android ready** with complete configuration
- ✅ **Data sync system** with smart caching and fallback
- ✅ **Supabase backend** with edge functions
- ✅ **Well documented** with comprehensive single guide

---

## 📄 License

**MIT License**

Copyright (c) 2024 Xenwinx Studio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

---

<div align="center">

**🌲 Built with ❤️ by Xenwinx Studio 🐾**

[Complete Guide](./COMPLETE_PROJECT_GUIDE.md) • [Android Docs](./android/README.md) • [Legal Docs](./legal/)

</div>