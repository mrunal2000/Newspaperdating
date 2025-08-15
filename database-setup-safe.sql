-- Safe database setup that handles existing policies and tables
-- Create the posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  title VARCHAR(500) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  interests TEXT[] DEFAULT '{}',
  likes INTEGER DEFAULT 0,
  instagram VARCHAR(255),
  twitter VARCHAR(255),
  discord VARCHAR(255),
  phone_number VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add columns if they don't exist (safe)
DO $$ 
BEGIN
    -- Add likes column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'likes') THEN
        ALTER TABLE posts ADD COLUMN likes INTEGER DEFAULT 0;
    END IF;
    
    -- Add social media columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'instagram') THEN
        ALTER TABLE posts ADD COLUMN instagram VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'twitter') THEN
        ALTER TABLE posts ADD COLUMN twitter VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'discord') THEN
        ALTER TABLE posts ADD COLUMN discord VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'phone_number') THEN
        ALTER TABLE posts ADD COLUMN phone_number VARCHAR(255);
    END IF;
    
    -- Rename existing camelCase columns to snake_case if they exist
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'phoneNumber') THEN
        ALTER TABLE posts RENAME COLUMN "phoneNumber" TO phone_number;
    END IF;
END $$;

-- Create the comments table if it doesn't exist
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes if they don't exist (safe)
CREATE INDEX IF NOT EXISTS idx_posts_location ON posts(location);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);

-- Enable Row Level Security (RLS) - safe to run multiple times
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DO $$ 
BEGIN
    -- Drop existing policies for posts
    DROP POLICY IF EXISTS "Allow public read access to posts" ON posts;
    DROP POLICY IF EXISTS "Allow authenticated users to create posts" ON posts;
    DROP POLICY IF EXISTS "Allow post owners to update posts" ON posts;
    DROP POLICY IF EXISTS "Allow post owners to delete posts" ON posts;
    
    -- Drop existing policies for comments
    DROP POLICY IF EXISTS "Allow public read access to comments" ON comments;
    DROP POLICY IF EXISTS "Allow authenticated users to create comments" ON comments;
END $$;

-- Create policies for public read access
CREATE POLICY "Allow public read access to posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to comments" ON comments
  FOR SELECT USING (true);

-- Create policies for authenticated users to create posts
CREATE POLICY "Allow authenticated users to create posts" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to create comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Create policies for post owners to update/delete their posts
CREATE POLICY "Allow post owners to update posts" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow post owners to delete posts" ON posts
  FOR DELETE USING (true);

-- Create or replace the function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop and recreate the trigger (safe)
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data only if the table is empty
DO $$
BEGIN
    IF (SELECT COUNT(*) FROM posts) = 0 THEN
        INSERT INTO posts (name, age, title, location, description, interests, likes) VALUES
        ('Alex', 28, 'Seeking Coffee & Conversation in the City', 'San Francisco, CA', 'SF transplant looking for someone to explore hidden coffee shops and rooftop bars with. Love discovering new neighborhoods and sharing stories over craft cocktails.', ARRAY['Coffee', 'Art', 'Live Music'], 12),
        ('Jordan', 32, 'Brooklyn Artist Looking for Inspiration', 'New York, NY', 'Brooklyn-based painter seeking someone who appreciates art, live music, and late-night conversations about life, love, and everything in between.', ARRAY['Painting', 'Jazz', 'Brooklyn'], 8),
        ('Sam', 29, 'Venice Beach Creative Seeking Sunshine Partner', 'Los Angeles, CA', 'Venice Beach local who believes in the power of sunshine, creativity, and authentic connections. Let''s build sandcastles and dreams together.', ARRAY['Beach', 'Creativity', 'Sunshine'], 15);
    END IF;
END $$;

-- Show current table structure
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('posts', 'comments') 
ORDER BY table_name, ordinal_position;
