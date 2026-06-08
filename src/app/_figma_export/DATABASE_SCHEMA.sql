-- ============================================================================
-- Rooted Tales - Database Schema
-- Version: 1.3.0
-- Date: 2026-02-12
-- Database: PostgreSQL (Supabase)
-- ============================================================================

-- ============================================================================
-- TABLE: characters
-- Description: All character information for the Rooted Tales universe
-- Total Records: 34 characters across 4 habitats
-- ============================================================================

CREATE TABLE IF NOT EXISTS characters (
    -- Primary Key
    id TEXT PRIMARY KEY,
    
    -- Core Information
    name TEXT NOT NULL UNIQUE,
    animal_type TEXT NOT NULL,
    description TEXT NOT NULL,
    
    -- Categorization
    category TEXT NOT NULL CHECK (category IN ('forest', 'ocean', 'mountain', 'desert')),
    habitat_id INTEGER,
    
    -- Media & Assets
    image_filename TEXT NOT NULL,
    image_url TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Additional Fields (Optional)
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER,
    
    -- Indexes for performance
    CONSTRAINT valid_image_filename CHECK (image_filename ~ '^[0-9]+\.png$')
);

-- Create indexes for better query performance
CREATE INDEX idx_characters_category ON characters(category);
CREATE INDEX idx_characters_animal_type ON characters(animal_type);
CREATE INDEX idx_characters_is_featured ON characters(is_featured);

-- ============================================================================
-- INSERT: All 34 Characters
-- ============================================================================

-- Forest Characters (13 total)
INSERT INTO characters (id, name, animal_type, description, category, image_filename, sort_order) VALUES
('1', 'Akai', 'Red Panda', 'The brave leader of the forest', 'forest', '1.png', 1),
('2', 'Quinn', 'Quokka', 'The happy helper', 'forest', '2.png', 2),
('3', 'Koa', 'Koala', 'The sleepy climber', 'forest', '3.png', 3),
('4', 'Hedge', 'Hedgehog', 'The spiky explorer', 'forest', '4.png', 4),
('5', 'Maru', 'Flying Squirrel', 'The gliding acrobat', 'forest', '5.png', 5),
('6', 'Orin', 'Otter', 'The playful swimmer', 'forest', '6.png', 6),
('7', 'Niko', 'Red Fox', 'The clever trickster', 'forest', '7.png', 7),
('8', 'Aoi', 'Blue Jay', 'The singing messenger', 'forest', '8.png', 8),
('9', 'Basilisk', 'Basilisk Lizard', 'The water walker', 'forest', '9.png', 9),
('10', 'Strix', 'Owl', 'The wise night watcher', 'forest', '10.png', 10),
('11', 'Snowflake', 'Arctic Fox', 'The winter wanderer', 'forest', '11.png', 11),
('12', 'Calico', 'Cat', 'The curious companion', 'forest', '12.png', 12),
('13', 'Thorne', 'Porcupine', 'The protective guardian', 'forest', '13.png', 13);

-- Ocean Characters (10 total)
INSERT INTO characters (id, name, animal_type, description, category, image_filename, sort_order) VALUES
('14', 'Raiku', 'Sea Otter', 'The ocean explorer', 'ocean', '14.png', 14),
('15', 'Ellie', 'Elephant Seal', 'The gentle giant', 'ocean', '15.png', 15),
('16', 'Kaito', 'Dolphin', 'The playful jumper', 'ocean', '16.png', 16),
('17', 'Mizuto', 'Sea Turtle', 'The ancient voyager', 'ocean', '17.png', 17),
('18', 'Lumi', 'Jellyfish', 'The glowing drifter', 'ocean', '18.png', 18),
('19', 'Calyx', 'Seahorse', 'The graceful dancer', 'ocean', '19.png', 19),
('20', 'Sage', 'Octopus', 'The intelligent shape-shifter', 'ocean', '20.png', 20),
('21', 'Kai', 'Manta Ray', 'The elegant glider', 'ocean', '21.png', 21),
('22', 'Willow', 'Sea Dragon', 'The mystical guardian', 'ocean', '22.png', 22),
('23', 'Nami', 'Starfish', 'The colorful wanderer', 'ocean', '23.png', 23);

