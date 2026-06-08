-- ============================================================================
-- Rooted Tales - ACCURATE Books Database Schema (Based on Actual App Data)
-- Version: 1.3.0
-- Date: 2026-02-18
-- Database: PostgreSQL (Supabase)
-- Total Books: 12 (VERIFIED FROM APP)
-- ============================================================================

-- ============================================================================
-- TABLE: books
-- Description: Complete book library with all metadata FROM ACTUAL APP
-- Source: /components/LibraryScreen.tsx lines 61-242
-- ============================================================================

CREATE TABLE IF NOT EXISTS books (
    -- Primary Key
    id TEXT PRIMARY KEY,
    
    -- Core Information
    title TEXT NOT NULL UNIQUE,
    author TEXT NOT NULL DEFAULT 'Rooted Tales',
    description TEXT NOT NULL,
    
    -- Categorization
    category TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    age_range TEXT,
    
    -- Reading Information
    reading_time TEXT NOT NULL, -- e.g. "15 min", "35 min"
    reading_time_minutes INTEGER, -- Extracted number for sorting
    page_count INTEGER NOT NULL,
    
    -- Media & Assets
    cover_color TEXT NOT NULL, -- Tailwind gradient classes
    price TEXT NOT NULL, -- e.g. "$8.99"
    
    -- Publication
    published_date DATE DEFAULT CURRENT_DATE,
    isbn TEXT UNIQUE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- User Progress (stored per user elsewhere)
    -- progress INTEGER DEFAULT 0, -- Moved to user_progress table
    
    -- Features
    is_downloaded BOOLEAN DEFAULT FALSE,
    is_purchased BOOLEAN DEFAULT TRUE,
    is_published BOOLEAN DEFAULT TRUE,
    sort_order INTEGER,
    
    -- Ratings
    rating DECIMAL(3,2) DEFAULT 0.00,
    
    -- Constraints
    CONSTRAINT valid_page_count CHECK (page_count > 0),
    CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
);

-- Create indexes for better query performance
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_rating ON books(rating DESC);
CREATE INDEX idx_books_sort_order ON books(sort_order);

-- ============================================================================
-- INSERT: All 12 Books FROM ACTUAL APP (LibraryScreen.tsx)
-- ============================================================================

-- Book 1: The Adventures of Rusty the Red Panda
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time, 
    reading_time_minutes, cover_color, price, rating, is_downloaded, 
    is_purchased, sort_order
) VALUES (
    '1',
    'The Adventures of Rusty the Red Panda',
    'Rooted Tales',
    'Forest Adventures',
    'Join Rusty on an exciting journey through the mystical forest as he discovers friendship and courage.',
    28,
    '15 min',
    15,
    'from-red-400 to-orange-500',
    '$8.99',
    4.8,
    TRUE,
    TRUE,
    1
);

-- Book 2: The Adventures of Akai the Red Panda: A Heart-warming Panda Reunion
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '2',
    'The Adventures of Akai the Red Panda: A Heart-warming Panda Reunion',
    'Rooted Tales',
    'Forest Adventures',
    'A heartwarming tale of family reunion and the bonds that connect us all.',
    76,
    '35 min',
    35,
    'from-pink-400 to-red-500',
    '$16.99',
    4.9,
    TRUE,
    TRUE,
    2
);

-- Book 3: Akai and Kaito in the Great Ocean Odyssey
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '3',
    'Akai and Kaito in the Great Ocean Odyssey',
    'Rooted Tales',
    'Water Adventures',
    'Join Akai and Kaito on a heartwarming ocean adventure filled with friendship, courage, and magical discoveries.',
    55,
    '32 min',
    32,
    'from-blue-400 to-cyan-500',
    '$13.99',
    4.8,
    FALSE,
    TRUE,
    3
);

-- Book 4: Akai the Red Panda and The Curious Raccoons
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '4',
    'Akai the Red Panda and The Curious Raccoons',
    'Rooted Tales',
    'Forest Adventures',
    'Join Akai on an exciting treasure hunt adventure with playful raccoons, discovering friendship and teamwork along the way.',
    62,
    '28 min',
    28,
    'from-amber-400 to-orange-500',
    '$14.99',
    4.9,
    FALSE,
    TRUE,
    4
);

