# Immersive Book Reader & Flip Page Layout
## Rooted Tales - Mobile Book Reading Application

**Components**: 
- `/components/ImmersiveBookReader.tsx` (698 lines)
- `/components/FlipPage.tsx` (109 lines)

**Screen Dimensions**: 385px × 830px (Mobile)  
**Last Updated**: April 7, 2026

---

## 📱 Overall Screen Structure - ImmersiveBookReader

### **Layout Hierarchy**
```
┌─────────────────────────────────────┐
│ TOP BAR (Slide-in overlay)          │ ← Shows on tap (auto-hide 3s)
│ [Library] Book Title [🎵] [🔖]     │
├─────────────────────────────────────┤
│                                     │
│                                     │
│         MAIN READING AREA           │
│        (Full screen - 830px)        │
│                                     │
│      ┌─────────────────────┐       │
│      │                     │       │
│      │   [FlipPage]        │       │
│      │   Book Content      │       │
│      │   with animations   │       │
│      │                     │       │
│      └─────────────────────┘       │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ BOTTOM CONTROLS (Slide-in overlay)  │ ← Shows on tap (auto-hide 3s)
│ [←] Page 1 of 28  [Progress] [→]   │
│ [Z-] [100%] [Z+] [Bookmarks] [Stop] │
└─────────────────────────────────────┘

OVERLAYS (shown on demand):
• Bookmark Panel (right side slide-in)
• Soundscape Player (right side slide-in)
• Exit Modal (center overlay)
• ESC Hint (bottom center, 5s timeout)
```

---

## 🎨 Visual Design - ImmersiveBookReader

### **Background System**
- **Base Background**: `bg-[#f5f1e8]` (Warm paper/parchment color)
- **Reading Area Background**: `bg-[#0d421cb3]` (Dark forest green, semi-transparent)
- **Effect**: Creates immersive, distraction-free reading environment

### **Overall Container** (Lines 387-694)
```css
position: fixed
inset: 0 (full screen)
background: #f5f1e8 (parchment)
display: flex
flex-direction: column
overflow: hidden
```

---

## 📍 Section 1: Top Bar (Auto-hide Overlay)

### **Position & Behavior** (Lines 389-438)
- **Location**: Absolute positioned at top
- **Height**: ~60-70px
- **Z-index**: 50 (above content)
- **Visibility**: Hidden by default, shows on tap/click
- **Auto-hide**: Hides after 3 seconds of inactivity
- **Background**: `bg-gradient-to-b from-black/50 to-transparent`
- **Animation**: Slides down from top (y: -100 → 0)

### **Layout Breakdown**
```
┌────────────────────────────────────────┐
│ [🏠 Library]  Book Title  [🎵] [🔖]   │
└────────────────────────────────────────┘
```

#### **Left Section** (Lines 398-406)
**Library Button**:
- **Component**: `<Button variant="ghost" size="sm">`
- **Icon**: 🏠 Home (`w-5 h-5 mr-2`)
- **Text**: "Library"
- **Color**: White text
- **Action**: Opens exit confirmation modal
- **Function**: `setShowExitModal(true)`

#### **Center Section** (Lines 408-410)
**Book Title**:
- **Font**: `text-sm font-medium`
- **Size**: 14px medium
- **Alignment**: Center
- **Text**: `{bookTitle}` (truncated if too long)
- **Color**: White
- **Flex**: `flex-1` (takes remaining space)
- **Example**: "The Adventures of Rusty the Red Panda"

#### **Right Section** (Lines 412-434)
**Action Buttons** (gap-2 between):

1. **Soundscape Button**:
   - **Icon**: 🎵 Music (`w-5 h-5`)
   - **Color**: White
   - **Action**: Toggle soundscape player
   - **Function**: `setShowSoundscape(!showSoundscape)`

