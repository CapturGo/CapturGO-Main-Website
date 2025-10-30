import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkRecoveryToken = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const queryParams = new URLSearchParams(window.location.search);
      
      const accessToken = hashParams.get('access_token') || queryParams.get('access_token');
      const type = hashParams.get('type') || queryParams.get('type');
      
      if (accessToken && type === 'recovery') {
        
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: accessToken
        });
        
        if (error) {
          setError('Invalid or expired reset link. Please request a new password reset.');
        }
      } else {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;
        
        if (!session) {
          setError('Invalid or expired reset link. Please request a new password reset.');
        }
      }
    };

    checkRecoveryToken();

    const { data } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setError('');
        }
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/profile');
        }, 3000);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Head>
          <title>Password Updated - capturGO</title>
          <meta name="description" content="Your password has been successfully updated" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
            <div className="mb-6">
              <img
                src="/images/modallogo.png"
                alt="CapturGO Logo"
                className="w-20 h-20 object-contain mx-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Password Updated!</h1>
            <p className="text-gray-400 mb-4">
              Your password has been successfully updated. You will be redirected to your profile shortly.
            </p>
            <div className="text-green-400 text-sm">
              Redirecting in 3 seconds...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Reset Password - capturGO</title>
        <meta name="description" content="Reset your capturGO account password" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="mb-6 text-center">
            <img
              src="/images/modallogo.png"
              alt="CapturGO Logo"
              className="w-20 h-20 object-contain mx-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Reset Your Password
          </h1>

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
