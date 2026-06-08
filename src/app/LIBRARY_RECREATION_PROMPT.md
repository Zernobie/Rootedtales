# 📚 Library System Recreation Prompt

**Use this prompt to recreate the Rooted Tales library system in any project**

---

## 🎯 COMPLETE PROMPT

Copy and paste this entire prompt to recreate the library system:

---

## 📱 PROJECT REQUEST

I need you to create a complete mobile book reading library system with the following specifications:

---

### **1. LIBRARY DATA STRUCTURE**

Create a file `/data/bookPages.ts` that stores book data with this structure:

```typescript
// Book data structure
interface BookData {
  id: string;
  title: string;
  contentType: 'image' | 'text';
  pages: string[]; // Array of image URLs or text content
}

// Example book structure
const BOOK_PAGES = {
  'book-id': {
    id: 'book-id',
    title: 'Book Title',
    contentType: 'image' as const,
    pages: Array.from({ length: PAGE_COUNT }, (_, i) => 
      `https://your-storage-url.com/books/Book%20Name/page-${String(i + 1).padStart(3, '0')}.png`
    ),
  },
};

// Helper functions
export function getBookData(bookId: string) {
  // Map numeric IDs to string IDs
  // Return book data
}

export function getBookTitle(bookId: string) {
  // Return just the title
}
```

**Requirements**:
- Support for 12+ books
- Smart URL generation using Array.from()
- Both numeric ('1', '2', '3') and string IDs ('book-name')
- Image URLs from cloud storage (Supabase or similar)
- Helper functions for easy access

---

### **2. LIBRARY SCREEN COMPONENT**

Create `/components/LibraryScreen.tsx` with these features:

**Display Options**:
- 🎠 **Carousel View** (default) - Horizontal scrolling book covers
- 🔲 **Grid View** - 2-column grid of books
- 📋 **List View** - Vertical list with details

**Filtering & Search**:
- Search bar for book titles
- Filter by:
  - All Books
  - In Progress (books with saved progress)
  - Completed (books read to the end)
  - Bookmarked (books with bookmarks)

**Book Cards Display**:
Each book card shows:
- Cover image (first page or custom cover)
- Book title
- Page count (e.g., "27 pages")
- Reading progress (e.g., "Page 5 of 27 - 18%")
- Progress bar
- "Continue Reading" badge if in progress
- Bookmark count if any exist

**Responsive Design**:
- Mobile-first (385px × 830px)
- Smooth animations
- Touch-friendly tap targets
- Swipe gestures for carousel

**State Management**:
- Load all books from bookPages.ts
- Track user reading progress
- Handle view mode switching
- Filter & search functionality

---

### **3. BOOK OVERVIEW COMPONENT**

Create `/components/BookOverview.tsx`:

**Features**:
- Large cover preview (first page or custom cover)
- Book title and description
- Total page count
- Estimated reading time (based on page count)
- Reading progress display:
  - "Not started" - Show "Start Reading" button
  - "In progress" - Show "Continue Reading" from page X
  - "Completed" - Show "Read Again" option
- Progress bar visualization
- Bookmark list (if any):
  - Show bookmarked page numbers
  - Thumbnail previews
  - Jump to bookmark option

**Action Buttons**:
- Start Reading / Continue Reading / Read Again
- Add to Favorites
- Share book
- View bookmarks

**Back Navigation**:
- Return to Library screen
- Preserve library view state (carousel/grid/list)

---

### **4. IMMERSIVE BOOK READER**

Create `/components/ImmersiveBookReader.tsx`:

**Full-Screen Experience**:
- Edge-to-edge display
- No distractions
- Immersive reading mode

**Top Bar Controls**:
- ← Back button (exit reader with confirmation)
- 🔖 Bookmark current page
- ⚙️ Settings menu
- 📋 View all bookmarks

**Page Display**:
- Full-screen image display
- Zoom capability (pinch-to-zoom 100%-200%)
- Pan when zoomed
- High-quality image loading
- Loading state with skeleton/spinner

**Navigation Controls**:
- ← Previous page button
- Page counter: "Page X of Y"
- → Next page button
- Tap left edge = previous page
- Tap right edge = next page
- Swipe left = next page
- Swipe right = previous page

**3D Page Flip Animation**:
Create `/components/FlipPage.tsx`:
- Realistic page turn effect
- 3D transformation
- Smooth animation (300-500ms)
- Works with swipe gestures
- Sound effect option (page rustle)

**Auto-Save Progress**:
- Save current page every 5 seconds
- Save on page change
- Save on exit
- Sync to backend (Supabase/localStorage)

**Bookmark System**:
Create `/components/BookmarkPanel.tsx`:
- Add bookmark to current page
- Remove bookmark
- View all bookmarks in sidebar
- Thumbnail preview of bookmarked pages
- Jump to bookmarked page
- Organize by page number

**Reading Settings**:
Create `/components/BookSettings.tsx`:
- Page flip speed (slow/normal/fast)
- Sound effects (on/off)
- Background music (on/off)
- Auto-play (automatic page turns)
- Volume control

**Exit Confirmation**:
- "Save progress and exit?" dialog
- Yes → Save and return to library
- Cancel → Continue reading
- Always save progress before exiting

---

### **5. USER FLOW**

Implement this complete reading flow:

```
STEP 1: Browse Library
├── User sees all books (carousel/grid/list)
├── Can search by title
├── Can filter (all/in-progress/completed)
└── Each book shows cover, title, progress

