# Badge IDs Reference - Complete List
## Rooted Tales - User Badge Collection System

**Location**: `/components/BadgeCollection.tsx` (lines 77-387)  
**Total Badges**: 25 badges  
**Master Badges**: 5 badges  
**Categories**: 5 categories

---

## 📋 Quick Reference - All Badge IDs

### 🌲 Forest Master Path (Login Streak) - 5 Badges

| Badge ID | Name | Requirement | Rarity |
|----------|------|-------------|--------|
| `seedling` | Seedling | 3-day streak | Common |
| `sapling` | Sapling | 7-day streak | Common |
| `growing-tree` | Growing Tree | 14-day streak | Rare |
| `mighty-oak` | Mighty Oak | 30-day streak | Epic |
| `forest-master` | 🌲 Forest Master | 100-day streak | **Master** |

---

### 📚 Ocean Master Path (Reading) - 5 Badges

| Badge ID | Name | Requirement | Rarity |
|----------|------|-------------|--------|
| `page-turner` | Page Turner | Finish 1 book | Common |
| `bookworm` | Bookworm | Finish 5 books | Common |
| `chapter-chaser` | Chapter Chaser | Finish 15 books | Rare |
| `literary-voyager` | Literary Voyager | Finish 30 books | Epic |
| `ocean-master` | 📚 Ocean Master | Finish 50 books | **Master** |

---

### 🎮 Sunset Master Path (Mini-Games) - 5 Badges

| Badge ID | Name | Requirement | Rarity |
|----------|------|-------------|--------|
| `game-starter` | Game Starter | Play 5 games | Common |
| `skill-sharer` | Skill Sharer | Win 10 games | Common |
| `challenge-champion` | Challenge Champion | Win 25 games | Rare |
| `arcade-ace` | Arcade Ace | Win 50 games | Epic |
| `sunset-master` | 🎮 Sunset Master | Win 100 games | **Master** |

---

### 💎 Starry Night Master Path (Character Collection) - 5 Badges

| Badge ID | Name | Requirement | Rarity |
|----------|------|-------------|--------|
| `character-collector` | Character Collector | Unlock 2 characters | Common |
| `castle-explorer` | Castle Explorer | Unlock 5 characters | Common |
| `hero-gatherer` | Hero Gatherer | Unlock 10 characters | Rare |
| `legendary-keeper` | Legendary Keeper | Unlock 15 characters | Epic |
| `starry-night-master` | 💎 Starry Night Master | Unlock all 20 characters | **Master** |

---

### 💠 Master of Themes Path (Theme Completion) - 5 Badges

| Badge ID | Name | Requirement | Rarity |
|----------|------|-------------|--------|
| `theme-beginner` | Theme Beginner | Complete 1 theme | Common |
| `theme-explorer` | Theme Explorer | Complete 3 themes | Common |
| `theme-specialist` | Theme Specialist | Complete 5 themes | Rare |
| `theme-champion` | Theme Champion | Complete 7 themes | Epic |
| `master-of-themes` | 💠 Master of Themes | Complete all 10 themes | **Master** |

---

## 🗂️ Complete Badge Data Structure

Each badge has the following properties:

```typescript
interface BadgeData {
  id: string;              // Unique identifier
  name: string;            // Display name
  description: string;     // Badge description
  icon: LucideIcon;        // Icon component
  color: string;           // Gradient color (from-X to-Y)
  requirement: string;     // Requirement text
  category: string;        // Category ID
  unlocked: boolean;       // Unlock status (calculated)
  progressPath?: string;   // Master badge path
  isMasterBadge?: boolean; // Is this a master badge?
  rarity?: string;         // Rarity tier
}
```

---

## 📍 Where Badge IDs Are Used

### 1. **BadgeCollection.tsx** (Main Badge Display)
**Location**: `/components/BadgeCollection.tsx`  
**Lines**: 77-387

**Badge Definitions**:
```typescript
const allBadges: BadgeData[] = [
  {
    id: 'seedling',
    name: 'Seedling',
    description: 'Started your reading journey',
    // ... other properties
  },
  // ... 24 more badges
];
```

**Usage**:
- Displays all badges in the Badge Collection screen
- Filters by category
- Shows unlock status
- Progress tracking

---

### 2. **DailyReward.tsx** (Badge Unlocking)
**Location**: `/components/DailyReward.tsx`  
**Lines**: 59-252

