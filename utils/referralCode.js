import { supabase } from '../lib/supabaseClient';

/**
 * Generate a unique 8-character referral code
 * Uses uppercase letters and numbers, excluding confusing characters (0, O, I, 1)
 */
export function generateReferralCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excludes 0, O, I, 1
  let result = '';
  
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Check if a referral code already exists in the database
 */
export async function isReferralCodeUnique(code) {
  const { data, error } = await supabase
    .from('profiles')
    .select('referral_code')
    .eq('referral_code', code)
    .single();
  
  // If no data found, the code is unique
  return !data && error?.code === 'PGRST116';
}

/**
 * Generate a unique referral code that doesn't exist in the database
 */
export async function generateUniqueReferralCode() {
  let code;
  let isUnique = false;
  
  do {
    code = generateReferralCode();
    isUnique = await isReferralCodeUnique(code);
  } while (!isUnique);
  
  return code;
}
