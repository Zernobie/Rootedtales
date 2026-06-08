# ESC Key Exit Feature Documentation
## Rooted Tales - Quick Exit Keyboard Shortcut

**Last Updated**: April 1, 2026  
**Version**: 2.2  
**Component**: ImmersiveBookReader.tsx

---

## 📋 Overview

### 🎯 Feature Added
**ESC Key Quick Exit** - Press the ESC key while reading to quickly access exit options or close open panels.

### ✨ Functionality
1. **While Reading** (no panels open): Press ESC → Opens Exit Modal
2. **Exit Modal Open**: Press ESC → Closes Exit Modal (returns to reading)
3. **Bookmarks Panel Open**: Press ESC → Closes Bookmarks Panel
4. **Soundscape Player Open**: Press ESC → Closes Soundscape Player
5. **Visual Hint**: Shows "ESC - Press to exit" hint for 5 seconds when reader first loads

---

## 📁 File Modified

**File**: `/components/ImmersiveBookReader.tsx`  
**Lines Changed**: ~35 lines added

---

## 🔧 Code Changes

### 1. New State Variable (Line 71)

#### ADDED:
```typescript
const [showEscHint, setShowEscHint] = useState(true);
```

**Purpose**: Controls visibility of ESC key hint overlay

---

### 2. Load Effect - ESC Hint Timer (Lines 81-93)

#### BEFORE:
```typescript
useEffect(() => {
  if (user?.readingProgress?.[bookId]) {
    setCurrentPage(user.readingProgress[bookId]);
    lastSavedPageRef.current = user.readingProgress[bookId];
  }
  // Load bookmarks from user data
  const savedBookmarks = localStorage.getItem(`bookmarks_${bookId}`);
  if (savedBookmarks) {
    setBookmarks(JSON.parse(savedBookmarks));
  }
}, [user, bookId]);
```

#### AFTER:
```typescript
useEffect(() => {
  if (user?.readingProgress?.[bookId]) {
    setCurrentPage(user.readingProgress[bookId]);
    lastSavedPageRef.current = user.readingProgress[bookId];
  }
  // Load bookmarks from user data
  const savedBookmarks = localStorage.getItem(`bookmarks_${bookId}`);
  if (savedBookmarks) {
    setBookmarks(JSON.parse(savedBookmarks));
  }

  // Show ESC hint for 5 seconds on first load ← NEW
  const escHintTimer = setTimeout(() => {
    setShowEscHint(false);
  }, 5000);

  return () => clearTimeout(escHintTimer); ← NEW
}, [user, bookId]);
```

**Changes**:
- Added 5-second timer to hide ESC hint
- Added cleanup function to clear timer on unmount

---

### 3. ESC Key Handler Effect (Lines 154-177) ✨ NEW

```typescript
// ESC key handler - quick exit option
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // If exit modal is open, close it
      if (showExitModal) {
        setShowExitModal(false);
      } 
      // If bookmarks panel is open, close it
      else if (showBookmarks) {
        setShowBookmarks(false);
      }
      // If soundscape is open, close it
      else if (showSoundscape) {
        setShowSoundscape(false);
      }
      // Otherwise, show exit modal
      else {
        setShowExitModal(true);
      }
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [showExitModal, showBookmarks, showSoundscape]);
```

**Logic Flow**:
1. Listen for keyboard events
2. Check if ESC key was pressed
3. Priority order:
   - If Exit Modal is open → Close it
   - Else if Bookmarks Panel is open → Close it
   - Else if Soundscape Player is open → Close it
   - Else (normal reading) → Open Exit Modal
4. Cleanup listener on unmount

**Dependencies**: `[showExitModal, showBookmarks, showSoundscape]`  
- Re-creates listener when any of these states change
- Ensures correct state is checked in the handler

---

### 4. ESC Hint Overlay (Lines 620-636) ✨ NEW

