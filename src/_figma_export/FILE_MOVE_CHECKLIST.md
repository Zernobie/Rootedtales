# ✅ File Move Checklist - Rooted Tales Export

## Interactive Restructuring Checklist

Use this checklist when restructuring the Figma Make export into the production-ready format.

---

## Phase 1: Preparation

- [ ] Extract/clone the Figma Make export to your local machine
- [ ] Open terminal and navigate to project root
- [ ] Verify you have Node.js >= 18.0.0 installed
- [ ] Verify you have npm >= 9.0.0 installed
- [ ] Create a backup of the original export

---

## Phase 2: Create New Folder Structure

```bash
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/assets
mkdir -p _figma_export/assets
mkdir -p _figma_export/code
```

- [ ] src/ folder created
- [ ] src/lib/ folder created
- [ ] src/hooks/ folder created
- [ ] src/assets/ folder created
- [ ] _figma_export/assets/ folder created
- [ ] _figma_export/code/ folder created

---

## Phase 3: Rename Folders

```bash
mv documentation docs
```

- [ ] documentation/ renamed to docs/

---

## Phase 4: Move Source Files to src/

### Move Main Files

```bash
mv App.tsx src/
```

- [ ] App.tsx moved to src/App.tsx

### Move Folders

```bash
mv components src/
mv styles src/
mv utils src/
```

- [ ] components/ moved to src/components/
- [ ] styles/ moved to src/styles/
- [ ] utils/ moved to src/utils/

### Handle main.tsx

If `/src/main.tsx` already exists:
```bash
# Already in correct location - no move needed
```

If it's elsewhere or doesn't exist, create it in src/:
- [ ] main.tsx exists at src/main.tsx

### Create index.css

```bash
cp src/styles/globals.css src/index.css
```

OR

```bash
# Just use globals.css directly in main.tsx
# import './styles/globals.css'
```

- [ ] src/index.css created or globals.css path updated

---

## Phase 5: Add Asset Management Files

### Create assetManager.ts

Copy from `_figma_export/code/assetManager.ts` to `src/lib/assetManager.ts`

- [ ] src/lib/assetManager.ts created

### Create useAssets.ts

Copy from `_figma_export/code/useAssets.ts` to `src/hooks/useAssets.ts`

- [ ] src/hooks/useAssets.ts created

---

## Phase 6: Update Configuration Files

### Update vite.config.ts

- [ ] Open vite.config.ts
- [ ] Update resolve.alias to point to src/ paths:
  ```typescript
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  }
  ```
- [ ] Remove any Figma asset aliases (figma:asset/...)
- [ ] Remove any version-pinned aliases (package@version)
- [ ] Save file

### Update tsconfig.json

- [ ] Open tsconfig.json
- [ ] Update paths to reference src/:
  ```json
  "paths": {
    "@/*": ["./src/*"],
    "@components/*": ["./src/components/*"],
    "@utils/*": ["./src/utils/*"],
    "@styles/*": ["./src/styles/*"]
  }
  ```
- [ ] Save file

### Verify capacitor.config.ts

- [ ] Open capacitor.config.ts
- [ ] Verify no placeholder keystore paths
- [ ] Verify production-ready settings
- [ ] Save if changes made

### Verify package.json

