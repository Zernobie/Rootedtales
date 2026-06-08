# 📚 Rooted Tales - Books Database Documentation

**Version:** 1.3.0  
**Database:** PostgreSQL (Supabase)  
**Total Books:** 12  
**Last Updated:** February 12, 2026

---

## 📁 Quick Links

- **SQL Schema:** [BOOKS_SCHEMA.sql](./BOOKS_SCHEMA.sql)
- **Books JSON:** [assets/books.json](./assets/books.json)
- **Character Schema:** [DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)

---

## 📊 Database Overview

### Tables

| Table | Purpose | Records | Relations |
|-------|---------|---------|-----------|
| **books** | All book metadata | 12 | → book_characters |
| **book_characters** | Book-character links | 36 | books ↔ characters |

---

## 📚 Complete Book List (12 Books)

### 📖 Book 1: Akai's Forest Adventure

**ID:** 1  
**Category:** Adventure  
**Difficulty:** Beginner  
**Age Range:** 4-8 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | Follow Rusty the Red Panda through the mystical forest |
| **Pages** | 24 |
| **Reading Time** | 10 minutes |
| **Cover File** | 1.jpg |
| **Featured** | ✅ Yes |
| **Characters** | Akai (main), Quinn (supporting), Niko (supporting) |

---

### 📖 Book 2: Quinn's Happy Day

**ID:** 2  
**Category:** Friendship  
**Difficulty:** Beginner  
**Age Range:** 4-6 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | Quinn the Quokka spreads joy throughout the forest |
| **Pages** | 20 |
| **Reading Time** | 8 minutes |
| **Cover File** | 2.jpg |
| **Featured** | No |
| **Characters** | Quinn (main), Koa (supporting), Hedge (supporting) |

---

### 📖 Book 3: The Great Forest Race

**ID:** 3  
**Category:** Adventure  
**Difficulty:** Intermediate  
**Age Range:** 6-9 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | All the forest friends compete in an exciting race |
| **Pages** | 28 |
| **Reading Time** | 12 minutes |
| **Cover File** | 3.jpg |
| **Featured** | ✅ Yes |
| **Characters** | Akai (main), Quinn (supporting), Maru (supporting), Niko (supporting), Basilisk (supporting) |

---

### 📖 Book 4: Ocean Dreams

**ID:** 4  
**Category:** Fantasy  
**Difficulty:** Intermediate  
**Age Range:** 5-8 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | Raiku discovers the wonders beneath the waves |
| **Pages** | 26 |
| **Reading Time** | 11 minutes |
| **Cover File** | 4.jpg |
| **Featured** | No |
| **Characters** | Raiku (main), Kaito (supporting), Mizuto (supporting), Lumi (supporting) |

---

### 📖 Book 5: Mountain Mysteries

**ID:** 5  
**Category:** Mystery  
**Difficulty:** Intermediate  
**Age Range:** 7-10 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | Raine climbs to uncover ancient mountain secrets |
| **Pages** | 30 |
| **Reading Time** | 13 minutes |
| **Cover File** | 5.jpg |
| **Featured** | No |
| **Characters** | Raine (main), Amaruq (supporting), Nyra (supporting), Tatsu (supporting) |

---

### 📖 Book 6: Desert Tales

**ID:** 6  
**Category:** Adventure  
**Difficulty:** Beginner  
**Age Range:** 5-8 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | Daichi navigates the shifting sands |
| **Pages** | 22 |
| **Reading Time** | 9 minutes |
| **Cover File** | 6.jpg |
| **Featured** | No |
| **Characters** | Daichi (main), Blaze (supporting), Rajin (supporting) |

---

### 📖 Book 7: Hedge's Big Discovery

**ID:** 7  
**Category:** Learning  
**Difficulty:** Beginner  
**Age Range:** 4-7 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | A curious hedgehog learns about the forest ecosystem |
| **Pages** | 18 |
| **Reading Time** | 7 minutes |
| **Cover File** | 7.jpg |
| **Featured** | No |
| **Characters** | Hedge (main), Orin (supporting), Strix (supporting) |

---

### 📖 Book 8: Maru Takes Flight

**ID:** 8  
**Category:** Courage  
**Difficulty:** Beginner  
**Age Range:** 4-7 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | A flying squirrel overcomes fear of heights |
| **Pages** | 20 |
| **Reading Time** | 8 minutes |
| **Cover File** | 8.jpg |
| **Featured** | No |
| **Characters** | Maru (main), Aoi (supporting) |

---

### 📖 Book 9: Strix's Night Watch