**Badge Definitions** (Subset for daily rewards):
```typescript
const allBadges: BadgeData[] = [
  { id: 'first-login', ... },
  { id: 'streak-3', ... },
  { id: 'streak-7', ... },
  { id: 'streak-30', ... },
  { id: 'books-5', ... },
  { id: 'books-10', ... },
  { id: 'games-10', ... },
  { id: 'points-100', ... },
];
```

**Badge Unlock Logic**:
```typescript
// Line 217-252
const checkBadgeUnlocks = (newStreak: number): BadgeData[] => {
  const unlockedBadges = user.achievements?.unlockedBadges || [];
  
  // Check login streak badges
  if (newStreak === 1 && !unlockedBadges.includes('first-login')) {
    newlyUnlocked.push(allBadges.find(b => b.id === 'first-login')!);
  }
  // ... more checks
};
```

---

### 3. **App.tsx** (User Data Storage)
**Location**: `/App.tsx`  
**Lines**: 98, 231, 288

**User Data Structure**:
```typescript
interface User {
  achievements: {
    unlockedBadges: string[];  // Array of badge IDs
  };
}
```

**Example**:
```typescript
const user = {
  achievements: {
    unlockedBadges: ['seedling', 'sapling', 'page-turner', 'bookworm']
  }
};
```

---

## 🎯 Badge Categories

### Category IDs and Properties

```typescript
const categories = [
  { 
    id: 'all', 
    label: 'All', 
    icon: Award, 
    color: 'from-gray-500 to-gray-600' 
  },
  { 
    id: 'login', 
    label: 'Login', 
    icon: Flame, 
    color: 'from-green-500 to-emerald-600' 
  },
  { 
    id: 'reading', 
    label: 'Reading', 
    icon: BookOpen, 
    color: 'from-blue-500 to-cyan-600' 
  },
  { 
    id: 'games', 
    label: 'Games', 
    icon: Gamepad2, 
    color: 'from-orange-500 to-pink-600' 
  },
  { 
    id: 'collection', 
    label: 'Pack', 
    icon: Heart, 
    color: 'from-purple-500 to-pink-600' 
  },
  { 
    id: 'special', 
    label: 'Rare', 
    icon: Sparkles, 
    color: 'from-fuchsia-500 to-purple-600' 
  }
];
```

---

## 🏆 Rarity Tiers

| Rarity | Color | Badge Count | Examples |
|--------|-------|-------------|----------|
| **Common** | Gray | 10 badges | seedling, sapling, page-turner |
| **Rare** | Blue | 5 badges | growing-tree, chapter-chaser |
| **Epic** | Purple | 5 badges | mighty-oak, literary-voyager |
| **Master** | Gold/Rainbow | 5 badges | forest-master, ocean-master |

---

## 🔄 How to Replace/Add Badges

### Option 1: Replace Existing Badge

**File**: `/components/BadgeCollection.tsx`  
**Lines**: 77-387

**Example - Replace "Seedling" badge**:

```typescript
// FIND THIS (line 79-90):
{
  id: 'seedling',
  name: 'Seedling',
  description: 'Started your reading journey',
  icon: Sprout,
  color: 'from-green-300 to-green-400',
  requirement: '3-day streak',
  category: 'login',
  unlocked: getStreak() >= 3,
  progressPath: 'forest-master',
  rarity: 'common'
},

// REPLACE WITH:
{
  id: 'new-badge-id',           // ← Change this
  name: 'New Badge Name',        // ← Change this
  description: 'New description', // ← Change this
  icon: YourIcon,                // ← Change this (import from lucide-react)
  color: 'from-red-300 to-red-400', // ← Change this
  requirement: 'New requirement', // ← Change this
  category: 'login',             // Keep or change category
  unlocked: getStreak() >= 3,    // Keep or change unlock logic
  progressPath: 'forest-master', // Keep or change
  rarity: 'common'               // Keep or change rarity
},
```

---

### Option 2: Add New Badge

**File**: `/components/BadgeCollection.tsx`  
**Location**: Add anywhere in the `allBadges` array (lines 77-387)

```typescript
// Add to the end of allBadges array (before line 387):
{
  id: 'my-new-badge',
  name: 'My New Badge',
  description: 'Earned by doing something special',
  icon: Star,  // Import from lucide-react
  color: 'from-yellow-300 to-yellow-500',
  requirement: 'Complete special task',
  category: 'special',  // Choose: login, reading, games, collection, special
  unlocked: user?.achievements?.specialTask || false,
  rarity: 'rare'  // Choose: common, rare, epic, master
},
```

---

