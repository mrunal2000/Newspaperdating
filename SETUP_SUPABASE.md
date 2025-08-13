# Setting Up Supabase for Post Persistence

This guide will help you set up Supabase to ensure all posts in your newspaper dating app are permanently saved and synchronized.

## Prerequisites

1. A Supabase account (free tier available)
2. Your newspaper dating app project

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `newspaper-dating-app` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your project dashboard, go to Settings → API
2. Copy the following values:
   - Project URL (e.g., `https://your-project-id.supabase.co`)
   - `anon` public key (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. In your project root, create a `.env` file:
```bash
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace the placeholder values with your actual credentials
3. **Important**: Add `.env` to your `.gitignore` file to keep credentials secure

## Step 4: Set Up the Database

1. In your Supabase dashboard, go to SQL Editor
2. Copy the contents of `database-setup.sql` from this project
3. Paste it into the SQL Editor and click "Run"
4. This will create:
   - `posts` table for storing dating profiles
   - `comments` table for storing comments on posts
   - Proper indexes for performance
   - Row Level Security policies
   - Sample data

## Step 5: Test the Setup

1. Start your development server: `npm start`
2. Open the app in your browser
3. Try creating a new post
4. Check the browser console for any errors
5. Verify the post appears and persists after page refresh

## Step 6: Verify Data Persistence

1. In your Supabase dashboard, go to Table Editor
2. Check the `posts` table - you should see your new post
3. Add a comment to a post
4. Check the `comments` table - you should see the new comment
5. Refresh your app - the data should persist

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Double-check your environment variables
   - Ensure you're using the `anon` key, not the `service_role` key

2. **"Table doesn't exist" error**
   - Make sure you ran the `database-setup.sql` script
   - Check the Table Editor to verify tables were created

3. **Posts not saving**
   - Check browser console for errors
   - Verify your Supabase project is active
   - Check Row Level Security policies

4. **CORS errors**
   - In Supabase dashboard, go to Settings → API
   - Add your localhost URL to the allowed origins

### Fallback to LocalStorage

If Supabase is not configured or fails, the app will automatically fall back to localStorage. This ensures your app continues to work even without a database connection.

## Security Considerations

1. **Row Level Security (RLS)**: Enabled by default to control data access
2. **Public Read Access**: Anyone can read posts and comments
3. **Authenticated Write Access**: Anyone can create posts and comments
4. **API Key Exposure**: The `anon` key is safe to expose in client-side code

## Performance Optimization

1. **Indexes**: Automatically created for common queries
2. **Pagination**: Consider implementing for large datasets
3. **Caching**: Supabase automatically caches frequently accessed data

## Monitoring

1. **Database Usage**: Check your Supabase dashboard for usage metrics
2. **Error Logs**: Monitor browser console for client-side errors
3. **Performance**: Use Supabase's built-in performance monitoring

## Next Steps

Once Supabase is working:
1. Consider adding user authentication
2. Implement real-time updates using Supabase subscriptions
3. Add image upload functionality using Supabase Storage
4. Set up automated backups and monitoring

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
