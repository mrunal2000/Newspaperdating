import { supabase, convertDatabasePostToProfile, convertProfileToDatabasePost, DatabaseComment } from './supabase';
import { Profile, Comment } from '../types';

export class PostsService {
  // Check database health and table existence
  static async checkDatabaseHealth(): Promise<{ healthy: boolean; error?: string; tables?: string[] }> {
    try {
      console.log('🔍 Checking database health...');
      
      // Try to read from posts table
      const { error: postsError } = await supabase
        .from('posts')
        .select('id')
        .limit(1);
      
      if (postsError) {
        console.error('❌ Posts table error:', postsError);
        return { healthy: false, error: `Posts table error: ${postsError.message}` };
      }
      
      // Try to read from comments table
      const { error: commentsError } = await supabase
        .from('comments')
        .select('id')
        .limit(1);
      
      if (commentsError) {
        console.error('❌ Comments table error:', commentsError);
        return { healthy: false, error: `Comments table error: ${commentsError.message}` };
      }
      
      console.log('✅ Database is healthy, tables exist');
      return { healthy: true, tables: ['posts', 'comments'] };
    } catch (error) {
      console.error('❌ Database health check failed:', error);
      return { healthy: false, error: `Health check failed: ${error}` };
    }
  }

  // Get all posts with their comments
  static async getAllPosts(): Promise<Profile[]> {
    try {
      // Get all posts
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (!posts) return [];

      // Get all comments for all posts
      const { data: comments, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Group comments by post_id
      const commentsByPostId = (comments || []).reduce((acc, comment) => {
        if (!acc[comment.post_id]) {
          acc[comment.post_id] = [];
        }
        acc[comment.post_id].push(comment);
        return acc;
      }, {} as Record<string, DatabaseComment[]>);

      // Convert database posts to app profiles
      return posts.map(post => 
        convertDatabasePostToProfile(post, commentsByPostId[post.id] || [])
      );
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Get posts by city
  static async getPostsByCity(city: string): Promise<Profile[]> {
    try {
      const allPosts = await this.getAllPosts();
      return allPosts.filter(post => 
        post.location.startsWith(city + ',') || 
        post.location === city
      );
    } catch (error) {
      console.error('Error fetching posts by city:', error);
      throw error;
    }
  }

  // Get a single post by ID
  static async getPostById(postId: string): Promise<Profile | null> {
    try {
      const { data: post, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (postError) throw postError;

      if (!post) return null;

      // Get comments for this post
      const { data: comments, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Convert database post to app profile
      return convertDatabasePostToProfile(post, comments || []);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return null;
    }
  }

  // Get a single comment by ID
  static async getCommentById(commentId: string): Promise<Comment | null> {
    try {
      const { data: comment, error } = await supabase
        .from('comments')
        .select('*')
        .eq('id', commentId)
        .single();

      if (error) throw error;

      if (!comment) return null;

      return {
        id: comment.id,
        text: comment.text,
        author: comment.author,
        createdAt: new Date(comment.created_at)
      };
    } catch (error) {
      console.error('Error fetching comment by ID:', error);
      return null;
    }
  }

  // Create a new post
  static async createPost(profile: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> {
    try {
      const postData = convertProfileToDatabasePost(profile);
      console.log('🔄 Attempting to create post in Supabase:', postData);
      
      const { data: newPost, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase insert error:', error);
        throw error;
      }

      console.log('✅ Post created successfully in Supabase:', newPost);
      
      // Convert back to Profile type
      return convertDatabasePostToProfile(newPost, []);
    } catch (error) {
      console.error('❌ Error creating post:', error);
      throw error;
    }
  }

  // Add a comment to a post
  static async addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    try {
      const { data: newComment, error } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          text: comment.text,
          author: comment.author
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        id: newComment.id,
        text: newComment.text,
        author: newComment.author,
        createdAt: new Date(newComment.created_at)
      };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Delete a post
  static async deletePost(postId: string): Promise<void> {
    try {
      // First delete all comments for this post
      const { error: commentsError } = await supabase
        .from('comments')
        .delete()
        .eq('post_id', postId);

      if (commentsError) throw commentsError;

      // Then delete the post
      const { error: postError } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (postError) throw postError;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Update a post
  static async updatePost(postId: string, updates: Partial<Profile>): Promise<Profile> {
    try {
      const updateData = convertProfileToDatabasePost(updates);
      
      const { data: updatedPost, error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      // Get comments for this post
      const { data: comments, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      return convertDatabasePostToProfile(updatedPost, comments || []);
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Seed initial data (for development/testing)
  static async seedInitialData(profiles: Profile[]): Promise<void> {
    try {
      // Clear existing data
      await supabase.from('comments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      // Insert new profiles
      for (const profile of profiles) {
        await this.createPost(profile);
      }
    } catch (error) {
      console.error('Error seeding initial data:', error);
      throw error;
    }
  }
}