**ID:** 9  
**Category:** Wisdom  
**Difficulty:** Beginner  
**Age Range:** 5-8 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | The wise owl protects the forest at night |
| **Pages** | 24 |
| **Reading Time** | 10 minutes |
| **Cover File** | 9.jpg |
| **Featured** | No |
| **Characters** | Strix (main), Snowflake (supporting), Thorne (supporting) |

---

### 📖 Book 10: Kaito's Ocean Journey

**ID:** 10  
**Category:** Exploration  
**Difficulty:** Intermediate  
**Age Range:** 6-9 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | A dolphin explores the vast ocean depths |
| **Pages** | 26 |
| **Reading Time** | 11 minutes |
| **Cover File** | 10.jpg |
| **Featured** | ✅ Yes |
| **Characters** | Kaito (main), Mizuto (supporting), Calyx (supporting), Sage (supporting) |

---

### 📖 Book 11: The Four Habitats

**ID:** 11  
**Category:** Education  
**Difficulty:** Intermediate  
**Age Range:** 6-10 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | Learn about forest, ocean, mountain, and desert habitats |
| **Pages** | 32 |
| **Reading Time** | 14 minutes |
| **Cover File** | 11.jpg |
| **Featured** | No |
| **Characters** | Akai (main), Raiku (main), Raine (main), Daichi (main) |

---

### 📖 Book 12: Friends Forever

**ID:** 12  
**Category:** Friendship  
**Difficulty:** Intermediate  
**Age Range:** 5-9 years

| Detail | Value |
|--------|-------|
| **Author** | Xenwinx Studio |
| **Description** | The power of friendship across all habitats |
| **Pages** | 28 |
| **Reading Time** | 12 minutes |
| **Cover File** | 12.jpg |
| **Featured** | ✅ Yes |
| **Characters** | Akai (main), Quinn (main), Raiku (main), Kaito (main), Raine (main), Daichi (main) |

---

## 📊 Statistics & Analysis

### Overall Statistics

| Metric | Value |
|--------|-------|
| **Total Books** | 12 |
| **Total Pages** | 298 pages |
| **Total Reading Time** | 125 minutes (2h 5min) |
| **Average Pages** | 24.8 pages/book |
| **Average Reading Time** | 10.4 minutes/book |
| **Shortest Book** | Hedge's Big Discovery (18 pages, 7 min) |
| **Longest Book** | The Four Habitats (32 pages, 14 min) |

### Category Breakdown

| Category | Count | Books |
|----------|-------|-------|
| **Adventure** | 3 | Akai's Forest Adventure, The Great Forest Race, Desert Tales |
| **Friendship** | 2 | Quinn's Happy Day, Friends Forever |
| **Fantasy** | 1 | Ocean Dreams |
| **Mystery** | 1 | Mountain Mysteries |
| **Learning** | 1 | Hedge's Big Discovery |
| **Courage** | 1 | Maru Takes Flight |
| **Wisdom** | 1 | Strix's Night Watch |
| **Exploration** | 1 | Kaito's Ocean Journey |
| **Education** | 1 | The Four Habitats |

### Difficulty Distribution

| Difficulty | Count | Average Pages | Average Time |
|------------|-------|---------------|--------------|
| **Beginner** | 6 | 21.3 pages | 8.7 min |
| **Intermediate** | 6 | 28.3 pages | 12.2 min |

### Featured Books

| Book | Pages | Time | Category |
|------|-------|------|----------|
| Akai's Forest Adventure | 24 | 10 min | Adventure |
| The Great Forest Race | 28 | 12 min | Adventure |
| Kaito's Ocean Journey | 26 | 11 min | Exploration |
| Friends Forever | 28 | 12 min | Friendship |

### Character Appearances

| Character | Book Count | Books Appeared In |
|-----------|------------|-------------------|
| **Akai** | 4 | Books 1, 3, 11, 12 |
| **Quinn** | 3 | Books 2, 3, 12 |
| **Raiku** | 3 | Books 4, 11, 12 |
| **Kaito** | 3 | Books 4, 10, 12 |
| **Raine** | 3 | Books 5, 11, 12 |
| **Daichi** | 3 | Books 6, 11, 12 |
| **Niko** | 2 | Books 1, 3 |
| **Mizuto** | 2 | Books 4, 10 |
| Others | 1 each | Various books |

---

## 📚 Books Table Schema

### Table Definition