-- Mountain Characters (8 total)
INSERT INTO characters (id, name, animal_type, description, category, image_filename, sort_order) VALUES
('24', 'Raine', 'Snow Leopard', 'The mountain climber', 'mountain', '24.png', 24),
('25', 'Amaruq', 'Gray Wolf', 'The pack leader', 'mountain', '25.png', 25),
('26', 'Isen', 'Mountain Goat', 'The sure-footed climber', 'mountain', '26.png', 26),
('27', 'Kazan', 'Yak', 'The strong carrier', 'mountain', '27.png', 27),
('28', 'Nyra', 'Eagle', 'The soaring hunter', 'mountain', '28.png', 28),
('29', 'Tatsu', 'Dragon', 'The mythical protector', 'mountain', '29.png', 29),
('30', 'Frost', 'Polar Bear', 'The ice wanderer', 'mountain', '30.png', 30),
('31', 'Arctic', 'Arctic Hare', 'The swift runner', 'mountain', '31.png', 31);

-- Desert Characters (3 total)
INSERT INTO characters (id, name, animal_type, description, category, image_filename, sort_order) VALUES
('32', 'Daichi', 'Fennec Fox', 'The desert scout', 'desert', '32.png', 32),
('33', 'Blaze', 'Phoenix', 'The fire bird', 'desert', '33.png', 33),
('34', 'Rajin', 'Camel', 'The desert traveler', 'desert', '34.png', 34);

-- ============================================================================
-- TABLE: books
-- Description: Book library with metadata and character associations
-- ============================================================================

CREATE TABLE IF NOT EXISTS books (
    -- Primary Key
    id TEXT PRIMARY KEY,
    
    -- Core Information
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    
    -- Categorization
    category TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    age_range TEXT,
    
    -- Reading Information
    reading_time_minutes INTEGER,
    page_count INTEGER,
    word_count INTEGER,
    
    -- Media & Assets
    cover_filename TEXT NOT NULL,
    cover_url TEXT,
    
    -- Publication
    published_date DATE,
    isbn TEXT UNIQUE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Features
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER
);

-- Create indexes
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_books_difficulty ON books(difficulty);
CREATE INDEX idx_books_is_featured ON books(is_featured);

-- ============================================================================
-- TABLE: book_characters
-- Description: Many-to-many relationship between books and characters
-- ============================================================================

CREATE TABLE IF NOT EXISTS book_characters (
    id SERIAL PRIMARY KEY,
    book_id TEXT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    character_id TEXT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    role TEXT, -- Main character, supporting, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique book-character pairs
    UNIQUE(book_id, character_id)
);

-- Create indexes for lookups
CREATE INDEX idx_book_characters_book_id ON book_characters(book_id);
CREATE INDEX idx_book_characters_character_id ON book_characters(character_id);

-- ============================================================================
-- TABLE: habitats
-- Description: Habitat/category information
-- ============================================================================

CREATE TABLE IF NOT EXISTS habitats (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    
    -- Visual Theme
    primary_color TEXT,
    secondary_color TEXT,
    gradient_colors TEXT[], -- Array of hex colors
    
    -- Character Count
    character_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert habitat data
INSERT INTO habitats (name, slug, description, primary_color, secondary_color, character_count) VALUES
('Mystical Forest', 'forest', 'A lush green forest filled with wonder', '#10b981', '#059669', 13),
('Ocean Depths', 'ocean', 'Deep blue waters teeming with life', '#0ea5e9', '#0284c7', 10),
('Mountain Peaks', 'mountain', 'Snowy peaks and rugged terrain', '#8b5cf6', '#7c3aed', 8),
('Desert Sands', 'desert', 'Golden dunes under the blazing sun', '#f59e0b', '#d97706', 3);

-- ============================================================================
-- TABLE: user_progress
-- Description: Track user reading progress and achievements
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    book_id TEXT REFERENCES books(id) ON DELETE CASCADE,
    
    -- Progress Tracking
    current_page INTEGER DEFAULT 0,
    total_pages INTEGER,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    
    -- Status
    status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
    
    -- Timestamps
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one progress record per user per book
    UNIQUE(user_id, book_id)
);

-- Create indexes
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_book_id ON user_progress(book_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);

-- ============================================================================
-- TABLE: user_achievements
-- Description: User badges and achievements
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    
    -- Achievement Information
    achievement_type TEXT NOT NULL, -- 'forest', 'ocean', 'sunset', 'starry'
    achievement_name TEXT NOT NULL,
    achievement_level INTEGER NOT NULL, -- 1-5 (bronze to master)
    
    -- Points
    points_earned INTEGER DEFAULT 0,
    
    -- Timestamp
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique achievement per user
    UNIQUE(user_id, achievement_type, achievement_level)
);

-- Create indexes
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_type ON user_achievements(achievement_type);

-- ============================================================================
-- TABLE: game_scores
-- Description: Mini game scores and statistics
-- ============================================================================