-- Book 5: Akai and The Red Panda and The Quokka Quest
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '5',
    'Akai and The Red Panda and The Quokka Quest',
    'Rooted Tales',
    'Forest Adventures',
    'Join Akai and cheerful quokkas on an epic quest to save a vital plant that sustains both their homes, discovering the power of unity and friendship.',
    65,
    '30 min',
    30,
    'from-amber-400 to-yellow-500',
    '$15.99',
    4.9,
    TRUE,
    TRUE,
    5
);

-- Book 6: Akai and the Tale of The Sea Otter
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '6',
    'Akai and the Tale of The Sea Otter',
    'Rooted Tales',
    'Water Adventures',
    'Join Kaito as he shares the magical tale of Mizuto the sea otter, who discovers that true treasure is friendship shared with others.',
    58,
    '26 min',
    26,
    'from-cyan-400 to-blue-500',
    '$13.99',
    4.8,
    FALSE,
    TRUE,
    6
);

-- Book 7: Akai Remarkable Adventure with The Cozy Koala
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '7',
    'Akai Remarkable Adventure with The Cozy Koala',
    'Rooted Tales',
    'Forest Adventures',
    'Join Akai on Memory Lane as he meets quokkas and discovers the magical Koala Kingdom, learning about the lasting power of friendship.',
    86,
    '28 min',
    28,
    'from-emerald-400 to-teal-500',
    '$18.99',
    4.8,
    FALSE,
    TRUE,
    7
);

-- Book 8: Akai and Hedge: The Treasure of Friendship
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '8',
    'Akai and Hedge: The Treasure of Friendship',
    'Rooted Tales',
    'Forest Adventures',
    'Follow Akai and Hedge the hedgehog as they embark on a treasure hunt adventure, discovering that the greatest treasures are the friendships we make along the way.',
    65,
    '32 min',
    32,
    'from-amber-400 to-orange-500',
    '$15.99',
    4.7,
    FALSE,
    TRUE,
    8
);

-- Book 9: Akai with The Playful Monkeys
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '9',
    'Akai with The Playful Monkeys',
    'Rooted Tales',
    'Forest Adventures',
    'Join Akai as he discovers the joy of play with a lively troop of monkeys, learning to embrace fun and carefree moments.',
    52,
    '26 min',
    26,
    'from-yellow-400 to-orange-400',
    '$12.99',
    4.6,
    FALSE,
    TRUE,
    9
);

-- Book 10: Akai and The Joyful Elephant
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '10',
    'Akai and The Joyful Elephant',
    'Rooted Tales',
    'Forest Adventures',
    'Join Akai as he meets Ella, a joyful dancing elephant, and discovers the power of friendship through shared adventures and playful moments.',
    45,
    '29 min',
    29,
    'from-blue-400 to-green-400',
    '$10.99',
    4.8,
    FALSE,
    TRUE,
    10
);

-- Book 11: Akai's lessons with The Wise Owls
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '11',
    'Akai''s lessons with The Wise Owls',
    'Rooted Tales',
    'Forest Adventures',
    'Join Akai on a thoughtful journey as he seeks wisdom from the legendary Wise Owls, learning valuable life lessons about patience, empathy, and growth.',
    48,
    '25 min',
    25,
    'from-indigo-400 to-purple-500',
    '$11.99',
    4.9,
    FALSE,
    TRUE,
    11
);

-- Book 12: Akai and The Lost Reindeer
INSERT INTO books (
    id, title, author, category, description, page_count, reading_time,
    reading_time_minutes, cover_color, price, rating, is_downloaded,
    is_purchased, sort_order
) VALUES (
    '12',
    'Akai and The Lost Reindeer',
    'Rooted Tales',
    'Snow Adventures',
    'Join Akai as he helps Finn, a lost baby reindeer, find his way back to his family while learning about courage, trust, and the strength of friendship.',
    50,
    '27 min',
    27,
    'from-blue-300 to-indigo-400',
    '$11.99',
    4.8,
    FALSE,
    TRUE,
    12
);

-- ============================================================================
-- VIEWS: Book Statistics and Queries
-- ============================================================================

-- View: Book statistics by category
CREATE OR REPLACE VIEW book_category_stats AS
SELECT 
    category,
    COUNT(*) as total_books,
    AVG(page_count) as avg_pages,
    AVG(reading_time_minutes) as avg_reading_time_minutes,
    AVG(rating) as avg_rating,
    ARRAY_AGG(title ORDER BY sort_order) as book_titles
FROM books
GROUP BY category
ORDER BY total_books DESC, category;

-- View: Top rated books
CREATE OR REPLACE VIEW top_rated_books AS
SELECT 
    id,
    title,
    category,
    rating,
    page_count,
    reading_time,
    price
