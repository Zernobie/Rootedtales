# 📦 Figma Make Export Artifacts

## What is this folder?

This `_figma_export/` folder contains **temporary export artifacts** that help you restructure the Figma Make export into a production-ready format for GitHub and Android deployment.

**⚠️ IMPORTANT:** This folder is for EXPORT ONLY. Do not include it in your production deployment or GitHub repository (it should be in .gitignore).

---

## 📁 Contents

### 📖 Guides & Documentation

| File | Purpose | Priority |
|------|---------|----------|
| **EXPORT_RESTRUCTURING_GUIDE.md** | Complete file restructuring instructions | 🔴 **READ FIRST** |
| **FILE_MOVE_CHECKLIST.md** | Interactive 100+ item checklist | 🔴 **USE THIS** |
| **EXPORT_PACKAGE_COMPLETE.md** | Export summary and overview | ℹ️ Reference |
| **README.md** | This file | ℹ️ Info |

### 💻 Code Files

| File | Target Location | Purpose |
|------|----------------|---------|
| **code/assetManager.ts** | `src/lib/assetManager.ts` | Load assets from Supabase Storage |
| **code/useAssets.ts** | `src/hooks/useAssets.ts` | React hooks for asset loading |

### 📊 Asset Metadata

| File | Purpose | Usage |
|------|---------|-------|
| **assets/characters.json** | Metadata for 34 characters | Upload reference for Supabase |
| **assets/books.json** | Metadata for 12 books | Upload reference for Supabase |

---

## 🚀 Quick Start

### Step 1: Read the Restructuring Guide

```bash
cat _figma_export/EXPORT_RESTRUCTURING_GUIDE.md
```

This guide explains:
- Why restructuring is needed
- Current vs. target file structure
- Step-by-step commands
- Configuration updates

### Step 2: Follow the Checklist

```bash
cat _figma_export/FILE_MOVE_CHECKLIST.md
```

Interactive checklist with:
- 12 phases
- 100+ checklist items
- Copy-paste terminal commands
- Success criteria

### Step 3: Execute the Restructuring

```bash
# Create src/ folder structure
mkdir -p src/lib src/hooks src/assets

# Move source files
mv App.tsx src/
mv components src/
mv styles src/
mv utils src/

# Rename documentation
mv documentation docs

# Copy asset management files
cp _figma_export/code/assetManager.ts src/lib/
cp _figma_export/code/useAssets.ts src/hooks/

# Update configs (see guide for details)
# Then test:
npm install
npm run dev
```

---

## 📋 What Needs to Be Done

### ✅ Current State (Figma Make Export)

The export as-is from Figma Make:

```
/
├── App.tsx                    ← At root (Figma Make requirement)
├── components/                ← At root (Figma Make requirement)
├── styles/                    ← At root (Figma Make requirement)
├── utils/                     ← At root (Figma Make requirement)
├── android/                   ✅ Correct location
├── public/                    ✅ Correct location
└── ... (configs at root)      ✅ Correct location
```

**Status:** ✅ Works for immediate testing  
**Issue:** ❌ Not standard for production/GitHub

### 🎯 Target State (Production Ready)

After following the restructuring guide:

```
/
├── src/                       ✅ All source code here
│   ├── components/
│   ├── styles/
│   ├── utils/
│   ├── lib/
│   ├── hooks/
│   ├── App.tsx
│   └── main.tsx
├── android/                   ✅ Correct location
├── public/                    ✅ Correct location
├── docs/                      ✅ Permanent documentation
└── ... (configs at root)      ✅ Correct location
```

**Status:** ✅ Production-ready  
**Result:** ✅ Ready for GitHub & Play Store

---

## 📚 File Descriptions

### EXPORT_RESTRUCTURING_GUIDE.md

**What it contains:**
- Current vs. target file structure comparison
- Step-by-step file move commands
- Configuration file updates (vite.config.ts, tsconfig.json)
- Import path fixes
- Verification commands
- Testing procedures

**When to use:**
- Before deploying to GitHub
- Before building for Play Store
- When setting up for team development