- [ ] Open package.json
- [ ] Verify scripts are correct:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
  ```
- [ ] Save if changes made

---

## Phase 7: Update Import Paths

### Update imports in src/main.tsx

- [ ] Change `import App from './App'` if needed
- [ ] Change `import './styles/globals.css'` or `import './index.css'`
- [ ] Save file

### Update imports in src/App.tsx

- [ ] Update component imports to use @ aliases or relative paths
  ```typescript
  // Before: import { Component } from './components/Component'
  // After:  import { Component } from './components/Component'
  // OR:     import { Component } from '@/components/Component'
  ```
- [ ] Save file

### Update imports in all components

- [ ] Review src/components/ files
- [ ] Update any import paths that reference parent directories
- [ ] Use @ aliases or relative paths from src/
- [ ] Save all modified files

---

## Phase 8: Verify Root Level

### Check root contains ONLY:

- [ ] index.html ✅
- [ ] package.json ✅
- [ ] vite.config.ts ✅
- [ ] capacitor.config.ts ✅
- [ ] tsconfig.json ✅
- [ ] README.md ✅
- [ ] .gitignore ✅
- [ ] .npmrc ✅ (if exists)
- [ ] setup-android.sh ✅
- [ ] setup-android.bat ✅

### Check root folders:

- [ ] android/ ✅
- [ ] public/ ✅
- [ ] scripts/ ✅
- [ ] supabase/ ✅
- [ ] legal/ ✅
- [ ] guidelines/ ✅
- [ ] docs/ ✅
- [ ] src/ ✅
- [ ] _figma_export/ ✅

### Check root does NOT contain:

- [ ] ❌ components/ folder (should be in src/)
- [ ] ❌ styles/ folder (should be in src/)
- [ ] ❌ utils/ folder (should be in src/)
- [ ] ❌ App.tsx (should be in src/)
- [ ] ❌ documentation/ folder (should be renamed to docs/)
- [ ] ❌ Duplicate config files

---

## Phase 9: Install and Test

### Install dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

- [ ] node_modules/ deleted
- [ ] package-lock.json deleted
- [ ] npm install completed successfully
- [ ] No errors during installation

### Test development server

```bash
npm run dev
```

- [ ] Dev server starts without errors
- [ ] Visit http://localhost:5173
- [ ] App loads correctly
- [ ] No console errors
- [ ] Navigation works
- [ ] Components render properly

### Test production build

```bash
npm run build
```

- [ ] Build completes without errors
- [ ] dist/ folder created
- [ ] Build output shows correct file sizes

### Test Android sync

```bash
npx cap sync android
```

- [ ] Sync completes without errors
- [ ] Android files updated
- [ ] No missing file warnings

### Test Android build (optional)

```bash
npx cap open android
```

- [ ] Android Studio opens
- [ ] Project loads without errors
- [ ] Gradle sync successful

---

## Phase 10: Final Verification

### Structure Verification

```bash
# Check src/ structure
ls -la src/
```

Expected output:
```
drwxr-xr-x components/
drwxr-xr-x styles/
drwxr-xr-x utils/
drwxr-xr-x lib/
drwxr-xr-x hooks/
-rw-r--r-- App.tsx
-rw-r--r-- main.tsx
-rw-r--r-- index.css (or use styles/globals.css)
```

- [ ] src/ structure matches expected

```bash
# Check root structure
ls -la
```

Expected folders at root:
```
drwxr-xr-x android/
drwxr-xr-x public/
drwxr-xr-x scripts/
drwxr-xr-x supabase/
drwxr-xr-x docs/
drwxr-xr-x legal/
drwxr-xr-x guidelines/
drwxr-xr-x src/
drwxr-xr-x _figma_export/
drwxr-xr-x node_modules/
drwxr-xr-x dist/ (after build)
```

- [ ] Root structure matches expected

### Documentation Verification

- [ ] docs/COMPLETE_PROJECT_GUIDE.md exists
- [ ] _figma_export/EXPORT_RESTRUCTURING_GUIDE.md exists
- [ ] _figma_export/FILE_MOVE_CHECKLIST.md exists
- [ ] _figma_export/SUPABASE_ASSET_EXPORT_GUIDE.md exists

---

## Phase 11: Git Setup (Optional)

### Initialize Git

```bash
git init
git add .
git commit -m "Initial commit - Rooted Tales v1.3.0"
```

- [ ] Git repository initialized
- [ ] Files staged
- [ ] Initial commit created

### Add Remote

```bash
git remote add origin https://github.com/your-username/rooted-tales.git
git push -u origin main
```

- [ ] Remote added
- [ ] Pushed to GitHub

---

## Phase 12: Final Tests

### Comprehensive Testing

- [ ] App runs in development mode
- [ ] All pages/screens load
- [ ] Mini games work
- [ ] Character gallery loads
- [ ] Book library displays
- [ ] Authentication works
- [ ] Theme switching works
- [ ] No console errors
- [ ] Production build succeeds
- [ ] Android sync succeeds
- [ ] APK builds successfully (if testing Android)

---

## ✅ Completion Checklist

- [ ] All files moved to correct locations
- [ ] All configuration files updated
- [ ] All import paths updated
- [ ] Development server works
- [ ] Production build works
- [ ] Android sync works
- [ ] No errors in console
- [ ] Structure matches requirements
- [ ] Documentation accessible
- [ ] Ready for GitHub push
- [ ] Ready for Play Store submission

---

## 🎉 Success!

If all checkboxes are marked, your Rooted Tales export is now in the correct production-ready structure!

### Next Steps:

1. 📤 Push to GitHub
2. 🔧 Set up Supabase backend (see _figma_export/SUPABASE_ASSET_EXPORT_GUIDE.md)
3. 📱 Build Android APK/AAB
4. 🚀 Submit to Google Play Store (see docs/COMPLETE_PROJECT_GUIDE.md)

---

**Total Items:** 100+ checklist items  
**Estimated Time:** 30-60 minutes  
**Difficulty:** Intermediate

---

**Last Updated:** February 12, 2026  
**Export Version:** 1.3.0+
