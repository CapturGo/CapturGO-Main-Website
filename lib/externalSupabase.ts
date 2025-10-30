import { createClient } from '@supabase/supabase-js';

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
    // Get all profiles to ensure we get the true top 50 after numeric sorting
    const { data, error } = await externalSupabase
      .from('profiles')
      .select('username, token_balance')
      .not('username', 'eq', 'Admin')
      .not('username', 'eq', 'Test')
      .not('username', 'eq', 'b');

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

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
