# User Flow & Image-Based Book Support
## Rooted Tales - Library to Reading Flow + Image Implementation Guide

**Created**: April 8, 2026  
**Version**: 1.0  
**Mobile Dimensions**: 385px × 830px

---

## 📱 PART 1: COMPLETE USER FLOW - LIBRARY TO READING

### **Flow Overview Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                             │
└─────────────────────────────────────────────────────────────┘

START
  │
  ├─→ [1] Home Screen
  │      │
  │      ├─→ Tap "Library" button
  │      │
  ├─→ [2] Library Screen (LibraryScreen.tsx)
  │      │
  │      ├─→ Browse books (3 view modes)
  │      │   • Carousel View (default)
  │      │   • Grid View
  │      │   • List View
  │      │
  │      ├─→ Select a book (tap on book card/cover)
  │      │
  ├─→ [3] Book Overview Screen (BookOverview.tsx)
  │      │
  │      ├─→ View book details
  │      │   • Cover image
  │      │   • Title, author, rating
  │      │   • Description/overview
  │      │   • Reading progress indicator
  │      │
  │      ├─→ Tap "Start Reading" / "Continue" / "Read Again"
  │      │
  ├─→ [4] Immersive Reader (ImmersiveBookReader.tsx)
  │      │
  │      ├─→ Read book pages
  │      │   • Tap zones (prev/next/controls)
  │      │   • Swipe gestures
  │      │   • 3D page flip animation
  │      │
  │      ├─→ Optional actions:
  │      │   • Add bookmarks
  │      │   • Adjust zoom
  │      │   • Enable soundscape
  │      │   • Pause reading
  │      │
  │      ├─→ Exit reading:
  │      │   • Tap "Library" → Exit modal → Save & Exit
  │      │   • Tap "Pause" → Saves progress → Returns to overview
  │      │   • Tap "Stop" → Returns to previous screen
  │      │   • Press ESC key → Exit modal → Save & Exit
  │      │
  ├─→ [5] Return to Book Overview or Library
  │
