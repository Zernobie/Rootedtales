# 📦 Rooted Tales - Export Restructuring Guide

## ⚠️ CRITICAL: File Restructuring Required

This guide provides **EXACT instructions** for restructuring the Figma Make export into the production-ready format required for GitHub and Android deployment.

---

## 🎯 Current State (Figma Make)

```
/ (root)
├── App.tsx                        ← At root (Figma Make requirement)
├── components/                    ← At root (Figma Make requirement)
├── styles/                        ← At root (Figma Make requirement)
├── utils/                         ← At root (Figma Make requirement)
├── android/                       ✅ Already at root (correct)
├── public/                        ✅ Already at root (correct)
├── scripts/                       ✅ Already at root (correct)
├── supabase/                      ✅ Already at root (correct)
├── legal/                         ✅ Already at root (correct)
├── guidelines/                    ✅ Already at root (correct)
├── documentation/                 ← Needs to be renamed to docs/
├── package.json                   ✅ At root (correct)
├── vite.config.ts                ✅ At root (correct)
├── capacitor.config.ts           ✅ At root (correct)
└── ... (other config files)
```

---

## 🎯 Target State (Production)

```
/ (root)
├── .gitignore                     ✅ Keep at root
├── .npmrc                         ✅ Keep at root (if exists)
├── index.html                     ✅ Keep at root
├── package.json                   ✅ Keep at root
├── vite.config.ts                ✅ Keep at root (UPDATED for src/)
├── capacitor.config.ts           ✅ Keep at root
├── README.md                      ✅ Keep at root
├── tsconfig.json                  ✅ Keep at root (UPDATED for src/)
│
├── android/                       ✅ Keep at root
├── public/                        ✅ Keep at root
├── scripts/                       ✅ Keep at root
├── supabase/                      ✅ Keep at root
├── legal/                         ✅ Keep at root
├── guidelines/                    ✅ Keep at root
│
├── docs/                          📁 RENAME from documentation/
│   ├── COMPLETE_PROJECT_GUIDE.md
│   └── ... (all permanent guides)
│
├── _figma_export/                📁 TEMPORARY export artifacts
│   ├── EXPORT_RESTRUCTURING_GUIDE.md (this file)
│   ├── EXPORT_READY_SUMMARY.md
│   ├── FILE_MOVE_CHECKLIST.md
│   ├── SUPABASE_ASSET_EXPORT_GUIDE.md
│   └── assets/                   (metadata JSON files)
│
└── src/                           📁 CREATE THIS - Move all source code here
    ├── components/                ← MOVE from /components/
    ├── styles/                    ← MOVE from /styles/
    ├── utils/                     ← MOVE from /utils/
    ├── lib/                       ← CREATE - add assetManager.ts
    ├── hooks/                     ← CREATE - add useAssets.ts
    ├── assets/                    ← CREATE if needed
    ├── App.tsx                    ← MOVE from /App.tsx
    ├── main.tsx                   ← MOVE from /src/main.tsx
    └── index.css                  ← CREATE or move globals.css
```

---

## 📋 Step-by-Step Restructuring Instructions

### Step 1: Create New Folders

```bash
# Navigate to project root
cd rooted-tales

# Create src/ and subdirectories
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/assets

# Rename documentation/ to docs/
mv documentation docs

# Create _figma_export/ folder (may already exist)
mkdir -p _figma_export/assets
```

### Step 2: Move Source Files to src/

```bash
# Move main source files
mv App.tsx src/
mv components src/
mv styles src/
mv utils src/

# Move main.tsx if it exists at /src/main.tsx
# (In Figma Make, it's at /src/main.tsx already)
# If main.tsx doesn't exist, you'll create it in Step 4

# Create or move index.css
cp styles/globals.css src/index.css
# OR just rename: mv styles/globals.css src/index.css
```

### Step 3: Add Asset Management Files

Create these files in the new locations:

**src/lib/assetManager.ts** - See `_figma_export/code/assetManager.ts`
**src/hooks/useAssets.ts** - See `_figma_export/code/useAssets.ts`

### Step 4: Update Configuration Files

#### A. vite.config.ts

Update resolve.alias to point to src/:

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  // ... rest of config
})
```

#### B. tsconfig.json

Update paths to reference src/:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"],
      "@styles/*": ["./src/styles/*"]
    }
  }
}
```

#### C. package.json

Ensure build script references correct entry point:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Step 5: Update Import Paths

After moving files to src/, update all import statements:

**Before:**
```typescript
import { Component } from './components/Component';
import { utility } from './utils/utility';
```

**After:**
```typescript
import { Component } from '@/components/Component';
import { utility } from '@/utils/utility';
// OR use relative paths from src/:
import { Component } from './components/Component';
```

