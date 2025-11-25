'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lastResetTime, setLastResetTime] = useState(0);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    // Rate limiting for password reset - 1 request per 60 seconds
    const now = Date.now();
    const timeSinceLastReset = now - lastResetTime;
    const resetCooldown = 60000; // 60 seconds
    
    if (timeSinceLastReset < resetCooldown) {
      const remainingTime = Math.ceil((resetCooldown - timeSinceLastReset) / 1000);
      setError(`Please wait ${remainingTime} seconds before requesting another password reset`);
      return;
    }
    
    setLastResetTime(now);
    setIsLoading(true);
    setError('');
    setResetMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `https://capturgo.com/api/auth/callback`,
      });

      if (error) {
        setError(error.message);
      } else {
        setResetMessage('Password reset email sent! Check your inbox.');
        setResetEmail('');
        // Switch back to sign in after 3 seconds
        setTimeout(() => {
          setShowForgotPassword(false);
          setResetMessage('');
        }, 3000);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting - progressive delays based on failed attempts
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const requiredDelay = Math.min(3000 + (failedAttempts * 2000), 30000); // 3s base, +2s per failure, max 30s
    
    if (timeSinceLastSubmit < requiredDelay) {
      const remainingTime = Math.ceil((requiredDelay - timeSinceLastSubmit) / 1000);
      setError(`Please wait ${remainingTime} seconds before trying again`);
      return;
    }
    
    setLastSubmitTime(now);
    setIsLoading(true);
    setError('');

    // CAPTCHA temporarily disabled for testing
    // if (!captchaToken) {
    //   setError('Please complete the CAPTCHA verification');
    //   setIsLoading(false);
    //   return;
    // }

    // // Verify CAPTCHA with server
    // try {
    //   const captchaResponse = await fetch('/api/verify-captcha', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ captchaToken })
    //   });

    //   if (!captchaResponse.ok) {
    //     setError('CAPTCHA verification failed. Please try again.');
    //     recaptchaRef.current?.reset();
    //     setCaptchaToken(null);
    //     setIsLoading(false);
    //     return;
    //   }
    // } catch (error) {
    //   setError('CAPTCHA verification error. Please try again.');
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setFailedAttempts(prev => prev + 1);
      } else {
        // Reset failed attempts on successful login
        setFailedAttempts(0);
        onClose();
        router.push('/profile');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setFailedAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 min-h-screen">
      <div className="bg-gray-900 rounded-lg border border-white/10 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Sign In</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/modallogo.png"
            alt="CapturGO Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <p className="text-gray-400 text-center mb-6">
          {showForgotPassword ? 'Reset your password' : 'Welcome back!'}
        </p>

        {showForgotPassword ? (
          // Forgot Password Form
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {resetMessage && (
              <div className="text-green-400 text-sm text-center">
                {resetMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send Reset Email'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setError('');
                setResetMessage('');
                setResetEmail('');
              }}
              className="w-full text-gray-400 hover:text-gray-300 text-sm"
            >
              Back to Sign In
            </button>
          </form>
        ) : (
          // Regular Sign In Form
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* CAPTCHA - Temporarily disabled for testing */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
              theme="dark"
            />
          </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToSignUp}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Don&apos;t have an account? Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}