END
```

---

## 🔄 DETAILED STEP-BY-STEP FLOW

### **[1] HOME SCREEN**

**File**: `/App.tsx` (lines 464-477)

**User sees**:
- Main menu card with navigation options
- "Library" button among other options

**User action**:
- Taps on "Library" button

**Code execution**:
```typescript
// Line 476
onClick={() => setCurrentScreen('library')}
```

**State change**:
```typescript
currentScreen: 'home' → 'library'
```

**Navigation**: Home → Library Screen

---

### **[2] LIBRARY SCREEN**

**File**: `/components/LibraryScreen.tsx` (514 lines)

#### **Step 2A: Library Loads**

**User sees**:
```
┌─────────────────────────────────────┐
│ [←] Library Browser          [ ]    │
│ 6 Stories          [📖] [⊞] [☰]    │
├─────────────────────────────────────┤
│                                     │
│     [Large Book Card]               │
│     • Cover image (3:4 ratio)       │
│     • Title (2 lines max)           │
│     • Author                        │
│     • Description (3 lines)         │
│     • Category, Rating, Time        │
│     • [View Details] button         │
│     • Navigation arrows + dots      │
│                                     │
└─────────────────────────────────────┘
```

**Default state**:
- **View mode**: Carousel (single large card)
- **Book index**: 0 (first book - Rusty)
- **Books loaded**: 6 books from hardcoded data

**Available actions**:
1. **View mode toggle**: Switch between Carousel/Grid/List
2. **Navigate books**: Arrows, dots, or swipe (Carousel mode)
3. **View book details**: Tap on book card/cover
4. **Go back**: Tap back button → returns to Home

#### **Step 2B: User Browses Books**

**Option 1 - Carousel View** (default):
- User sees 1 book at a time
- Can swipe left/right or use arrow buttons
- Tap on book card or "View Details" button

**Option 2 - Grid View**:
- User sees 2 columns of books (3 rows visible)
- Can scroll down to see all 6 books
- Tap on any book card

**Option 3 - List View**:
- User sees full-width book rows
- Can scroll down to see all 6 books
- Tap on any book card

#### **Step 2C: User Selects a Book**

**User action**: Taps on book card, cover, or "View Details" button

**Code execution** (lines 148-159):
```typescript
const handleBookClick = (book: Book) => {
  if (!user) {
    // User not logged in → redirect to auth
    onNavigate('auth');
    return;
  }
  
  // User logged in → navigate to book overview
  onNavigate('bookOverview', book.id);
};
```

**State changes**:
```typescript
selectedBookId: book.id  // e.g., '1', '2', '3', etc.
currentScreen: 'library' → 'bookOverview'
```

**Navigation**: Library → Book Overview

---

### **[3] BOOK OVERVIEW SCREEN**

**File**: `/components/BookOverview.tsx` (500+ lines)

#### **Step 3A: Overview Loads**

**Data loaded** (lines 42-86):
```typescript
const booksData = {
  '1': {
    id: 'rusty-red-panda',
    title: 'The Adventures of Rusty the Red Panda',
    author: 'Rooted Tales',
    rating: 4.8,
    ageRange: '3-8 years',
    readTime: '15 minutes',
    category: 'Forest Tales',
    image: rustyBookCover,
    isBookmarked: user?.readingProgress?.['rusty-red-panda'] ? true : false,
    overview: `Once upon a time...` // Full description
  },
  // ... books 2-6
};
```

**User sees**:
```
┌─────────────────────────────────────┐
│ [←]  Book Details                   │
├─────────────────────────────────────┤
│                                     │
│     ┌─────────────────────┐         │
│     │   Book Cover        │         │
│     │   (Large image)     │         │
│     └─────────────────────┘         │
│                                     │
│  The Adventures of Rusty...         │
│  by Rooted Tales                    │
│  ⭐ 4.8  |  3-8 years  |  15 min    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Overview:                   │   │
│  │ Once upon a time, in the... │   │
│  │ (Scrollable description)    │   │
│  └─────────────────────────────┘   │
│                                     │
│  📊 Reading Progress: 45%           │
│  [======================>      ]    │
│                                     │
│  [Start Reading] [Okay] [Pause]    │
│                                     │
└─────────────────────────────────────┘
```

**Reading progress calculation**:
```typescript
const progress = user?.readingProgress?.[book.id] || 0;
const progressPercentage = (progress / totalPages) * 100;
```

**Button states**:
- **No progress (0%)**: Shows "Start Reading"
- **Partial progress (1-99%)**: Shows "Continue Reading" + progress bar
- **Complete (100%)**: Shows "Read Again"

#### **Step 3B: User Taps "Start Reading" Button**

**User action**: Taps on the reading button (Start/Continue/Read Again)

**Code execution** (lines in BookOverview.tsx):
```typescript
// When user taps reading button
onClick={() => onStartReading(book.id)}
```

**This calls parent function in App.tsx** (lines 509-512):
```typescript
onStartReading={(bookId) => {
  setSelectedBookId(bookId);
  setCurrentScreen('immersiveReader');
}}
```

**State changes**:
```typescript
selectedBookId: bookId  // Confirms book ID
currentScreen: 'bookOverview' → 'immersiveReader'
```

**Navigation**: Book Overview → Immersive Reader

---

### **[4] IMMERSIVE BOOK READER**

**File**: `/components/ImmersiveBookReader.tsx` (698 lines)

#### **Step 4A: Reader Loads**

**Props received from App.tsx** (lines 549-565):
```typescript
<ImmersiveBookReader
  user={user}
  setUser={setUser}
  theme={theme}
  bookId={selectedBookId}
  bookTitle="The Adventures of Rusty the Red Panda"
  bookContent={[
    "Once upon a time, in the lush green forests...",
    "One day, Rusty met a group of young explorers...",
    "The explorers introduced Rusty to their world...",
    // ... 25 more pages (28 total)
  ]}
  coverImage={rustyBookCover}
  onBack={() => setCurrentScreen('bookOverview')}
  onPause={(bookId) => setCurrentScreen('bookOverview')}
  onStop={(bookId) => setCurrentScreen('library')}
/>
```

**Initial state set**:
```typescript
// Load saved reading progress
const savedPage = user?.readingProgress?.[bookId] || 0;
setCurrentPage(savedPage);

// Load bookmarks
const savedBookmarks = localStorage.getItem(`bookmarks_${bookId}`);
setBookmarks(JSON.parse(savedBookmarks) || []);

// Default states
showControls: false (auto-hides)
zoomLevel: 1.0 (100%)
orientation: 'portrait' or 'landscape' (auto-detect)
```

**User sees** (initial view):
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│          ┌───────────────┐          │
│          │               │          │
│          │               │          │
│          │   Page 1/28   │          │
│          │               │          │
│          │  "Once upon   │          │
│          │   a time..."  │          │
│          │               │          │
│          └───────────────┘          │
│                                     │
│   [ESC] Press to exit               │ ← Shows for 5 seconds
│                                     │
└─────────────────────────────────────┘
```

**ESC hint appears** for 5 seconds (lines 679-693)

#### **Step 4B: User Reads & Navigates**

**Navigation methods**:

1. **Tap zones** (lines 293-304):
   - Left 30%: Previous page
   - Center 40%: Show/hide controls
   - Right 30%: Next page

2. **Swipe gestures** (lines 260-291):
   - Swipe right (>50px): Previous page
   - Swipe left (>50px): Next page

3. **Arrow buttons** (when controls visible):
   - Bottom left: Previous button
   - Bottom right: Next button

4. **Drag gesture** (>20px):
   - Shows page curl preview
   - Release to complete page turn

**Page turn animation** (600ms):
```
Current Page → [3D Flip Animation] → Next Page
```

**Auto-save triggers** (5 mechanisms):
1. ☎️ **App backgrounding**: Phone call, notification, etc.
2. ❌ **Before unload**: App closing
3. ⏰ **Periodic**: Every 30 seconds (if page changed)
4. 🚪 **Unmount**: Component destroyed
5. 💾 **Manual**: Pause/Stop buttons