STEP 2: Select Book
├── Tap book card → Navigate to Book Overview
├── See book details, progress, bookmarks
└── Tap "Start/Continue Reading"

STEP 3: Immersive Reading
├── Full-screen reader opens
├── Display current page (or page 1 if new)
├── User can:
│   ├── Swipe/tap to flip pages
│   ├── Pinch to zoom
│   ├── Add bookmarks
│   ├── Access settings
│   └── View bookmark list
└── Progress auto-saves

STEP 4: Page Navigation
├── Swipe left → Next page (3D flip animation)
├── Swipe right → Previous page (3D flip animation)
├── Tap edges → Navigate
├── Use next/prev buttons
└── Page counter updates

STEP 5: Bookmark Management
├── Tap bookmark icon → Save current page
├── Open bookmark panel → See all bookmarks
├── Tap bookmark → Jump to that page
└── Remove bookmark option

STEP 6: Exit Reading
├── Tap back button
├── Confirmation: "Save and exit?"
├── Progress saved to backend
└── Return to Library (preserves view state)
```

---

### **6. DATA SYNCHRONIZATION**

Implement progress tracking:

**Store This Data**:
```typescript
interface ReadingProgress {
  userId: string;
  bookId: string;
  currentPage: number;
  totalPages: number;
  percentComplete: number;
  lastReadAt: timestamp;
  isCompleted: boolean;
  bookmarks: number[]; // Array of page numbers
}
```

**Sync Points**:
- When user opens a book → Load progress
- Every 5 seconds while reading → Save current page
- On page change → Update progress
- On bookmark add/remove → Update bookmarks
- On exit → Final save
- On completion (last page) → Mark as completed

**Backend Integration** (Supabase):
```sql
-- Reading progress table
CREATE TABLE reading_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  book_id TEXT NOT NULL,
  current_page INTEGER DEFAULT 1,
  total_pages INTEGER NOT NULL,
  percent_complete DECIMAL,
  is_completed BOOLEAN DEFAULT FALSE,
  bookmarks INTEGER[],
  last_read_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### **7. TECHNICAL REQUIREMENTS**

**Framework & Libraries**:
- React + TypeScript
- Motion/Framer Motion for animations
- Tailwind CSS for styling
- React hooks for state management

**Key Libraries**:
```json
{
  "motion": "^latest", // For animations
  "lucide-react": "^latest", // For icons
  "react-router": "^latest" // For navigation (optional)
}
```

**Component Structure**:
```
/components/
├── LibraryScreen.tsx        // Main library view
├── BookOverview.tsx          // Book detail screen
├── ImmersiveBookReader.tsx   // Full-screen reader
├── FlipPage.tsx              // Page flip animation
├── BookmarkPanel.tsx         // Bookmark sidebar
├── BookSettings.tsx          // Reading settings
└── /ui/                      // Reusable UI components
    ├── card.tsx
    ├── button.tsx
    ├── dialog.tsx
    ├── progress.tsx
    └── scroll-area.tsx
```

