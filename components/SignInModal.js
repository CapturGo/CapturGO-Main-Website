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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 min-h-screen overflow-y-auto">
      <div className="bg-black border border-purple-500/30 rounded-2xl p-4 sm:p-8 w-full max-w-md shadow-2xl shadow-purple-500/20 relative my-4 max-h-[90vh] overflow-y-auto">
        {/* Futuristic background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-purple-400 transition-all duration-300 p-2 rounded-full hover:bg-purple-500/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo with futuristic glow */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
              <Image
                src="/images/modallogo.png"
                alt="CapturGO Logo"
                width={80}
                height={80}
                className="w-20 h-20 object-contain relative z-10 glow"
                priority
              />
            </div>
          </div>

          <p className="text-gray-300 text-center mb-6 sm:mb-8 text-base sm:text-lg font-light tracking-wide">
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
                className="w-full px-6 py-4 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
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
              className="w-full bg-gradient-to-r from-white to-purple-600 hover:from-gray-100 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-black hover:text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/25"
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
              className="w-full text-gray-400 hover:text-purple-400 text-sm font-medium transition-colors duration-300"
            >
              ← Back to Sign In
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
                className="w-full px-6 py-4 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-400 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* CAPTCHA */}
            <div className="flex justify-start mb-4 overflow-visible">
              <div className="w-full">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken(null)}
                  theme="dark"
                  size="normal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-white to-purple-600 hover:from-gray-100 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-black hover:text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/25"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-gray-400 hover:text-purple-400 text-sm font-medium transition-colors duration-300"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        )}

          <div className="mt-8 text-center">
            <button
              onClick={onSwitchToSignUp}
              className="text-gray-400 hover:text-purple-400 text-sm font-medium transition-colors duration-300"
            >
              Don't have an account? <span className="text-purple-400">Sign up here</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
