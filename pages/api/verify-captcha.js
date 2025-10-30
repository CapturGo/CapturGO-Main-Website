// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

function getRateLimitKey(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
}

function isRateLimited(key) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(key) || [];
  
  // Clean old requests
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return true;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(key, recentRequests);
  
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(req);
  if (isRateLimited(rateLimitKey)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { captchaToken } = req.body;

    if (!captchaToken) {
      return res.status(400).json({ error: 'CAPTCHA token is required' });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey || secretKey === 'your_recaptcha_secret_key_here') {
      // In development, skip CAPTCHA verification
      if (process.env.NODE_ENV === 'development') {
        return res.status(200).json({ success: true });
      }
      
      return res.status(500).json({ error: 'CAPTCHA not configured' });
    }

    // Verify the CAPTCHA token with Google
    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${captchaToken}`,
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: 'CAPTCHA verification failed' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Server error during CAPTCHA verification' });
  }
}
