# Library Screen Layout - Detailed Description
## Rooted Tales - Mobile Book Reading Application

**Component**: `/components/LibraryScreen.tsx`  
**Total Lines**: 514 lines  
**Screen Dimensions**: 385px × 830px (Mobile)  
**Last Updated**: April 7, 2026

---

## 📱 Overall Screen Structure

### **Layout Hierarchy**
```
┌─────────────────────────────────────┐
│ FIXED HEADER (80-90px)              │
│ - Back Button                       │
│ - Title: "Library Browser"          │
│ - View Mode Toggle Buttons          │
│ - Book Count                        │
├─────────────────────────────────────┤
│                                     │
│ SCROLLABLE CONTENT AREA             │
│ (740-750px remaining height)        │
│                                     │
│ • Carousel View (one card)          │
│   OR                                │
│ • Grid View (2 columns)             │
│   OR                                │
│ • List View (vertical list)         │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Visual Design

### **Background**
- **Gradient**: `from-green-50 to-blue-50`
- **Direction**: Top to bottom
- **Effect**: Soft mystical forest-to-sky transition

### **Overall Container**
```css
height: 100% (full screen)
display: flex
flex-direction: column
background: linear-gradient(to bottom, from-green-50, to-blue-50)
```

---

## 📍 Section 1: Fixed Header (Top)

### **Position & Size**
- **Location**: Top of screen (fixed)
- **Height**: ~80-90px
- **Padding**: `px-4 pt-4 pb-3` (16px sides, 16px top, 12px bottom)
- **Background**: `bg-white/80 backdrop-blur-lg`
- **Border**: `border-b border-gray-200`

### **Header Layout Breakdown**

#### **Row 1: Navigation & Title** (Lines 448-452)
```
┌──────────────────────────────────────┐
│ [← Back]  Library Browser    [space] │
└──────────────────────────────────────┘
```

**Elements**:
1. **Back Button** (Left)
   - Component: `<BackButton />`
   - Icon: Arrow left
   - Action: Navigate to 'home'
   - Width: ~40px

2. **Title** (Center)
   - Text: "Library Browser"
   - Font: `text-xl font-bold text-gray-800`
   - Size: 20px bold
   - Color: Dark gray (#1F2937)

3. **Spacer** (Right)
   - Width: `w-10` (40px)
   - Purpose: Center alignment balance

#### **Row 2: Book Count & View Toggle** (Lines 455-490)
```
┌──────────────────────────────────────┐
│ 6 Stories         [📖] [⊞] [☰]      │
└──────────────────────────────────────┘
```

**Left Side - Book Count**:
- Text: `{books.length} {books.length === 1 ? 'Story' : 'Stories'}`
- Example: "6 Stories"
- Font: `text-sm font-semibold text-gray-700`
- Size: 14px semibold

**Right Side - View Mode Toggle** (3 Buttons):
1. **Carousel Button** (BookOpen icon)
   - Icon: 📖 BookOpen
   - Size: `h-8 px-3` (32px height)
   - Active style: Blue filled button
   - Inactive style: Outlined button

2. **Grid Button** (Grid3x3 icon)
   - Icon: ⊞ Grid3x3
   - Size: `h-8 px-3`
   - Active style: Blue filled button
   - Inactive style: Outlined button

3. **List Button** (ListIcon)
   - Icon: ☰ List
   - Size: `h-8 px-3`
   - Active style: Blue filled button
   - Inactive style: Outlined button

**Button Spacing**: `gap-2` (8px between buttons)

---

## 📍 Section 2: Scrollable Content Area

### **Position & Size**
- **Location**: Below header
- **Height**: `flex-1` (remaining screen height ~740-750px)
- **Overflow**: `overflow-y-auto` (vertical scroll)
- **Padding**: Varies by view mode

### **Animation**
- **Transition**: 200ms opacity fade when switching views
- **Mode**: `AnimatePresence mode="wait"`

---

## 📖 View Mode 1: CAROUSEL VIEW (Default)

### **Layout Dimensions** (Lines 182-304)
```
┌────────────────────────────────────┐
│          [Large Card]              │
│                                    │
│  ┌──────────────────────────────┐ │
│  │                              │ │
│  │    [Book Cover Image]        │ │
│  │       (3:4 ratio)            │ │
│  │                              │ │
│  ├──────────────────────────────┤ │
│  │   Book Title (2 lines max)   │ │
│  │   by Author Name             │ │
│  ├──────────────────────────────┤ │
│  │   Description (3 lines max)  │ │
│  ├──────────────────────────────┤ │
│  │ [Category] ⭐4.8 🕐15 min    │ │
│  ├──────────────────────────────┤ │
│  │    [👁 View Details]         │ │
│  ├──────────────────────────────┤ │
│  │   [←] • • • • • • [→]        │ │
│  │   Book 1 of 6                │ │
│  └──────────────────────────────┘ │
│                                    │
└────────────────────────────────────┘
```

### **Container**
- **Alignment**: `flex flex-col items-center justify-center`
- **Padding**: `px-4 py-6`
- **Min Height**: `min-h-[calc(100vh-180px)]`
- **Max Width**: `max-w-[340px]` (centered)

### **Card Component**
- **Component**: `<Card>` with `<CardContent>`
- **Background**: `backdrop-blur-lg bg-white/95`
- **Border**: `border border-white/40`
- **Shadow**: `shadow-2xl`
- **Padding**: `p-5` (20px all sides)
- **Spacing**: `space-y-4` (16px between sections)

### **Elements Breakdown**

#### **1. Book Cover** (Lines 199-214)
- **Aspect Ratio**: `aspect-[3/4]` (portrait)
- **Background**: Gradient (varies per book)
  - Example: `from-red-400 to-orange-500`
- **Border Radius**: `rounded-2xl`
- **Shadow**: `shadow-xl`
- **Image**:
  - Component: `<ImageWithFallback>`
  - Class: `w-full h-full object-cover`
  - Hover: `hover:scale-105 transition-transform duration-300`
- **Clickable**: Yes, opens book overview
- **Fallback**: BookOpen icon (80x80px)

#### **2. Book Title & Author** (Lines 217-224)
- **Container**: `text-center space-y-1.5`
- **Title**:
  - Font: `font-bold text-base leading-snug text-gray-800`
  - Size: 16px bold
  - Lines: `line-clamp-2` (max 2 lines)
  - Padding: `px-2`
  - Example: "The Adventures of Rusty the Red Panda"
- **Author**:
  - Font: `text-sm text-gray-600 font-medium`
  - Size: 14px medium
  - Format: "by {author name}"
  - Example: "by Rooted Tales"

#### **3. Description** (Lines 227-229)
- **Font**: `text-sm text-gray-700 text-center`
- **Size**: 14px
- **Lines**: `line-clamp-3` (max 3 lines)
- **Line Height**: `leading-relaxed`
- **Padding**: `px-2`

#### **4. Metadata Row** (Lines 232-244)
- **Layout**: `flex items-center justify-center gap-3 flex-wrap`
- **Elements**:
  1. **Category Badge**
     - Component: `<Badge variant="secondary">`
     - Style: `rounded-full px-3 py-1 text-xs font-semibold`
     - Example: "Adventure"
  
  2. **Rating**
     - Icon: ⭐ Star (filled yellow)
     - Size: `w-4 h-4`
     - Text: `font-bold text-sm`
     - Example: "4.8"
  
  3. **Reading Time**
     - Icon: 🕐 Clock
     - Size: `w-4 h-4`
     - Text: `font-medium text-sm`
     - Example: "15 min"

#### **5. View Details Button** (Lines 247-253)
- **Component**: `<Button>`
- **Size**: `w-full h-11` (full width, 44px height)
- **Font**: `text-base font-semibold` (16px semibold)
- **Icon**: 👁 Eye icon (`w-5 h-5 mr-2`)
- **Text**: "View Details"
- **Action**: Opens BookOverview screen

#### **6. Navigation Controls** (Lines 256-293)
- **Layout**: `flex items-center justify-center gap-4 pt-2`

**Left Arrow Button**:
- **Component**: `<Button variant="ghost" size="icon">`
- **Size**: `rounded-full h-10 w-10`
- **Icon**: ChevronLeft (`w-6 h-6`)
- **Action**: Previous book

**Dot Indicators** (Center):
- **Layout**: `flex items-center gap-2.5`
- **Count**: 6 dots (one per book)
- **Active Dot**: 
  - Size: `w-2.5 h-2.5`
  - Color: `bg-blue-600`
- **Inactive Dots**:
  - Size: `w-2 h-2`
  - Color: `bg-gray-300`
  - Hover: `hover:bg-gray-400`
- **Shape**: `rounded-full`
- **Clickable**: Yes, jumps to specific book

**Right Arrow Button**:
- **Component**: `<Button variant="ghost" size="icon">`
- **Size**: `rounded-full h-10 w-10`
- **Icon**: ChevronRight (`w-6 h-6`)
- **Action**: Next book

#### **7. Book Counter** (Lines 296-298)
- **Text**: "Book {current} of {total}"
- **Font**: `text-center text-sm text-gray-500 font-medium`
- **Example**: "Book 1 of 6"

### **Animation**
- **Transition**: Book changes with scale animation
- **Initial**: `opacity: 0, scale: 0.9`
- **Animate**: `opacity: 1, scale: 1`
- **Exit**: `opacity: 0, scale: 0.9`
- **Duration**: 300ms

---

## 🔲 View Mode 2: GRID VIEW

### **Layout Dimensions** (Lines 307-366)
```
┌──────────────────────┬──────────────────────┐
│   [Book Card 1]      │   [Book Card 2]      │
│  ┌────────────────┐  │  ┌────────────────┐  │
│  │  Cover Image   │  │  │  Cover Image   │  │
│  │   (3:4 ratio)  │  │  │   (3:4 ratio)  │  │
│  ├────────────────┤  │  ├────────────────┤  │
│  │ Title (2 lines)│  │  │ Title (2 lines)│  │
│  │ by Author      │  │  │ by Author      │  │
│  │ [Cat] ⭐4.8    │  │  │ [Cat] ⭐4.9    │  │
│  └────────────────┘  │  └────────────────┘  │
├──────────────────────┼──────────────────────┤
│   [Book Card 3]      │   [Book Card 4]      │
│  ┌────────────────┐  │  ┌────────────────┐  │
│  │  Cover Image   │  │  │  Cover Image   │  │
│  │   (3:4 ratio)  │  │  │   (3:4 ratio)  │  │
│  ├────────────────┤  │  ├────────────────┤  │
│  │ Title (2 lines)│  │  │ Title (2 lines)│  │
│  │ by Author      │  │  │ by Author      │  │
│  │ [Cat] ⭐4.8    │  │  │ [Cat] ⭐4.9    │  │
│  └────────────────┘  │  └────────────────┘  │
└──────────────────────┴──────────────────────┘
   (Continues scrolling down...)