**Auto-save code** (lines 187-199):
```typescript
const saveProgress = (page: number) => {
  const updatedUser = {
    ...user,
    readingProgress: {
      ...user.readingProgress,
      [bookId]: page
    }
  };
  setUser(updatedUser);
  localStorage.setItem('user', JSON.stringify(updatedUser));
};
```

#### **Step 4C: User Accesses Controls**

**User action**: Tap center of screen

**Controls slide in** (3-second auto-hide):

**Top bar appears** (lines 389-438):
```
┌────────────────────────────────────┐
│ [🏠 Library]  Book Title  [🎵][🔖] │
└────────────────────────────────────┘
```
- **Library button**: Opens exit modal
- **Soundscape button**: Opens ambient sounds
- **Bookmark button**: Adds/removes bookmark on current page

**Bottom bar appears** (lines 494-605):
```
┌────────────────────────────────────┐
│ [←] Page 5/28 [======>   ] 18% [→] │
│ [Z-][100%][Z+] [Bookmarks(2)] [Stop]│
└────────────────────────────────────┘
```
- **Progress bar**: Visual reading progress
- **Zoom controls**: 100% - 200% (25% increments)
- **Bookmarks button**: Opens bookmark panel
- **Pause button**: Saves & returns to overview
- **Stop button**: Returns to library

#### **Step 4D: User Adds Bookmark**

**User action**: Taps bookmark button (when controls visible)

**Code execution** (lines 307-326):
```typescript
const toggleBookmark = () => {
  const existingBookmark = bookmarks.find(b => b.pageNumber === currentPage);
  
  if (existingBookmark) {
    // Remove bookmark
    const newBookmarks = bookmarks.filter(b => b.pageNumber !== currentPage);
    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(newBookmarks));
    toast.success('Bookmark removed');
  } else {
    // Add bookmark
    const newBookmark = {
      id: Date.now().toString(),
      pageNumber: currentPage,
      timestamp: new Date()
    };
    const newBookmarks = [...bookmarks, newBookmark];
    setBookmarks(newBookmarks);
    localStorage.setItem(`bookmarks_${bookId}`, JSON.stringify(newBookmarks));
    toast.success('Bookmark added');
  }
};
```

**Toast notification appears**: "Bookmark added" or "Bookmark removed"

**Storage**:
```
localStorage key: `bookmarks_${bookId}`
Value: JSON array of bookmark objects
```

#### **Step 4E: User Opens Bookmark Panel**

**User action**: Taps "Bookmarks (X)" button

**Panel slides in from right** (lines 608-619):
```
┌─────────────────────────────────────┐
│                      ┌──────────────┤
│  Reading             │ Bookmarks    │
│  area                │              │
│                      │ • Page 3     │
│                      │ • Page 12    │
│                      │ • Page 18    │
│                      │              │
│                      │ [Delete] [Go]│
│                      └──────────────┤
└─────────────────────────────────────┘
```

**Actions available**:
- **Jump to bookmark**: Tap on bookmark → Goes to that page
- **Delete bookmark**: Tap delete icon → Removes bookmark
- **Close panel**: Tap X or outside panel

#### **Step 4F: User Adjusts Zoom**

**User action**: Taps zoom buttons

**Zoom levels**:
- **Zoom Out**: 100% → 75% (disabled at 100%)
- **Zoom In**: 100% → 125% → 150% → 175% → 200%
- **Reset**: Tap percentage button → Returns to 100%
- **Double-tap**: Toggles between 100% ↔ 150%

**Visual effect**:
```typescript
// Applied to page container (lines 456-459)
style={{
  transform: `scale(${zoomLevel})`,
  transition: 'transform 0.3s ease'
}}
```

#### **Step 4G: User Enables Soundscape**

**User action**: Taps soundscape button (🎵)

**Panel slides in from right** (lines 622-626):
```
┌─────────────────────────────────────┐
│                      ┌──────────────┤
│  Reading             │ Soundscape   │
│  area                │              │
│                      │ 🌲 Forest    │
│                      │ 🌧️ Rain      │
│                      │ 🌊 Ocean     │
│                      │              │
│                      │ [Volume: 50%]│
│                      └──────────────┤
└─────────────────────────────────────┘
```

**Component**: `<SoundscapePlayer>` (separate component)

**Features**:
- Ambient background sounds
- Volume control
- Multiple sound options (based on theme)

#### **Step 4H: User Finishes Reading Session**

**3 Exit Options**:

**Option 1: Pause Button**
- **User action**: Taps "Pause" button
- **Code** (lines 355-363):
  ```typescript
  const handlePause = () => {
    saveProgress(currentPage);
    toast.success(`Progress saved at page ${currentPage + 1}`);
    onPause(); // or onBack()
  };
  ```
- **Result**: 
  - Saves current page
  - Shows toast notification
  - Returns to Book Overview screen

**Option 2: Stop Button**
- **User action**: Taps "Stop" button
- **Code** (lines 365-371):
  ```typescript
  const handleStop = () => {
    onStop(); // or onBack()
  };
  ```
