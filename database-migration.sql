-- Migration script to fix social media column naming
-- Run this script on your existing Supabase database

-- Rename phoneNumber column to phone_number if it exists
DO $$ 
BEGIN
    -- Check if phoneNumber column exists and rename it
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'phoneNumber') THEN
        ALTER TABLE posts RENAME COLUMN "phoneNumber" TO phone_number;
        RAISE NOTICE 'Renamed phoneNumber column to phone_number';
    ELSE
        RAISE NOTICE 'phoneNumber column does not exist, no rename needed';
    END IF;
END $$;

-- Verify the column names
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'posts' 
AND column_name IN ('instagram', 'twitter', 'discord', 'phone_number')
ORDER BY column_name;
