import { createClient } from '@supabase/supabase-js';
import { RateLimiter } from '../../../lib/security';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create rate limiter instance
const rateLimiter = new RateLimiter();

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 10; // 10 requests per window
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function getRateLimitKey(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(req);
  const rateLimitResult = rateLimiter.check(rateLimitKey, RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW);
  
  if (!rateLimitResult.allowed) {
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      resetTime: rateLimitResult.resetTime
    });
  }

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', RATE_LIMIT_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining);
  res.setHeader('X-RateLimit-Reset', rateLimitResult.resetTime);

  try {
    const { action, data, userId } = req.body;

    if (!action || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (action) {
      case 'generate_referral_code':
        // Handle referral code generation with additional validation
        const { generateUniqueReferralCode } = await import('../../../utils/referralCode');
        const newReferralCode = await generateUniqueReferralCode();
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ referral_code: newReferralCode })
          .eq('id', userId);

        if (updateError) {
          return res.status(500).json({ error: 'Failed to update referral code' });
        }

        return res.status(200).json({ referralCode: newReferralCode });

      case 'update_profile':
        // Handle profile updates with validation
        const allowedFields = ['username', 'bio', 'avatar_url'];
        const updateData = {};
        
        for (const field of allowedFields) {
          if (data[field] !== undefined) {
            updateData[field] = data[field];
          }
        }

        if (Object.keys(updateData).length === 0) {
          return res.status(400).json({ error: 'No valid fields to update' });
        }

        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', userId);

        if (profileUpdateError) {
          return res.status(500).json({ error: 'Failed to update profile' });
        }

        return res.status(200).json({ success: true });

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Profile API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