- **Result**: Returns to Library screen (no explicit save, but auto-save has it covered)

**Option 3: Library Button / ESC Key**
- **User action**: Taps "Library" button or presses ESC key
- **Modal appears** (lines 629-676):
  ```
  ┌───────────────────────────────┐
  │ Exit Reading            [X]   │
  ├───────────────────────────────┤
  │ Are you sure you want to      │
  │ exit reading? Your progress   │
  │ will be saved.                │
  ├───────────────────────────────┤
  │      [Cancel] [Save & Exit]   │
  └───────────────────────────────┘
  ```
- **User taps "Save & Exit"**:
  ```typescript
  const handleSaveAndExit = () => {
    saveProgress(currentPage);
    toast.success(`Progress saved at page ${currentPage + 1}`);
    setShowExitModal(false);
    onBack(); // Returns to previous screen
  };
  ```
- **Result**:
  - Saves current page
  - Shows toast notification
  - Returns to Book Overview or Library

---

### **[5] RETURN & DATA PERSISTENCE**

**After exiting reader**:

**Data saved in localStorage**:
```typescript
// Reading progress
{
  user: {
    ...
    readingProgress: {
      'rusty-red-panda': 5,        // Page index (0-based)
      'akai-red-panda-reunion': 12,
      'akai-kaito-ocean-odyssey': 0
    }
  }
}

// Bookmarks (separate storage)
localStorage: {
  'bookmarks_1': [
    {id: '1234567890', pageNumber: 3, timestamp: '2026-04-08T...'},
    {id: '1234567891', pageNumber: 12, timestamp: '2026-04-08T...'}
  ]
}
```

**Next time user opens the book**:
1. **Library Screen**: Shows progress indicator if partially read
2. **Book Overview**: Shows "Continue Reading" with progress bar
3. **Immersive Reader**: Opens at saved page, loads bookmarks

---

## 📸 PART 2: IMAGE-BASED BOOKS IMPLEMENTATION GUIDE

### **Current System: Text-Based**

**Current data structure** (App.tsx, lines 555-565):
```typescript
bookContent={[
  "Once upon a time, in the lush green forests...",  // Page 1 text
  "One day, Rusty met a group of young explorers...", // Page 2 text
  "The explorers introduced Rusty to their world...", // Page 3 text
  // ... more text pages
]}
```

**Current rendering** (FlipPage.tsx, lines 75-87):
```typescript
<div className="text-gray-800 leading-relaxed font-serif text-sm">
  {content}  {/* Renders text string */}
</div>
```

---

### **New System: Image-Based Books**

### **Option A: Replace Text with Images (Simple)**

**Recommended for**: Picture books, illustrated stories

#### **Step 1: Update Book Content Type**

**File**: `/components/ImmersiveBookReader.tsx` (line 42)

**BEFORE**:
```typescript
interface ImmersiveBookReaderProps {
  bookContent: string[];  // Array of text strings
  // ... other props
}
```

**AFTER**:
```typescript
interface ImmersiveBookReaderProps {
  bookContent: string[];          // Can be text OR image URLs
  contentType?: 'text' | 'image'; // NEW: Specify content type
  // ... other props
}
```

#### **Step 2: Modify FlipPage Component**

**File**: `/components/FlipPage.tsx`

**Add new props** (lines 4-11):
```typescript
interface FlipPageProps {
  content: string;
  pageNumber: number;
  isFlipping: boolean;
  direction: 'next' | 'prev';
  dragProgress: number;
  orientation: 'portrait' | 'landscape';
  contentType?: 'text' | 'image';  // NEW
}
```

**Update component** (lines 13-20):
```typescript
export function FlipPage({ 
  content, 
  pageNumber, 
  isFlipping, 
  direction,
  dragProgress,
  orientation,
  contentType = 'text'  // NEW: default to text
}: FlipPageProps) {
```

**Replace content rendering** (lines 75-87):

**BEFORE**:
```typescript
<div className="flex-1 flex items-center justify-center overflow-hidden">
  <div className="text-gray-800 leading-relaxed font-serif text-sm">
    {content}
  </div>
</div>
```

**AFTER**:
```typescript
<div className="flex-1 flex items-center justify-center overflow-hidden">
  {contentType === 'image' ? (
    // IMAGE MODE
    <img 
      src={content}
      alt={`Page ${pageNumber + 1}`}
      className="max-w-full max-h-full object-contain"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  ) : (
    // TEXT MODE (existing)
    <div 
      className="text-gray-800 leading-relaxed font-serif text-sm overflow-y-auto max-h-full px-2"
      style={{
        textAlign: 'justify',
        hyphens: 'auto',
        maxWidth: '100%',
        wordBreak: 'break-word',
      }}
    >
      {content}
    </div>
  )}
</div>
```

#### **Step 3: Pass contentType to FlipPage**

**File**: `/components/ImmersiveBookReader.tsx` (lines 467-477)

