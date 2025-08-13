import { PostsService } from './postsService';
import { shouldUseSupabase } from './supabase';
import { Profile, Comment } from '../types';

export class HybridPostsService {
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

  // Create a new post
  static async createPost(profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> {
    try {
      if (shouldUseSupabase()) {
        const newPost = await PostsService.createPost(profile);
        // Also save to localStorage as backup
        this.savePostToLocalStorage(newPost);
        return newPost;
      } else {
        return this.createPostInLocalStorage(profile);
      }
    } catch (error) {
      console.warn('Supabase failed, falling back to localStorage:', error);
      return this.createPostInLocalStorage(profile);
    }
  }

  // Add a comment to a post
  static async addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    try {
      if (shouldUseSupabase()) {
        const newComment = await PostsService.addComment(postId, comment);
        // Also save to localStorage as backup
        this.addCommentToLocalStorage(postId, newComment);
        return newComment;
      } else {
        return this.addCommentToLocalStorage(postId, comment);
      }
    } catch (error) {
      console.warn('Supabase failed, falling back to localStorage:', error);
      return this.addCommentToLocalStorage(postId, comment);
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

  private static savePostToLocalStorage(post: Profile): void {
    try {
      const profiles = this.getPostsFromLocalStorage();
      const existingIndex = profiles.findIndex(p => p.id === post.id);
      if (existingIndex >= 0) {
        profiles[existingIndex] = post;
      } else {
        profiles.push(post);
      }
      this.saveProfilesToLocalStorage(profiles);
    } catch (error) {
      console.error('Error saving post to localStorage:', error);
    }
  }

  private static createPostInLocalStorage(profile: Omit<Profile, 'id' | 'createdAt'>): Profile {
    const newPost: Profile = {
      ...profile,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date()
    };
    
    this.savePostToLocalStorage(newPost);
    return newPost;
  }

  private static addCommentToLocalStorage(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    const profiles = this.getPostsFromLocalStorage();
    const profileIndex = profiles.findIndex(p => p.id === postId);
    if (profileIndex >= 0) {
      profiles[profileIndex].comments.push(newComment);
      this.saveProfilesToLocalStorage(profiles);
    }
    
    return newComment;
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