CREATE TABLE IF NOT EXISTS game_scores (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    
    -- Game Information
    game_type TEXT NOT NULL CHECK (game_type IN ('maze', 'trivia', 'word', 'memory')),
    level INTEGER NOT NULL,
    
    -- Score Information
    score INTEGER DEFAULT 0,
    time_seconds INTEGER,
    attempts INTEGER DEFAULT 1,
    
    -- Status
    completed BOOLEAN DEFAULT FALSE,
    
    -- Timestamp
    played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_game_scores_user_id ON game_scores(user_id);
CREATE INDEX idx_game_scores_game_type ON game_scores(game_type);
CREATE INDEX idx_game_scores_level ON game_scores(level);

-- ============================================================================
-- VIEWS: Useful queries
-- ============================================================================

-- View: Character count by category
CREATE OR REPLACE VIEW character_stats AS
SELECT 
    category,
    COUNT(*) as total_characters,
    ARRAY_AGG(name ORDER BY sort_order) as character_names
FROM characters
GROUP BY category
ORDER BY category;

-- View: Most popular characters (by book appearances)
CREATE OR REPLACE VIEW popular_characters AS
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

-- ============================================================================
-- FUNCTIONS: Useful stored procedures
-- ============================================================================

-- Function: Update character count in habitats
CREATE OR REPLACE FUNCTION update_habitat_character_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE habitats
    SET character_count = (
        SELECT COUNT(*) 
        FROM characters 
        WHERE category = habitats.slug
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update habitat character count when characters change
CREATE TRIGGER trigger_update_habitat_count
AFTER INSERT OR UPDATE OR DELETE ON characters
FOR EACH STATEMENT
EXECUTE FUNCTION update_habitat_character_count();

-- Function: Calculate reading progress percentage
CREATE OR REPLACE FUNCTION update_progress_percentage()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.total_pages > 0 THEN
        NEW.progress_percentage = (NEW.current_page::DECIMAL / NEW.total_pages::DECIMAL) * 100;
    END IF;
    
    -- Update status based on progress
    IF NEW.current_page = 0 THEN
        NEW.status = 'not_started';
    ELSIF NEW.current_page >= NEW.total_pages THEN
        NEW.status = 'completed';
        NEW.completed_at = NOW();
    ELSE
        NEW.status = 'in_progress';
    END IF;
    
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update progress percentage
CREATE TRIGGER trigger_update_progress
BEFORE INSERT OR UPDATE ON user_progress
FOR EACH ROW
EXECUTE FUNCTION update_progress_percentage();

-- ============================================================================
-- SAMPLE QUERIES
-- ============================================================================

-- Query 1: Get all forest characters
-- SELECT * FROM characters WHERE category = 'forest' ORDER BY sort_order;

-- Query 2: Get character with books
-- SELECT c.*, ARRAY_AGG(b.title) as books
-- FROM characters c
-- LEFT JOIN book_characters bc ON c.id = bc.character_id
-- LEFT JOIN books b ON bc.book_id = b.id
-- WHERE c.id = '1'
-- GROUP BY c.id;

-- Query 3: Get user's reading progress
-- SELECT b.title, up.progress_percentage, up.status, up.last_read_at
-- FROM user_progress up
-- JOIN books b ON up.book_id = b.id
-- WHERE up.user_id = 'user123'
-- ORDER BY up.last_read_at DESC;

-- Query 4: Get top game scores by game type
-- SELECT game_type, level, MAX(score) as high_score, MIN(time_seconds) as best_time
-- FROM game_scores
-- WHERE user_id = 'user123' AND completed = TRUE
-- GROUP BY game_type, level
-- ORDER BY game_type, level;

-- Query 5: Get all achievements for a user
-- SELECT achievement_type, achievement_name, achievement_level, points_earned, earned_at
-- FROM user_achievements
-- WHERE user_id = 'user123'
-- ORDER BY earned_at DESC;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - For Supabase
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE habitats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Public read access for characters, books, habitats
CREATE POLICY "Public read access for characters" ON characters FOR SELECT USING (true);
CREATE POLICY "Public read access for books" ON books FOR SELECT USING (true);
CREATE POLICY "Public read access for habitats" ON habitats FOR SELECT USING (true);
CREATE POLICY "Public read access for book_characters" ON book_characters FOR SELECT USING (true);

-- User-specific access for progress and achievements
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view own scores" ON game_scores FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own scores" ON game_scores FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

-- Summary Statistics
-- Total Characters: 34
--   - Forest: 13
--   - Ocean: 10
--   - Mountain: 8
--   - Desert: 3
-- Total Habitats: 4
-- Database: PostgreSQL (Supabase)
-- Version: 1.3.0
-- Last Updated: 2026-02-12
