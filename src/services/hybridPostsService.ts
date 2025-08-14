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
    console.log('🔍 createPost called with profile:', profile);
    console.log('🔍 shouldUseSupabase():', shouldUseSupabase());
    
    try {
      if (shouldUseSupabase()) {
        console.log('🔍 Using Supabase for post creation');
        // Generate a proper UUID for Supabase
        const newId = crypto.randomUUID();
        const profileWithId = { ...profile, id: newId, createdAt: new Date(), likes: 0 };
        const newPost = await PostsService.createPost(profileWithId);
        console.log('🔍 Post created successfully in Supabase:', newPost);
        return newPost;
      } else {
        // Fallback to localStorage if Supabase is not configured
        console.warn('🔍 Supabase not configured, using localStorage fallback');
        const newId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newPost: Profile = {
          ...profile,
          id: newId,
          createdAt: new Date(),
          likes: 0
        };
        this.saveProfilesToLocalStorage([...this.getPostsFromLocalStorage(), newPost]);
        console.log('🔍 Post created successfully in localStorage:', newPost);
        return newPost;
      }
    } catch (error) {
      console.error('🔍 Error in createPost:', error);
      // Fallback to localStorage on error
      console.warn('🔍 Supabase failed, falling back to localStorage');
      const newId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newPost: Profile = {
        ...profile,
        id: newId,
        createdAt: new Date(),
        likes: 0
      };
      this.saveProfilesToLocalStorage([...this.getPostsFromLocalStorage(), newPost]);
      console.log('🔍 Post created successfully in localStorage fallback:', newPost);
      return newPost;
    }
  }

  // Add a comment to a post - Force Supabase usage for cross-device sync
  static async addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    try {
      if (shouldUseSupabase()) {
        const newComment = await PostsService.addComment(postId, comment);
        return newComment;
      } else {
        // Fallback to localStorage if Supabase is not configured
        console.warn('Supabase not configured, using localStorage fallback');
        const newComment: Comment = {
          ...comment,
          id: Date.now().toString(),
          createdAt: new Date()
        };
        // Update the post in localStorage with the new comment
        const profiles = this.getPostsFromLocalStorage();
        const profileIndex = profiles.findIndex(p => p.id === postId);
        if (profileIndex >= 0) {
          profiles[profileIndex].comments.push(newComment);
          this.saveProfilesToLocalStorage(profiles);
        }
        return newComment;
      }
    } catch (error) {
      console.error('Failed to add comment in Supabase:', error);
      // Fallback to localStorage on error
      console.warn('Supabase failed, falling back to localStorage');
      const newComment: Comment = {
        ...comment,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      // Update the post in localStorage with the new comment
      const profiles = this.getPostsFromLocalStorage();
      const profileIndex = profiles.findIndex(p => p.id === postId);
      if (profileIndex >= 0) {
        profiles[profileIndex].comments.push(newComment);
        this.saveProfilesToLocalStorage(profiles);
      }
      return newComment;
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
          likes: profile.likes || 0, // Ensure likes field exists
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
      localStorage.setItem('newspaperDatingVersion', '2.4'); // Updated version for likes field
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
