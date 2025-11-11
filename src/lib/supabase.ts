import { createClient } from '@supabase/supabase-js';

// These should be set as environment variables
// For now, using placeholder values - replace with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key are not set. Please add them to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);