2. **Bookmark Button**:
   - **Icon**: 🔖 Bookmark or BookmarkCheck (if page is bookmarked)
   - **Size**: `w-5 h-5`
   - **Fill**: White when bookmarked (`fill-white`)
   - **Color**: White outline
   - **Action**: Add/remove bookmark on current page
   - **Function**: `toggleBookmark()`
   - **Toast**: Shows "Bookmark added" or "Bookmark removed"

### **Animation**
```typescript
initial: { y: -100, opacity: 0 }
animate: { y: 0, opacity: 1 }
exit: { y: -100, opacity: 0 }
```

---

## 📍 Section 2: Main Reading Area (Full Screen)

### **Container Dimensions** (Lines 441-491)
- **Position**: `flex-1` (takes remaining space)
- **Background**: `bg-[#0d421cb3]` (dark forest green)
- **Display**: `flex items-center justify-center`
- **Overflow**: Hidden
- **Select**: `select-none` (no text selection)
- **Cursor**: Changes based on state:
  - `pointer` - Normal state
  - `grabbing` - When dragging page

### **Layout**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│          ┌───────────────┐          │
│          │               │          │
│          │               │          │
│          │   FlipPage    │          │
│          │   Component   │          │
│          │               │          │
│          │   Page 1      │          │
│          │               │          │
│          └───────────────┘          │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Interactive Zones** (Lines 293-304)
The reading area is divided into **3 tap zones**:

```
┌─────────────────────────────────────┐
│ ←        │                │    →    │
│ PREV     │    CONTROLS    │   NEXT  │
│ (30%)    │    (40%)       │  (30%)  │
│          │                │         │
└─────────────────────────────────────┘
```

**Zone Behavior**:
1. **Left 30%**: Previous page (`prevPage()`)
2. **Center 40%**: Show controls temporarily (`showControlsTemporarily()`)
3. **Right 30%**: Next page (`nextPage()`)

### **Tap Zone Visual Indicators** (Lines 481-490)
- **When shown**: Only on page 0 when controls are visible
- **Style**: Dashed white borders (`border-2 border-dashed border-white/30`)
- **Icons**: 
  - Left zone: ChevronLeft (`w-12 h-12 text-white/30`)
  - Right zone: ChevronRight (`w-12 h-12 text-white/30`)
- **Purpose**: Visual guide for first-time readers

### **Page Container** (Lines 454-478)
- **Layout**: 
  - Portrait: Single column
  - Landscape: `flex gap-4` (2 pages side by side)
- **Transform**: `scale(${zoomLevel})` (zoom support)
- **Transition**: `0.3s ease`
- **Zoom Range**: 1.0x to 2.0x (100% to 200%)

### **Landscape Mode Book Spine** (Lines 461-465)
When in landscape orientation, a vertical divider appears:
- **Width**: `w-1` (4px)
- **Height**: 100% of page height
- **Gradient**: `from-gray-400 via-gray-300 to-gray-400`
- **Shadow**: `shadow-lg`
- **Purpose**: Simulates book spine/binding

### **Touch/Swipe Gestures** (Lines 240-291)

**Supported Gestures**:

1. **Swipe Right** (>50px horizontal, <50px vertical):
   - **Action**: Previous page
   - **Direction**: Right to left swipe

2. **Swipe Left** (>50px horizontal, <50px vertical):
   - **Action**: Next page
   - **Direction**: Left to right swipe

3. **Tap** (<10px movement):
   - **Left zone**: Previous page
   - **Center zone**: Show controls
   - **Right zone**: Next page

4. **Double Tap** (Lines 350-352):
   - **Action**: Toggle zoom (1.0x ↔ 1.5x)

5. **Drag** (>20px movement):
   - **Visual**: Page curl preview
   - **Progress**: Calculated as `deltaX / containerWidth`
   - **Release**: Completes page turn if threshold met

---

## 📍 Section 3: Bottom Controls (Auto-hide Overlay)

### **Position & Behavior** (Lines 494-605)
- **Location**: Absolute positioned at bottom
- **Height**: ~140-160px
- **Z-index**: 50 (above content)
- **Visibility**: Hidden by default, shows on tap/click
- **Auto-hide**: Hides after 3 seconds of inactivity
- **Background**: `bg-gradient-to-t from-black/50 to-transparent`
- **Padding**: `p-4` (16px)
- **Animation**: Slides up from bottom (y: 100 → 0)