**Estimated time:** 30-60 minutes

### FILE_MOVE_CHECKLIST.md

**What it contains:**
- 12 phases of restructuring
- 100+ interactive checkbox items
- Copy-paste terminal commands
- File structure verification
- Build and test commands
- Success criteria

**When to use:**
- During the restructuring process
- To ensure nothing is missed
- As a verification tool

**Estimated time:** 30-60 minutes

### EXPORT_PACKAGE_COMPLETE.md

**What it contains:**
- Export overview
- What's included
- Configuration summary
- Feature list
- Next steps
- Success criteria

**When to use:**
- To understand the export package
- To see what's included
- To plan next steps

**Estimated time:** 10-15 minutes to read

### code/assetManager.ts

**What it does:**
- Loads images from Supabase Storage
- Loads audio files
- Manages signed URLs
- Implements smart caching
- Provides fallback system
- Health checks backend

**Where it goes:** `src/lib/assetManager.ts`

**Functions:**
- `loadImage()` - Load any image
- `loadBookCover()` - Load book cover
- `loadCharacterImage()` - Load character
- `loadAudio()` - Load audio file
- `preloadAssets()` - Batch preload
- `clearAssetCache()` - Cache management

### code/useAssets.ts

**What it does:**
- Provides React hooks for asset loading
- Automatic loading and error handling
- Loading states and error states
- Cache management hooks

**Where it goes:** `src/hooks/useAssets.ts`

**Hooks:**
- `useImage()` - Load single image
- `useBookCover()` - Load book cover
- `useCharacterImage()` - Load character
- `useAudio()` - Load audio
- `usePreloadAssets()` - Preload multiple
- `useAssetCache()` - Cache stats

### assets/characters.json

**What it contains:**
- Metadata for all 34 characters
- File names for Supabase upload
- Categories, descriptions
- Animal types, facts

**How to use:**
1. Upload character images to Supabase Storage
2. Use bucket: `make-eda44699-characters`
3. Use file names from JSON
4. Recommended size: 800x800px PNG

### assets/books.json

**What it contains:**
- Metadata for all 12 books
- Cover file names
- Author, category, description
- Reading time, page count

**How to use:**
1. Upload book covers to Supabase Storage
2. Use bucket: `make-eda44699-book-covers`
3. Use file names from JSON
4. Recommended size: 600x900px JPG

---

## ⚠️ Important Notes

### Do NOT Include in Production

This `_figma_export/` folder should:

❌ NOT be included in GitHub repository  
❌ NOT be deployed to production  
❌ NOT be included in Android build  

It should be listed in `.gitignore`:

```gitignore
# Export artifacts
_figma_export/
```

### Temporary Nature

This folder is **temporary** and **disposable**:

✅ Use during export restructuring  
✅ Reference while setting up  
✅ Delete after restructuring complete  

### Documentation Permanence

Permanent documentation has been moved to `docs/`:

✅ `docs/COMPLETE_PROJECT_GUIDE.md` - Main guide  
✅ `android/` - Android-specific docs  
✅ `legal/` - Legal documents  
✅ `documentation/` - Technical specs  

---

## 🎯 Success Criteria

You can delete this folder when:

- ✅ All files moved to `src/`
- ✅ Configuration files updated
- ✅ Import paths fixed
- ✅ Tests passing (`npm run dev`, `npm run build`)
- ✅ Android sync working (`npx cap sync android`)
- ✅ Documentation accessible in `docs/`
- ✅ Production-ready structure complete

---

## 📞 Questions?

If you have questions during restructuring:

1. Check `EXPORT_RESTRUCTURING_GUIDE.md` for detailed instructions
2. Use `FILE_MOVE_CHECKLIST.md` to ensure all steps completed
3. Refer to `docs/COMPLETE_PROJECT_GUIDE.md` for overall guidance
4. Check `android/DEPLOYMENT_GUIDE.md` for Android-specific issues

---

**Last Updated:** February 12, 2026  
**Export Version:** 1.3.0+

🌲 **Rooted Tales by Xenwinx Studio** 🐾
