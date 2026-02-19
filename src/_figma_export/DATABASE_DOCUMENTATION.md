# 📊 Rooted Tales - Database Documentation

**Version:** 1.3.0  
**Database:** PostgreSQL (Supabase)  
**Total Characters:** 34  
**Last Updated:** February 12, 2026

---

## 📁 Quick Links

- **SQL Schema:** [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)
- **Character JSON:** [assets/characters.json](./assets/characters.json)
- **Books JSON:** [assets/books.json](./assets/books.json)

---

## 📊 Database Overview

### Tables

| Table | Purpose | Records | Relations |
|-------|---------|---------|-----------|
| **characters** | All character data | 34 | → book_characters |
| **books** | Book library | Variable | → book_characters |
| **book_characters** | Book-character links | Variable | characters ↔ books |
| **habitats** | Habitat categories | 4 | Referenced by characters |
| **user_progress** | Reading progress | Per user | → books |
| **user_achievements** | Badges & achievements | Per user | - |
| **game_scores** | Game statistics | Per user | - |

---

## 🦊 Characters Table

### Schema

```sql
CREATE TABLE characters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    animal_type TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('forest', 'ocean', 'mountain', 'desert')),
    habitat_id INTEGER,
    image_filename TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER
);
```

### Complete Character List (34 Total)

#### 🌲 Forest Characters (13)

| ID | Name | Animal Type | Description |
|----|------|-------------|-------------|
| 1 | Akai | Red Panda | The brave leader of the forest |
| 2 | Quinn | Quokka | The happy helper |
| 3 | Koa | Koala | The sleepy climber |
| 4 | Hedge | Hedgehog | The spiky explorer |
| 5 | Maru | Flying Squirrel | The gliding acrobat |
| 6 | Orin | Otter | The playful swimmer |
| 7 | Niko | Red Fox | The clever trickster |
| 8 | Aoi | Blue Jay | The singing messenger |
| 9 | Basilisk | Basilisk Lizard | The water walker |
| 10 | Strix | Owl | The wise night watcher |
| 11 | Snowflake | Arctic Fox | The winter wanderer |
| 12 | Calico | Cat | The curious companion |
| 13 | Thorne | Porcupine | The protective guardian |

#### 🌊 Ocean Characters (10)

| ID | Name | Animal Type | Description |
|----|------|-------------|-------------|
| 14 | Raiku | Sea Otter | The ocean explorer |
| 15 | Ellie | Elephant Seal | The gentle giant |
| 16 | Kaito | Dolphin | The playful jumper |
| 17 | Mizuto | Sea Turtle | The ancient voyager |
| 18 | Lumi | Jellyfish | The glowing drifter |
| 19 | Calyx | Seahorse | The graceful dancer |
| 20 | Sage | Octopus | The intelligent shape-shifter |
| 21 | Kai | Manta Ray | The elegant glider |
| 22 | Willow | Sea Dragon | The mystical guardian |
| 23 | Nami | Starfish | The colorful wanderer |

#### ⛰️ Mountain Characters (8)

| ID | Name | Animal Type | Description |
|----|------|-------------|-------------|
| 24 | Raine | Snow Leopard | The mountain climber |
| 25 | Amaruq | Gray Wolf | The pack leader |
| 26 | Isen | Mountain Goat | The sure-footed climber |
| 27 | Kazan | Yak | The strong carrier |
| 28 | Nyra | Eagle | The soaring hunter |
| 29 | Tatsu | Dragon | The mythical protector |
| 30 | Frost | Polar Bear | The ice wanderer |
| 31 | Arctic | Arctic Hare | The swift runner |

#### 🏜️ Desert Characters (3)

| ID | Name | Animal Type | Description |
|----|------|-------------|-------------|
| 32 | Daichi | Fennec Fox | The desert scout |
| 33 | Blaze | Phoenix | The fire bird |
| 34 | Rajin | Camel | The desert traveler |

### Image Files

All character images should be uploaded to Supabase Storage:

**Bucket:** `make-eda44699-characters`  
**Format:** PNG  
**Naming:** `{id}.png` (e.g., `1.png`, `2.png`, etc.)  
**Recommended Size:** 800x800px

---

## 📚 Books Table

### Schema

```sql
CREATE TABLE books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    age_range TEXT,
    reading_time_minutes INTEGER,
    page_count INTEGER,
    word_count INTEGER,
    cover_filename TEXT NOT NULL,
    cover_url TEXT,
    published_date DATE,
    isbn TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER
);
```

### Sample Book Data

Books are stored in `assets/books.json` with metadata including:
- Title, author, description
- Category and difficulty level
- Reading time and page count
- Cover image filename
- Character associations

---

## 🔗 Book-Character Relationship

### Schema

```sql
CREATE TABLE book_characters (
    id SERIAL PRIMARY KEY,
    book_id TEXT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    character_id TEXT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(book_id, character_id)
);
```

This table links characters to the books they appear in.

---

## 🏞️ Habitats Table

### Schema

