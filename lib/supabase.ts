import { createClient } from '@supabase/supabase-js';
import { UserProfile, Entry } from './types';

// Ensure environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Type-safe environment variables
const SUPABASE_URL: string = supabaseUrl;
const SUPABASE_KEY: string = supabaseKey;

// Helper to generate auth headers using Supabase's built-in auth
function getAuthHeaders(privyUserId: string | null): Record<string, string> {
  if (!privyUserId) return {};
  
  // Ensure we have the URL-encoded Privy ID to match database format
  const encodedId = encodeId(privyUserId);

  // Use Supabase's built-in auth mechanism
  return {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Prefer': 'return=minimal',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Info': 'privy-website',
    'X-Client-User-Id': encodedId
  };
}

// Custom fetch interceptor
const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  try {
    const response = await fetch(input, init);
    return response;
  } catch (error) {
    throw error;
  }
};

// Create a Supabase client factory that accepts a Privy user ID
export function createSupabaseClient(privyUserId: string | null = null) {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
      schema: 'public'
    },
    auth: {
      // Don't use Supabase auth - we're using Privy
      persistSession: false,
      autoRefreshToken: false
    },
    global: {
      headers: {
        'apikey': SUPABASE_KEY,
        'Accept': '*/*',  // Accept any content type
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        // Pass Privy user ID as Authorization header for RLS policies
        ...getAuthHeaders(privyUserId)
      },
      fetch: customFetch
    }
  });
}

// Default client for unauthenticated requests
export const supabase = createSupabaseClient();

// Helper function to safely encode IDs for URLs
function encodeId(id: string): string {
  // For Privy IDs, we need to ensure they match the database format
  try {
    // Try to decode first in case it's already encoded
    const decodedId = decodeURIComponent(id);
    // Now encode everything to match database format
    return encodeURIComponent(decodedId);
  } catch {
    // If decoding fails, assume it's not encoded
    return encodeURIComponent(id);
  }
}

export async function createOrUpdateUserProfile(userId: string, email: string, username: string, avatarUrl?: string, country?: string) {
  
  try {
    // Build update object with only provided fields
    const updateData: any = {
      id: encodeId(userId),
      email,
      username
    };

    // Only include optional fields if they are explicitly provided
    if (avatarUrl !== undefined) {
      updateData.profile_picture_url = avatarUrl;
    }
    if (country !== undefined) {
      updateData.country = country;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(updateData, {
        onConflict: 'id'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getUserProfile(userId: string) {
  const encodedId = encodeId(userId);

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', encodedId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data as UserProfile;
  } catch (err) {
    throw err;
  }
}

export async function hasExistingEntry(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('entries')
    .select('id')
    .eq('user_id', encodeId(userId))
    .single();

  if (error && error.code === 'PGRST116') {
    // No entry found
    return false;
  }

  return true;
}

export async function getUserEntry(userId: string): Promise<Entry | null> {
  const encodedId = encodeId(userId);
  try {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', encodedId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data as Entry;
  } catch (err) {
    throw err;
  }
}

export async function getEntries(page = 1, limit = 10) {
  try {
    const start = (page - 1) * limit;
    const end = page * limit - 1;

    const { data, error, status } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data as Entry[];
  } catch (error) {
    return [];
  }
}

export async function updateUserProfile(userId: string, updates: { username?: string; bio?: string | null; email: string }) {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      id: encodeId(userId),
      ...updates
    })
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
}

export async function createEntry(userId: string, imageUrl: string, description?: string) {
  // Check for existing entry first
  const hasEntry = await hasExistingEntry(userId);
  if (hasEntry) {
    throw new Error('User already has an entry');
  }

  const { data, error } = await supabase
    .from('entries')
    .insert({
      user_id: encodeId(userId),
      image_url: imageUrl,
      description: description || null,
      votes_count: 0
    })
    .select()
    .single();

  if (error) throw error;
  return data as Entry;
}

export async function deleteEntry(userId: string, entryId: string) {
  const { error } = await supabase
    .from('entries')
    .delete()
    .match({ id: entryId, user_id: encodeId(userId) });

  if (error) throw error;
}

export async function hasVoted(userId: string, entryId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('votes')
    .select('id')
    .eq('user_id', encodeId(userId))
    .eq('entry_id', entryId)
    .single();

  if (error && error.code === 'PGRST116') return false;
  if (error) throw error;
  return true;
}

export async function voteForEntry(userId: string, entryId: string) {
  // Check if user has already voted
  const hasVotedAlready = await hasVoted(userId, entryId);
  if (hasVotedAlready) {
    throw new Error('Already voted for this entry');
  }

  // Start a transaction
  const { error } = await supabase.rpc('vote_for_entry', {
    p_user_id: encodeId(userId),
    p_entry_id: entryId
  });

  if (error) throw error;
}

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (error && error.code === 'PGRST116') {
      // No user found with this username, so it's available
      return true;
    }

    if (error) {
      throw error;
    }

    // If we found a user, the username is not available
    return !data;
  } catch (error: any) {
    throw error;
  }
}

export async function getLeaderboard(page = 1, perPage = 15) {
  const offset = (page - 1) * perPage;

  try {
    // Get total count first
    const { count: total } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    // Use the stored procedure for paginated data
    const { data, error } = await supabase
      .rpc('get_user_leaderboard', {
        page_offset: offset,
        page_limit: perPage
      });

    if (error) throw error;

    return {
      data: data || [],
      total: total || 0
    };
  } catch (error) {
    throw error;
  }
}