```sql
CREATE TABLE books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    author TEXT NOT NULL DEFAULT 'Xenwinx Studio',
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    age_range TEXT DEFAULT '4-8 years',
    reading_time_minutes INTEGER NOT NULL,
    page_count INTEGER NOT NULL,
    word_count INTEGER,
    cover_filename TEXT NOT NULL,
    cover_url TEXT,
    published_date DATE DEFAULT CURRENT_DATE,
    isbn TEXT UNIQUE,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    sort_order INTEGER,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0
);
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| **id** | TEXT | Unique identifier (1-12) |
| **title** | TEXT | Book title (unique) |
| **author** | TEXT | Author name (default: Xenwinx Studio) |
| **description** | TEXT | Book synopsis/description |
| **category** | TEXT | Genre/theme category |
| **difficulty** | TEXT | Reading level (beginner/intermediate/advanced) |
| **age_range** | TEXT | Recommended age range |
| **reading_time_minutes** | INTEGER | Estimated reading time |
| **page_count** | INTEGER | Total pages |
| **word_count** | INTEGER | Total words (optional) |
| **cover_filename** | TEXT | Cover image filename (X.jpg) |
| **cover_url** | TEXT | Signed URL from storage |
| **published_date** | DATE | Publication date |
| **isbn** | TEXT | ISBN number (if applicable) |
| **language** | TEXT | Language code (default: en) |
| **is_published** | BOOLEAN | Published status |
| **is_featured** | BOOLEAN | Featured on homepage |
| **is_premium** | BOOLEAN | Premium content flag |
| **sort_order** | INTEGER | Display order |
| **average_rating** | DECIMAL | Average user rating (0-5) |
| **total_ratings** | INTEGER | Total number of ratings |

---

## 🔗 Book-Character Relationships

### Schema

```sql
CREATE TABLE book_characters (
    id SERIAL PRIMARY KEY,
    book_id TEXT REFERENCES books(id),
    character_id TEXT REFERENCES characters(id),
    role TEXT DEFAULT 'featured',
    character_order INTEGER,
    UNIQUE(book_id, character_id)
);
```

### All Relationships (36 total)

| Book | Main Character(s) | Supporting Characters |
|------|-------------------|----------------------|
| 1. Akai's Forest Adventure | Akai | Quinn, Niko |
| 2. Quinn's Happy Day | Quinn | Koa, Hedge |
| 3. The Great Forest Race | Akai | Quinn, Maru, Niko, Basilisk |
| 4. Ocean Dreams | Raiku | Kaito, Mizuto, Lumi |
| 5. Mountain Mysteries | Raine | Amaruq, Nyra, Tatsu |
| 6. Desert Tales | Daichi | Blaze, Rajin |
| 7. Hedge's Big Discovery | Hedge | Orin, Strix |
| 8. Maru Takes Flight | Maru | Aoi |
| 9. Strix's Night Watch | Strix | Snowflake, Thorne |
| 10. Kaito's Ocean Journey | Kaito | Mizuto, Calyx, Sage |
| 11. The Four Habitats | Akai, Raiku, Raine, Daichi | None |
| 12. Friends Forever | Akai, Quinn, Raiku, Kaito, Raine, Daichi | None |

---

## 📈 Views & Queries

### 1. Book Category Statistics

```sql
SELECT * FROM book_category_stats;
```

**Result:**
| Category | Total Books | Avg Pages | Avg Reading Time | Titles |
|----------|-------------|-----------|------------------|--------|
| Adventure | 3 | 24.7 | 10.3 min | {Akai's Forest Adventure, ...} |
| Friendship | 2 | 24.0 | 10.0 min | {Quinn's Happy Day, ...} |
| ... | ... | ... | ... | ... |

### 2. Featured Books

```sql
SELECT * FROM featured_books;
```

Returns all books where `is_featured = TRUE` with character details.

### 3. Books with Characters

```sql
SELECT * FROM books_with_characters;
```

Returns complete book information with JSON array of characters.

---

## 🔧 Useful Queries

### Get All Books

```sql
SELECT id, title, category, page_count, reading_time_minutes
FROM books
ORDER BY sort_order;
```

### Get Books by Category

```sql
SELECT title, description, page_count
FROM books
WHERE category = 'Adventure'
ORDER BY sort_order;
```

### Get Books by Difficulty

```sql
SELECT title, difficulty, age_range, page_count
FROM books
WHERE difficulty = 'beginner'
ORDER BY reading_time_minutes;
```

### Get Book with Characters

```sql
SELECT 
    b.title,
    b.description,
    ARRAY_AGG(c.name) as characters
FROM books b
LEFT JOIN book_characters bc ON b.id = bc.book_id
LEFT JOIN characters c ON bc.character_id = c.id
WHERE b.id = '1'
GROUP BY b.id, b.title, b.description;
```

### Find Books by Character

```sql
SELECT b.title, bc.role
FROM books b
JOIN book_characters bc ON b.id = bc.book_id
JOIN characters c ON bc.character_id = c.id
WHERE c.name = 'Akai'
ORDER BY b.sort_order;
```

### Get Reading Statistics

```sql
SELECT 
    COUNT(*) as total_books,
    SUM(page_count) as total_pages,
    SUM(reading_time_minutes) as total_minutes,
    AVG(page_count) as avg_pages