```sql
CREATE TABLE habitats (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    gradient_colors TEXT[],
    character_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Habitat Data

| Name | Slug | Primary Color | Secondary Color | Characters |
|------|------|---------------|-----------------|------------|
| Mystical Forest | forest | #10b981 | #059669 | 13 |
| Ocean Depths | ocean | #0ea5e9 | #0284c7 | 10 |
| Mountain Peaks | mountain | #8b5cf6 | #7c3aed | 8 |
| Desert Sands | desert | #f59e0b | #d97706 | 3 |

---

## 👤 User Progress Table

### Schema

```sql
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    book_id TEXT REFERENCES books(id) ON DELETE CASCADE,
    current_page INTEGER DEFAULT 0,
    total_pages INTEGER,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, book_id)
);
```

Automatically calculates progress percentage and updates status.

---

## 🏆 User Achievements Table

### Schema

```sql
CREATE TABLE user_achievements (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    achievement_type TEXT NOT NULL,
    achievement_name TEXT NOT NULL,
    achievement_level INTEGER NOT NULL,
    points_earned INTEGER DEFAULT 0,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_type, achievement_level)
);
```

### Achievement Types

| Type | Theme | Levels |
|------|-------|--------|
| forest | Forest Explorer (Books) | 1-5 (1, 5, 10, 25, 50 books) |
| ocean | Ocean Navigator (Characters) | 1-5 (5, 10, 20, 30, 34 characters) |
| sunset | Sunset Gamer (Games) | 1-5 (5, 10, 25, 50, 100 wins) |
| starry | Starry Scholar (Sessions) | 1-5 (5, 10, 25, 50, 100 sessions) |

---

## 🎮 Game Scores Table

### Schema

```sql
CREATE TABLE game_scores (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    game_type TEXT NOT NULL CHECK (game_type IN ('maze', 'trivia', 'word', 'memory')),
    level INTEGER NOT NULL,
    score INTEGER DEFAULT 0,
    time_seconds INTEGER,
    attempts INTEGER DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Game Types

| Game | Type | Levels | Points |
|------|------|--------|--------|
| Maze Hunt | maze | 1-20 | 10-15 |
| Character Trivia | trivia | 1-20 | 10-15 |
| Word Puzzle | word | 1-20 | 10-15 |
| Memory Match | memory | 1-20 | 10-15 |

---

## 📈 Views & Statistics

### Character Stats View

```sql
CREATE VIEW character_stats AS
SELECT 
    category,
    COUNT(*) as total_characters,
    ARRAY_AGG(name ORDER BY sort_order) as character_names
FROM characters
GROUP BY category
ORDER BY category;
```

**Query:**
```sql
SELECT * FROM character_stats;
```

**Result:**
| Category | Total | Names |
|----------|-------|-------|
| forest | 13 | {Akai, Quinn, Koa, Hedge...} |
| ocean | 10 | {Raiku, Ellie, Kaito...} |
| mountain | 8 | {Raine, Amaruq, Isen...} |
| desert | 3 | {Daichi, Blaze, Rajin} |

### Popular Characters View

```sql
CREATE VIEW popular_characters AS
SELECT 
    c.id,
    c.name,
    c.animal_type,
    c.category,
    COUNT(bc.book_id) as book_count
FROM characters c
LEFT JOIN book_characters bc ON c.id = bc.character_id
GROUP BY c.id, c.name, c.animal_type, c.category
ORDER BY book_count DESC, c.name;
```

---

## 🔐 Row Level Security (RLS)

All tables have RLS enabled for Supabase:

### Public Access (Read-Only)
- ✅ `characters` - Anyone can view
- ✅ `books` - Anyone can view
- ✅ `habitats` - Anyone can view
- ✅ `book_characters` - Anyone can view

### User-Specific Access
- 🔒 `user_progress` - Users can only view/edit their own
- 🔒 `user_achievements` - Users can only view/insert their own
- 🔒 `game_scores` - Users can only view/insert their own

### Policy Examples

```sql
-- Public read access
CREATE POLICY "Public read access for characters" 
ON characters FOR SELECT USING (true);

-- User-specific access
CREATE POLICY "Users can view own progress" 
ON user_progress FOR SELECT 
USING (auth.uid()::text = user_id);
```

---

## 🔧 Useful Queries

### Get All Characters by Category

```sql
SELECT * FROM characters 
WHERE category = 'forest' 
ORDER BY sort_order;
```

### Get Character with Associated Books

```sql
SELECT 
    c.*,
    ARRAY_AGG(b.title) as books
FROM characters c
LEFT JOIN book_characters bc ON c.id = bc.character_id
LEFT JOIN books b ON bc.book_id = b.id
WHERE c.id = '1'
GROUP BY c.id;
```

### Get User's Reading Progress

```sql
SELECT 
    b.title,
    up.progress_percentage,
    up.status,
    up.last_read_at
FROM user_progress up
JOIN books b ON up.book_id = b.id
WHERE up.user_id = 'user123'
ORDER BY up.last_read_at DESC;
```

### Get Top Game Scores

```sql
SELECT 
    game_type,
    level,
    MAX(score) as high_score,
    MIN(time_seconds) as best_time
FROM game_scores
WHERE user_id = 'user123' AND completed = TRUE
GROUP BY game_type, level
ORDER BY game_type, level;
```

### Get All Achievements for User

```sql
SELECT 
    achievement_type,
    achievement_name,
    achievement_level,
    points_earned,
    earned_at
FROM user_achievements
WHERE user_id = 'user123'
ORDER BY earned_at DESC;
```

---

## 🚀 Setting Up the Database

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Create new project
3. Wait for database to provision

### Step 2: Run SQL Schema

1. Open SQL Editor in Supabase Dashboard
2. Copy contents of `DATABASE_SCHEMA.sql`
3. Execute the SQL

### Step 3: Upload Character Images

```bash
# Using Supabase CLI
supabase storage create make-eda44699-characters

# Upload images 1.png through 34.png
supabase storage upload make-eda44699-characters 1.png
supabase storage upload make-eda44699-characters 2.png
# ... continue for all 34 characters
```

### Step 4: Verify Data

```sql
-- Check character count
SELECT COUNT(*) FROM characters; -- Should be 34

-- Check categories
SELECT category, COUNT(*) 
FROM characters 
GROUP BY category;
-- forest: 13, ocean: 10, mountain: 8, desert: 3

-- Check habitats
SELECT * FROM habitats; -- Should have 4 rows
```

---

## 📊 Statistics Summary

### Character Distribution

```
Total Characters: 34
├── Forest: 13 (38.2%)
├── Ocean: 10 (29.4%)
├── Mountain: 8 (23.5%)
└── Desert: 3 (8.8%)
```

### Animal Types

**34 unique animal species** including:
- Mammals: 18 (Red Panda, Quokka, Koala, Hedgehog, Fox, etc.)
- Birds: 4 (Blue Jay, Owl, Eagle, Phoenix)
- Aquatic: 9 (Sea Otter, Dolphin, Turtle, Jellyfish, etc.)
- Mythical: 3 (Dragon, Phoenix, Sea Dragon)

---

## 🔄 Data Flow

### Application → Database

1. **Character Gallery** reads from `characters` table
2. **Mini Games** use character data for trivia, word puzzles, memory
3. **Book Reader** tracks progress in `user_progress`
4. **Achievements** unlock based on `user_achievements`
5. **Game Scores** save to `game_scores` table

### Sync Strategy

The app uses a **smart caching system**:

1. **First Load:** Fetch all characters from database
2. **Cache:** Store in React state + localStorage
3. **Updates:** Check for new characters periodically
4. **Fallback:** Use cached data if database unavailable

See `src/lib/assetManager.ts` for implementation.

---

## 📝 Maintenance

### Adding New Characters

```sql
INSERT INTO characters (
    id, name, animal_type, description, 
    category, image_filename, sort_order
) VALUES (
    '35', 'NewName', 'Animal Type', 'Description',
    'forest', '35.png', 35
);
```

### Updating Character Info

```sql
UPDATE characters
SET description = 'New description'
WHERE id = '1';
```

### Deleting Characters (Caution!)

```sql
-- This will cascade delete from book_characters
DELETE FROM characters WHERE id = '35';
```

---

## 🔍 Troubleshooting

### Character count doesn't match

```sql
-- Verify total
SELECT COUNT(*) FROM characters;

-- Check by category
SELECT category, COUNT(*) FROM characters GROUP BY category;
```

### Images not loading

```sql
-- Check image filenames
SELECT id, name, image_filename FROM characters ORDER BY id::integer;

-- Verify filenames match pattern
SELECT * FROM characters WHERE image_filename !~ '^[0-9]+\.png$';
```

### RLS blocking queries

```sql
-- Temporarily disable RLS for testing (not recommended in production)
ALTER TABLE characters DISABLE ROW LEVEL SECURITY;

-- Re-enable after testing
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
```

---

## 📚 Related Documentation

- **[BACKEND_API_SPECIFICATION.md](../documentation/BACKEND_API_SPECIFICATION.md)** - API endpoints
- **[COMPLETE_PROJECT_GUIDE.md](../COMPLETE_PROJECT_GUIDE.md)** - Full project documentation
- **[assets/characters.json](./assets/characters.json)** - Character metadata JSON
- **[assets/books.json](./assets/books.json)** - Book metadata JSON

---

## ✅ Checklist for Database Setup

- [ ] Supabase project created
- [ ] SQL schema executed (`DATABASE_SCHEMA.sql`)
- [ ] 34 characters inserted (verify with `SELECT COUNT(*)`)
- [ ] 4 habitats created
- [ ] Row Level Security policies active
- [ ] Storage buckets created
- [ ] Character images uploaded (1.png - 34.png)
- [ ] Environment variables configured in app
- [ ] Test queries executed successfully
- [ ] Data syncing in app working

---

**Database Version:** 1.3.0  
**Last Updated:** February 12, 2026  
**Total Records:** 34 characters, 4 habitats  
**Database Type:** PostgreSQL (Supabase)

🌲 **Built with ❤️ by Xenwinx Studio** 🐾