**Data Structure**:
```
/data/
└── bookPages.ts              // All book definitions
```

**Utilities**:
```
/utils/
├── dataSync.ts               // Sync progress to backend
├── bookUtils.ts              // Book helper functions
└── storageHelpers.ts         // localStorage/Supabase
```

---

### **8. BOOK DATA EXAMPLE**

Provide books with this structure:

```typescript
// Book 1: Short book (27 pages)
'rusty-red-panda': {
  id: 'rusty-red-panda',
  title: 'The Adventures of Rusty the Red Panda',
  contentType: 'image' as const,
  pages: Array.from({ length: 27 }, (_, i) => 
    `https://storage-url.com/books/Rusty/page-${String(i + 1).padStart(3, '0')}.png`
  ),
},

// Book 2: Medium book (64 pages)
'hedge-treasure': {
  id: 'hedge-treasure',
  title: 'Akai and Hedge: The Treasure of Friendship',
  contentType: 'image' as const,
  pages: Array.from({ length: 64 }, (_, i) => 
    `https://storage-url.com/books/Hedge/page-${String(i + 1).padStart(3, '0')}.png`
  ),
},

// Book 3: Long book (85 pages)
'cozy-koala': {
  id: 'cozy-koala',
  title: 'Akai Remarkable Adventure with The Cozy Koala',
  contentType: 'image' as const,
  pages: Array.from({ length: 85 }, (_, i) => 
    `https://storage-url.com/books/Koala/page-${String(i + 1).padStart(3, '0')}.png`
  ),
},
```

**Support for 12 books total**, ranging from 27-85 pages each.

---

### **9. MOBILE OPTIMIZATION**

**Design for Mobile**:
- Primary viewport: 385px × 830px (mobile)
- Touch-friendly buttons (min 44px tap target)
- Swipe gestures throughout
- Smooth 60fps animations
- Lazy load images
- Image optimization

**Performance**:
- Preload next/previous pages
- Cache recently viewed pages
- Compress images (WebP format)
- Progressive image loading
- Skeleton screens while loading

**Responsive Design**:
- Portrait mode (primary)
- Landscape mode (reading optimized)
- Tablet support (larger screens)
- Desktop fallback

---

### **10. FEATURES CHECKLIST**

Implement these features:

**Library Features**:
- [ ] ✅ Display all books in carousel view
- [ ] ✅ Grid view (2 columns)
- [ ] ✅ List view (detailed)
- [ ] ✅ Search by title
- [ ] ✅ Filter: All/In Progress/Completed/Bookmarked
- [ ] ✅ Show reading progress per book
- [ ] ✅ "Continue Reading" badges
- [ ] ✅ Book cover thumbnails

**Book Overview Features**:
- [ ] ✅ Large cover preview
- [ ] ✅ Book title and description
- [ ] ✅ Page count display
- [ ] ✅ Progress visualization
- [ ] ✅ Bookmark list preview
- [ ] ✅ Start/Continue/Read Again buttons
- [ ] ✅ Back to library navigation

**Reading Features**:
- [ ] ✅ Full-screen immersive reader
- [ ] ✅ Image page display
- [ ] ✅ 3D page flip animation
- [ ] ✅ Swipe to navigate
- [ ] ✅ Tap edges to navigate
- [ ] ✅ Page counter (X of Y)
- [ ] ✅ Previous/Next buttons
- [ ] ✅ Pinch-to-zoom (100%-200%)
- [ ] ✅ Pan when zoomed

**Bookmark Features**:
- [ ] ✅ Add bookmark to current page
- [ ] ✅ Remove bookmark
- [ ] ✅ Bookmark panel/sidebar
- [ ] ✅ Thumbnail previews
- [ ] ✅ Jump to bookmark
- [ ] ✅ Bookmark count display

**Progress Features**:
- [ ] ✅ Auto-save every 5 seconds
- [ ] ✅ Save on page change
- [ ] ✅ Save on exit
- [ ] ✅ Resume from last page
- [ ] ✅ Track completion percentage
- [ ] ✅ Mark as completed
- [ ] ✅ Sync to backend

**Settings Features**:
- [ ] ✅ Page flip speed control
- [ ] ✅ Sound effects toggle
- [ ] ✅ Background music toggle
- [ ] ✅ Volume control
- [ ] ✅ Auto-play option

**Exit Features**:
- [ ] ✅ Exit confirmation dialog
- [ ] ✅ Save progress on exit
- [ ] ✅ Return to library
- [ ] ✅ Preserve library view state

---

### **11. ANIMATION SPECIFICATIONS**

**Page Flip Animation**:
```typescript
// 3D flip effect
const pageFlipAnimation = {
  initial: { rotateY: 0, transformOrigin: 'right' },
  animate: { rotateY: -180 },
  transition: { duration: 0.5, ease: 'easeInOut' }
};
```

**Carousel Scroll**:
- Smooth horizontal scroll
- Snap to center
- Spring animation
- Momentum scrolling

**View Transitions**:
- Fade in/out (300ms)
- Slide transitions (400ms)
- Scale animations for cards

**Loading States**:
- Skeleton screens
- Fade-in when loaded
- Smooth opacity transitions

---

### **12. UI/UX REQUIREMENTS**

**Library Screen UI**:
```
┌─────────────────────────────────┐
│  📚 My Library                  │
│  ┌─────────────────────────┐   │
│  │  🔍 Search books...     │   │
│  └─────────────────────────┘   │
│                                 │
│  [All] [In Progress] [Done]    │
│  [🎠 Carousel] [🔲 Grid] [📋]  │
│                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐ │
│  │ Book │  │ Book │  │ Book │ │
│  │  1   │  │  2   │  │  3   │ │
│  │ 45%  │  │ New  │  │ 100% │ │
│  └──────┘  └──────┘  └──────┘ │
└─────────────────────────────────┘
```

**Reader UI**:
```
┌─────────────────────────────────┐
│ ← 🔖 ⚙️ 📋                     │ Top bar
├─────────────────────────────────┤
│                                 │
│                                 │
│        BOOK PAGE IMAGE          │
│        (Full Screen)            │
│                                 │
│                                 │
├─────────────────────────────────┤
│  ←     Page 5 of 27      →     │ Bottom controls
└─────────────────────────────────┘
```

**Book Overview UI**:
```
┌─────────────────────────────────┐
│  ← Book Title                   │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │    Book Cover Image     │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  📖 64 pages                    │
│  ⏱️ 15 min read                │
│  📊 [████████░░] 45%           │
│                                 │
│  🔖 3 bookmarks saved           │
│                                 │
│  [  Continue Reading  ]         │
└─────────────────────────────────┘
```

---

### **13. CODE EXAMPLE STRUCTURE**

Provide code similar to this structure:

```typescript
// LibraryScreen.tsx
export function LibraryScreen() {
  const [books, setBooks] = useState([]);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid' | 'list'>('carousel');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load books and progress
  useEffect(() => {
    loadBooksWithProgress();
  }, []);

  return (
    <div className="library-container">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
      
      {viewMode === 'carousel' && <CarouselView books={filteredBooks} />}
      {viewMode === 'grid' && <GridView books={filteredBooks} />}
      {viewMode === 'list' && <ListView books={filteredBooks} />}
    </div>
  );
}

