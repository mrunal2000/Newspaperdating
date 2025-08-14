// Supabase Configuration
// Replace these with your actual Supabase project credentials
export const SUPABASE_CONFIG = {
  url: process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL',
  anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
};

// Debug logging
console.log('🔍 Supabase Config Debug:', {
  url: SUPABASE_CONFIG.url,
  anonKey: SUPABASE_CONFIG.anonKey ? `${SUPABASE_CONFIG.anonKey.substring(0, 20)}...` : 'undefined',
  envUrl: process.env.REACT_APP_SUPABASE_URL,
  envKey: process.env.REACT_APP_SUPABASE_ANON_KEY ? `${process.env.REACT_APP_SUPABASE_ANON_KEY.substring(0, 20)}...` : 'undefined'
});

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const configured = SUPABASE_CONFIG.url !== 'YOUR_SUPABASE_URL' && 
         SUPABASE_CONFIG.anonKey !== 'YOUR_SUPABASE_ANON_KEY';
  console.log('🔍 Supabase configured:', configured);
  return configured;
};