```typescript
{/* ESC Key Hint - Shows for 5 seconds on first load */}
<AnimatePresence>
  {showEscHint && !showExitModal && !showBookmarks && !showSoundscape && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="bg-black/80 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <kbd className="bg-white/20 px-2 py-1 rounded text-xs font-mono">ESC</kbd>
        <span className="text-sm">Press to exit</span>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

**Visual Design**:
```
┌─────────────────────────────────┐
│  ╔═════╗                        │
│  ║ ESC ║  Press to exit         │
│  ╚═════╝                        │
└─────────────────────────────────┘
```

**Features**:
- **Position**: Fixed at bottom center, 80px from bottom
- **Background**: Black with 80% opacity (`bg-black/80`)
- **Shape**: Rounded pill shape (`rounded-full`)
- **Animation**: Fades in from bottom, fades out after 5 seconds
- **z-index**: 40 (above reader content, below modals)
- **Visibility Conditions**:
  - ✅ Shows: `showEscHint === true`
  - ❌ Hides: If Exit Modal is open
  - ❌ Hides: If Bookmarks Panel is open
  - ❌ Hides: If Soundscape Player is open
  - ❌ Hides: After 5 seconds

**Styling Details**:
```css
/* Outer container */
.fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40

/* Inner pill */
.bg-black/80 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2

/* KBD element (ESC key) */
.bg-white/20 px-2 py-1 rounded text-xs font-mono

/* Text */
.text-sm
```

---

## 🎮 User Experience Flow

### Scenario 1: Reading → Quick Exit

```
1. User is reading (page flipping)
   │
   │ (Sees ESC hint for 5 seconds at bottom)
   │
   ▼
2. User presses ESC key
   │
   ▼
3. Exit Modal appears
   ┌─────────────────────────────┐
   │  Exit Reading          ✕    │
   │                             │
   │  Are you sure you want to   │
   │  exit reading? Your         │
   │  progress will be saved.    │
   │                             │
   │      [Cancel] [Save & Exit] │
   └─────────────────────────────┘
   │
   ├── User clicks Cancel or presses ESC again
   │   └─> Returns to reading
   │
   └── User clicks Save & Exit
       └─> Saves progress, returns to library
```

---

### Scenario 2: Exit Modal → Cancel with ESC

```
1. User presses ESC (Exit Modal opens)
   │
   ▼
2. Modal is visible
   │
   │ (User changes mind)
   │
   ▼
3. User presses ESC again
   │
   ▼
4. Modal closes, returns to reading
```

---

### Scenario 3: Bookmarks Panel → Close with ESC

```
1. User opens Bookmarks Panel
   │
   ▼
2. Panel slides in from right
   │
   │ (User finished browsing bookmarks)
   │
   ▼
3. User presses ESC key
   │
   ▼
4. Panel closes, returns to reading
```

---

### Scenario 4: Soundscape Player → Close with ESC

```
1. User opens Soundscape Player
   │
   ▼
2. Player slides up from bottom
   │
   │ (User selected soundscape)
   │
   ▼
3. User presses ESC key
   │
   ▼
