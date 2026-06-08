# 📚 Quick Library Recreation Prompt

**Short version for rapid development**

---

## 🚀 ONE-PROMPT VERSION

Copy and use this:

---

## THE PROMPT:

Create a mobile book reading library system for a React + TypeScript app with these exact specifications:

### **Core Structure**:

**1. Book Data** (`/data/bookPages.ts`):
- Store 12 books with IDs, titles, and page arrays
- Each book has 27-85 pages as image URLs
- Use smart URL generation: `Array.from({ length: N }, (_, i) => url)`
- Helper functions: `getBookData(id)`, `getBookTitle(id)`
- Support both numeric ('1') and string ('book-name') IDs

**2. Library Screen** (`/components/LibraryScreen.tsx`):
- 3 view modes: Carousel (default), Grid (2-col), List
- Search bar for titles
- Filters: All / In Progress / Completed / Bookmarked
- Each book card shows: cover, title, pages, progress bar, "Continue" badge
- Mobile-optimized (385px wide)

**3. Book Overview** (`/components/BookOverview.tsx`):
- Large cover preview
- Title, page count, estimated time
- Progress display with bar
- Bookmark list with thumbnails
- Buttons: "Start Reading" / "Continue from page X" / "Read Again"

**4. Immersive Reader** (`/components/ImmersiveBookReader.tsx`):
- Full-screen edge-to-edge display
- Top bar: Back, Bookmark, Settings, Bookmark List
- Page display: Full image with zoom (100-200%)
- Navigation: Swipe left/right, tap edges, prev/next buttons
- Page counter: "Page X of Y"
- Auto-save progress every 5 seconds

**5. Page Flip Animation** (`/components/FlipPage.tsx`):
- 3D flip effect (rotateY transform)
- 500ms smooth animation
- Works with swipe gestures
- Realistic page turn

**6. Bookmarks** (`/components/BookmarkPanel.tsx`):
- Add/remove bookmarks
- Sidebar with bookmark list
- Thumbnail previews
- Jump to page on click

**7. Settings** (`/components/BookSettings.tsx`):
- Page flip speed (slow/normal/fast)
- Sound effects toggle
- Background music toggle
- Volume control

### **User Flow**:
```
Library (browse/search/filter) → 
Select Book → 
Book Overview (see details/progress) → 
Start/Continue Reading → 
Immersive Reader (swipe pages, zoom, bookmark) → 
Auto-save progress → 
Exit with confirmation → 
Back to Library
```

### **Progress Tracking**:
- Save: userId, bookId, currentPage, totalPages, percentComplete, bookmarks[], lastReadAt, isCompleted
- Auto-save every 5 seconds
- Save on page change and exit
- Sync to Supabase backend
- Resume from last page on reopen

### **Technical**:
- React 18 + TypeScript
- Motion (framer-motion) for animations
- Tailwind CSS
- Mobile-first (385×830px)
- 60fps animations
- Lazy load images
- Preload next/previous pages

### **Features Checklist**:
- [x] 12 books with image pages
- [x] 3 view modes (carousel/grid/list)
- [x] Search and filter
- [x] Reading progress tracking
- [x] 3D page flip animation
- [x] Swipe & tap navigation
- [x] Pinch-to-zoom
- [x] Bookmark system with previews
- [x] Auto-save (every 5s)
- [x] Resume reading
- [x] Exit confirmation
- [x] Settings panel
- [x] Mobile optimized

### **Data Example**:
```typescript
const BOOK_PAGES = {
  'book-1': {
    id: 'book-1',
    title: 'Sample Book',
    contentType: 'image',
    pages: Array.from({ length: 64 }, (_, i) => 
      `https://storage.com/books/Sample/page-${String(i+1).padStart(3,'0')}.png`
    )
  }
};
```

### **Styling**:
- Forest theme: Green primary (#22c55e)
- Dark/light theme support
- Rounded cards with shadows
- Smooth transitions (300-500ms)
- Professional polish

**Build a complete, production-ready mobile book library with smooth animations, progress tracking, and an immersive reading experience.**

---

## 📋 EXPECTED DELIVERABLES

1. `/data/bookPages.ts` - 12 books
2. `/components/LibraryScreen.tsx` - Main library
3. `/components/BookOverview.tsx` - Book details
4. `/components/ImmersiveBookReader.tsx` - Full-screen reader
5. `/components/FlipPage.tsx` - 3D animation
6. `/components/BookmarkPanel.tsx` - Bookmarks
7. `/components/BookSettings.tsx` - Settings
8. `/utils/dataSync.ts` - Progress sync

---

## ✅ SUCCESS = 

User can browse books → select one → read with page flips → bookmark pages → auto-save progress → exit → resume later from same page. All on mobile with smooth 60fps animations.

---

**Copy everything above this line as your prompt!** ⬆️