```

### **Grid Container**
- **Layout**: `grid grid-cols-2` (2 columns)
- **Gap**: `gap-3` (12px between cards)
- **Padding**: `px-3 pb-4 pt-3` (12px sides, 16px bottom, 12px top)

### **Individual Card**
- **Component**: `<Card>` with `<CardContent>`
- **Background**: `backdrop-blur-lg bg-white/95`
- **Border**: `border border-white/40`
- **Padding**: `p-3` (12px all sides)
- **Spacing**: `space-y-2` (8px between sections)
- **Hover Effect**: 
  - `hover:shadow-xl`
  - `hover:scale-[1.02]`
  - `transition-all duration-200`
- **Clickable**: Yes, entire card opens book overview

### **Card Elements**

#### **1. Book Cover** (Lines 325-337)
- **Aspect Ratio**: `aspect-[3/4]`
- **Background**: Gradient (varies per book)
- **Border Radius**: `rounded-lg`
- **Shadow**: `shadow-lg`
- **Image**: 
  - Component: `<ImageWithFallback>`
  - Class: `w-full h-full object-cover`
- **Fallback**: BookOpen icon (48x48px)

#### **2. Book Title** (Lines 340-342)
- **Font**: `font-bold text-[13px] leading-tight text-gray-800`
- **Size**: 13px bold
- **Lines**: `line-clamp-2` (max 2 lines)
- **Min Height**: `min-h-[2.5rem]` (40px - ensures consistent spacing)

#### **3. Author** (Lines 345-347)
- **Font**: `text-[11px] text-gray-600 line-clamp-1 font-medium`
- **Size**: 11px medium
- **Lines**: 1 line max
- **Format**: "by {author}"

#### **4. Metadata Row** (Lines 350-358)
- **Layout**: `flex items-center justify-between pt-1`

**Left - Category Badge**:
- **Component**: `<Badge variant="secondary">`
- **Style**: `text-[10px] px-2 py-0.5 rounded-full font-semibold`
- **Size**: 10px semibold

**Right - Rating**:
- **Icon**: ⭐ Star (filled yellow)
- **Size**: `w-3.5 h-3.5`
- **Text**: `text-[11px] font-bold text-gray-700`
- **Format**: "4.8"

### **Animation**
- **Initial**: `opacity: 0, y: 20`
- **Animate**: `opacity: 1, y: 0`
- **Duration**: 300ms

### **Responsive Behavior**
- **Books Per Row**: 2 (fixed)
- **Scrolling**: Vertical scroll for all 6 books (3 rows)

---

## 📋 View Mode 3: LIST VIEW

### **Layout Dimensions** (Lines 369-442)
```
┌───────────────────────────────────────┐
│ ┌─────────────────────────────────┐  │
│ │ [📖] Book Title (2 lines max)   │  │
│ │       by Author                 │  │
│ │       Description (2 lines)     │  │
│ │       [Cat] ⭐4.8 🕐15 min      │  │
│ └─────────────────────────────────┘  │
├───────────────────────────────────────┤
│ ┌─────────────────────────────────┐  │
│ │ [📖] Book Title (2 lines max)   │  │
│ │       by Author                 │  │
│ │       Description (2 lines)     │  │
│ │       [Cat] ⭐4.9 🕐35 min      │  │
│ └─────────────────────────────────┘  │
├───────────────────────────────────────┤
│ ┌─────────────────────────────────┐  │
│ │ [📖] Book Title (2 lines max)   │  │
│ │       by Author                 │  │
│ │       Description (2 lines)     │  │
│ │       [Cat] ⭐4.8 🕐32 min      │  │
│ └─────────────────────────────────┘  │
└───────────────────────────────────────┘
   (Continues scrolling down...)