4. Player closes, returns to reading
```

---

## 🔍 Technical Details

### Event Listener Lifecycle

```typescript
// Component mounts
useEffect(() => {
  // 1. Create event handler
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Handle ESC press
    }
  };

  // 2. Attach listener to window
  window.addEventListener('keydown', handleKeyPress);

  // 3. Cleanup function
  return () => {
    // 4. Remove listener when component unmounts
    window.removeEventListener('keydown', handleKeyPress);
  };
}, [showExitModal, showBookmarks, showSoundscape]);
```

**Why window.addEventListener?**
- Works globally (anywhere in the app)
- Doesn't require element to have focus
- Standard for keyboard shortcuts

**Why the dependencies?**
- `[showExitModal, showBookmarks, showSoundscape]`
- Re-creates listener when these states change
- Ensures handler has current state values (React closure issue)

---

### ESC Hint Timer Lifecycle

```typescript
useEffect(() => {
  // ... other code

  // 1. Set timer for 5 seconds
  const escHintTimer = setTimeout(() => {
    setShowEscHint(false); // Hide hint
  }, 5000);

  // 2. Cleanup - clear timer if component unmounts early
  return () => clearTimeout(escHintTimer);
}, [user, bookId]);
```

**Timeline**:
```
0s  → Component mounts → showEscHint = true → Hint visible
1s  → Hint still visible
2s  → Hint still visible
3s  → Hint still visible
4s  → Hint still visible
5s  → Timer fires → setShowEscHint(false) → Hint fades out
6s+ → Hint hidden
```

---

### Priority Order Logic

```typescript
if (e.key === 'Escape') {
  // Priority 1: Close Exit Modal if open
  if (showExitModal) {
    setShowExitModal(false);
  }
  // Priority 2: Close Bookmarks if open
  else if (showBookmarks) {
    setShowBookmarks(false);
  }
  // Priority 3: Close Soundscape if open
  else if (showSoundscape) {
    setShowSoundscape(false);
  }
  // Priority 4: Open Exit Modal if nothing else is open
  else {
    setShowExitModal(true);
  }
}
```

**Why this order?**
1. **Exit Modal first** - User might accidentally press ESC twice, should close modal not exit
2. **Bookmarks second** - Common to close after browsing
3. **Soundscape third** - Less frequently accessed
4. **Default: Open Exit Modal** - Only when nothing else is open

---

## 🎨 Visual Design Details

### ESC Hint Styling

```jsx
<div className="bg-black/80 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
  <kbd className="bg-white/20 px-2 py-1 rounded text-xs font-mono">ESC</kbd>
  <span className="text-sm">Press to exit</span>
</div>
```

**Rendered Appearance**:
```
┌───────────────────────────┐
│ ┌───────┐                 │
│ │  ESC  │  Press to exit  │ ← Black/80% bg, white text
│ └───────┘                 │
└───────────────────────────┘
    ↑
  Semi-transparent
  white background
```

**Color Breakdown**:
- **Outer pill**: Black at 80% opacity
- **ESC key**: White at 20% opacity
- **Text**: Pure white
- **Shadow**: Large soft shadow (`shadow-lg`)

**Typography**:
- **ESC key**: `font-mono` (monospace font), `text-xs` (12px)
- **Message**: `text-sm` (14px), default font

**Spacing**:
- **Horizontal padding**: `px-4` (16px)
- **Vertical padding**: `py-2` (8px)
- **Gap between key and text**: `gap-2` (8px)

---

### Animation Details

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
>
```

**Animation Sequence**:

**1. Initial State** (before appearing):
- `opacity: 0` - Fully transparent
- `y: 20` - 20px below final position

**2. Animate In** (when appearing):
- `opacity: 1` - Fully opaque
- `y: 0` - Final position
- Duration: ~300ms (Motion default)

**3. Exit** (when disappearing):
- `opacity: 0` - Fade out
- `y: 20` - Slide down 20px
- Duration: ~300ms (Motion default)

**Easing**: Motion default (smooth ease-in-out)

---

## ✅ Testing Checklist

### Keyboard Tests

- [ ] **ESC During Reading**
  - [ ] Press ESC → Exit Modal opens
  - [ ] Press ESC again → Modal closes
  - [ ] No console errors

- [ ] **ESC with Bookmarks Open**
  - [ ] Open Bookmarks Panel
  - [ ] Press ESC → Panel closes
  - [ ] Press ESC again → Exit Modal opens

- [ ] **ESC with Soundscape Open**
  - [ ] Open Soundscape Player
  - [ ] Press ESC → Player closes
  - [ ] Press ESC again → Exit Modal opens

