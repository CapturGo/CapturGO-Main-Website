import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import ScrollAnimation from '../components/ScrollAnimation';
import SignUpModal from '../components/SignUpModal';
import SignInModal from '../components/SignInModal';
import Leaderboard from '../components/Leaderboard';

// Animated Counter Component
function AnimatedCounter({ end, duration = 4000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const { user, loading } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Handle password recovery tokens that land on homepage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      if (accessToken && type === 'recovery') {
        // Redirect to reset password page with the token
        const resetUrl = `/reset-password${window.location.hash}`;
        
        // Clear the hash from current page for security
        window.history.replaceState(null, null, window.location.pathname);
        
        // Redirect to reset page
        window.location.replace(resetUrl);
      }
    }
  }, []);

  const [showLoggedInPopup, setShowLoggedInPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  const handleGetStarted = () => {
    if (user) {
      setShowLoggedInPopup(true);
      setTimeout(() => setShowLoggedInPopup(false), 3000);
    } else {
      setShowSignUp(true);
    }
  };
  
  const faqs = [
    {
      question: "What is capturGO, and how does it work?",
      answer: "capturGO is a decentralized app that turns real-world location data into valuable insights. Users get real-time navigation, report road incidents, and share anonymized location data to improve routes and urban planning, earning rewards for their contributions."
    },
    {
      question: "How can I earn rewards with capturGO?",
      answer: "Earn points by reporting road incidents or traffic conditions and by passively sharing anonymized location data. These points are part of capturGO's DePIN-based reward system, with more details on redemption coming soon."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. capturGO prioritizes privacy by anonymizing and aggregating location data, ensuring no personal information is collected or used for direct user targeting."
    },
    {
      question: "What are the points and tokens used for?",
      answer: "Points may be converted into tokens within the capturGO ecosystem, which could unlock premium features, loyalty bonuses, or other benefits. Full details will be shared in the upcoming monetization strategy."
    },
    {
      question: "Do I need a smartphone to use capturGO?",
      answer: "Yes, capturGO requires a smartphone with GPS and sensors to collect real-time location data. It's available on both iOS and Android devices."
    },
    {
      question: "How does capturGO benefit businesses and cities?",
      answer: "Through its B2B data platform, capturGO provides businesses and cities with aggregated insights on travel routes, congestion patterns, and user behavior to optimize navigation, urban planning, and geo-targeted advertising."
    }
  ];

  return (
    <>
      <Head>
        <title>capturGO - Decentralized GPS Navigation App | Captur Network | Earn Rewards for Real-Time Traffic Data</title>
        <meta name="description" content="capturGO by Captur Network - Revolutionary decentralized GPS navigation app. Earn crypto rewards for sharing real-time traffic data, incident reports & location intelligence. Community-powered navigation with DePIN technology. Join the future of smart mobility." />
        
        {/* SEO Keywords */}
        <meta name="keywords" content="capturGO, Captur, Captur Network, decentralized GPS, navigation app, DePIN, crypto rewards, traffic data, real-time navigation, community navigation, blockchain GPS, earn crypto driving, location data rewards, smart mobility, Web3 navigation, decentralized mapping, traffic intelligence, road incident reporting, GPS rewards app, location sharing rewards, driving rewards, navigation rewards, crypto GPS, blockchain navigation, DePIN navigation, decentralized location data" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://capturgo.com" />
        
        {/* Alternative domains */}
        <link rel="alternate" href="https://capturnetwork.xyz" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://capturgo.com" />
        <meta property="og:title" content="capturGO - Decentralized GPS Navigation App | Earn Crypto Rewards" />
        <meta property="og:description" content="Revolutionary decentralized GPS navigation app by Captur Network. Earn crypto rewards for sharing real-time traffic data and location intelligence. Join the future of community-powered navigation." />
        <meta property="og:image" content="https://capturgo.com/images/logo.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="capturGO - Captur Network" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://capturgo.com" />
        <meta name="twitter:title" content="capturGO - Decentralized GPS Navigation App | Earn Crypto Rewards" />
        <meta name="twitter:description" content="Revolutionary decentralized GPS navigation app by Captur Network. Earn crypto rewards for sharing real-time traffic data and location intelligence." />
        <meta name="twitter:image" content="https://capturgo.com/images/logo.svg" />
        <meta name="twitter:creator" content="@captur_go" />
        <meta name="twitter:site" content="@captur_go" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Captur Labs Limited" />
        <meta name="publisher" content="Captur Network" />
        <meta name="copyright" content="© 2025 Captur Labs Limited. All rights reserved." />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Geo targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="capturGO" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "capturGO",
            "alternateName": ["Captur", "Captur Network", "CapturGO"],
            "description": "Revolutionary decentralized GPS navigation app that rewards users for sharing real-time traffic data and location intelligence",
            "url": "https://capturgo.com",
            "sameAs": [
              "https://capturnetwork.xyz",
              "https://x.com/captur_go",
              "https://discord.gg/C9gCZ82AHA",
              "https://discord.gg/C9gCZ82AHA"
            ],
            "applicationCategory": "NavigationApplication",
            "operatingSystem": ["iOS", "Android"],
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Captur Labs Limited",
              "alternateName": "Captur Network",
              "url": "https://capturgo.com",
              "logo": "https://capturgo.com/images/logo.svg"
            },
            "keywords": "decentralized GPS, navigation app, crypto rewards, DePIN, traffic data, real-time navigation, blockchain GPS",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1000"
            }
          })}
        </script>
      </Head>

      <ScrollAnimation />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden -mt-32">
        {/* Infinite Grid Background Layer */}
        <div className="absolute inset-0 infinite-grid-bg-slow"></div>
        
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Moving Stars Background */}
        <div className="stars-container">
          <div className="star white" style={{top: '8%', left: '12%', width: '2px', height: '2px'}}></div>
          <div className="star purple" style={{top: '18%', left: '85%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star white" style={{top: '28%', left: '22%', width: '1px', height: '1px'}}></div>
          <div className="star purple" style={{top: '12%', left: '65%', width: '2.5px', height: '2.5px'}}></div>
          <div className="star white" style={{top: '42%', left: '8%', width: '1px', height: '1px'}}></div>
          <div className="star purple" style={{top: '32%', left: '78%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star white" style={{top: '58%', left: '38%', width: '2px', height: '2px'}}></div>
          <div className="star purple" style={{top: '68%', left: '88%', width: '1px', height: '1px'}}></div>
          <div className="star white" style={{top: '78%', left: '18%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star purple" style={{top: '22%', left: '42%', width: '1px', height: '1px'}}></div>
          <div className="star white" style={{top: '52%', left: '72%', width: '2px', height: '2px'}}></div>
          <div className="star purple" style={{top: '38%', left: '92%', width: '1px', height: '1px'}}></div>
          <div className="star white" style={{top: '72%', left: '52%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star purple" style={{top: '82%', left: '32%', width: '1px', height: '1px'}}></div>
          <div className="star white" style={{top: '48%', left: '2%', width: '2px', height: '2px'}}></div>
          <div className="star purple" style={{top: '62%', left: '62%', width: '1px', height: '1px'}}></div>
          <div className="star white" style={{top: '88%', left: '72%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star purple" style={{top: '2%', left: '32%', width: '1px', height: '1px'}}></div>
          <div className="star white" style={{top: '92%', left: '12%', width: '2px', height: '2px'}}></div>
          <div className="star purple" style={{top: '14%', left: '95%', width: '1px', height: '1px'}}></div>
          <div className="star white" style={{top: '35%', left: '55%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star purple" style={{top: '65%', left: '25%', width: '2px', height: '2px'}}></div>
          <div className="star white" style={{top: '75%', left: '85%', width: '1px', height: '1px'}}></div>
          <div className="star purple" style={{top: '45%', left: '45%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star white" style={{top: '25%', left: '5%', width: '1px', height: '1px'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-40 sm:pt-36 lg:pt-40">
          <div className="mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-6 leading-tight">
                <span className="animate-fade-in-up">Navigate, Share, and Earn with</span>
              </h1>
              <div className="animate-fade-in-up animation-delay-200">
                <img 
                  src="/images/capturGO.svg" 
                  alt="capturGO" 
                  className="h-8 sm:h-10 lg:h-12 xl:h-14 w-auto mx-auto"
                />
              </div>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-10 sm:mb-12 lg:mb-16 max-w-sm sm:max-w-lg mx-auto leading-relaxed px-4 sm:px-0">
              Join capturGO to build the biggest community-driven real-time driving direction.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Join Discord Button */}
            <a 
              href="https://discord.gg/C9gCZ82AHA"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 bg-gray-800/50 hover:bg-gray-700/60 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 w-48 sm:w-auto"
            >
              <span className="text-white font-semibold text-base sm:text-lg">Join Discord</span>
              <div className="w-7 sm:w-8 h-7 sm:h-8 bg-transparent border border-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
            </a>

            {/* Animated Get Started Button */}
            <button 
              onClick={handleGetStarted}
              className="group flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 bg-gray-800/50 hover:bg-gray-700/60 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 w-48 sm:w-auto"
            >
              <span className="text-white font-semibold text-base sm:text-lg">Get Started</span>
              <div className="w-7 sm:w-8 h-7 sm:h-8 bg-transparent border border-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </div>
          
          <div className="mt-16 sm:mt-20">

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-6 sm:px-8">
              <div className="flex flex-col justify-center items-center px-4 sm:px-6 py-6 sm:py-8 bg-gray-800/50 rounded-2xl border border-gray-700 h-28 sm:h-32">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                    <AnimatedCounter end={21004} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 leading-tight">Daily Traffic KM</div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center px-4 sm:px-6 py-6 sm:py-8 bg-gray-800/50 rounded-2xl border border-gray-700 h-28 sm:h-32">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 leading-tight">Active Users</div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center px-4 sm:px-6 py-6 sm:py-8 bg-gray-800/50 rounded-2xl border border-gray-700 h-28 sm:h-32 sm:col-span-2 lg:col-span-1">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                    <AnimatedCounter end={180} suffix="+" />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 leading-tight">Available Countries</div>
                </div>
              </div>
            </div>

            {/* Logo Carousel */}
            <div className="mt-16 sm:mt-20 lg:mt-24 overflow-hidden">
              <div className="animate-scroll-infinite space-x-12">
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                
                {/* Exact duplicate for seamless loop */}
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/CV.svg" alt="CV Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
                <img src="/images/du.svg" alt="DU Logo" className="h-12 opacity-60 hover:opacity-100 transition-opacity inline-block" />
              </div>
            </div>

            {/* Bouncing Arrow */}
            <div className="mt-16 sm:mt-20 flex justify-center">
              <button 
                onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
                className="animate-bounce hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Scroll to next section"
              >
                <svg className="w-10 h-10 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 16l-6-6h12l-6 6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section id="discover" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Discover capturGO Benefits
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Unlock a world of community-powered navigation,<br />
              built by users, for users.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Mobile Phone Mockup - Center */}
            <div className="flex justify-center mb-8 lg:mb-0 scroll-scale-up">
              <img 
                src="/images/Map.png" 
                alt="capturGO Map Interface" 
                className="w-64 h-auto"
              />
            </div>

            {/* Benefit Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:absolute lg:inset-0 lg:flex lg:flex-wrap lg:justify-between lg:items-center lg:pointer-events-none">
              
              {/* Navigate Card - Top Left */}
              <div className="lg:absolute lg:top-8 lg:left-16 lg:w-72 lg:pointer-events-auto scroll-slide-left scroll-stagger-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 min-h-[160px] flex flex-col">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Navigate</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Explore with real-time, community-powered directions
                  </p>
                </div>
              </div>

              {/* Anonymize Card - Top Right */}
              <div className="lg:absolute lg:top-8 lg:right-16 lg:w-72 lg:pointer-events-auto scroll-slide-right scroll-stagger-2">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 min-h-[160px] flex flex-col">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Anonymize</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Contribute anonymized location data securely
                  </p>
                </div>
              </div>

              {/* Report Card - Bottom Left */}
              <div className="lg:absolute lg:bottom-8 lg:left-16 lg:w-72 lg:pointer-events-auto scroll-slide-left scroll-stagger-3">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 min-h-[160px] flex flex-col">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Report</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Share road incidents and traffic updates effortlessly
                  </p>
                </div>
              </div>

              {/* Earn Card - Bottom Right */}
              <div className="lg:absolute lg:bottom-8 lg:right-16 lg:w-72 lg:pointer-events-auto scroll-slide-right scroll-stagger-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 min-h-[160px] flex flex-col">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Earn</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Gain rewards for your passive and active contributions
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Move, Share, Earn Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="text-sm text-gray-400 font-medium tracking-wider uppercase">
                Move, Share, Earn.
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Turn Every Movement<br />
                into Rewards
              </h2>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg">
                You'll contribute to the future of location data, and earn $CAPT which we will be releasing in the near future. (More info around tokenomics to be released, no token is circulating at the moment, be aware)
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={handleGetStarted} className="px-8 py-4 bg-[#935EFF] hover:bg-[#7B4FE6] text-white font-semibold rounded-xl transition-colors duration-200 text-center">
                  Get Started
                </button>
                <a href="https://discord.gg/C9gCZ82AHA" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-xl transition-colors duration-200 text-center">
                  Join Community
                </a>
              </div>
            </div>

            {/* Right Content - Start Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="/images/Start.png" 
                  alt="capturGO Start Interface" 
                  className="w-[32rem] h-auto"
                />
              </div>
            </div>

            </div>
          </div>
        </div>
      </section>

      {/* capturGO Capabilities Section */}
      <section id="features" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-2 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 scroll-slide-left flex justify-center lg:justify-start">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-6 w-80 h-[640px] flex flex-col justify-start pt-12 space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                    capturGO<br />
                    Capabilities
                  </h2>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
                    Explore an all-in-one application to reward everyday travelers through active and passive contributions. Setup takes less than 2 minutes, to begin earning, and contributing to the future of decentralized location intelligence.
                  </p>
                </div>

                {/* Capabilities List */}
                <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Passive Income</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Community-driven</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Decentralized</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Real-time Traffic</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Real-time Safety Alerts</span>
                </div>
                </div>
              </div>
            </div>

            {/* Animated Arrow Between Container and Phone */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
              <div className="loading-frame">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>

            {/* Right Phone Mockup */}
            <div className="flex justify-center lg:justify-center scroll-slide-right">
              <div className="relative">
                <img 
                  src="/images/Rewards.png" 
                  alt="capturGO Rewards Interface" 
                  className="w-80 h-auto"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Leaderboard
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              See the top contributors in our community and their rewards
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 lg:p-12">
            <Leaderboard />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm font-medium">
                COMMUNITY
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Join Our Community
              </h2>
              
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                Join CapturGo to build the biggest community-driven real-time driving direction.
              </p>
              
              {/* Action Button */}
              <div className="pt-4">
                <a href="https://discord.gg/C9gCZ82AHA" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-[#935EFF] hover:bg-[#7B4FE6] text-white font-semibold rounded-xl transition-colors duration-200">
                  Join Discord
                </a>
              </div>

            </div>

            {/* Right Content - Interface Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="/images/Community.png" 
                  alt="capturGO Community Interface" 
                  className="w-[32rem] h-auto"
                />
              </div>
            </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about capturGO
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden scroll-fade-in scroll-stagger-${(index % 4) + 1}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <svg 
                    className={`w-6 h-6 text-captur-purple transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6 pt-4">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Download capturGO &<br />
            Start Earning today!
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Navigate with real-time, community-driven directions, report traffic updates, share anonymized data, and earn rewards for every contribution with capturGO.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-2xl">
            <div className="w-8 h-8 bg-[#935EFF] rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-500">Download Now</div>
              <div className="text-sm font-semibold text-gray-900">App Store</div>
            </div>
          </div>
        </div>
      </section>

      {/* SignUp Modal */}
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />

      {/* SignIn Modal */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      {/* Logged In Popup */}
      {showLoggedInPopup && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Currently logged in, you are already ahead! 🎉</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