### **Layout Structure**
```
┌────────────────────────────────────────┐
│ [←] Page 1 of 28  [=====> ] 3%   [→]  │
│                                        │
│ [Z-] [100%] [Z+]  [Bookmarks(3)] [Stop]│
└────────────────────────────────────────┘
```

### **Row 1: Page Progress** (Lines 504-537)

#### **Layout** (Lines 504-526)
```
[←]  Page 1 of 28  [Progress Bar]  3%  [→]
```

**Left Button - Previous Page**:
- **Component**: `<Button variant="ghost" size="sm">`
- **Icon**: ChevronLeft (`w-5 h-5`)
- **Color**: White
- **Disabled**: When `currentPage === 0`
- **Opacity**: 30% when disabled

**Center - Progress Info**:
- **Layout**: `flex-1` (takes remaining space)
- **Text Row**: 
  - Left: "Page {current + 1} of {total}"
  - Right: "{percentage}%"
  - **Font**: `text-xs` (12px)
  - **Color**: White

- **Progress Bar**:
  - **Container**: `w-full bg-white/20 rounded-full h-2`
  - **Fill**: `bg-white rounded-full h-2`
  - **Width**: `{(currentPage / total) * 100}%`
  - **Transition**: Smooth width animation
  - **Example**: Page 1/28 = 3.6%

**Right Button - Next Page**:
- **Component**: `<Button variant="ghost" size="sm">`
- **Icon**: ChevronRight (`w-5 h-5`)
- **Color**: White
- **Disabled**: When on last page
- **Opacity**: 30% when disabled

### **Row 2: Action Buttons** (Lines 540-601)

#### **Left Group - Zoom Controls** (Lines 542-570)
```
[🔍-] [100%] [🔍+]
```

1. **Zoom Out Button**:
   - **Icon**: ZoomOut (`w-5 h-5`)
   - **Action**: Decrease zoom by 0.25
   - **Range**: Min 1.0x
   - **Disabled**: When `zoomLevel <= 1`

2. **Zoom Display/Reset Button**:
   - **Text**: "{zoomLevel * 100}%"
   - **Font**: `text-xs` (12px)
   - **Examples**: "100%", "125%", "150%", "200%"
   - **Action**: Reset to 100%
   - **Function**: `resetZoom()`

3. **Zoom In Button**:
   - **Icon**: ZoomIn (`w-5 h-5`)
   - **Action**: Increase zoom by 0.25
   - **Range**: Max 2.0x
   - **Disabled**: When `zoomLevel >= 2`

#### **Right Group - Reading Actions** (Lines 573-600)
```
[🔖 Bookmarks(3)] [Pause] [Stop]
```

1. **Bookmarks Button**:
   - **Icon**: Bookmark (`w-5 h-5 mr-1`)
   - **Text**: "Bookmarks ({count})"
   - **Count**: Number of saved bookmarks
   - **Action**: Open bookmark panel
   - **Function**: `setShowBookmarks(true)`

2. **Pause Button**:
   - **Text**: "Pause"
   - **Background**: `bg-white/10` (highlighted)
   - **Action**: Save progress and pause reading
   - **Function**: `handlePause()`
   - **Toast**: "Progress saved at page X"
   - **Behavior**: Returns to BookOverview or calls `onPause()`

3. **Stop Button**:
   - **Text**: "Stop"
   - **Action**: Stop reading session
   - **Function**: `handleStop()`
   - **Behavior**: Calls `onStop()` or returns to previous screen

---

## 📖 FlipPage Component Layout

### **Component Dimensions** (Lines 21-22)

**Portrait Mode**:
- **Width**: 340px
- **Height**: 600px
- **Aspect Ratio**: ~1:1.76

