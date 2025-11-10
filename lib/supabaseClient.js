import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't log the actual missing variables in production
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Missing required Supabase configuration')
  } else {
    throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
}

// Create Supabase client with production-safe options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Disable debug logging in production
    debug: process.env.NODE_ENV !== 'production'
  }
})