**BEFORE**:
```typescript
{displayPages.map((pageIndex, idx) => (
  <FlipPage
    key={pageIndex}
    content={bookContent[pageIndex]}
    pageNumber={pageIndex}
    isFlipping={isFlipping && (idx === 0 || orientation === 'portrait')}
    direction={pageDirection}
    dragProgress={isDragging ? dragProgress : 0}
    orientation={orientation}
  />
))}
```

**AFTER**:
```typescript
{displayPages.map((pageIndex, idx) => (
  <FlipPage
    key={pageIndex}
    content={bookContent[pageIndex]}
    pageNumber={pageIndex}
    isFlipping={isFlipping && (idx === 0 || orientation === 'portrait')}
    direction={pageDirection}
    dragProgress={isDragging ? dragProgress : 0}
    orientation={orientation}
    contentType={contentType}  // NEW: pass the type
  />
))}
```

#### **Step 4: Update App.tsx to Support Image Books**

**File**: `/App.tsx`

**Create image book data** (after line 565):
```typescript
// Example: Image-based book content
const rustyImagePages = [
  'figma:asset/page1_rusty.png',  // Page 1 image
  'figma:asset/page2_rusty.png',  // Page 2 image
  'figma:asset/page3_rusty.png',  // Page 3 image
  // ... more image paths
];

const rustyTextPages = [
  "Once upon a time, in the lush green forests...",
  "One day, Rusty met a group of young explorers...",
  // ... existing text
];
```

**Create book configuration object**:
```typescript
const bookConfigurations = {
  '1': {
    id: '1',
    title: 'The Adventures of Rusty the Red Panda',
    contentType: 'text',  // or 'image'
    content: rustyTextPages  // or rustyImagePages
  },
  '2': {
    id: '2',
    title: 'Akai the Red Panda: A Heartwarming Reunion',
    contentType: 'image',  // Image-based book
    content: akaiImagePages
  },
  // ... more books
};
```

**Update ImmersiveBookReader rendering** (lines 547-570):

**BEFORE**:
```typescript
case 'immersiveReader':
  return (
    <ImmersiveBookReader
      user={user}
      setUser={setUser}
      theme={theme}
      bookId={selectedBookId}
      bookTitle="The Adventures of Rusty the Red Panda"
      bookContent={[
        "Once upon a time...",
        // ... hardcoded text
      ]}
      coverImage={rustyBookCover}
      onBack={() => setCurrentScreen('bookOverview')}
    />
  );
```

**AFTER**:
```typescript
case 'immersiveReader':
  const currentBook = bookConfigurations[selectedBookId];
  return (
    <ImmersiveBookReader
      user={user}
      setUser={setUser}
      theme={theme}
      bookId={currentBook.id}
      bookTitle={currentBook.title}
      bookContent={currentBook.content}
      contentType={currentBook.contentType}  // NEW
      coverImage={rustyBookCover}
      onBack={() => setCurrentScreen('bookOverview')}
    />
  );
```

---

### **Option B: Mixed Text + Images (Advanced)**

**Recommended for**: Books with both text and illustrations

#### **Step 1: Create Advanced Content Structure**

**New interface** (add to ImmersiveBookReader.tsx):
```typescript
interface PageContent {
  type: 'text' | 'image' | 'mixed';
  text?: string;
  image?: string;
  layout?: 'image-top' | 'image-bottom' | 'image-left' | 'image-right';
}

interface ImmersiveBookReaderProps {
  bookContent: PageContent[];  // NEW: Complex page structure
  // ... other props
}
```

#### **Step 2: Update FlipPage for Mixed Content**

**File**: `/components/FlipPage.tsx`

**New props**:
```typescript
interface FlipPageProps {
  content: PageContent;  // Changed from string
  // ... other props
}
```

**New rendering logic**:
```typescript
<div className="flex-1 flex items-center justify-center overflow-hidden">
  {content.type === 'text' && (
    // Text only
    <div className="text-gray-800 font-serif text-sm px-2">
      {content.text}
    </div>
  )}
  
  {content.type === 'image' && (
    // Image only
    <img 
      src={content.image}
      alt={`Page ${pageNumber + 1}`}
      className="max-w-full max-h-full object-contain"
    />
  )}
  
  {content.type === 'mixed' && (
    // Mixed content (text + image)
    <div className={`w-full h-full p-4 ${
      content.layout === 'image-top' ? 'flex flex-col' :
      content.layout === 'image-left' ? 'flex flex-row' :
      'flex flex-col'
    }`}>
      {/* Image section */}
      <div className={`${
        content.layout === 'image-top' ? 'h-1/2' :
        content.layout === 'image-left' ? 'w-1/2' :
        'h-1/2'
      } flex items-center justify-center`}>
        <img 
          src={content.image}
          alt={`Illustration ${pageNumber + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      {/* Text section */}
      <div className={`${
        content.layout === 'image-top' ? 'h-1/2' :
        content.layout === 'image-left' ? 'w-1/2 pl-4' :
        'h-1/2 pt-4'
      } overflow-y-auto`}>
        <div className="text-gray-800 font-serif text-sm">
          {content.text}
        </div>
      </div>
    </div>
  )}
