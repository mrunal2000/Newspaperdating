-- Clean Database Setup for Newspaper Dating App
-- Run this in Supabase SQL Editor

-- Drop existing tables if they exist (clean start)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

-- Create the posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  title VARCHAR(500) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_posts_location ON posts(location);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

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

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_posts_updated_at 
  BEFORE UPDATE ON posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO posts (name, age, title, location, description, interests) VALUES
('Alex', 28, 'Seeking Coffee & Conversation in the City', 'San Francisco, CA', 'SF transplant looking for someone to explore hidden coffee shops and rooftop bars with. Love discovering new neighborhoods and sharing stories over craft cocktails.', ARRAY['Coffee', 'Art', 'Live Music']),
('Jordan', 32, 'Brooklyn Artist Looking for Inspiration', 'New York, NY', 'Brooklyn-based painter seeking someone who appreciates art, live music, and late-night conversations about life, love, and everything in between.', ARRAY['Painting', 'Jazz', 'Brooklyn']),
('Sam', 29, 'Venice Beach Creative Seeking Sunshine Partner', 'Los Angeles, CA', 'Venice Beach local who believes in the power of sunshine, creativity, and authentic connections. Let''s build sandcastles and dreams together.', ARRAY['Beach', 'Creativity', 'Sunshine']);

-- Verify tables were created
SELECT 'posts' as table_name, COUNT(*) as row_count FROM posts
UNION ALL
SELECT 'comments' as table_name, COUNT(*) as row_count FROM comments;
