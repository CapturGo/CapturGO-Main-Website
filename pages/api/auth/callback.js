import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }


  // Check for hash parameters in the URL - Supabase sends tokens in hash for implicit flow
  // Since we can't access hash on server side, we need to handle this on client side
  // Let's create a client-side redirect page
  const clientRedirectHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Redirecting...</title>
    </head>
    <body>
      <script>
        // Check if we have hash parameters (access_token, etc.)
        if (window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const type = hashParams.get('type');
          const refreshToken = hashParams.get('refresh_token');
          const expiresIn = hashParams.get('expires_in');
          const tokenType = hashParams.get('token_type');
          
          
          if (accessToken && type === 'recovery') {
            // Redirect to reset password page with all the parameters
            const resetUrl = '/reset-password#access_token=' + accessToken + 
                            '&expires_in=' + (expiresIn || '3600') +
                            '&refresh_token=' + (refreshToken || accessToken) +
                            '&token_type=' + (tokenType || 'bearer') +
                            '&type=recovery';
            window.location.replace(resetUrl);
          } else {
            // No valid recovery token, redirect to home with error
            window.location.replace('/?error=invalid_recovery_token');
          }
        } else {
          // No hash parameters, check query parameters for regular auth flow
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get('code');
          const error = urlParams.get('error');
          
          if (error) {
            window.location.replace('/?error=' + error);
          } else if (code) {
            // Handle regular auth code exchange on server side
            fetch('/api/auth/callback?code=' + code)
              .then(() => window.location.replace('/profile'))
              .catch(() => window.location.replace('/?error=callback_error'));
          } else {
            window.location.replace('/?error=no_auth_params');
          }
        }
      </script>
      <p>Redirecting...</p>
    </body>
    </html>
  `;

  // For password recovery (implicit flow), we need client-side handling
  // Check if this might be a recovery flow by looking for common patterns
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';
  
  // If it looks like it might have hash parameters, serve the client-side handler
  if (!req.query.code && !req.query.error) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(clientRedirectHtml);
  }

  // Handle regular server-side auth flows
  const { token, type, error, error_description, code } = req.query;

  if (error) {
    return res.redirect(`/?error=${error}&description=${error_description}`);
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
  
  return res.redirect('/?error=no_auth_params');
}