</div>
```

#### **Step 3: Create Mixed Content Book Data**

**File**: `/App.tsx`

```typescript
const rustyMixedPages: PageContent[] = [
  {
    type: 'image',
    image: 'figma:asset/rusty_cover.png'
  },
  {
    type: 'mixed',
    layout: 'image-top',
    image: 'figma:asset/rusty_forest.png',
    text: 'Once upon a time, in the lush green forests of the Himalayas, lived a friendly and adventurous red panda named Rusty.'
  },
  {
    type: 'text',
    text: 'Rusty loved exploring the forest and playing with his animal friends, but he often felt lonely because he was the only red panda in the forest.'
  },
  {
    type: 'mixed',
    layout: 'image-left',
    image: 'figma:asset/rusty_explorers.png',
    text: 'One day, Rusty met a group of young explorers who were hiking through the forest.'
  },
  // ... more pages
];
```

---

### **Option C: Add Image Support as Toggle (Best UX)**

**Recommended for**: Giving users choice between text/image modes

#### **Step 1: Add Mode Toggle to Book Overview**

**File**: `/components/BookOverview.tsx`

**Add toggle button** (before "Start Reading" button):
```typescript
// Add state
const [readingMode, setReadingMode] = useState<'text' | 'image'>('text');

// Add toggle UI
<div className="flex items-center gap-4 mb-4">
  <label className="text-sm font-medium">Reading Mode:</label>
  <div className="flex gap-2">
    <Button
      variant={readingMode === 'text' ? 'default' : 'outline'}
      size="sm"
      onClick={() => setReadingMode('text')}
    >
      📝 Text
    </Button>
    <Button
      variant={readingMode === 'image' ? 'default' : 'outline'}
      size="sm"
      onClick={() => setReadingMode('image')}
    >
      🖼️ Images
    </Button>
  </div>
</div>

// Update onStartReading call
<Button onClick={() => onStartReading(book.id, readingMode)}>
  Start Reading
</Button>
```

#### **Step 2: Update App.tsx to Handle Mode**

**File**: `/App.tsx`

**Update onStartReading function** (lines 509-512):

**BEFORE**:
```typescript
onStartReading={(bookId) => {
  setSelectedBookId(bookId);
  setCurrentScreen('immersiveReader');
}}
```

**AFTER**:
```typescript
onStartReading={(bookId, mode) => {
  setSelectedBookId(bookId);
  setReadingMode(mode);  // NEW: Store reading mode
  setCurrentScreen('immersiveReader');
}}
```

**Use mode in ImmersiveBookReader** (line 555):
```typescript
<ImmersiveBookReader
  bookContent={readingMode === 'image' ? bookImagePages : bookTextPages}
  contentType={readingMode}
  // ... other props
/>
```

---

## 📂 FILES TO MODIFY - SUMMARY

### **For Simple Image Support (Option A)**

| File | Changes Required | Lines |
|------|------------------|-------|
| `/components/ImmersiveBookReader.tsx` | Add `contentType` prop | 36-47 |
| `/components/ImmersiveBookReader.tsx` | Pass `contentType` to FlipPage | 467-477 |
| `/components/FlipPage.tsx` | Add `contentType` prop | 4-11 |
| `/components/FlipPage.tsx` | Add conditional rendering (text vs image) | 75-87 |
| `/App.tsx` | Create image book data | 555-570 |
| `/App.tsx` | Update ImmersiveBookReader props | 547-570 |

**Total files**: 3 files  
**Estimated time**: 30-60 minutes

---

### **For Mixed Content Support (Option B)**

| File | Changes Required | Lines |
|------|------------------|-------|
| `/components/ImmersiveBookReader.tsx` | Create `PageContent` interface | Add new interface |
| `/components/ImmersiveBookReader.tsx` | Update props type | 36-47 |
| `/components/FlipPage.tsx` | Update props interface | 4-11 |
| `/components/FlipPage.tsx` | Add complex rendering logic | 75-87 (expand significantly) |
| `/App.tsx` | Create mixed content data | 555-570 |

**Total files**: 3 files  
**Estimated time**: 2-3 hours

---

### **For User-Selectable Mode (Option C)**

| File | Changes Required | Lines |
|------|------------------|-------|
| All from Option A | ↑ Same as above | ↑ |
| `/components/BookOverview.tsx` | Add mode toggle UI | Add before reading button |
| `/components/BookOverview.tsx` | Pass mode to onStartReading | ~28-30 |
| `/App.tsx` | Add readingMode state | Add state variable |
| `/App.tsx` | Update onStartReading handler | 509-512 |

**Total files**: 4 files  
**Estimated time**: 1-2 hours

---

## 🎨 IMAGE REQUIREMENTS & BEST PRACTICES

### **Image Specifications**

**For Portrait Mode**:
- **Dimensions**: 340px × 600px (or multiples: 680×1200, 1020×1800)
- **Aspect Ratio**: 1:1.76
- **Format**: PNG (transparency support) or JPG
- **File size**: < 500KB per page (for performance)

**For Landscape Mode**:
- **Dimensions**: 280px × 450px per page
- **Aspect Ratio**: 1:1.61
- **Format**: PNG or JPG
- **File size**: < 400KB per page

### **Image Import Methods**

**Method 1: figma:asset (Recommended)**
```typescript
import page1 from 'figma:asset/abc123.png';
import page2 from 'figma:asset/def456.png';

