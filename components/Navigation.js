import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

export default function Navigation() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              {/* Desktop Logo */}
              <Image 
                src="/images/logo.svg" 
                alt="capturGO Logo" 
                width={192} 
                height={64}
                className="h-8 hidden md:block"
                style={{ width: 'auto' }}
                priority
                quality={100}
                sizes="96px"
              />
              {/* Mobile Logo */}
              <Image 
                src="/images/MobileLogo.png" 
                alt="capturGO Logo" 
                width={512} 
                height={512}
                className="h-10 md:hidden"
                style={{ 
                  width: 'auto',
                  imageRendering: 'crisp-edges'
                }}
                priority
                quality={100}
                sizes="(max-width: 768px) 128px, 64px"
                unoptimized={true}
              />
            </Link>
          </div>
          
          {/* Centered Navigation - Absolute positioning for perfect centering */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="flex items-center space-x-8">
              <Link 
                href="/#discover" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Discover"
              >
                Discover
              </Link>
              <Link 
                href="/#features" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Features"
              >
                Features
              </Link>
              <Link 
                href="/partners" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Partners"
              >
                Partners
              </Link>
              <Link 
                href="/#leaderboard" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Leaderboard"
              >
                Leaderboard
              </Link>
              <Link 
                href="/#faq" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="FAQs"
              >
                FAQs
              </Link>
            </div>
          </div>
          
          {/* Sign In / Sign Up Buttons or Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="loader" style={{ width: '24px', height: '24px' }}></div>
            ) : user ? (
              <Link
                href="/profile"
                className="min-w-[80px] px-6 py-2 bg-captur-purple text-white hover:bg-captur-purple/80 font-medium rounded-2xl transition-all duration-300 whitespace-nowrap text-center"
              >
                Profile
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setShowSignIn(true)}
                  className="min-w-[80px] px-6 py-2 border border-gray-400 text-white hover:bg-gray-800 font-medium rounded-2xl transition-all duration-300 whitespace-nowrap"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowSignUp(true)}
                  className="min-w-[80px] px-6 py-2 bg-captur-purple text-white hover:bg-captur-purple/80 font-medium rounded-2xl transition-all duration-300 whitespace-nowrap"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button - Right side */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors z-50 relative p-2"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 bg-black/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                href="/#discover" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Discover"
                onClick={() => setIsOpen(false)}
              >
                Discover
              </Link>
              <Link 
                href="/#features" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Features"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/partners" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Partners"
                onClick={() => setIsOpen(false)}
              >
                Partners
              </Link>
              <Link 
                href="/#leaderboard" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="Leaderboard"
                onClick={() => setIsOpen(false)}
              >
                Leaderboard
              </Link>
              <Link 
                href="/#faq" 
                className="text-gray-300 hover:text-white transition-colors flip-text"
                data-text="FAQs"
                onClick={() => setIsOpen(false)}
              >
                FAQs
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  className="w-full px-6 py-2 bg-captur-purple text-white hover:bg-captur-purple/80 font-medium rounded-2xl transition-all duration-300 text-center block"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowSignIn(true);
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-2 border border-gray-400 text-white hover:bg-gray-800 font-medium rounded-2xl transition-all duration-300 text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowSignUp(true);
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-2 bg-captur-purple text-white hover:bg-captur-purple/80 font-medium rounded-2xl transition-all duration-300 text-center"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    </nav>
  );
}
