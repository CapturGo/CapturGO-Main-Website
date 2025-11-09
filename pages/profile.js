import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { generateUniqueReferralCode } from '../utils/referralCode';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [referralStats, setReferralStats] = useState({
    total_referrals: 0,
    successful_referrals: 0,
    pending_referrals: 0,
    tokens_earned: 0
  });
  const [referredUsers, setReferredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        loadProfile(user);
      } else {
        setIsLoading(false);
        router.push('/'); // Redirect to home if not authenticated
      }
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/');
      } else if (session?.user) {
        setUser(session.user);
        loadProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const loadReferralData = async (userProfile) => {
    if (!user || !userProfile?.referral_code) return;

    try {
      // Get users who used this user's referral code
      const { data: referredUsersData, error: referredError } = await supabase
        .from('profiles')
        .select('id, username, updated_at')
        .eq('referred_by', userProfile.referral_code);

      if (!referredError && referredUsersData) {
        const referredUsers = referredUsersData.map(user => ({
          id: user.id,
          username: user.username,
          created_at: user.updated_at,
          status: 'successful'
        }));

        setReferredUsers(referredUsers);
        
        // Calculate stats
        const totalReferrals = referredUsers.length;
        const successfulReferrals = referredUsers.filter(u => u.status === 'successful').length;
        const pendingReferrals = referredUsers.filter(u => u.status === 'pending').length;
        const tokensEarned = successfulReferrals * 25; // 25 tokens per successful referral

        setReferralStats({
          total_referrals: totalReferrals,
          successful_referrals: successfulReferrals,
          pending_referrals: pendingReferrals,
          tokens_earned: tokensEarned
        });
      }
    } catch (err) {
      // Error loading referral data
    }
  };

  const loadProfile = async (currentUser) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setError('');

    try {
      // First, try to get existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('username, token_balance, referral_code')
        .eq('id', currentUser.id)
        .single();

      if (existingProfile) {
        // If profile exists but no referral code, generate one
        let referralCode = existingProfile.referral_code;
        if (!referralCode) {
          referralCode = await generateUniqueReferralCode();
          await supabase
            .from('profiles')
            .update({ referral_code: referralCode })
            .eq('id', currentUser.id);
        }

        const profileData = {
          id: currentUser.id,
          username: existingProfile.username || currentUser.email?.split('@')[0] || 'User',
          token_balance: existingProfile.token_balance || 0,
          referral_code: referralCode,
          email: currentUser.email || '',
        };
        setProfile(profileData);
        
        // Load referral data after profile is set
        setTimeout(() => {
          loadReferralData(profileData);
        }, 100);
      } else {
        // If no profile exists, create one
        const username = currentUser.email?.split('@')[0] || 'User';
        const referralCode = await generateUniqueReferralCode();

        // Get the referral code that was used during sign-up from user metadata
        const referredBy = currentUser.user_metadata?.used_referral_code || null;

        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: currentUser.id,
            username,
            email: currentUser.email,
            token_balance: 0,
            referral_code: referralCode,
            referred_by: referredBy,
          })
          .select('username, token_balance, referral_code')
          .single();

        if (createError) {
          throw createError;
        }

        const profileData = {
          id: currentUser.id,
          username: newProfile.username,
          token_balance: newProfile.token_balance || 0,
          referral_code: newProfile.referral_code,
          email: currentUser.email || '',
        };
        setProfile(profileData);
        
        // Load referral data after profile is set
        setTimeout(() => {
          loadReferralData(profileData);
        }, 100);
      }
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    await loadProfile(user);
    setIsSyncing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const copyReferralCode = async () => {
    if (profile?.referral_code) {
      try {
        await navigator.clipboard.writeText(profile.referral_code);
        setShowCopyToast(true);
        setTimeout(() => {
          setShowCopyToast(false);
        }, 2000);
      } catch (err) {
        // Failed to copy referral code
      }
    }
  };

  const shareReferralLink = async () => {
    if (profile?.referral_code) {
      const referralLink = `${window.location.origin}?ref=${profile.referral_code}`;
      
      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Join CapturGO with my referral code!',
            text: 'Turn your movement into rewards with CapturGO. Use my referral code to get started with bonus tokens!',
            url: referralLink
          });
        } catch (err) {
          // User cancelled share or error occurred, fallback to copy
          await copyReferralLinkToClipboard(referralLink);
        }
      } else {
        // Fallback to copying link
        await copyReferralLinkToClipboard(referralLink);
      }
    }
  };

  const copyReferralLinkToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setShowShareToast(true);
      setTimeout(() => {
        setShowShareToast(false);
      }, 3000);
    } catch (err) {
      // Failed to copy referral link
    }
  };

  // Show loading while auth is being determined
  if (isLoading && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24 px-4 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl mb-4">Authentication Required</h2>
          <p className="text-white/70">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24 px-4 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl mb-4 text-red-400">Error</h2>
          <p className="text-white/70 mb-6">{error}</p>
          <button 
            onClick={() => loadProfile(user)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile - capturGO</title>
        <meta name="description" content="Your capturGO profile, tokens, and referral dashboard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          {/* Captur Tokens Section */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Captur Tokens</h2>
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-white text-sm transition-colors"
              >
                {isSyncing ? 'Syncing...' : 'Sync'}
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <img
                src="/images/modallogo.png"
                alt="CapturGO Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <div className="text-3xl font-bold text-white">
                  {profile?.token_balance?.toLocaleString() || '0'}
                </div>
              </div>
            </div>
          </div>

          {/* Download Apps Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* iOS Download Box */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-4 text-center">
              <div className="mb-2">
                <svg className="w-8 h-8 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Download iOS App</h3>
              <a 
                href="https://testflight.apple.com/join/nCcrMvFA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-xs transition-colors"
              >
                App Store
              </a>
            </div>

            {/* Android Coming Soon Box */}
            <div className="bg-white/5 rounded-lg border border-white/10 p-4 text-center">
              <div className="mb-2">
                <svg className="w-8 h-8 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-400 mb-2">Android Coming Soon</h3>
              <div className="px-3 py-1.5 bg-gray-600 rounded-lg text-gray-300 text-xs cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </div>

          {/* Referral Program Section */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Referral Program</h3>
                <p className="text-white/70 text-sm">Share your code and earn tokens</p>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-white/70 text-sm mb-2">Your Referral Code</p>
              <div className="flex items-center justify-between mb-3">
                <code className="text-white font-mono text-lg tracking-wider">
                  {profile?.referral_code || 'Loading...'}
                </code>
                <button
                  onClick={copyReferralCode}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                >
                  Copy
                </button>
              </div>
              
              {/* Share Button */}
              <div className="pt-3 border-t border-gray-700">
                <button
                  onClick={shareReferralLink}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share Referral Link</span>
                </button>
              </div>
            </div>
          </div>

          {/* Referral Dashboard */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6">Referral Dashboard</h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-white">{referralStats.total_referrals}</div>
                <div className="text-sm text-gray-400">Total Referrals</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-white">{referralStats.successful_referrals}</div>
                <div className="text-sm text-gray-400">Successful</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-white">{referralStats.pending_referrals}</div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div className="text-2xl font-bold text-white">{referralStats.tokens_earned}</div>
                <div className="text-sm text-gray-400">Tokens Earned</div>
              </div>
            </div>

            {/* Referred Users */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-white mb-3">Referred Users</h4>
              <div className="flex items-center space-x-2 mb-4">
                <p className="text-sm text-gray-400">{referredUsers.length} users joined with your code</p>
                <div className="group relative">
                  <svg 
                    className="w-4 h-4 text-gray-500 hover:text-gray-300 cursor-help transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Click sync if you believe this is not up to date
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              </div>
              
              {referredUsers.length > 0 ? (
                <div className="space-y-2">
                  {referredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{user.username}</div>
                          <div className="text-gray-400 text-xs">
                            Joined {new Date(user.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'successful' 
                          ? 'bg-green-600/20 text-green-400' 
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {user.status === 'successful' ? '✓ Active' : '⏳ Pending'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h5 className="text-white font-medium mb-2">No referrals yet</h5>
                  <p className="text-gray-400 text-sm">Share your referral code with friends to start earning rewards!</p>
                </div>
              )}
            </div>

            {/* How Referrals Work */}
            <div>
              <h4 className="text-md font-semibold text-white mb-4">How Referrals Work</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-sm">Share Your Code</h5>
                    <p className="text-gray-400 text-sm">Share your unique referral code with friends and family</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-sm">Friends Join</h5>
                    <p className="text-gray-400 text-sm">Referrer gets +25 for sign-up and +25 more once the referee completes their first hexagon</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-sm">Earn Rewards</h5>
                    <p className="text-gray-400 text-sm">Referee also gets +25 automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white/70 text-sm">Username</p>
                <p className="text-white">{profile?.username}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Email</p>
                <p className="text-white">{profile?.email}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pb-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Copy Toast Notification */}
        {showCopyToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Referral code copied!</span>
            </div>
          </div>
        )}

        {/* Share Toast Notification */}
        {showShareToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out">
            <div className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="font-medium">Referral link copied to clipboard!</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