```

### **List Container**
- **Layout**: `space-y-3` (12px between cards)
- **Padding**: `px-4 pb-4` (16px sides, 16px bottom)

### **Individual Card**
- **Component**: `<Card>` with `<CardContent>`
- **Layout**: Horizontal (flex row)
- **Background**: `backdrop-blur-lg bg-white/90`
- **Border**: `border border-white/30`
- **Padding**: `p-4` (16px all sides)
- **Hover Effect**: `hover:bg-gray-50 transition-all duration-200`
- **Clickable**: Yes, entire card opens book overview

### **Card Layout**
```
┌─────────────────────────────────────┐
│ [Cover] │ Book Info Section        │
│  (16x20) │ • Title (2 lines)        │
│         │ • Author                  │
│         │ • Description (2 lines)   │
│         │ • Metadata row            │
└─────────────────────────────────────┘
```

### **Card Elements**

#### **1. Cover Thumbnail** (Lines 388-400)
- **Size**: `w-16 h-20` (64px × 80px)
- **Position**: Left side, `flex-shrink-0`
- **Background**: Gradient (varies per book)
- **Border Radius**: `rounded-lg`
- **Shadow**: `shadow-md`
- **Image**:
  - Component: `<ImageWithFallback>`
  - Class: `w-full h-full object-cover`
- **Fallback**: BookOpen icon (32x32px)

#### **2. Book Info Container** (Lines 403-433)
- **Layout**: `flex-1 min-w-0 space-y-1`
- **Gap**: `gap-3` (12px from cover)

**Title** (Lines 405-407):
- **Font**: `font-bold text-sm text-gray-800`
- **Size**: 14px bold
- **Lines**: `line-clamp-2` (max 2 lines)
- **Line Height**: `leading-tight`

**Author** (Lines 410-412):
- **Font**: `text-xs text-gray-600`
- **Size**: 12px
- **Format**: "by {author}"

**Description** (Lines 415-417):
- **Font**: `text-xs text-gray-700`
- **Size**: 12px
- **Lines**: `line-clamp-2` (max 2 lines)
- **Line Height**: `leading-relaxed`

**Metadata Row** (Lines 420-432):
- **Layout**: `flex items-center gap-2 flex-wrap pt-1`
- **Elements**:
  1. **Category Badge**
     - Style: `text-xs px-2 py-0.5 rounded-full`
     - Size: 12px
  
  2. **Rating**
     - Icon: ⭐ Star (`w-3 h-3`)
     - Text: `text-xs font-semibold`
     - Format: "4.8"
  
  3. **Reading Time**
     - Icon: 🕐 Clock (`w-3 h-3`)
     - Text: `text-xs`
     - Format: "15 min"

### **Animation**
- **Initial**: `opacity: 0, x: -20`
- **Animate**: `opacity: 1, x: 0`
- **Duration**: 300ms

---

## 📚 Book Data Structure

### **Books Array** (Lines 55-146)
Total books: **6 books**

Each book object contains:

```typescript
interface Book {
  id: string;              // '1' to '6'
  title: string;           // Book title
  author: string;          // 'Rooted Tales'
  category: string;        // 'Adventure' or 'Family'
  description: string;     // Book description
  progress: number;        // Reading progress (0-100)
  rating: number;          // Star rating (4.8-4.9)
  isDownloaded: boolean;   // Download status
  isPurchased: boolean;    // Purchase status
  coverColor: string;      // Gradient colors
  readingTime: string;     // '15 min' to '35 min'
  pages: number;           // 28-76 pages
  price: string;           // '$8.99' to '$16.99'
}
```

### **Book List**

1. **Rusty the Red Panda**
   - ID: '1'
   - Progress: 75%
   - Rating: 4.8
   - Time: 15 min
   - Pages: 28
   - Color: `from-red-400 to-orange-500`

2. **Akai's Panda Reunion**
   - ID: '2'
   - Progress: 60%
   - Rating: 4.9
   - Time: 35 min
   - Pages: 76
   - Color: `from-pink-400 to-red-500`

3. **Great Ocean Odyssey**
   - ID: '3'
   - Progress: 30%
   - Rating: 4.8
   - Time: 32 min
   - Pages: 55
   - Color: `from-blue-400 to-cyan-500`

4. **The Curious Raccoons**
   - ID: '4'
   - Progress: 0%
   - Rating: 4.9
   - Time: 28 min
   - Pages: 62
   - Color: `from-amber-400 to-orange-500`

5. **The Quokka Quest**
   - ID: '5'
   - Progress: 45%
   - Rating: 4.9
   - Time: 30 min
   - Pages: 65
   - Color: `from-amber-400 to-yellow-500`

6. **Tale of The Sea Otter**
   - ID: '6'
   - Progress: 0%
   - Rating: 4.8
   - Time: 26 min
   - Pages: 58
   - Color: `from-cyan-400 to-blue-500`

---

## 🎭 Interactive Behaviors

### **Click Actions**

1. **Book Cover / Card Click**
   - **Action**: Opens BookOverview screen
   - **Parameters**: Passes book.id
   - **Function**: `handleBookClick(book)`
   - **Auth Check**: Redirects to auth screen if not logged in

2. **View Details Button** (Carousel only)
   - **Action**: Same as book card click
   - **Destination**: BookOverview screen

3. **View Mode Toggle Buttons**
   - **Action**: Switches between carousel/grid/list
   - **Function**: `setViewMode('carousel' | 'grid' | 'list')`
   - **Visual**: Active button is filled blue, others outlined

4. **Carousel Navigation**
   - **Previous/Next Arrows**: Navigate between books
   - **Dot Indicators**: Jump to specific book index
   - **Auto-loop**: Wraps around to first/last book

5. **Back Button**
   - **Action**: Navigate to home screen
   - **Function**: `onNavigate('home')`

### **Hover Effects**

1. **Carousel Book Cover**
   - **Effect**: `hover:scale-105`
   - **Duration**: 300ms
   - **Transform origin**: Center

2. **Grid View Cards**
   - **Shadow**: Normal → `shadow-xl`
   - **Scale**: 1.0 → 1.02
   - **Duration**: 200ms

3. **List View Cards**
   - **Background**: `bg-white/90` → `bg-gray-50`
   - **Duration**: 200ms

4. **Carousel Dot Indicators**
   - **Inactive dots**: `bg-gray-300` → `bg-gray-400`

---

## 🎨 Color System & Gradients

### **Screen Background**
- **Gradient**: `from-green-50 to-blue-50`
- **Effect**: Soft mystical forest theme

### **Header**
- **Background**: `bg-white/80 backdrop-blur-lg`
- **Border**: `border-b border-gray-200`

### **Cards**
- **Carousel**: `bg-white/95 border-white/40`
- **Grid**: `bg-white/95 border-white/40`
- **List**: `bg-white/90 border-white/30`
- **Effect**: Glassmorphism with backdrop blur

### **Book Cover Gradients**
1. Rusty: `from-red-400 to-orange-500`
2. Akai Reunion: `from-pink-400 to-red-500`
3. Ocean Odyssey: `from-blue-400 to-cyan-500`
4. Curious Raccoons: `from-amber-400 to-orange-500`
5. Quokka Quest: `from-amber-400 to-yellow-500`
6. Sea Otter: `from-cyan-400 to-blue-500`

---

## 📐 Spacing & Typography Scale

### **Font Sizes by View**

| Element | Carousel | Grid | List |
|---------|----------|------|------|
| Book Title | 16px (text-base) | 13px | 14px (text-sm) |
| Author | 14px (text-sm) | 11px | 12px (text-xs) |
| Description | 14px (text-sm) | N/A | 12px (text-xs) |
| Category Badge | 12px (text-xs) | 10px | 12px (text-xs) |
| Rating | 14px (text-sm) | 11px | 12px (text-xs) |
| Reading Time | 14px (text-sm) | N/A | 12px (text-xs) |

### **Icon Sizes by View**

| Element | Carousel | Grid | List |
|---------|----------|------|------|
| Star Icon | 16px (w-4) | 14px (w-3.5) | 12px (w-3) |
| Clock Icon | 16px (w-4) | N/A | 12px (w-3) |
| View Mode Icons | 16px (w-4) | 16px (w-4) | 16px (w-4) |
| Navigation Arrows | 24px (w-6) | N/A | N/A |
| Eye Icon | 20px (w-5) | N/A | N/A |

### **Padding Scale**

| View | Container | Card | Between Elements |
|------|-----------|------|------------------|
| Carousel | px-4 py-6 | p-5 | space-y-4 |
| Grid | px-3 pb-4 pt-3 | p-3 | space-y-2 |
| List | px-4 pb-4 | p-4 | space-y-1 |

---

## 🔄 State Management

### **Component State**

```typescript
const [viewMode, setViewMode] = useState<ViewMode>('carousel');
const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
```

### **View Mode Values**
- `'carousel'` - Single large card with navigation
- `'grid'` - 2-column grid layout
- `'list'` - Vertical list layout

### **Carousel Index**
- **Range**: 0 to 5 (6 books total)
- **Loop**: Wraps around with modulo arithmetic
- **Navigation**: 
  - Next: `(index + 1) % books.length`
  - Previous: `(index - 1 + books.length) % books.length`

---

## 📱 Mobile Optimization

### **Touch Targets**
- **Minimum size**: 44x44px (iOS/Android standard)
- **Back button**: ~40x40px
- **View mode toggles**: 32px height
- **Carousel arrows**: 40x40px
- **Dot indicators**: 8-10px (touch padding applied)
- **View Details button**: 44px height

### **Font Sizes (Mobile-Optimized)**
- **Minimum text**: 10px (category badges in grid)
- **Body text**: 12-14px (readable without zoom)
- **Titles**: 13-16px (depending on view)
- **Headers**: 20px (h1 "Library Browser")

### **Scrolling**
- **Smooth scroll**: Native browser behavior
- **Overflow**: `overflow-y-auto` on content area
- **Fixed header**: Header stays at top during scroll
- **No horizontal scroll**: All views fit 385px width

### **Responsive Images**
- **Component**: `<ImageWithFallback>`
- **Loading**: Progressive loading with fallback
- **Aspect ratio**: Maintained with CSS
- **Object fit**: `object-cover` prevents distortion

---

## 🎬 Animations & Transitions

### **View Mode Switch**
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.2 }}
```

