'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { generateUniqueReferralCode } from '../utils/referralCode';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';

export default function SignUpModal({ isOpen, onClose, onSwitchToSignIn }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [success, setSuccess] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Auto-fill referral code from URL parameter or sessionStorage
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // First check if there's a referral code in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');
      
      if (refCode && !referralCode) {
        const upperRefCode = refCode.toUpperCase();
        setReferralCode(upperRefCode);
        // Store in sessionStorage so it persists even after URL cleanup
        sessionStorage.setItem('pendingReferralCode', upperRefCode);
      } else if (!referralCode) {
        // Check if there's a stored referral code from a previous visit
        const storedRefCode = sessionStorage.getItem('pendingReferralCode');
        if (storedRefCode) {
          setReferralCode(storedRefCode);
        }
      }
    }
  }, [isOpen, referralCode]);

  // Validate referral code exists in database
  const validateReferralCode = async (code) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('referral_code', code.toUpperCase())
        .single();

      return !error && data !== null;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic rate limiting - prevent rapid submissions
    const now = Date.now();
    if (now - lastSubmitTime < 3000) { // 3 second cooldown
      setError('Please wait a moment before trying again');
      return;
    }
    setLastSubmitTime(now);
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation to prevent obvious spam
    if (email.length < 5 || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (username.length < 2) {
      setError('Username must be at least 2 characters');
      setIsLoading(false);
      return;
    }

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

    // CAPTCHA validation
    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification');
      setIsLoading(false);
      return;
    }

    // Verify CAPTCHA with server
    try {
      const captchaResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captchaToken })
      });

      if (!captchaResponse.ok) {
        setError('CAPTCHA verification failed. Please try again.');
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setError('CAPTCHA verification error. Please try again.');
      setIsLoading(false);
      return;
    }

    try {
      // Validate referral code if provided (but don't distribute tokens - backend handles that)
      if (referralCode) {
        setError(''); // Clear any previous errors
        const isValidReferral = await validateReferralCode(referralCode);
        if (!isValidReferral) {
          setError(`Referral code "${referralCode.toUpperCase()}" doesn't exist. Please check the code and try again.`);
          setIsLoading(false);
          return;
        }
      }

      // First create the account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            used_referral_code: referralCode || null,
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // If sign up was successful, immediately sign them in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Account created but failed to sign in. Please try signing in manually.');
        return;
      }

      // Referral code is already saved in user metadata and will be handled by profile.js

      // Success - user is now logged in
      setSuccess('Account created successfully! Redirecting to your profile...');
      
      // Clear form and stored referral code
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      setReferralCode('');
      
      // Clear stored referral code from sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pendingReferralCode');
      }
      
      // Close modal and redirect after a short delay to show success message
      setTimeout(() => {
        onClose();
        router.push('/profile');
      }, 2000);
      
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 min-h-screen overflow-y-auto">
      <div className="bg-black border border-purple-500/30 rounded-2xl p-4 sm:p-8 w-full max-w-md shadow-2xl shadow-purple-500/20 relative my-4 max-h-[90vh] overflow-y-auto">
        {/* Futuristic background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">Create Account</h2>
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
                className="w-20 h-20 object-contain relative z-10"
                priority
              />
            </div>
          </div>

          <p className="text-gray-300 text-center mb-6 sm:mb-8 text-base sm:text-lg font-light tracking-wide">Complete the form below to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-6 py-4 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className={`w-full px-6 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm ${
                  referralCode ? 'border-green-500/50 focus:border-green-400' : 'border-gray-600/50'
                }`}
              />
              {referralCode && (
                <p className="text-green-400 text-xs mt-2 flex items-center font-medium">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Referral code applied! 
                </p>
              )}
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

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400 text-sm font-medium">{success}</span>
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={onSwitchToSignIn}
            className="text-gray-400 hover:text-purple-400 text-sm font-medium transition-colors duration-300"
          >
            Already have an account? <span className="text-purple-400">Sign in here</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