FROM books;
```

### Books by Reading Time

```sql
SELECT title, reading_time_minutes, page_count
FROM books
ORDER BY reading_time_minutes DESC;
```

---

## 🚀 Setting Up the Database

### Step 1: Run SQL Schema

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy contents of `BOOKS_SCHEMA.sql`
4. Execute

### Step 2: Verify Data

```sql
-- Check book count
SELECT COUNT(*) FROM books; -- Should be 12

-- Check categories
SELECT category, COUNT(*) 
FROM books 
GROUP BY category;

-- Check relationships
SELECT COUNT(*) FROM book_characters; -- Should be 36
```

### Step 3: Upload Book Covers

```bash
# Create storage bucket
supabase storage create make-eda44699-book-covers

# Upload covers 1.jpg through 12.jpg
for i in {1..12}; do
  supabase storage upload make-eda44699-book-covers ${i}.jpg
done
```

---

## 🎯 Integration Examples

### Load Book Cover

```typescript
import { loadBookCover } from '@/lib/assetManager';

const coverUrl = await loadBookCover('1');
```

### Fetch Book Data

```typescript
const response = await fetch(
  `${supabaseUrl}/rest/v1/books?id=eq.1`,
  {
    headers: {
      'apikey': publicAnonKey,
      'Authorization': `Bearer ${publicAnonKey}`
    }
  }
);

const book = await response.json();
```

### Get Book with Characters

```typescript
const { data: book } = await supabase
  .from('books_with_characters')
  .select('*')
  .eq('id', '1')
  .single();

console.log(book.characters); // Array of character objects
```

---

## 📊 Book Cover Files

All book covers should be uploaded to Supabase Storage:

**Bucket:** `make-eda44699-book-covers`  
**Format:** JPG  
**Naming:** `{id}.jpg` (e.g., `1.jpg`, `2.jpg`, etc.)  
**Recommended Size:** 600x900px  
**Aspect Ratio:** 2:3 (portrait)

### Cover Checklist

- [ ] 1.jpg - Akai's Forest Adventure
- [ ] 2.jpg - Quinn's Happy Day
- [ ] 3.jpg - The Great Forest Race
- [ ] 4.jpg - Ocean Dreams
- [ ] 5.jpg - Mountain Mysteries
- [ ] 6.jpg - Desert Tales
- [ ] 7.jpg - Hedge's Big Discovery
- [ ] 8.jpg - Maru Takes Flight
- [ ] 9.jpg - Strix's Night Watch
- [ ] 10.jpg - Kaito's Ocean Journey
- [ ] 11.jpg - The Four Habitats
- [ ] 12.jpg - Friends Forever

---

## 🔍 Troubleshooting

### Books not loading

```sql
-- Verify books exist
SELECT COUNT(*) FROM books;

-- Check published status
SELECT id, title, is_published FROM books;
```

### Cover images not displaying

```sql
-- Check filenames
SELECT id, title, cover_filename FROM books ORDER BY id::integer;

-- Verify filename format
SELECT * FROM books WHERE cover_filename !~ '^[0-9]+\.jpg$';
```

### Character relationships missing

```sql
-- Check relationship count
SELECT book_id, COUNT(*) as character_count
FROM book_characters
GROUP BY book_id
ORDER BY book_id::integer;
```

---

## 📚 Related Documentation

- **[DATABASE_SCHEMA.sql](./DATABASE_SCHEMA.sql)** - Characters database
- **[DATABASE_DOCUMENTATION.md](./DATABASE_DOCUMENTATION.md)** - Characters docs
- **[BACKEND_API_SPECIFICATION.md](../documentation/BACKEND_API_SPECIFICATION.md)** - API endpoints
- **[assets/books.json](./assets/books.json)** - Book metadata JSON

---

## ✅ Setup Checklist

- [ ] Supabase project created
- [ ] BOOKS_SCHEMA.sql executed
- [ ] 12 books inserted (verify with `SELECT COUNT(*)`)
- [ ] 36 book-character relationships created
- [ ] Storage bucket created (`make-eda44699-book-covers`)
- [ ] Book cover images uploaded (1.jpg - 12.jpg)
- [ ] Views and functions working
- [ ] Row Level Security enabled
- [ ] Test queries successful
- [ ] App integration working

---

**Database Version:** 1.3.0  
**Last Updated:** February 12, 2026  
**Total Records:** 12 books, 36 book-character relationships  
**Database Type:** PostgreSQL (Supabase)

🌲 **Built with ❤️ by Xenwinx Studio** 🐾
