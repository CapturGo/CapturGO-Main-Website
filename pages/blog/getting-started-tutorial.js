import Head from 'next/head';
import Link from 'next/link';

export default function GettingStartedTutorial() {
  return (
    <div className="bg-gradient-to-br from-black via-purple-900/20 to-black">
        <Head>
          <title>Turn Your Movement Into Rewards: How CapturGO is Redefining Mobility - CapturGO Blog</title>
          <meta name="description" content="Learn how CapturGO turns your daily movement into rewards while keeping your data private and secure. Get started in just a few minutes." />
          <meta name="keywords" content="CapturGO tutorial, DePIN, mobility rewards, decentralized maps, location data" />
          
          {/* Open Graph */}
          <meta property="og:title" content="Turn Your Movement Into Rewards: How CapturGO is Redefining Mobility" />
          <meta property="og:description" content="Learn how CapturGO turns your daily movement into rewards while keeping your data private and secure." />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="capturGO" />
          <meta property="og:image" content="/images/id1.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Getting Started with CapturGO: Complete Tutorial" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Turn Your Movement Into Rewards: How CapturGO is Redefining Mobility" />
          <meta name="twitter:description" content="Learn how CapturGO turns your daily movement into rewards while keeping your data private and secure." />
          <meta name="twitter:image" content="/images/id1.png" />
          <meta name="twitter:image:alt" content="Getting Started with CapturGO: Complete Tutorial" />
        </Head>

        {/* Header */}
        <div className="pt-8 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button and Meta */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/blog" className="group flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 text-gray-300 hover:text-white transition-all duration-200">
                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
              <div className="text-gray-400 text-sm font-medium">
                4 NOVEMBER 2025 / TUTORIALS
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-8 leading-tight text-center max-w-4xl mx-auto">
              Turn Your Movement Into Rewards: How CapturGO is Redefining Mobility
            </h1>

            {/* Featured Image */}
            <div className="mb-12">
              <div className="relative">
                <img 
                  src="/images/id1.png?v=1" 
                  alt="CapturGO Tutorial - Turn Your Movement Into Rewards"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  onError={(e) => {
                    // Show fallback gradient placeholder if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className="hidden w-full h-64 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-purple-300 font-medium">Tutorial Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg prose-invert max-w-none">
              
              {/* Introduction */}
              <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                <p>
                  Every day, millions of people move through cities — driving to work, walking to class, exploring new places.
                  What most don't realize is that every movement produces data — data that powers maps, AI models, and location-based services used by companies across the world.
                </p>
                
                <p>
                  <strong className="text-white">But there's a problem: you generate that data — and never get rewarded for it.</strong>
                </p>
                
                <p>
                  CapturGO changes that.<br />
                  It's a decentralized mobility app that lets you earn rewards just by moving, while keeping your data private and secure.
                  Whether you're commuting, walking, or traveling, CapturGO turns your daily activity into points, rankings, and real value.
                </p>
                
                <p>
                  Here's how it works — and how to start earning in just a few minutes.
                </p>
              </div>

              {/* What CapturGO Actually Does */}
              <div className="mt-16 mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">What CapturGO Actually Does</h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                  <p>
                    CapturGO is part of a new wave of technology called DePIN (Decentralized Physical Infrastructure Networks).
                    Instead of relying on large tech companies to collect and sell your movement data, CapturGO creates a community-driven network where users share anonymized mobility data — and get rewarded for doing it.
                  </p>
                  
                  <p>
                    Your phone passively records encrypted location points as you move.
                    These signals help build a live mobility layer used for navigation, AI, and urban insight — without compromising your privacy.
                  </p>
                  
                  <div className="bg-gray-800/30 rounded-2xl p-6 my-8">
                    <p className="text-white font-semibold mb-4">The result:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• A fairer data economy</li>
                      <li>• A stronger decentralized map</li>
                      <li>• And you, earning rewards for powering it</li>
                    </ul>
                  </div>
                  
                  <p>
                    Think of it as a decentralized version of Waze or Google Maps, where the people contributing are also the ones benefitting.
                  </p>
                </div>
              </div>

              {/* Why It Matters */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Why It Matters</h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                  <p>
                    Big tech already earns billions using mobility data.
                    They use it to train AI models, improve logistics, and sell insights to advertisers — all powered by information from people like you.
                  </p>
                  
                  <p>
                    <strong className="text-white">CapturGO flips that dynamic.</strong><br />
                    By letting users control and benefit from their data, the app builds a user-owned mobility network that rewards participation instead of exploitation.
                  </p>
                  
                  <p>
                    Each new user strengthens the system's accuracy, scale, and decentralization — meaning every movement helps grow the world's first crowdsourced mobility infrastructure.
                  </p>
                </div>
              </div>

              {/* Privacy by Design */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Privacy by Design</h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                  <p>
                    CapturGO is built around privacy and transparency, not surveillance.
                    It uses advanced anonymization and edge processing to make sure your personal information stays on your device.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-2xl p-6">
                      <h3 className="text-green-400 font-semibold mb-3">What CapturGO collects:</h3>
                      <p className="text-gray-300">Anonymous GPS activity and movement signals</p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-2xl p-6">
                      <h3 className="text-red-400 font-semibold mb-3">What it never collects:</h3>
                      <p className="text-gray-300">Messages, contacts, or personal identifiers</p>
                    </div>
                  </div>
                  
                  <p>
                    You're always in control. You decide when to share and can pause at any time.
                    Your movement creates value — CapturGO just helps you claim it.
                  </p>
                </div>
              </div>

              {/* How to Get Started */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How to Get Started</h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                  <p>Getting started is simple. You can set it up in under five minutes.</p>
                  
                  <div className="space-y-8">
                    <div className="bg-gray-800/30 rounded-2xl p-6">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                        Download CapturGO
                      </h3>
                      <p className="text-gray-300 ml-11">
                        Join the Beta on iOS (via TestFlight). Android coming soon!
                        Install the app and sign up with your email to get started.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-2xl p-6">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                        Enable Background Tracking
                      </h3>
                      <p className="text-gray-300 ml-11">
                        Go to your phone's settings and allow CapturGO to track in the background.
                        This ensures your movements are counted and rewarded — even when the app isn't open.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-2xl p-6">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                        Start Moving
                      </h3>
                      <p className="text-gray-300 ml-11">
                        Walk, drive, or explore.
                        Your phone automatically detects movement and contributes to the decentralized network.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/30 rounded-2xl p-6">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                        Check Your Dashboard
                      </h3>
                      <div className="text-gray-300 ml-11">
                        <p className="mb-3">Inside the app, you can track:</p>
                        <ul className="space-y-1">
                          <li>• Your total rewards (CAPT Points)</li>
                          <li>• Your leaderboard rank</li>
                          <li>• Daily stats and badges</li>
                        </ul>
                        <p className="mt-3">The more consistent your movement, the more you earn.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How Rewards Work */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How Rewards Work</h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                  <p>
                    CapturGO rewards users based on verified mobility data — not steps, but meaningful movement.
                    Points are distributed based on:
                  </p>
                  
                  <ul className="space-y-2 ml-6">
                    <li>• Distance traveled</li>
                    <li>• Consistency (daily activity streaks)</li>
                    <li>• Community challenges and referrals</li>
                  </ul>
                  
                  <p>
                    You'll collect CAPT Points, which can later convert into $CAPT tokens.
                    These tokens represent your contribution to the network and can be used for future rewards, perks, or trading once the ecosystem launches.
                  </p>
                </div>
              </div>

              {/* Tips for Maximizing Rewards */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Tips for Maximizing Rewards</h2>
                <div className="bg-gray-800/30 rounded-2xl p-6">
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Keep background tracking turned on
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Use CapturGO daily — even short trips count
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Join seasonal challenges for bonuses
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Invite friends with your referral code for extra points
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Check your leaderboard weekly
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-6">
                    Consistency and early participation matter — the earlier you start, the more your rewards will multiply when token conversions go live.
                  </p>
                </div>
              </div>

              {/* The Bigger Picture */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">The Bigger Picture</h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                  <p>
                    CapturGO isn't just another rewards app — it's a movement toward data fairness and decentralized mobility.
                    By taking part, you're helping build the world's first open network of real-world movement data — owned by its users.
                  </p>
                  
                  <div className="bg-gray-800/30 rounded-2xl p-6 my-8">
                    <p className="text-white font-semibold mb-4">This technology can power:</p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Real-time traffic updates</li>
                      <li>• City planning insights</li>
                      <li>• Safer navigation tools</li>
                      <li>• DePIN-powered map systems</li>
                    </ul>
                  </div>
                  
                  <p>
                    The more people join, the smarter and more valuable the network becomes.
                  </p>
                </div>
              </div>

              {/* Ready to Join */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Ready to Join?</h2>
                <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                  <p>
                    You already move every day.<br />
                    Now you can finally earn from it — while helping build the foundation of a decentralized future.
                  </p>
                  
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 text-center my-8">
                    <p className="text-white font-bold text-xl mb-4">
                      Download CapturGO. Move. Earn. Repeat.
                    </p>
                    <p className="text-gray-300">
                      Your movement has value — it's time to claim it.
                    </p>
                    <div className="mt-6">
                      <a 
                        href="https://testflight.apple.com/join/nCcrMvFA" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors duration-200"
                      >
                        Get Started Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    </div>
  );
}