**Landscape Mode**:
- **Width**: 280px (per page)
- **Height**: 450px
- **Aspect Ratio**: ~1:1.61
- **Note**: Two pages shown side by side

### **Visual Structure**
```
┌─────────────────────────────────┐
│                            [1]  │ ← Page number
│                                 │
│                                 │
│         Book Content            │
│      (centered, serif)          │
│      Justified text             │
│      with hyphenation           │
│                                 │
│                                 │
│                              ┌─ │ ← Page curl
└─────────────────────────────┴───┘
│                                  ← Edge highlight
```

### **Page Container** (Lines 33-50)
- **Component**: `<motion.div>`
- **Background**: White (`bg-white`)
- **Shadow**: `shadow-2xl` (deep shadow for realism)
- **Border Radius**: `rounded-lg`
- **Overflow**: Hidden
- **3D Transform**: 
  - `transformStyle: 'preserve-3d'`
  - `perspective: 1000`
- **Animation**: 3D page flip effect

### **Page Elements**

#### **1. Paper Texture Overlay** (Lines 52-57)
- **Position**: Absolute, full coverage
- **Z-index**: Below content
- **Pattern**: SVG noise texture
- **Opacity**: 0.02 (very subtle)
- **Color**: Black dots on transparent
- **Effect**: Simulates paper grain
- **Pointer Events**: None (non-interactive)

#### **2. Page Shadow for Depth** (Lines 60-65)
- **Position**: Absolute, full coverage
- **Box Shadow**: `inset 0 0 40px rgba(0,0,0,0.05)`
- **Effect**: Subtle inner shadow for depth
- **Pointer Events**: None

#### **3. Page Number** (Lines 70-72)
- **Position**: `absolute top-2 right-2`
- **Font**: `text-xs font-serif` (12px serif)
- **Color**: `text-gray-400` (light gray)
- **Format**: `{pageNumber + 1}` (1-indexed)
- **Example**: "1", "2", "3", etc.

#### **4. Content Area** (Lines 75-87)
- **Container**: `flex-1 flex items-center justify-center`
- **Padding**: Internal padding for text
- **Overflow**: `overflow-y-auto` (scrollable if needed)

**Text Styling**:
- **Font**: `font-serif text-sm` (14px serif)
- **Color**: `text-gray-800` (dark gray)
- **Line Height**: `leading-relaxed` (1.625)
- **Alignment**: `text-align: justify`
- **Hyphenation**: Enabled (`hyphens: auto`)
- **Word Break**: `break-word` (prevents overflow)
- **Max Width**: 100% (responsive)
- **Padding**: `px-2` (8px sides)

#### **5. Page Curl Effect** (Lines 90-95)
- **Position**: `absolute bottom-0 right-0`
- **Size**: `w-12 h-12` (48px × 48px)
- **Gradient**: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)`
- **Effect**: Simulates bottom-right corner curl
- **Pointer Events**: None

#### **6. Page Edge Highlight** (Lines 99-104)
- **Position**: `absolute inset-y-0 left-0` (full height, left side)
- **Width**: `w-1` (4px)
- **Gradient**: `from-gray-200 to-transparent`
- **Box Shadow**: `2px 0 4px rgba(0,0,0,0.1)`
- **Effect**: Simulates page spine/binding edge

### **Page Flip Animation** (Lines 41-49)

**Animation States**:

1. **Idle State**:
   - `rotateY: 0`
   - Page is flat and readable

2. **Flipping State**:
   - **Next Page**: `rotateY: -180deg` (flip left)
   - **Previous Page**: `rotateY: 180deg` (flip right)
   - **Duration**: 600ms
   - **Easing**: `[0.4, 0, 0.2, 1]` (custom cubic-bezier)

3. **Drag State** (Lines 25-30):
   - **Progress-based**: `rotateY: direction * -180 * dragProgress`
   - **Range**: 0° to ±180° based on drag distance
   - **Real-time**: Updates as user drags finger

**Animation Example**:
```
Page Flip Left (Next):
0° → -45° → -90° → -135° → -180° → New page appears at 0°

