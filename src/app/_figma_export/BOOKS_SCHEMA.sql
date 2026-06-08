-- ============================================================================
-- Rooted Tales - Books Database Schema
-- Version: 1.3.0
-- Date: 2026-02-12
-- Database: PostgreSQL (Supabase)
-- Total Books: 12
-- ============================================================================

-- ============================================================================
-- TABLE: books
-- Description: Complete book library with all metadata
-- Total Records: 12 books across 8 categories
-- ============================================================================

CREATE TABLE IF NOT EXISTS books (
    -- Primary Key
    id TEXT PRIMARY KEY,
    
    -- Core Information
    title TEXT NOT NULL UNIQUE,
    author TEXT NOT NULL DEFAULT 'Xenwinx Studio',
    description TEXT NOT NULL,
    
    -- Categorization
    category TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    age_range TEXT DEFAULT '4-8 years',
    
    -- Reading Information
    reading_time_minutes INTEGER NOT NULL,
    page_count INTEGER NOT NULL,
    word_count INTEGER,
    
    -- Media & Assets
    cover_filename TEXT NOT NULL,
    cover_url TEXT,
    
    -- Publication
    published_date DATE DEFAULT CURRENT_DATE,
    isbn TEXT UNIQUE,
    language TEXT DEFAULT 'en',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Features
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    sort_order INTEGER,
    
    -- Ratings
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    
    -- Constraints
    CONSTRAINT valid_cover_filename CHECK (cover_filename ~ '^[0-9]+\.jpg$'),
    CONSTRAINT valid_reading_time CHECK (reading_time_minutes > 0),
    CONSTRAINT valid_page_count CHECK (page_count > 0)
);

-- Create indexes for better query performance
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_difficulty ON books(difficulty);
CREATE INDEX idx_books_is_featured ON books(is_featured);
CREATE INDEX idx_books_is_published ON books(is_published);
CREATE INDEX idx_books_reading_time ON books(reading_time_minutes);

-- ============================================================================
-- INSERT: All 12 Books with Complete Information
-- ============================================================================

-- Book 1: Akai's Forest Adventure
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order, is_featured
) VALUES (
    '1',
    'Akai''s Forest Adventure',
    '1.jpg',
    'Xenwinx Studio',
    'Adventure',
    'Follow Rusty the Red Panda through the mystical forest',
    24,
    10,
    'beginner',
    '4-8 years',
    1,
    TRUE
);

-- Book 2: Quinn's Happy Day
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '2',
    'Quinn''s Happy Day',
    '2.jpg',
    'Xenwinx Studio',
    'Friendship',
    'Quinn the Quokka spreads joy throughout the forest',
    20,
    8,
    'beginner',
    '4-6 years',
    2
);

-- Book 3: The Great Forest Race
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order, is_featured
) VALUES (
    '3',
    'The Great Forest Race',
    '3.jpg',
    'Xenwinx Studio',
    'Adventure',
    'All the forest friends compete in an exciting race',
    28,
    12,
    'intermediate',
    '6-9 years',
    3,
    TRUE
);

-- Book 4: Ocean Dreams
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '4',
    'Ocean Dreams',
    '4.jpg',
    'Xenwinx Studio',
    'Fantasy',
    'Raiku discovers the wonders beneath the waves',
    26,
    11,
    'intermediate',
    '5-8 years',
    4
);

-- Book 5: Mountain Mysteries
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '5',
    'Mountain Mysteries',
    '5.jpg',
    'Xenwinx Studio',
    'Mystery',
    'Raine climbs to uncover ancient mountain secrets',
    30,
    13,
    'intermediate',
    '7-10 years',
    5
);

-- Book 6: Desert Tales
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '6',
    'Desert Tales',
    '6.jpg',
    'Xenwinx Studio',
    'Adventure',
    'Daichi navigates the shifting sands',
    22,
    9,
    'beginner',
    '5-8 years',
    6
);

