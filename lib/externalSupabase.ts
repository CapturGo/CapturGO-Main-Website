import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

// Create a custom client for the external database
export const externalSupabase = createClient(
  process.env.NEXT_PUBLIC_EXTERNAL_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_EXTERNAL_SUPABASE_ANON_KEY!
);

export interface LeaderboardProfile {
  username: string;
  token_balance: number;
}

export function calculateReward(position: number): number {
  if (position === 1) return 1000;
  if (position >= 2 && position <= 5) return 400;
  if (position >= 6 && position <= 20) return 100;
  if (position >= 21 && position <= 50) return 25;
  return 0;
}

export async function fetchLeaderboard(): Promise<LeaderboardProfile[]> {
  try {
    // Get high token users (>40k) separately since they seem to be filtered in general queries
    const { data: highTokenUsers, error: highTokenError } = await supabase
      .from('profiles')
      .select('username, token_balance')
      .gt('token_balance', 40000);
    
    // Get regular users (<=40k)
    const { data: regularUsers, error: regularError } = await supabase
      .from('profiles')
      .select('username, token_balance')
      .lte('token_balance', 40000);
    
    if (highTokenError || regularError) {
      throw new Error(`Database error: ${highTokenError?.message || regularError?.message}`);
    }
    
    // Combine both datasets
    const data = [...(highTokenUsers || []), ...(regularUsers || [])];

    if (!data || data.length === 0) {
      return [];
    }

    // Convert token_balance to numbers and sort numerically
    const profilesWithNumericBalance = data.map(profile => ({
      ...profile,
      token_balance: Number(profile.token_balance) || 0
    }));

    // Sort by token_balance in descending order (highest first) and take top 50
    const sortedProfiles = profilesWithNumericBalance
      .sort((a, b) => b.token_balance - a.token_balance)
      .slice(0, 50);
    
    return sortedProfiles;
  } catch (error) {
    throw error;
  }
}
