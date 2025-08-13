// Supabase Configuration
// Replace these with your actual Supabase project credentials
export const SUPABASE_CONFIG = {
  url: process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL',
  anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' && 
         SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY';
};