-- Book 7: Hedge's Big Discovery
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '7',
    'Hedge''s Big Discovery',
    '7.jpg',
    'Xenwinx Studio',
    'Learning',
    'A curious hedgehog learns about the forest ecosystem',
    18,
    7,
    'beginner',
    '4-7 years',
    7
);

-- Book 8: Maru Takes Flight
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '8',
    'Maru Takes Flight',
    '8.jpg',
    'Xenwinx Studio',
    'Courage',
    'A flying squirrel overcomes fear of heights',
    20,
    8,
    'beginner',
    '4-7 years',
    8
);

-- Book 9: Strix's Night Watch
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '9',
    'Strix''s Night Watch',
    '9.jpg',
    'Xenwinx Studio',
    'Wisdom',
    'The wise owl protects the forest at night',
    24,
    10,
    'beginner',
    '5-8 years',
    9
);

-- Book 10: Kaito's Ocean Journey
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order, is_featured
) VALUES (
    '10',
    'Kaito''s Ocean Journey',
    '10.jpg',
    'Xenwinx Studio',
    'Exploration',
    'A dolphin explores the vast ocean depths',
    26,
    11,
    'intermediate',
    '6-9 years',
    10,
    TRUE
);

-- Book 11: The Four Habitats
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order
) VALUES (
    '11',
    'The Four Habitats',
    '11.jpg',
    'Xenwinx Studio',
    'Education',
    'Learn about forest, ocean, mountain, and desert habitats',
    32,
    14,
    'intermediate',
    '6-10 years',
    11
);

-- Book 12: Friends Forever
INSERT INTO books (
    id, title, cover_filename, author, category, description,
    page_count, reading_time_minutes, difficulty, age_range, sort_order, is_featured
) VALUES (
    '12',
    'Friends Forever',
    '12.jpg',
    'Xenwinx Studio',
    'Friendship',
    'The power of friendship across all habitats',
    28,
    12,
    'intermediate',
    '5-9 years',
    12,
    TRUE
);

-- ============================================================================
-- TABLE: book_characters
-- Description: Link books to their featured characters
-- ============================================================================

CREATE TABLE IF NOT EXISTS book_characters (
    id SERIAL PRIMARY KEY,
    book_id TEXT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    character_id TEXT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'featured',
    character_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique book-character pairs
    UNIQUE(book_id, character_id)
);

-- Create indexes for lookups
CREATE INDEX idx_book_characters_book_id ON book_characters(book_id);
CREATE INDEX idx_book_characters_character_id ON book_characters(character_id);

-- ============================================================================
-- INSERT: Book-Character Relationships
-- ============================================================================

-- Book 1: Akai's Forest Adventure (Characters: Akai, Quinn, Niko)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('1', '1', 'main', 1),      -- Akai
('1', '2', 'supporting', 2), -- Quinn
('1', '7', 'supporting', 3); -- Niko

-- Book 2: Quinn's Happy Day (Characters: Quinn, Koa, Hedge)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('2', '2', 'main', 1),       -- Quinn
('2', '3', 'supporting', 2), -- Koa
('2', '4', 'supporting', 3); -- Hedge

-- Book 3: The Great Forest Race (Characters: Akai, Quinn, Maru, Niko, Basilisk)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('3', '1', 'main', 1),       -- Akai
('3', '2', 'supporting', 2), -- Quinn
('3', '5', 'supporting', 3), -- Maru
('3', '7', 'supporting', 4), -- Niko
('3', '9', 'supporting', 5); -- Basilisk

-- Book 4: Ocean Dreams (Characters: Raiku, Kaito, Mizuto, Lumi)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('4', '14', 'main', 1),      -- Raiku
('4', '16', 'supporting', 2),-- Kaito
('4', '17', 'supporting', 3),-- Mizuto
('4', '18', 'supporting', 4);-- Lumi