const bookImages = [page1, page2, ...];
```

**Method 2: Public folder**
```typescript
const bookImages = [
  '/images/books/rusty/page1.png',
  '/images/books/rusty/page2.png',
  // ...
];
```

**Method 3: External URLs** (not recommended for offline use)
```typescript
const bookImages = [
  'https://cdn.example.com/rusty/page1.png',
  'https://cdn.example.com/rusty/page2.png',
  // ...
];
```

### **Performance Optimization**

**1. Lazy loading** (add to FlipPage.tsx):
```typescript
<img 
  src={content}
  alt={`Page ${pageNumber + 1}`}
  loading="lazy"  // Browser-native lazy loading
  className="max-w-full max-h-full object-contain"
/>
```

**2. Preload adjacent pages**:
```typescript
// In ImmersiveBookReader.tsx
useEffect(() => {
  // Preload next page
  if (currentPage < bookContent.length - 1) {
    const nextImage = new Image();
    nextImage.src = bookContent[currentPage + 1];
  }
  
  // Preload previous page
  if (currentPage > 0) {
    const prevImage = new Image();
    prevImage.src = bookContent[currentPage - 1];
  }
}, [currentPage, bookContent]);
```

**3. Use optimized formats**:
- WebP for modern browsers (smaller file size)
- PNG fallback for older devices
- Compress images (TinyPNG, ImageOptim)

### **Accessibility Considerations**

**Add alt text support**:
```typescript
interface PageContent {
  type: 'image';
  image: string;
  altText: string;  // NEW: For screen readers
}

// In FlipPage.tsx
<img 
  src={content.image}
  alt={content.altText || `Page ${pageNumber + 1}`}
  className="max-w-full max-h-full object-contain"
/>
```

---

## 🔄 MIGRATION STRATEGY

### **Phase 1: Test with One Book**
1. Choose one book (e.g., Book ID '1' - Rusty)
2. Create image pages for that book
3. Implement Option A (simple image support)
4. Test thoroughly on mobile (385×830)
5. Verify page flips, zoom, bookmarks work

### **Phase 2: Extend to All Books**
1. Create images for remaining 5 books
2. Update book configurations
3. Test each book individually
4. Check localStorage compatibility

### **Phase 3: Add User Choice (Optional)**
1. Implement Option C (toggle)
2. Store user preference
3. Add to BookOverview UI
4. Test mode switching

### **Phase 4: Production**
1. Optimize all images
2. Test on real devices
3. Monitor performance
4. Collect user feedback

---

## 📊 DATA STRUCTURE COMPARISON

### **Current: Text-Only**
```typescript
// App.tsx
bookContent={[
  "Text of page 1",
  "Text of page 2",
  "Text of page 3"
]}

// Storage size: ~2-5KB per book
```

### **New: Image-Only**
```typescript
// App.tsx
bookContent={[
  'figma:asset/page1.png',
  'figma:asset/page2.png',
  'figma:asset/page3.png'
]}

// Storage size: ~100-500KB per book (images cached)
```

### **New: Mixed Content**
```typescript
// App.tsx
bookContent={[
  { type: 'image', image: 'page1.png' },
  { type: 'text', text: 'Once upon a time...' },
  { type: 'mixed', image: 'page3.png', text: 'Rusty met...' }
]}

// Storage size: ~50-300KB per book
```

---

## ✅ IMPLEMENTATION CHECKLIST

### **Pre-Implementation**
- [ ] Decide on approach (A, B, or C)
- [ ] Create/gather image assets (340×600px)
- [ ] Optimize images (< 500KB each)
- [ ] Import images using figma:asset or place in public folder

### **Code Changes**
- [ ] Update `ImmersiveBookReader.tsx` interface (add contentType)
- [ ] Modify `FlipPage.tsx` props (add contentType)
- [ ] Add conditional rendering to FlipPage (text vs image)
- [ ] Update App.tsx book data (add image paths)
- [ ] Pass contentType to ImmersiveBookReader
- [ ] (Optional) Add mode toggle to BookOverview

### **Testing**
- [ ] Test image rendering in portrait mode
- [ ] Test image rendering in landscape mode
- [ ] Verify page flip animation works with images
- [ ] Test zoom functionality (100%-200%)
- [ ] Verify bookmarks still work
- [ ] Test auto-save with image pages
- [ ] Check performance (no lag on page turns)
- [ ] Verify images load properly
- [ ] Test on actual mobile device (385×830)

### **Edge Cases**
- [ ] Handle missing images (show fallback)
- [ ] Test with very large images (performance)
- [ ] Verify offline functionality (cached images)
- [ ] Test rapid page turning (preloading)
- [ ] Check memory usage (don't load all images at once)

---

## 🎯 RECOMMENDED APPROACH

**For Rooted Tales specifically, I recommend**:

**Option A + C: Simple Image Support with User Toggle**

**Reasoning**:
1. ✅ Children's books benefit from images
2. ✅ Gives parents/users choice (text for learning to read, images for story time)
3. ✅ Easier to implement (30-60 minutes)
4. ✅ Better performance than mixed content
5. ✅ Can always upgrade to Option B later

**Implementation order**:
1. Start with Option A (image support)
2. Test with one book
3. Add Option C (user toggle)
4. Roll out to all 6 books

---

## 📚 EXAMPLE: Complete Implementation (Option A)

### **File 1: /components/FlipPage.tsx**

```typescript
// ADD THIS to interface (line 4-11)
interface FlipPageProps {
  content: string;
  pageNumber: number;
  isFlipping: boolean;
  direction: 'next' | 'prev';
  dragProgress: number;
  orientation: 'portrait' | 'landscape';
  contentType?: 'text' | 'image';  // ADD THIS LINE
}

