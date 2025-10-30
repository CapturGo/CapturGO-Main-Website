import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthDebug() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Auth Debug</h1>
        
        <form onSubmit={sendPasswordReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter your email"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Sending...' : 'Send Password Reset'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">{message}</p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-400">
          <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}</p>
          <p><strong>Callback URL:</strong> {typeof window !== 'undefined' ? `${window.location.origin}/api/auth/callback` : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}