-- Book 5: Mountain Mysteries (Characters: Raine, Amaruq, Nyra, Tatsu)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('5', '24', 'main', 1),      -- Raine
('5', '25', 'supporting', 2),-- Amaruq
('5', '28', 'supporting', 3),-- Nyra
('5', '29', 'supporting', 4);-- Tatsu

-- Book 6: Desert Tales (Characters: Daichi, Blaze, Rajin)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('6', '32', 'main', 1),      -- Daichi
('6', '33', 'supporting', 2),-- Blaze
('6', '34', 'supporting', 3);-- Rajin

-- Book 7: Hedge's Big Discovery (Characters: Hedge, Orin, Strix)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('7', '4', 'main', 1),       -- Hedge
('7', '6', 'supporting', 2), -- Orin
('7', '10', 'supporting', 3);-- Strix

-- Book 8: Maru Takes Flight (Characters: Maru, Aoi)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('8', '5', 'main', 1),       -- Maru
('8', '8', 'supporting', 2); -- Aoi

-- Book 9: Strix's Night Watch (Characters: Strix, Snowflake, Thorne)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('9', '10', 'main', 1),      -- Strix
('9', '11', 'supporting', 2),-- Snowflake
('9', '13', 'supporting', 3);-- Thorne

-- Book 10: Kaito's Ocean Journey (Characters: Kaito, Mizuto, Calyx, Sage)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('10', '16', 'main', 1),     -- Kaito
('10', '17', 'supporting', 2),-- Mizuto
('10', '19', 'supporting', 3),-- Calyx
('10', '20', 'supporting', 4);-- Sage

-- Book 11: The Four Habitats (Characters: Akai, Raiku, Raine, Daichi)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('11', '1', 'main', 1),      -- Akai (Forest)
('11', '14', 'main', 2),     -- Raiku (Ocean)
('11', '24', 'main', 3),     -- Raine (Mountain)
('11', '32', 'main', 4);     -- Daichi (Desert)

-- Book 12: Friends Forever (Characters: Akai, Quinn, Raiku, Kaito, Raine, Daichi)
INSERT INTO book_characters (book_id, character_id, role, character_order) VALUES
('12', '1', 'main', 1),      -- Akai
('12', '2', 'main', 2),      -- Quinn
('12', '14', 'main', 3),     -- Raiku
('12', '16', 'main', 4),     -- Kaito
('12', '24', 'main', 5),     -- Raine
('12', '32', 'main', 6);     -- Daichi

-- ============================================================================
-- VIEWS: Book Statistics and Queries
-- ============================================================================

-- View: Book statistics by category
CREATE OR REPLACE VIEW book_category_stats AS
SELECT 
    category,
    COUNT(*) as total_books,
    AVG(page_count) as avg_pages,
    AVG(reading_time_minutes) as avg_reading_time,
    ARRAY_AGG(title ORDER BY sort_order) as book_titles
FROM books
GROUP BY category
ORDER BY total_books DESC, category;

-- View: Featured books with character count
CREATE OR REPLACE VIEW featured_books AS
SELECT 
    b.id,
    b.title,
    b.category,
    b.description,
    b.page_count,
    b.reading_time_minutes,
    COUNT(bc.character_id) as character_count,
    ARRAY_AGG(c.name ORDER BY bc.character_order) as character_names
FROM books b
LEFT JOIN book_characters bc ON b.id = bc.book_id
LEFT JOIN characters c ON bc.character_id = c.id
WHERE b.is_featured = TRUE
GROUP BY b.id, b.title, b.category, b.description, b.page_count, b.reading_time_minutes
ORDER BY b.sort_order;

-- View: Books with full character details
CREATE OR REPLACE VIEW books_with_characters AS
SELECT 
    b.id,
    b.title,
    b.author,
    b.category,
    b.description,
    b.page_count,
    b.reading_time_minutes,
    b.difficulty,
    b.age_range,
    COUNT(bc.character_id) as character_count,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', c.id,
            'name', c.name,
            'animal_type', c.animal_type,
            'role', bc.role,
            'order', bc.character_order
        ) ORDER BY bc.character_order
    ) as characters
