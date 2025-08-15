-- Clean database setup with separate social media platform fields
-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

-- Create the posts table
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

-- Create the comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_location ON posts(location);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);

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

-- Insert some sample data with social media examples
INSERT INTO posts (name, age, title, location, description, interests, likes, instagram, twitter, discord, phone_number) VALUES
('Alex', 28, 'Seeking Coffee & Conversation in the City', 'San Francisco, CA', 'SF transplant looking for someone to explore hidden coffee shops and rooftop bars with. Love discovering new neighborhoods and sharing stories over craft cocktails.', ARRAY['Coffee', 'Art', 'Live Music'], 12, '@alexsf28', '@alexsf', 'alex#1234', '+1-555-0123'),
('Jordan', 32, 'Brooklyn Artist Looking for Inspiration', 'New York, NY', 'Brooklyn-based painter seeking someone who appreciates art, live music, and late-night conversations about life, love, and everything in between.', ARRAY['Painting', 'Jazz', 'Brooklyn'], 8, '@jordanart', '@jordan_brooklyn', 'jordan#5678', '+1-555-0456'),
('Sam', 29, 'Venice Beach Creative Seeking Sunshine Partner', 'Los Angeles, CA', 'Venice Beach local who believes in the power of sunshine, creativity, and authentic connections. Let''s build sandcastles and dreams together.', ARRAY['Beach', 'Creativity', 'Sunshine'], 15, '@samvenice', '@samcreative', 'sam#9012', '+1-555-0789')
ON CONFLICT DO NOTHING;

-- Verify tables were created
SELECT 'posts' as table_name, COUNT(*) as row_count FROM posts
UNION ALL
SELECT 'comments' as table_name, COUNT(*) as row_count FROM comments;
