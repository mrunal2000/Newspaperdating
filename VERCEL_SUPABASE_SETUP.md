# Setting Up Supabase in Vercel for Cross-Device Sync

To enable real-time cross-device synchronization where posts from your phone appear instantly on your desktop, you need to add your Supabase credentials to Vercel.

## Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project (or create one if you haven't)
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

## Step 2: Add Environment Variables to Vercel

### Option A: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Select your newspaper dating app project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
Name: REACT_APP_SUPABASE_URL
Value: https://your-project-id.supabase.co
Environment: Production, Preview, Development

Name: REACT_APP_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: Production, Preview, Development
```

5. Click **Save**
6. Redeploy your app (Vercel will automatically redeploy)

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY

# Redeploy
vercel --prod
```

## Step 3: Verify the Setup

After adding the environment variables and redeploying:

1. **Check the console**: Open your deployed app and check the browser console
2. **Look for these messages**:
   - ✅ `Supabase configured - Real-time sync enabled`
   - ✅ `Real-time subscriptions established`
3. **Test cross-device sync**:
   - Add a post from your phone
   - Refresh your desktop browser
   - The post should appear instantly (or within 30 seconds)

## What This Enables

✅ **Real-time cross-device synchronization**
✅ **Posts from phone appear on desktop instantly**
✅ **Anyone opening the app anywhere sees all posts**
✅ **No more localStorage-only fallback**
✅ **Automatic background syncing every 30 seconds**

## Troubleshooting

### "Supabase not configured" error
- Double-check your environment variable names (must start with `REACT_APP_`)
- Ensure you've redeployed after adding the variables
- Check that the values are correct (no extra spaces)

### "Invalid API key" error
- Make sure you're using the `anon` key, not the `service_role` key
- Verify the project URL is correct

### Posts still not syncing
- Check browser console for errors
- Ensure your Supabase project is active
- Verify the database tables exist (run the SQL from `database-setup.sql`)

## Next Steps

Once this is working:
1. **Real-time updates**: Posts will appear instantly across all devices
2. **Global access**: Anyone can see all posts from anywhere
3. **Reliable persistence**: All data is stored in Supabase, not just locally
4. **Scalability**: Your app can handle many users and posts

## Security Note

The `anon` key is safe to expose in client-side code. It only allows public read/write access to your posts and comments tables, which is exactly what you want for a public dating app.