FROM books b
LEFT JOIN book_characters bc ON b.id = bc.book_id
LEFT JOIN characters c ON bc.character_id = c.id
GROUP BY b.id
ORDER BY b.sort_order;

-- ============================================================================
-- FUNCTIONS: Book-related stored procedures
-- ============================================================================

-- Function: Get recommended books based on character
CREATE OR REPLACE FUNCTION get_books_by_character(character_name TEXT)
RETURNS TABLE (
    book_id TEXT,
    book_title TEXT,
    category TEXT,
    role TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.title,
        b.category,
        bc.role
    FROM books b
    JOIN book_characters bc ON b.id = bc.book_id
    JOIN characters c ON bc.character_id = c.id
    WHERE c.name = character_name
    ORDER BY b.sort_order;
END;
$$ LANGUAGE plpgsql;

-- Function: Get book reading statistics
CREATE OR REPLACE FUNCTION get_book_stats()
RETURNS TABLE (
    total_books BIGINT,
    total_pages BIGINT,
    avg_pages NUMERIC,
    total_reading_time BIGINT,
    shortest_book TEXT,
    longest_book TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_books,
        SUM(page_count)::BIGINT as total_pages,
        AVG(page_count) as avg_pages,
        SUM(reading_time_minutes)::BIGINT as total_reading_time,
        (SELECT title FROM books ORDER BY page_count ASC LIMIT 1) as shortest_book,
        (SELECT title FROM books ORDER BY page_count DESC LIMIT 1) as longest_book
    FROM books;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SAMPLE QUERIES
-- ============================================================================

-- Query 1: Get all books with their characters
-- SELECT * FROM books_with_characters;

-- Query 2: Get books by category
-- SELECT title, page_count, reading_time_minutes 
-- FROM books 
-- WHERE category = 'Adventure'
-- ORDER BY sort_order;

-- Query 3: Get featured books
-- SELECT * FROM featured_books;

-- Query 4: Find books featuring a specific character
-- SELECT * FROM get_books_by_character('Akai');

-- Query 5: Get book statistics
-- SELECT * FROM get_book_stats();

-- Query 6: Books by difficulty level
-- SELECT difficulty, COUNT(*) as count, AVG(page_count) as avg_pages
-- FROM books
-- GROUP BY difficulty
-- ORDER BY difficulty;

-- Query 7: Books by reading time
-- SELECT title, reading_time_minutes, page_count
-- FROM books
-- ORDER BY reading_time_minutes DESC;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_characters ENABLE ROW LEVEL SECURITY;

-- Public read access for books
CREATE POLICY "Public read access for books" 
ON books FOR SELECT 
USING (is_published = TRUE);

-- Public read access for book_characters
CREATE POLICY "Public read access for book_characters" 
ON book_characters FOR SELECT 
USING (true);

-- Admin write access (requires authentication)
CREATE POLICY "Admin can manage books" 
ON books FOR ALL 
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- STATISTICS & SUMMARY
-- ============================================================================

-- Total Books: 12
-- Categories: 8 (Adventure, Friendship, Fantasy, Mystery, Learning, Courage, Wisdom, Exploration, Education)
-- Total Pages: 298 pages across all books
-- Total Reading Time: 125 minutes (2 hours 5 minutes)
-- Average Pages: ~25 pages per book
-- Average Reading Time: ~10 minutes per book
-- Featured Books: 4 (Books 1, 3, 10, 12)
-- Difficulty Levels: Beginner (6), Intermediate (6)
-- Age Range: 4-10 years

-- Category Breakdown:
-- - Adventure: 3 books
-- - Friendship: 2 books
-- - Fantasy: 1 book
-- - Mystery: 1 book
-- - Learning: 1 book
-- - Courage: 1 book
-- - Wisdom: 1 book
-- - Exploration: 1 book
-- - Education: 1 book

-- ============================================================================
-- END OF BOOKS SCHEMA
-- ============================================================================