### Option 3: Remove Badge

**Simply delete the badge object** from the `allBadges` array in `/components/BadgeCollection.tsx`.

**Example - Remove "Seedling"**:
1. Go to `/components/BadgeCollection.tsx`
2. Find lines 79-90 (the seedling badge object)
3. Delete the entire object (including the comma)

---

## 📊 Badge Unlock Conditions

### How Badges Are Unlocked

Badges use **conditional unlock logic** based on user achievements:

```typescript
// Login Streak Badges
unlocked: getStreak() >= 3  // 3-day streak

// Reading Badges
unlocked: getBooksCompleted() >= 5  // 5 books finished

// Game Badges
unlocked: getGamesWon() >= 10  // 10 games won

// Character Collection Badges
unlocked: getCharactersUnlocked() >= 5  // 5 characters unlocked

// Theme Badges
unlocked: getThemesCompleted() >= 3  // 3 themes completed
```

### Helper Functions (lines 64-76)

```typescript
const getStreak = () => user?.achievements?.currentStreak || 0;
const getBooksCompleted = () => user?.achievements?.booksCompleted || 0;
const getGamesWon = () => user?.achievements?.gamesWon || 0;
const getCharactersUnlocked = () => user?.achievements?.charactersUnlocked || 0;
const getThemesCompleted = () => user?.achievements?.themesCompleted || 0;
```

---

## 🎨 Badge Icons Available

### From lucide-react package:

**Login/Streak Icons**:
- `Sprout` - Seedling/growth
- `TreeDeciduous` - Small tree
- `Trees` - Multiple trees
- `TreePine` - Pine tree
- `Flame` - Fire/streak

**Reading Icons**:
- `BookOpen` - Open book
- `Book` - Closed book
- `BookMarked` - Bookmarked
- `Library` - Library building
- `Bookmark` - Bookmark

**Game Icons**:
- `Gamepad2` - Game controller
- `Target` - Target/aim
- `Medal` - Medal
- `Trophy` - Trophy
- `Award` - Award ribbon

**Character/Collection Icons**:
- `Users` - Multiple users
- `Heart` - Heart
- `Star` - Star
- `Sparkles` - Sparkles/magic
- `Crown` - Crown (Master badges)

**Theme Icons**:
- `Palette` - Color palette
- `Waves` - Ocean waves
- `Sunset` - Sunset
- `Moon` - Moon
- `Stars` - Stars

---

## 💾 User Data Storage

### Where Badge IDs Are Stored

**File**: `/App.tsx`  
**localStorage key**: `'user'`

```typescript
// User object structure
const user = {
  id: "user123",
  email: "user@example.com",
  username: "JohnDoe",
  achievements: {
    currentStreak: 7,
    booksCompleted: 12,
    gamesWon: 25,
    charactersUnlocked: 8,
    themesCompleted: 3,
    unlockedBadges: [
      'seedling',
      'sapling',
      'page-turner',
      'bookworm',
      'game-starter',
      'skill-sharer'
    ]
  }
};

// Stored in localStorage
localStorage.setItem('user', JSON.stringify(user));
```

---

## 🔧 How to Check If User Has Badge

### In React Components

```typescript
// Check if user has specific badge
const hasBadge = (badgeId: string): boolean => {
  return user?.achievements?.unlockedBadges?.includes(badgeId) || false;
};

// Example usage
if (hasBadge('forest-master')) {
  console.log('User is a Forest Master!');
}
```

---

## 📝 Summary

### To Replace Badges:

1. **Find badge IDs** in this document
2. **Edit `/components/BadgeCollection.tsx`** (lines 77-387)
3. **Change badge properties**:
   - `id` - Unique identifier
   - `name` - Display name
   - `description` - Badge description
   - `icon` - Lucide React icon
   - `color` - Gradient colors
   - `requirement` - Unlock requirement text
   - `category` - Category ID
   - `unlocked` - Unlock condition
   - `rarity` - Rarity tier

### Badge ID Format:
- Use lowercase
- Use hyphens for spaces
- Be descriptive
- Examples: `forest-master`, `page-turner`, `game-starter`

### Categories Available:
- `login` - Login streak badges
- `reading` - Reading milestone badges
- `games` - Mini-game badges
- `collection` - Character collection badges
- `special` - Theme completion badges

---

**Document Version**: 1.0  
**Created**: April 7, 2026  
**File**: `/BADGE_IDS_REFERENCE.md`  
**Maintained By**: Rooted Tales / Xenwinx Studio Development Team
