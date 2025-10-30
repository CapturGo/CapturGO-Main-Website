/**
 * Security utilities for input validation and sanitization
 */

// Validate UUID format
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// Validate referral code format (alphanumeric, 6-12 characters)
export function isValidReferralCode(code: string): boolean {
  const codeRegex = /^[A-Z0-9]{6,12}$/;
  return codeRegex.test(code);
}

// Sanitize string input
export function sanitizeString(input: string, maxLength: number = 255): string {
  return input
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, maxLength);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Rate limiting helper
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export class RateLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>();

  check(key: string, maxRequests: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const userLimit = this.requests.get(key);

    if (!userLimit || now >= userLimit.resetTime) {
      // Reset or create new window
      this.requests.set(key, { count: 1, resetTime: now + windowMs });
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: now + windowMs
      };
    }

    if (userLimit.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: userLimit.resetTime
      };
    }

    userLimit.count++;
    return {
      allowed: true,
      remaining: maxRequests - userLimit.count,
      resetTime: userLimit.resetTime
    };
  }

  // Clean up expired entries (call periodically)
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.requests.forEach((value, key) => {
      if (now >= value.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.requests.delete(key));
  }
}

// Environment variable validation
export function validateEnvironment(): void {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  for (const envVar of required) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  // Validate URL format
  try {
    new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
  } catch {
    throw new Error('Invalid SUPABASE_URL format');
  }
}