Page Flip Right (Prev):
0° → 45° → 90° → 135° → 180° → New page appears at 0°
```

---

## 🎭 Overlay Panels

### **1. Bookmark Panel** (Lines 608-619)
- **Component**: `<BookmarkPanel>`
- **Position**: Slides in from right
- **Props**:
  - `isOpen`: Boolean toggle
  - `bookmarks`: Array of bookmark data
  - `currentPage`: Current page number
  - `onGoToBookmark`: Jump to bookmarked page
  - `onDeleteBookmark`: Remove bookmark
- **Close**: Click outside or close button

### **2. Soundscape Player** (Lines 622-626)
- **Component**: `<SoundscapePlayer>`
- **Position**: Slides in from right
- **Props**:
  - `isOpen`: Boolean toggle
  - `theme`: Current app theme
- **Features**: Ambient sounds (forest, rain, etc.)
- **Close**: Click outside or close button

### **3. Exit Confirmation Modal** (Lines 629-676)

**Layout**:
```
┌───────────────────────────────┐
│ Exit Reading            [X]   │
├───────────────────────────────┤
│ Are you sure you want to      │
│ exit reading? Your progress   │
│ will be saved.                │
├───────────────────────────────┤
│           [Cancel] [Save & Exit]│
└───────────────────────────────┘
```

**Position**:
- **Display**: Fixed overlay
- **Background**: `bg-black/50` (semi-transparent backdrop)
- **Z-index**: 50
- **Alignment**: Center of screen

**Card**:
- **Background**: White
- **Padding**: `p-6`
- **Border Radius**: `rounded-lg`
- **Shadow**: `shadow-lg`

**Elements**:
1. **Header**:
   - **Title**: "Exit Reading" (`text-lg font-medium`)
   - **Close Button**: X icon (top-right)

2. **Message**:
   - **Text**: "Are you sure you want to exit reading? Your progress will be saved."
   - **Font**: `text-sm text-gray-500`

3. **Action Buttons**:
   - **Cancel**: Ghost button, gray text
   - **Save and Exit**: Ghost button, red text, Save icon
   - **Layout**: `justify-end` (right-aligned)

**Animation**:
```typescript
initial: { opacity: 0 }
animate: { opacity: 1 }
exit: { opacity: 0 }
```

### **4. ESC Key Hint** (Lines 679-693)

**Layout**:
```
┌──────────────────┐
│ [ESC] Press to exit │
└──────────────────┘
```

**Position**:
- **Location**: `fixed bottom-20 left-1/2` (centered horizontally, above bottom controls)
- **Transform**: `translate-x-1/2` (precise centering)
- **Z-index**: 40

**Design**:
- **Background**: `bg-black/80`
- **Text Color**: White
- **Padding**: `px-4 py-2`
- **Border Radius**: `rounded-full`
- **Shadow**: `shadow-lg`
- **Display**: `flex items-center gap-2`

**Elements**:
- **Keyboard Key**: `<kbd>` element with `bg-white/20 px-2 py-1 rounded text-xs font-mono`
- **Text**: "Press to exit" (`text-sm`)

**Behavior**:
- **Show**: On component mount
- **Auto-hide**: After 5 seconds
- **Hide**: When any modal/panel is open

**Animation**:
```typescript
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
exit: { opacity: 0, y: 20 }
```

---

## ⌨️ Keyboard Shortcuts

### **ESC Key Behavior** (Lines 160-184)
Multi-level escape functionality:

1. **If Exit Modal is open**: Close modal
2. **If Bookmark Panel is open**: Close panel
3. **If Soundscape is open**: Close soundscape
4. **Otherwise**: Open exit modal

**Logic Flow**:
```
ESC Pressed
  ├─ Exit Modal Open? → Close it
  ├─ Bookmarks Open? → Close them
  ├─ Soundscape Open? → Close it
  └─ All Closed? → Open Exit Modal
