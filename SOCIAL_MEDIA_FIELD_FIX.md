# Social Media Field Fix

## Issue Identified

The social media fields (Instagram, Twitter, Discord, Phone Number) were not being saved to Supabase due to a **column naming convention mismatch** between the frontend and database.

### Root Cause

1. **Frontend TypeScript interface** uses camelCase: `phoneNumber`, `instagram`, `twitter`, `discord`
2. **Database schema** was defined with camelCase: `phoneNumber`, `instagram`, `twitter`, `discord`
3. **PostgreSQL automatically converts** unquoted camelCase column names to lowercase: `phonenumber`, `instagram`, `twitter`, `discord`
4. **Supabase queries** were looking for `phoneNumber` but the actual column was `phonenumber`

### What Was Happening

- Form data was correctly collected and sent to Supabase
- Supabase was receiving the data but couldn't find the `phoneNumber` column
- The data was being silently dropped or causing errors
- Only basic fields (name, age, title, etc.) were being saved

## Solution Applied

### 1. Updated Database Schema

Changed column names to use PostgreSQL snake_case convention:

```sql
-- Before (camelCase - problematic)
phoneNumber VARCHAR(255)

-- After (snake_case - PostgreSQL standard)
phone_number VARCHAR(255)
```

### 2. Updated Frontend Code

Modified the Supabase service to map between frontend camelCase and database snake_case:

```typescript
// Database interface
export interface DatabasePost {
  phone_number?: string;  // snake_case for database
}

// Conversion function
export const convertDatabasePostToProfile = (dbPost: DatabasePost) => ({
  phoneNumber: dbPost.phone_number,  // Map to frontend camelCase
});

export const convertProfileToDatabasePost = (profile: any) => ({
  phone_number: profile.phoneNumber || null,  // Map from frontend to database
});
```

### 3. Migration Script

Created `database-migration.sql` to rename existing columns in production databases.

## Files Modified

1. **`database-setup.sql`** - Updated schema to use snake_case
2. **`database-setup-clean.sql`** - Updated clean setup to use snake_case
3. **`src/services/supabase.ts`** - Updated conversion functions
4. **`database-migration.sql`** - Created migration script for existing databases

## How to Apply the Fix

### For New Databases

Use the updated `database-setup.sql` or `database-setup-clean.sql` files.

### For Existing Databases

1. Run the migration script in your Supabase SQL editor:
   ```sql
   -- Run database-migration.sql
   ```

2. Or manually rename the column:
   ```sql
   ALTER TABLE posts RENAME COLUMN "phoneNumber" TO phone_number;
   ```

## Verification

After applying the fix, you should see:

1. **Social media fields are saved** when creating new posts
2. **Social media fields are displayed** in existing posts
3. **No console errors** related to column mismatches
4. **Data persists** across page refreshes

## Testing

1. Create a new post with social media handles
2. Check the browser console for any errors
3. Verify the data appears in Supabase dashboard
4. Refresh the page to ensure data persistence

## Why This Happened

PostgreSQL has strict naming conventions:
- **Unquoted identifiers** are automatically converted to lowercase
- **Quoted identifiers** (with double quotes) preserve case
- **Best practice** is to use snake_case for database columns
- **Frontend** can continue using camelCase with proper mapping

This is a common issue when working with ORMs and databases that have different naming conventions.
