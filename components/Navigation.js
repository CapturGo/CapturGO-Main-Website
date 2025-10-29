import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img 
                src="/images/logo.svg" 
                alt="capturGO Logo" 
                width={180} 
                height={60}
                className="h-12"
              />
            </Link>
          </div>
          
          {/* Centered Navigation - Absolute positioning for perfect centering */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="flex items-center space-x-8">
              <Link 
                href="/#discover" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Discover
              </Link>
              <Link 
                href="/#features" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link 
                href="/#community" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Community
              </Link>
              <Link 
                href="/#faq" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                FAQs
              </Link>
            </div>
          </div>
          
          {/* Get Started Button - Desktop */}
          <div className="hidden md:block">
            <a 
              href="https://community.capturgo.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="animate-border-loop text-white font-semibold hover:bg-white/10 transition-all"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button - Right side */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
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
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/#discover" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Discover
              </Link>
              <Link 
                href="/#features" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/#community" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <Link 
                href="/#faq" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQs
              </Link>
              <a 
                href="https://community.capturgo.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="animate-border-loop text-white hover:bg-white/10 transition-colors text-center font-semibold inline-block"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