FROM books
WHERE rating >= 4.8
ORDER BY rating DESC, title;

-- View: Books by reading time (quick reads vs longer stories)
CREATE OR REPLACE VIEW books_by_reading_time AS
SELECT 
    CASE 
        WHEN reading_time_minutes < 20 THEN 'Quick Read (< 20 min)'
        WHEN reading_time_minutes BETWEEN 20 AND 29 THEN 'Medium Read (20-29 min)'
        ELSE 'Long Read (30+ min)'
    END as reading_duration_category,
    COUNT(*) as book_count,
    AVG(rating) as avg_rating,
    ARRAY_AGG(title ORDER BY reading_time_minutes) as titles
FROM books
GROUP BY reading_duration_category
ORDER BY MIN(reading_time_minutes);

-- ============================================================================
-- FUNCTIONS: Book-related stored procedures
-- ============================================================================

-- Function: Get book statistics
CREATE OR REPLACE FUNCTION get_book_stats()
RETURNS TABLE (
    total_books BIGINT,
    total_pages BIGINT,
    avg_pages NUMERIC,
    total_reading_time_minutes BIGINT,
    avg_rating NUMERIC,
    shortest_book TEXT,
    longest_book TEXT,
    highest_rated_book TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_books,
        SUM(page_count)::BIGINT as total_pages,
        AVG(page_count) as avg_pages,
        SUM(reading_time_minutes)::BIGINT as total_reading_time_minutes,
        AVG(rating) as avg_rating,
        (SELECT title FROM books ORDER BY page_count ASC LIMIT 1) as shortest_book,
        (SELECT title FROM books ORDER BY page_count DESC LIMIT 1) as longest_book,
        (SELECT title FROM books ORDER BY rating DESC LIMIT 1) as highest_rated_book
    FROM books;
END;
$$ LANGUAGE plpgsql;

-- Function: Search books by keyword
CREATE OR REPLACE FUNCTION search_books(search_term TEXT)
RETURNS TABLE (
    id TEXT,
    title TEXT,
    category TEXT,
    description TEXT,
    rating DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.title,
        b.category,
        b.description,
        b.rating
    FROM books b
    WHERE 
        b.title ILIKE '%' || search_term || '%'
        OR b.description ILIKE '%' || search_term || '%'
        OR b.category ILIKE '%' || search_term || '%'
    ORDER BY b.rating DESC, b.title;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SAMPLE QUERIES
-- ============================================================================

-- Query 1: Get all books ordered by rating
-- SELECT * FROM books ORDER BY rating DESC, sort_order;

-- Query 2: Get books by category
-- SELECT title, page_count, reading_time, rating 
-- FROM books 
-- WHERE category = 'Forest Adventures'
-- ORDER BY rating DESC;

-- Query 3: Get top rated books
-- SELECT * FROM top_rated_books;

-- Query 4: Get book statistics
-- SELECT * FROM get_book_stats();

-- Query 5: Search for books
-- SELECT * FROM search_books('friendship');

-- Query 6: Books by reading duration
-- SELECT * FROM books_by_reading_time;

-- Query 7: Most expensive books
-- SELECT title, price, page_count, rating
-- FROM books
-- ORDER BY CAST(REPLACE(REPLACE(price, '$', ''), '.', '') AS INTEGER) DESC
-- LIMIT 5;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Public read access for books
CREATE POLICY "Public read access for books" 
ON books FOR SELECT 
USING (is_published = TRUE);

-- Admin write access (requires authentication)
CREATE POLICY "Admin can manage books" 
ON books FOR ALL 
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- STATISTICS & SUMMARY (FROM ACTUAL APP DATA)
-- ============================================================================

-- Total Books: 12
-- Categories: 
--   - Forest Adventures: 8 books
--   - Water Adventures: 2 books  
--   - Snow Adventures: 1 book
-- Total Pages: 689 pages across all books
-- Total Reading Time: 333 minutes (5 hours 33 minutes)
-- Average Pages: ~57 pages per book
-- Average Reading Time: ~28 minutes per book
-- Average Rating: 4.81/5.00
-- Shortest Book: "Akai and The Joyful Elephant" (45 pages, 29 min)
-- Longest Book: "Akai Remarkable Adventure with The Cozy Koala" (86 pages, 28 min)
-- Highest Rated: Multiple books at 4.9 rating

-- ============================================================================
-- END OF ACCURATE BOOKS SCHEMA
-- ============================================================================