### **Carousel Book Change**
```typescript
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.9 }}
transition={{ duration: 0.3 }}
```

### **Grid Cards**
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

### **List Cards**
```typescript
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
```

### **Hover Transitions**
- **Duration**: 200-300ms
- **Easing**: Browser default (ease)
- **Properties**: transform, box-shadow, background

---

## 🧩 Component Dependencies

### **UI Components (shadcn/ui)**
- `Button` - View toggles, navigation, actions
- `Card` & `CardContent` - Book containers
- `Badge` - Category labels

### **Custom Components**
- `BackButton` - Navigation back to home
- `ImageWithFallback` - Book cover images

### **Icons (lucide-react)**
- `BookOpen` - Carousel view icon, fallback cover
- `Star` - Rating display (filled)
- `Clock` - Reading time indicator
- `Grid3x3` - Grid view icon
- `ListIcon` - List view icon
- `ChevronLeft` - Previous button
- `ChevronRight` - Next button
- `Eye` - View details button

### **Assets (figma:asset)**
- 6 book cover images (imported)

---

## 📊 Summary Statistics

### **Code Metrics**
- **Total lines**: 514
- **Component functions**: 4 (Main + 3 view renderers)
- **Books displayed**: 6
- **View modes**: 3
- **Interactive elements**: 15+ (buttons, cards, etc.)

### **Screen Real Estate**
- **Header**: ~17% of screen (80-90px)
- **Content**: ~83% of screen (740-750px)
- **Scrollable area**: Full remaining height

### **Performance**
- **Images**: 6 book covers (lazy loaded)
- **Animations**: Motion library (optimized)
- **Re-renders**: Only on view mode change or carousel navigation
- **State updates**: Minimal (2 state variables)

---

## 🎯 Design Principles

1. **Mobile-First**: Designed for 385px width
2. **Readable**: Minimum 10px font size
3. **Touch-Friendly**: 44px+ touch targets
4. **Consistent**: Unified spacing and typography
5. **Accessible**: ARIA labels on navigation
6. **Performant**: Optimized animations and images
7. **Glassmorphism**: Backdrop blur effects
8. **Visual Hierarchy**: Clear information structure
9. **Progressive Enhancement**: Fallbacks for missing images
10. **User-Centric**: Multiple view options for preference

---

**Document Version**: 1.0  
**Created**: April 7, 2026  
**File**: `/LIBRARY_SCREEN_LAYOUT.md`  
**Component**: `/components/LibraryScreen.tsx`  
**Maintained By**: Rooted Tales / Xenwinx Studio Development Team
