import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, type, error, error_description, code } = req.query;

  // Debug logging (remove in production)
  console.log('Auth callback received:', { 
    token: token ? token.substring(0, 20) + '...' : null, 
    type, 
    error, 
    error_description,
    code: code ? code.substring(0, 20) + '...' : null,
    fullQuery: req.query 
  });

  if (error) {
    return res.redirect(`/?error=${error}&description=${error_description}`);
  }

  // Handle password recovery directly
  if (token && type === 'recovery') {
    // For password recovery, we need to redirect with the token in the URL hash
    // This is how Supabase handles password recovery tokens
    const resetUrl = `/reset-password#access_token=${token}&expires_in=3600&refresh_token=${token}&token_type=bearer&type=recovery`;
    
    return res.redirect(resetUrl);
  }

  // Handle regular auth code exchange
  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        return res.redirect(`/?error=token_exchange_failed`);
      }

      // Regular auth flow - redirect to profile
      return res.redirect(`/profile`);
    } catch (error) {
      return res.redirect(`/?error=callback_error`);
    }
  }

  // No valid parameters received
  if (process.env.NODE_ENV === 'development') {
    console.log('No valid auth parameters, redirecting to home');
  }
  
  return res.redirect('/?error=no_auth_params');
}
