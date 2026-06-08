# 🔧 Asset Upload Scripts
**Automation tools for Supabase upload**

---

## 📁 SCRIPTS

### 1. `upload-to-supabase.js`
Uploads all assets to Supabase storage buckets.

**See:** `/SUPABASE_ASSET_EXPORT_GUIDE.md` for complete code

### 2. `extract-metadata.js`
Extracts hardcoded data from components into JSON files.

### 3. `validate-assets.js`
Validates asset files before upload:
- Checks image dimensions
- Validates file sizes
- Ensures metadata is complete

---

## 🚀 USAGE

```bash
# Set environment variables
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Run upload script
node upload-to-supabase.js

# Or with NPM script (add to package.json):
npm run upload:assets
```

---

## 📋 PREREQUISITES

### Install Dependencies
```bash
npm install --save-dev @supabase/supabase-js
```

### Environment Variables
Create `.env.assets` file:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📚 DOCUMENTATION

Full implementation code is in:
- `/SUPABASE_ASSET_EXPORT_GUIDE.md`

---

**Ready to upload? Follow the guide!**
