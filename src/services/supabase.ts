import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG, isSupabaseConfigured } from '../config/supabase';

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// Database types
export interface DatabasePost {
  id: string;
  name: string;
  age: number;
  title: string;
  location: string;
  description: string;
  image?: string;
  interests: string[];
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseComment {
  id: string;
  post_id: string;
  text: string;
  author: string;
  created_at: string;
}

// Convert database types to app types
export const convertDatabasePostToProfile = (dbPost: DatabasePost, comments: DatabaseComment[]) => ({
  id: dbPost.id,
  name: dbPost.name,
  age: dbPost.age,
  title: dbPost.title,
  location: dbPost.location,
  description: dbPost.description,
  image: dbPost.image,
  interests: dbPost.interests,
  likes: dbPost.likes || 0,
  createdAt: new Date(dbPost.created_at),
  comments: comments.map(comment => ({
    id: comment.id,
    text: comment.text,
    author: comment.author,
    createdAt: new Date(comment.created_at)
  }))
});

// Convert app types to database types
export const convertProfileToDatabasePost = (profile: any) => ({
  id: profile.id, // Include the ID field
  name: profile.name,
  age: profile.age,
  title: profile.title,
  location: profile.location,
  description: profile.description,
  image: profile.image || null,
  interests: profile.interests || [],
  likes: profile.likes || 0
});

// Check if we should use Supabase or fallback to localStorage
export const shouldUseSupabase = () => {
  return isSupabaseConfigured() && typeof window !== 'undefined';
};