```

---

## 💾 Auto-Save System (5 Safety Mechanisms)

### **Mechanism 1: Visibility Change** (Lines 114-121)
**Trigger**: User switches apps or receives phone call
- **Event**: `visibilitychange`
- **Action**: Save when `document.hidden === true`
- **Use Case**: App backgrounded

### **Mechanism 2: Before Unload** (Lines 123-128)
**Trigger**: Browser/app is closing
- **Event**: `beforeunload`
- **Action**: Save current page
- **Use Case**: App accidentally closed

### **Mechanism 3: Periodic Auto-Save** (Lines 131-137)
**Trigger**: Timer (every 30 seconds)
- **Interval**: 30,000ms (30 seconds)
- **Condition**: Only if page changed since last save
- **Action**: Save current page
- **Use Case**: Long reading sessions

### **Mechanism 4: Component Unmount** (Lines 150-157)
**Trigger**: Component destruction
- **Event**: `useEffect` cleanup
- **Action**: Final save on unmount
- **Use Case**: Navigation away from reader

### **Mechanism 5: Manual Save** (Pause/Stop buttons)
**Trigger**: User clicks Pause or Stop
- **Action**: Explicit save + toast notification
- **Toast**: "Progress saved at page X"
- **Use Case**: User-initiated save

### **Save Function** (Lines 187-199)
```typescript
saveProgress(page: number) {
  - Updates user.readingProgress[bookId]
  - Saves to localStorage
  - Updates lastSavedPageRef for comparison
}
```

---

## 🎮 Gesture & Touch Controls Summary

### **Supported Interactions**

| Gesture | Action | Threshold |
|---------|--------|-----------|
| **Swipe Left** | Next page | >50px horizontal, <50px vertical |
| **Swipe Right** | Previous page | >50px horizontal, <50px vertical |
| **Tap Left 30%** | Previous page | <10px movement |
| **Tap Center 40%** | Show/hide controls | <10px movement |
| **Tap Right 30%** | Next page | <10px movement |
| **Double Tap** | Toggle zoom (1.0x ↔ 1.5x) | - |
| **Drag >20px** | Page curl preview | Visual feedback only |
| **Long Press** | *(Not implemented)* | - |

### **Mouse Controls**

| Action | Result |
|--------|--------|
| **Click Left 30%** | Previous page |
| **Click Center 40%** | Show/hide controls |
| **Click Right 30%** | Next page |
| **Double Click** | Toggle zoom |

---

## 🎬 Animations & Transitions

### **1. Control Panels (Top & Bottom)**
```typescript
// Slide in/out
initial: { y: ±100, opacity: 0 }
animate: { y: 0, opacity: 1 }
exit: { y: ±100, opacity: 0 }
```

### **2. Page Flip Animation**
```typescript
// 3D rotation
duration: 600ms
easing: [0.4, 0, 0.2, 1] (custom cubic-bezier)
rotateY: 0° → ±180°
```

### **3. Zoom Transition**
```typescript
// Scale transform
transform: scale(${zoomLevel})
transition: 'transform 0.3s ease'
```

### **4. Modal Overlays**
```typescript
// Fade in/out
initial: { opacity: 0 }
animate: { opacity: 1 }
exit: { opacity: 0 }
```

### **5. ESC Hint**
```typescript
// Slide up + fade
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
exit: { opacity: 0, y: 20 }
```

---

## 🎨 Color System

### **Immersive Reader Backgrounds**
- **Base**: `#f5f1e8` (Warm parchment/paper)
- **Reading Area**: `#0d421cb3` (Dark forest green, 70% opacity)
- **Page**: `#ffffff` (Pure white)

### **Control Overlays**
- **Top Bar**: `from-black/50 to-transparent` (Gradient fade down)
- **Bottom Bar**: `from-black/50 to-transparent` (Gradient fade up)
- **Text**: White (`text-white`)

### **Page Elements**
- **Text**: `#1F2937` (Dark gray, `text-gray-800`)
- **Page Number**: `#9CA3AF` (Light gray, `text-gray-400`)
- **Paper Texture**: `rgba(0, 0, 0, 0.02)` (Barely visible)
- **Shadow**: `rgba(0, 0, 0, 0.05)` (Subtle depth)

