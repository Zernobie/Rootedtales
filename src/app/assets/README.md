# 📦 Assets Folder
**Rooted Tales - Asset Management**

---

## 📁 FOLDER PURPOSE

This folder contains assets for exporting to Supabase storage:
- Book covers and pages
- Character images
- Audio files (music & effects)
- Metadata JSON files

---

## 🗂️ STRUCTURE

```
assets/
├── export/              ← Your assets to upload
│   ├── books/
│   │   ├── metadata/
│   │   │   ├── books.json
│   │   │   └── pages.json
│   │   ├── covers/
│   │   │   └── [12 book cover images]
│   │   └── pages/
│   │       └── [book page images]
│   │
│   ├── characters/
│   │   ├── metadata/
│   │   │   └── characters.json
│   │   └── images/
│   │       ├── forest/
│   │       ├── water/
│   │       ├── snow/
│   │       ├── predators/
│   │       └── pets/
│   │
│   └── audio/
│       ├── background/
│       ├── effects/
│       └── tts/
│
├── scripts/             ← Upload automation
│   ├── upload-to-supabase.js
│   ├── extract-metadata.js
│   └── validate-assets.js
│
└── README.md           ← This file
```

---

## 🚀 QUICK START

### 1. Create Folder Structure
```bash
cd assets
mkdir -p export/books/{metadata,covers,pages}
mkdir -p export/characters/{metadata,images/{forest,water,snow,predators,pets}}
mkdir -p export/audio/{background,effects,tts}
mkdir -p scripts
```

### 2. Add Your Assets
- Place book covers in `export/books/covers/`
- Place character images in `export/characters/images/{habitat}/`
- Place audio files in `export/audio/{type}/`

### 3. Create Metadata Files
- See `/SUPABASE_ASSET_EXPORT_GUIDE.md` for JSON templates
- Place in respective `metadata/` folders

### 4. Upload to Supabase
```bash
# Set environment variables
export SUPABASE_URL="your-url"
export SUPABASE_SERVICE_ROLE_KEY="your-key"

# Run upload script
node scripts/upload-to-supabase.js
```

---

## 📋 ASSET REQUIREMENTS

### Images
- **Format:** JPG or PNG
- **Book Covers:** 1200x1600px (3:4 ratio)
- **Characters:** 800x800px (square)
- **Max Size:** 5MB per file

### Audio
- **Format:** MP3 or OGG
- **Bitrate:** 128kbps minimum
- **Max Size:** 10MB per file

---

## 📚 GUIDES

- **Full Guide:** `/SUPABASE_ASSET_EXPORT_GUIDE.md`
- **Fetcher Code:** `/SUPABASE_ASSET_FETCHER.md`
- **Checklist:** `/GITHUB_SUPABASE_ANDROID_EXPORT_CHECKLIST.md`

---

## ⚠️ IMPORTANT

- **DO NOT** commit large asset files to GitHub
- **DO** upload to Supabase storage instead
- **DO** commit metadata JSON files
- **DO** keep this README.md

---

**Need help? See `/SUPABASE_ASSET_EXPORT_GUIDE.md`**