// UPDATE THIS in component (line 13-20)
export function FlipPage({ 
  content, 
  pageNumber, 
  isFlipping, 
  direction,
  dragProgress,
  orientation,
  contentType = 'text'  // ADD THIS LINE
}: FlipPageProps) {

// REPLACE THIS section (lines 75-87)
// OLD CODE:
<div className="flex-1 flex items-center justify-center overflow-hidden">
  <div className="text-gray-800 leading-relaxed font-serif text-sm overflow-y-auto max-h-full px-2">
    {content}
  </div>
</div>

// NEW CODE:
<div className="flex-1 flex items-center justify-center overflow-hidden">
  {contentType === 'image' ? (
    <img 
      src={content}
      alt={`Page ${pageNumber + 1}`}
      loading="lazy"
      className="max-w-full max-h-full object-contain p-2"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  ) : (
    <div 
      className="text-gray-800 leading-relaxed font-serif text-sm overflow-y-auto max-h-full px-2"
      style={{
        textAlign: 'justify',
        hyphens: 'auto',
        maxWidth: '100%',
        wordBreak: 'break-word',
      }}
    >
      {content}
    </div>
  )}
</div>
```

### **File 2: /components/ImmersiveBookReader.tsx**

```typescript
// ADD THIS to interface (line 36-47)
interface ImmersiveBookReaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: Theme;
  bookId: string;
  bookTitle: string;
  bookContent: string[];
  contentType?: 'text' | 'image';  // ADD THIS LINE
  coverImage?: string;
  onBack: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

// UPDATE THIS in component (line 49-60)
export function ImmersiveBookReader({ 
  user, 
  setUser, 
  theme, 
  bookId, 
  bookTitle, 
  bookContent,
  contentType = 'text',  // ADD THIS LINE
  coverImage,
  onBack,
  onPause,
  onStop
}: ImmersiveBookReaderProps) {

// UPDATE THIS section (lines 467-477)
{displayPages.map((pageIndex, idx) => (
  <FlipPage
    key={pageIndex}
    content={bookContent[pageIndex]}
    pageNumber={pageIndex}
    isFlipping={isFlipping && (idx === 0 || orientation === 'portrait')}
    direction={pageDirection}
    dragProgress={isDragging ? dragProgress : 0}
    orientation={orientation}
    contentType={contentType}  // ADD THIS LINE
  />
))}
```

### **File 3: /App.tsx**

```typescript
// ADD THIS after imports (create book data)
import rustyPage1 from 'figma:asset/rusty_page1.png';
import rustyPage2 from 'figma:asset/rusty_page2.png';
// ... import all 28 pages

const rustyImagePages = [
  rustyPage1,
  rustyPage2,
  // ... all 28 pages
];

const rustyTextPages = [
  "Once upon a time, in the lush green forests...",
  "One day, Rusty met a group of young explorers...",
  // ... existing text
];

// CREATE THIS configuration object
const bookConfigs = {
  '1': {
    title: 'The Adventures of Rusty the Red Panda',
    contentType: 'image',  // or 'text'
    content: rustyImagePages  // or rustyTextPages
  },
  // ... more books
};

// UPDATE THIS in render (lines 547-570)
case 'immersiveReader':
  const book = bookConfigs[selectedBookId];
  return (
    <ImmersiveBookReader
      user={user}
      setUser={setUser}
      theme={theme}
      bookId={selectedBookId}
      bookTitle={book.title}
      bookContent={book.content}
      contentType={book.contentType}  // ADD THIS LINE
      coverImage={rustyBookCover}
      onBack={() => setCurrentScreen('bookOverview')}
    />
  );
```

---

**Document Version**: 1.0  
**Created**: April 8, 2026  
**Files Referenced**: 
- `/USER_FLOW_AND_IMAGE_SUPPORT.md`
- `/components/LibraryScreen.tsx`
- `/components/BookOverview.tsx`
- `/components/ImmersiveBookReader.tsx`
- `/components/FlipPage.tsx`
- `/App.tsx`

**Maintained By**: Rooted Tales / Xenwinx Studio Development Team