### **Modal/Panel**
- **Backdrop**: `rgba(0, 0, 0, 0.5)` (50% black overlay)
- **Card**: White background
- **Text**: Gray shades

---

## 📐 Responsive Dimensions

### **Portrait Mode** (Default - 385px wide)
- **Page Width**: 340px
- **Page Height**: 600px
- **Margin**: ~22.5px on each side
- **Pages Shown**: 1

### **Landscape Mode** (Width > Height)
- **Page Width**: 280px each
- **Page Height**: 450px
- **Spacing**: 4px gap between pages
- **Spine**: 4px vertical divider
- **Pages Shown**: 2
- **Total Width**: ~568px (280 + 4 + 280 + margins)

### **Auto-Detection** (Lines 101-110)
```typescript
const isLandscape = window.innerWidth > window.innerHeight;
setOrientation(isLandscape ? 'landscape' : 'portrait');
```

---

## 📊 State Management

### **Component State Variables** (Lines 61-73)

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `currentPage` | number | 0 | Current page index |
| `orientation` | 'portrait' \| 'landscape' | 'portrait' | Device orientation |
| `zoomLevel` | number | 1 | Zoom scale (1.0 - 2.0) |
| `showControls` | boolean | false | Top/bottom bar visibility |
| `showBookmarks` | boolean | false | Bookmark panel visibility |
| `showSoundscape` | boolean | false | Soundscape panel visibility |
| `bookmarks` | BookmarkData[] | [] | Saved bookmarks |
| `pageDirection` | 'next' \| 'prev' | 'next' | Flip animation direction |
| `isFlipping` | boolean | false | Page flip in progress |
| `isDragging` | boolean | false | User dragging page |
| `dragProgress` | number | 0 | Drag completion (0-1) |
| `showExitModal` | boolean | false | Exit confirmation modal |
| `showEscHint` | boolean | true | ESC key hint visibility |

### **Refs** (Lines 75-78)

| Ref | Type | Purpose |
|-----|------|---------|
| `readerRef` | HTMLDivElement | Reading area container reference |
| `controlsTimeoutRef` | NodeJS.Timeout | Auto-hide timer for controls |
| `touchStartRef` | { x, y } | Touch gesture start coordinates |
| `lastSavedPageRef` | number | Last saved page (for auto-save comparison) |

---

## 📚 Data Structures

### **BookmarkData Interface** (Lines 29-34)
```typescript
interface BookmarkData {
  id: string;           // Unique ID (timestamp)
  pageNumber: number;   // Page index
  timestamp: Date;      // When bookmark was created
  note?: string;        // Optional note (not currently used)
}
```

**Storage**: `localStorage.getItem(`bookmarks_${bookId}`)`

### **ImmersiveBookReaderProps** (Lines 36-47)
```typescript
interface ImmersiveBookReaderProps {
  user: User | null;        // Current user object
  setUser: (user) => void;  // User state setter
  theme: Theme;             // App theme
  bookId: string;           // Unique book identifier
  bookTitle: string;        // Display title
  bookContent: string[];    // Array of page texts
  coverImage?: string;      // Book cover (optional)
  onBack: () => void;       // Back navigation handler
  onPause?: () => void;     // Pause handler (optional)
  onStop?: () => void;      // Stop handler (optional)
}
```

---

## 🎯 Design Principles

### **ImmersiveBookReader**
1. **Distraction-Free**: Full-screen reading with auto-hiding controls
2. **Touch-Optimized**: Tap zones, swipe gestures, and drag interactions
3. **Safety First**: 5 auto-save mechanisms prevent data loss
4. **Accessibility**: Keyboard shortcuts (ESC), visual hints
5. **Realistic**: 3D page flips, paper textures, shadows
6. **Flexible**: Portrait/landscape support, zoom functionality
7. **Informative**: Progress tracking, bookmarks, page numbers

