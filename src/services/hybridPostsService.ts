import { PostsService } from './postsService';
import { shouldUseSupabase } from './supabase';
import { Profile, Comment } from '../types';

export class HybridPostsService {
  // Check database health
  static async checkDatabaseHealth(): Promise<{ healthy: boolean; error?: string; tables?: string[] }> {
    try {
      if (shouldUseSupabase()) {
        return await PostsService.checkDatabaseHealth();
      } else {
        return { healthy: false, error: 'Supabase not configured' };
      }
    } catch (error) {
      console.error('Database health check failed:', error);
      return { healthy: false, error: `Health check failed: ${error}` };
    }
  }

  // Get all posts - try Supabase first, fallback to localStorage
  static async getAllPosts(): Promise<Profile[]> {
    try {
      if (shouldUseSupabase()) {
        return await PostsService.getAllPosts();
      } else {
        return this.getPostsFromLocalStorage();
      }
    } catch (error) {
      console.warn('Supabase failed, falling back to localStorage:', error);
      return this.getPostsFromLocalStorage();
    }
  }

  // Get posts by city
  static async getPostsByCity(city: string): Promise<Profile[]> {
    try {
      if (shouldUseSupabase()) {
        return await PostsService.getPostsByCity(city);
      } else {
        const allPosts = this.getPostsFromLocalStorage();
        return allPosts.filter(post => 
          post.location.startsWith(city + ',') || 
          post.location === city
        );
      }
    } catch (error) {
      console.warn('Supabase failed, falling back to localStorage:', error);
      const allPosts = this.getPostsFromLocalStorage();
      return allPosts.filter(post => 
        post.location.startsWith(city + ',') || 
        post.location === city
      );
    }
  }

  // Get a single post by ID
  static async getPostById(postId: string): Promise<Profile | null> {
    try {
      if (shouldUseSupabase()) {
        return await PostsService.getPostById(postId);
      } else {
        const allPosts = this.getPostsFromLocalStorage();
        return allPosts.find(post => post.id === postId) || null;
      }
    } catch (error) {
      console.error('Failed to get post by ID:', error);
      return null;
    }
  }

  // Get a single comment by ID
  static async getCommentById(commentId: string): Promise<Comment | null> {
    try {
      if (shouldUseSupabase()) {
        return await PostsService.getCommentById(commentId);
      } else {
        const allPosts = this.getPostsFromLocalStorage();
        for (const post of allPosts) {
          const comment = post.comments.find(c => c.id === commentId);
          if (comment) return comment;
        }
        return null;
      }
    } catch (error) {
      console.error('Failed to get comment by ID:', error);
      return null;
    }
  }

  // Create a new post - Force Supabase usage for cross-device sync
  static async createPost(profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> {
    try {
      if (shouldUseSupabase()) {
        const newPost = await PostsService.createPost(profile);
        return newPost;
      } else {
        // If Supabase is not configured, throw error instead of falling back to localStorage
        throw new Error('Supabase is not configured. Please set up environment variables for cross-device sync.');
      }
    } catch (error) {
      console.error('Failed to create post in Supabase:', error);
      throw error; // Re-throw to let the UI handle the error
    }
  }

  // Add a comment to a post - Force Supabase usage for cross-device sync
  static async addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    try {
      if (shouldUseSupabase()) {
        const newComment = await PostsService.addComment(postId, comment);
        return newComment;
      } else {
        // If Supabase is not configured, throw error instead of falling back to localStorage
        throw new Error('Supabase is not configured. Please set up environment variables for cross-device sync.');
      }
    } catch (error) {
      console.error('Failed to add comment in Supabase:', error);
      throw error; // Re-throw to let the UI handle the error
    }
  }

  // Delete a post
  static async deletePost(postId: string): Promise<void> {
    try {
      if (shouldUseSupabase()) {
        await PostsService.deletePost(postId);
        // Also remove from localStorage
        this.deletePostFromLocalStorage(postId);
      } else {
        this.deletePostFromLocalStorage(postId);
      }
    } catch (error) {
      console.warn('Supabase failed, falling back to localStorage:', error);
      this.deletePostFromLocalStorage(postId);
    }
  }

  // Update a post
  static async updatePost(postId: string, updates: Partial<Profile>): Promise<Profile> {
    try {
      if (shouldUseSupabase()) {
        const updatedPost = await PostsService.updatePost(postId, updates);
        // Also update localStorage
        this.updatePostInLocalStorage(postId, updatedPost);
        return updatedPost;
      } else {
        return this.updatePostInLocalStorage(postId, updates);
      }
    } catch (error) {
      console.warn('Supabase failed, falling back to localStorage:', error);
      return this.updatePostInLocalStorage(postId, updates);
    }
  }

  // Seed initial data
  static async seedInitialData(profiles: Profile[]): Promise<void> {
    try {
      if (shouldUseSupabase()) {
        await PostsService.seedInitialData(profiles);
        // Also save to localStorage as backup
        this.saveProfilesToLocalStorage(profiles);
      } else {
        this.saveProfilesToLocalStorage(profiles);
      }
    } catch (error) {
      console.warn('Supabase failed, falling back to localStorage:', error);
      this.saveProfilesToLocalStorage(profiles);
    }
  }

  // LocalStorage fallback methods
  private static getPostsFromLocalStorage(): Profile[] {
    try {
      const stored = localStorage.getItem('newspaperDatingProfiles');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((profile: any) => ({
          ...profile,
          createdAt: new Date(profile.createdAt),
          comments: profile.comments.map((comment: any) => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
        }));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return [];
  }

  private static saveProfilesToLocalStorage(profiles: Profile[]): void {
    try {
      localStorage.setItem('newspaperDatingProfiles', JSON.stringify(profiles));
      localStorage.setItem('newspaperDatingVersion', '2.0');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }





  private static deletePostFromLocalStorage(postId: string): void {
    try {
      const profiles = this.getPostsFromLocalStorage();
      const filteredProfiles = profiles.filter(p => p.id !== postId);
      this.saveProfilesToLocalStorage(filteredProfiles);
    } catch (error) {
      console.error('Error deleting post from localStorage:', error);
    }
  }

  private static updatePostInLocalStorage(postId: string, updates: Partial<Profile>): Profile {
    const profiles = this.getPostsFromLocalStorage();
    const profileIndex = profiles.findIndex(p => p.id === postId);
    if (profileIndex >= 0) {
      profiles[profileIndex] = { ...profiles[profileIndex], ...updates };
      this.saveProfilesToLocalStorage(profiles);
      return profiles[profileIndex];
    }
    throw new Error('Post not found');
  }
}