- [ ] **Multiple Panel Scenario**
  - [ ] Open Exit Modal
  - [ ] Press ESC → Modal closes (doesn't open bookmarks)
  - [ ] Behavior is consistent

### Visual Tests

- [ ] **ESC Hint Display**
  - [ ] Hint appears when reader loads
  - [ ] Hint is centered at bottom
  - [ ] Hint has ESC key styled correctly
  - [ ] Hint is readable (contrast)

- [ ] **ESC Hint Timing**
  - [ ] Hint visible at 0 seconds
  - [ ] Hint still visible at 4 seconds
  - [ ] Hint fades out at 5 seconds
  - [ ] Hint stays hidden after fade

- [ ] **ESC Hint Visibility Logic**
  - [ ] Hint NOT shown when Exit Modal open
  - [ ] Hint NOT shown when Bookmarks open
  - [ ] Hint NOT shown when Soundscape open
  - [ ] Hint shown when all panels closed

### Edge Cases

- [ ] **Rapid ESC Presses**
  - [ ] Press ESC 5 times rapidly
  - [ ] No state conflicts
  - [ ] Modal opens/closes correctly

- [ ] **ESC During Page Flip**
  - [ ] Start page flip animation
  - [ ] Press ESC mid-animation
  - [ ] Exit Modal opens
  - [ ] Page flip completes

- [ ] **ESC with Zoom Active**
  - [ ] Zoom in (150%)
  - [ ] Press ESC → Exit Modal opens
  - [ ] Zoom level maintained

### Cleanup Tests

- [ ] **Event Listener Cleanup**
  - [ ] Open reader
  - [ ] Navigate away
  - [ ] Check for memory leaks (DevTools)
  - [ ] No orphaned listeners

- [ ] **Timer Cleanup**
  - [ ] Open reader
  - [ ] Close reader before 5 seconds
  - [ ] Timer is cleared (no errors)

---

## 📊 Changes Summary

| Change | Location | Lines | Type |
|--------|----------|-------|------|
| **showEscHint state** | ImmersiveBookReader.tsx | Line 71 | ✨ New |
| **ESC hint timer** | ImmersiveBookReader.tsx | Lines 91-93 | ✏️ Modified |
| **ESC key handler** | ImmersiveBookReader.tsx | Lines 154-177 | ✨ New |
| **ESC hint overlay** | ImmersiveBookReader.tsx | Lines 620-636 | ✨ New |

**Total Lines Added**: ~35  
**Total Lines Modified**: ~5  
**New Features**: 2 (ESC handler, ESC hint)

---

## 🎯 User Benefits

1. **⌨️ Keyboard-Friendly**: Quick exit without mouse/touch
2. **💡 Discoverable**: Hint shows users the shortcut exists
3. **🔄 Flexible**: Works for closing panels or exiting
4. **⏱️ Non-Intrusive**: Hint disappears after 5 seconds
5. **🎨 Polished**: Smooth animations and clear visual design
6. **🧠 Intuitive**: ESC key is universal for "close/exit"

---

## 🔮 Future Enhancements (Optional)

1. **Keyboard Shortcuts Panel**: Show all shortcuts (H key)
2. **Arrow Keys**: Next/Previous page navigation
3. **Spacebar**: Next page (common in e-readers)
4. **B key**: Toggle bookmarks
5. **M key**: Toggle soundscape (music)
6. **Ctrl+S**: Manual save (in addition to auto-save)
7. **F11**: Fullscreen toggle

---

## Quick Reference

### Where to Find Changes

| Feature | File | Lines |
|---------|------|-------|
| ESC hint state | ImmersiveBookReader.tsx | 71 |
| ESC hint timer | ImmersiveBookReader.tsx | 91-93 |
| ESC key handler | ImmersiveBookReader.tsx | 154-177 |
| ESC hint UI | ImmersiveBookReader.tsx | 620-636 |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **ESC** | Open Exit Modal (while reading) |
| **ESC** | Close Exit Modal (when modal open) |
| **ESC** | Close Bookmarks Panel (when panel open) |
| **ESC** | Close Soundscape Player (when player open) |

### Console Log Messages

```
✓ (No console logs added for ESC key - silent operation)
```

---

**Document Version**: 1.0  
**Created**: April 1, 2026  
**Maintained By**: Rooted Tales / Xenwinx Studio Development Team