### **FlipPage**
1. **Realistic Appearance**: Paper texture, shadows, page curl
2. **Smooth Animation**: 600ms 3D flip with custom easing
3. **Readable Typography**: Serif font, justified text, hyphenation
4. **Responsive**: Adapts to portrait/landscape modes
5. **Performance**: Optimized 3D transforms and perspective
6. **Detail-Oriented**: Page numbers, edge highlights, subtle effects

---

## 🔧 Performance Optimizations

### **1. Conditional Rendering**
- Controls only render when `showControls === true`
- Panels only render when opened
- Tap zone indicators only on first page

### **2. Animation Optimization**
- Hardware-accelerated 3D transforms
- `AnimatePresence` for smooth exits
- Transform-only animations (no layout thrashing)

### **3. Event Throttling**
- Controls auto-hide after 3 seconds (prevents rapid re-renders)
- Touch events use refs (avoid state updates during drag)

### **4. Memoization Opportunities**
- Page content could be memoized (not implemented)
- Bookmark panel data could be memoized

### **5. Storage Optimization**
- Auto-save only when page changes
- Bookmarks stored per-book (not global)

---

## 📱 Mobile-Specific Features

### **Touch Gestures**
- ✅ Swipe left/right for page navigation
- ✅ Tap zones for quick navigation
- ✅ Double-tap zoom
- ✅ Drag for page curl preview

### **Auto-Save for Mobile**
- ✅ App backgrounding (phone calls, notifications)
- ✅ App closing (home button, task switcher)
- ✅ Periodic saves (battery-efficient 30s interval)

### **Orientation Support**
- ✅ Auto-detects portrait/landscape
- ✅ Adjusts page dimensions
- ✅ Shows 1 or 2 pages accordingly

### **Performance**
- ✅ Minimal re-renders
- ✅ Hardware-accelerated animations
- ✅ No text selection (prevents accidental highlights)

---

## 🎓 Usage Example

```typescript
// In BookOverview.tsx or parent component
<ImmersiveBookReader
  user={user}
  setUser={setUser}
  theme={currentTheme}
  bookId="1"
  bookTitle="The Adventures of Rusty the Red Panda"
  bookContent={[
    "Once upon a time in a mystical forest...",
    "Rusty woke up to the sound of birds...",
    "He stretched and yawned, ready for adventure...",
    // ... more pages
  ]}
  coverImage={rustyBookCover}
  onBack={() => setCurrentScreen('library')}
  onPause={() => {
    console.log('Reading paused');
    setCurrentScreen('bookOverview');
  }}
  onStop={() => {
    console.log('Reading stopped');
    setCurrentScreen('home');
  }}
/>
```

---

## 📊 Summary Statistics

### **ImmersiveBookReader.tsx**
- **Total Lines**: 698
- **State Variables**: 13
- **Refs**: 4
- **Event Listeners**: 6
- **Auto-Save Mechanisms**: 5
- **Interactive Zones**: 3
- **Overlays**: 4
- **Animation Types**: 5

### **FlipPage.tsx**
- **Total Lines**: 109
- **Visual Effects**: 6 (texture, shadow, curl, edge, etc.)
- **Animation States**: 3 (idle, flipping, dragging)
- **Responsive Modes**: 2 (portrait, landscape)

### **Combined Features**
- **Gestures Supported**: 6
- **Keyboard Shortcuts**: 1 (ESC)
- **Zoom Levels**: Continuous (1.0x - 2.0x)
- **Page Flip Duration**: 600ms
- **Control Auto-Hide**: 3 seconds
- **ESC Hint Duration**: 5 seconds
- **Auto-Save Interval**: 30 seconds

---

**Document Version**: 1.0  
**Created**: April 7, 2026  
**Files**: 
- `/IMMERSIVE_READER_LAYOUT.md`
- `/components/ImmersiveBookReader.tsx`
- `/components/FlipPage.tsx`

**Maintained By**: Rooted Tales / Xenwinx Studio Development Team
