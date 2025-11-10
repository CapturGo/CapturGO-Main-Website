// Production-safe logging utility
// Prevents sensitive information from being logged in production

const isProduction = process.env.NODE_ENV === 'production';

// Safe logging that filters out sensitive information
const sanitizeData = (data) => {
  if (typeof data === 'string') {
    // Remove potential URLs, tokens, and sensitive patterns
    return data
      .replace(/https?:\/\/[^\s]+/g, '[URL_REDACTED]')
      .replace(/[a-zA-Z0-9]{20,}/g, '[TOKEN_REDACTED]')
      .replace(/supabase/gi, '[DB_REDACTED]');
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized = { ...data };
    
    // Remove sensitive keys
    const sensitiveKeys = ['url', 'token', 'key', 'secret', 'password', 'auth', 'supabase'];
    sensitiveKeys.forEach(key => {
      Object.keys(sanitized).forEach(objKey => {
        if (objKey.toLowerCase().includes(key)) {
          sanitized[objKey] = '[REDACTED]';
        }
      });
    });
    
    return sanitized;
  }
  
  return data;
};

export const logger = {
  log: (...args) => {
    if (!isProduction) {
      console.log(...args.map(sanitizeData));
    }
  },
  
  error: (...args) => {
    if (!isProduction) {
      console.error(...args.map(sanitizeData));
    } else {
      // In production, only log generic error messages
      console.error('An error occurred');
    }
  },
  
  warn: (...args) => {
    if (!isProduction) {
      console.warn(...args.map(sanitizeData));
    }
  },
  
  info: (...args) => {
    if (!isProduction) {
      console.info(...args.map(sanitizeData));
    }
  }
};

export default logger;
