# 🚨 URGENT: Fix Supabase Connection for Social Media Fields

## The Problem
Your social media fields are not being saved to Supabase because:
1. **Supabase is not configured** - using placeholder credentials
2. **Database schema mismatch** - column naming convention issue
3. **No database connection** - app falls back to localStorage

## Step 1: Set Up Supabase Project

### 1.1 Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"

### 1.2 Create New Project
- **Name**: `newspaper-dating-app`
- **Database Password**: Create a strong password
- **Region**: Choose closest to you
- Click "Create new project"
- Wait for setup to complete (2-3 minutes)

### 1.3 Get Your Credentials
1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJ...` (starts with eyJ)

## Step 2: Create Environment File

### 2.1 Create .env File
In your project root, create a file named `.env` (exactly this name):

```bash
# Create the file
touch .env
```

### 2.2 Add Your Credentials
Open the `.env` file and add:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace the placeholder values with your actual credentials!**

## Step 3: Set Up Database Schema

### 3.1 Open SQL Editor
1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**

### 3.2 Run Database Setup
Copy and paste the contents of `database-setup.sql` from this project, then click **Run**.

### 3.3 Run Migration (if needed)
If you have an existing database, also run `database-migration.sql` to fix column naming.

## Step 4: Test the Connection

### 4.1 Restart Development Server
```bash
# Stop any running servers
pkill -f "react-scripts"

# Start fresh
npm start
```

### 4.2 Check Browser Console
1. Open your app in the browser
2. Open Developer Tools (F12)
3. Look for these messages:
   - ✅ "Supabase configured: true"
   - ✅ "Database is healthy, tables exist"

### 4.3 Test Social Media Fields
1. Create a new post with Instagram, Twitter, Discord, or phone number
2. Check if the data appears in Supabase dashboard
3. Refresh the page to verify persistence

## Step 5: Verify Database

### 5.1 Check Tables
In Supabase dashboard → **Table Editor**:
- `posts` table should exist
- `comments` table should exist

### 5.2 Check Columns
The `posts` table should have these columns:
- `instagram` (VARCHAR)
- `twitter` (VARCHAR) 
- `discord` (VARCHAR)
- `phone_number` (VARCHAR) ← Note: snake_case

## Troubleshooting

### ❌ "Supabase configured: false"
- Check your `.env` file exists
- Verify credentials are correct
- Restart the development server

### ❌ "Database is not healthy"
- Run the database setup script
- Check if tables exist in Table Editor

### ❌ "Table doesn't exist"
- Run `database-setup.sql` in SQL Editor
- Check for any SQL errors

### ❌ Social media fields still not saving
- Check browser console for specific errors
- Verify column names in database match the schema
- Run the migration script if needed

## Expected Result

After completing these steps:
1. ✅ Social media fields will be **saved to Supabase**
2. ✅ Data will **persist across page refreshes**
3. ✅ Social media icons will **display correctly**
4. ✅ No more **silent data dropping**

## Quick Test

1. Create a post with Instagram: `@testuser`
2. Check Supabase dashboard → Table Editor → posts
3. You should see the Instagram value in the `instagram` column
4. Refresh your app - the data should still be there

## Need Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your Supabase project is active
3. Make sure you're using the `anon` key, not `service_role`
4. Check that the database tables were created successfully

The social media fields will work once Supabase is properly connected!