### Step 6: Verify Structure

Run this verification command:

```bash
# Verify src/ structure
ls -la src/
# Should show: components/, styles/, utils/, lib/, hooks/, App.tsx, main.tsx, index.css

# Verify root level
ls -la
# Should show: android/, public/, scripts/, supabase/, docs/, legal/, guidelines/
# Should NOT show: components/, styles/, utils/ at root
```

### Step 7: Test Build

```bash
# Install dependencies
npm install

# Test development build
npm run dev

# Test production build
npm run build

# Test Android sync
npx cap sync android
```

---

## 📁 Complete File Move Checklist

### ✅ Files to Keep at Root
- [x] index.html
- [x] package.json
- [x] vite.config.ts (updated)
- [x] capacitor.config.ts
- [x] tsconfig.json (updated)
- [x] README.md
- [x] .gitignore
- [x] .npmrc (if exists)
- [x] setup-android.sh
- [x] setup-android.bat

### ✅ Folders to Keep at Root
- [x] android/
- [x] public/
- [x] scripts/
- [x] supabase/
- [x] legal/
- [x] guidelines/

### ✅ Rename at Root
- [x] documentation/ → docs/

### ✅ Create at Root
- [x] _figma_export/ (temporary export artifacts)
- [x] src/ (all source code)

### 📦 Files to Move INTO src/
- [x] /App.tsx → src/App.tsx
- [x] /components/ → src/components/
- [x] /styles/ → src/styles/
- [x] /utils/ → src/utils/

### 📦 Files to Create in src/
- [x] src/main.tsx (entry point)
- [x] src/index.css (global styles)
- [x] src/lib/assetManager.ts
- [x] src/hooks/useAssets.ts

### 🗑️ Files to Delete (Already Deleted)
- [x] All redundant documentation (already cleaned up)
- [x] Temporary status reports
- [x] Old export summaries

---

## 🚀 Post-Restructuring Commands

After completing the restructuring, run:

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Test development
npm run dev
# Visit http://localhost:5173

# 3. Build for production
npm run build

# 4. Sync to Android
npx cap sync android

# 5. Open Android Studio
npx cap open android

# 6. Build APK
cd android
./gradlew assembleRelease
```

---

## ⚠️ Common Issues After Restructuring

### Issue: Module not found errors

**Solution:** Update import paths to use @ aliases or relative paths from src/

```typescript
// Before (won't work after move)
import { Component } from './components/Component';

// After (option 1 - alias)
import { Component } from '@/components/Component';

// After (option 2 - relative from src/)
import { Component } from './components/Component';
```

### Issue: Vite can't find index.html

**Solution:** Ensure index.html stays at root, not in src/

### Issue: TypeScript errors about paths

**Solution:** Update tsconfig.json paths to reference src/

### Issue: Assets not loading

**Solution:** 
- Public assets stay in public/ (correct)
- Imported assets in src/assets/
- Check import paths in components

---

## 📊 Verification Checklist

Before pushing to GitHub or building for Android:

- [ ] All source code in src/
- [ ] No components/, styles/, utils/ at root
- [ ] index.html at root
- [ ] package.json at root
- [ ] vite.config.ts updated for src/ paths
- [ ] tsconfig.json updated for src/ paths
- [ ] android/ folder at root (not in src/)
- [ ] public/ folder at root (not in src/)
- [ ] All imports updated to work with new structure
- [ ] `npm run dev` works
- [ ] `npm run build` works
- [ ] `npx cap sync android` works
- [ ] No duplicate config files
- [ ] Documentation in docs/ folder
- [ ] Export artifacts in _figma_export/ folder

---

## ✅ Success Criteria

After restructuring, you should be able to:

1. ✅ Run `npm install && npm run dev` immediately
2. ✅ Build with `npm run build` without errors
3. ✅ Sync to Android with `npx cap sync android`
4. ✅ Open in Android Studio without moving files
5. ✅ Push to GitHub with clean structure
6. ✅ Submit to Google Play Store without reorganization

---

## 🔗 Related Files

- **FILE_MOVE_CHECKLIST.md** - Interactive checklist
- **SUPABASE_ASSET_EXPORT_GUIDE.md** - Asset upload instructions
- **docs/COMPLETE_PROJECT_GUIDE.md** - Complete development guide
- **_figma_export/code/assetManager.ts** - Asset manager implementation
- **_figma_export/code/useAssets.ts** - Asset hook implementation

---

**IMPORTANT:** This restructuring is **REQUIRED** before deploying to GitHub or Google Play Store. The Figma Make environment keeps files at root for compatibility, but production deployment requires the src/ folder structure.

---

**Last Updated:** February 12, 2026  
**Export Version:** 1.3.0+