// ImmersiveBookReader.tsx
export function ImmersiveBookReader({ bookId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookData, setBookData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [zoom, setZoom] = useState(1);

  // Auto-save progress
  useEffect(() => {
    const interval = setInterval(() => {
      saveProgress(bookId, currentPage);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  // Navigation
  const nextPage = () => {
    if (currentPage < bookData.pages.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="reader-fullscreen">
      <TopBar onBack={handleExit} onBookmark={addBookmark} />
      <FlipPage
        currentPage={bookData.pages[currentPage - 1]}
        onSwipeLeft={nextPage}
        onSwipeRight={prevPage}
        zoom={zoom}
      />
      <BottomControls
        currentPage={currentPage}
        totalPages={bookData.pages.length}
        onPrev={prevPage}
        onNext={nextPage}
      />
    </div>
  );
}
```

---

### **14. STYLING REQUIREMENTS**

**Theme**:
- Primary color: Green (#22c55e) for forest theme
- Background: Dark or light (theme-based)
- Cards: Rounded corners, subtle shadows
- Buttons: Rounded, clear labels
- Animations: Smooth, 300-500ms transitions

**Typography**:
- Headings: Bold, clear hierarchy
- Body: Readable, good contrast
- Page numbers: Clear, always visible

**Spacing**:
- Consistent padding (16px, 24px)
- Comfortable tap targets (min 44px)
- Good visual hierarchy

---

### **15. ACCESSIBILITY**

Implement:
- Screen reader support
- Keyboard navigation
- Focus indicators
- Alt text for images
- ARIA labels
- Sufficient color contrast
- Touch target sizes

---

### **16. ERROR HANDLING**

Handle these scenarios:
- Failed image loading → Show error state, retry button
- No internet → Offline mode message
- Missing progress data → Start from page 1
- Invalid book ID → Show error, return to library
- Corrupted bookmarks → Reset bookmarks

---

### **17. INTEGRATION POINTS**

**With Other Systems**:
- User authentication (to save progress per user)
- Achievement system (badges for reading)
- Character gallery (unlock characters by reading books)
- Mini games (integrate reading progress)
- Analytics (track reading habits)

---

## 🎯 DELIVERABLES

Please create:

1. ✅ `/data/bookPages.ts` with 12 books (varying page counts)
2. ✅ `/components/LibraryScreen.tsx` with carousel/grid/list views
3. ✅ `/components/BookOverview.tsx` with progress display
4. ✅ `/components/ImmersiveBookReader.tsx` with full-screen reading
5. ✅ `/components/FlipPage.tsx` with 3D animation
6. ✅ `/components/BookmarkPanel.tsx` with bookmark management
7. ✅ `/components/BookSettings.tsx` with reading settings
8. ✅ `/utils/dataSync.ts` for progress synchronization
9. ✅ Complete user flow implementation
10. ✅ Mobile-optimized responsive design

---

## 📊 SUCCESS CRITERIA

The library system should:

- ✅ Display all 12 books in 3 view modes
- ✅ Allow searching and filtering
- ✅ Show accurate reading progress
- ✅ Provide immersive full-screen reading
- ✅ Have smooth 3D page flip animations
- ✅ Support bookmarks with thumbnails
- ✅ Auto-save progress every 5 seconds
- ✅ Resume from last read page
- ✅ Work smoothly on mobile (60fps)
- ✅ Handle offline gracefully
- ✅ Sync progress to backend

---

## 🎨 VISUAL REFERENCES

The library should look like:
- Modern mobile reading app (Kindle, Apple Books style)
- Clean, minimalist design
- Forest/nature theme colors
- Smooth animations throughout
- Professional polish

---

## 📱 TECHNICAL STACK

Use:
- React 18+ with TypeScript
- Motion (Framer Motion) for animations
- Tailwind CSS for styling
- Supabase for backend (or localStorage for demo)
- Lucide React for icons
- Modern React hooks (useState, useEffect, useCallback)

---

## ⚡ PERFORMANCE TARGETS

Optimize for:
- First page load: < 2 seconds
- Page flip animation: 60fps
- Image loading: Progressive, with placeholders
- Memory usage: Efficient (preload only adjacent pages)
- Bundle size: Keep components tree-shakeable

---

## 🚀 IMPLEMENTATION NOTES

**Start with**:
1. Create book data structure (bookPages.ts)
2. Build LibraryScreen with basic display
3. Add BookOverview screen
4. Implement ImmersiveBookReader
5. Add FlipPage animation
6. Implement bookmarks
7. Add progress tracking
8. Connect to backend
9. Polish animations
10. Test on mobile devices

**Key Considerations**:
- Image URLs should be from CDN/cloud storage
- Support both portrait and landscape modes
- Handle network failures gracefully
- Optimize images for mobile bandwidth
- Use React.memo for performance
- Implement virtual scrolling for large libraries

---

END OF PROMPT

