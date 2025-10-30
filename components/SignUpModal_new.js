'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export default function SignUpModal({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [success, setSuccess] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Validate referral code exists in database
  const validateReferralCode = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('referral_code', code.toUpperCase())
        .single();

      return !error && data !== null;
    } catch (error) {
      console.error('Error validating referral code:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Verify CAPTCHA
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
        const isValidReferral = await validateReferralCode(referralCode);
        if (!isValidReferral) {
          setError('Invalid referral code. Please check and try again.');
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

      // Store referral code in the database immediately after account creation
      if (referralCode && signUpData.user?.id) {
        console.log('Storing referral code in database for user:', signUpData.user.id);
        
        // Store referral relationship in database - backend will handle token rewards
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: signUpData.user.id,
            username: username,
            email: email,
            referred_by: referralCode.toUpperCase(),
            referral_code: null // Will be generated later when they access profile
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('Error creating profile with referral code:', profileError);
        } else {
          console.log('✅ Profile created with referral code:', referralCode);
          console.log('Backend will handle token rewards for referral');
        }
      }

      // Success - user is now logged in
      onClose(); // Close the modal
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      setReferralCode('');
      
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg border border-white/10 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
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
            src="/logo1.png"
            alt="CapturGO Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <p className="text-gray-400 text-center mb-6">Complete the form below to get started</p>

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

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Referral Code (Optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-400 text-sm text-center">
              {success}
            </div>
          )}

          {/* CAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'} // Test key for development
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToSignIn}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Already have an account? Sign in here
          </button>
        </div>
      </div>
    </div>
  );
}
