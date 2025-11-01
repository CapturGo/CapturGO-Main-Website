import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | capturGO</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to capturGO homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 infinite-grid-bg-slow opacity-30"></div>
        
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Moving Stars */}
        <div className="stars-container">
          <div className="star white" style={{top: '15%', left: '20%', width: '2px', height: '2px'}}></div>
          <div className="star purple" style={{top: '25%', left: '80%', width: '1.5px', height: '1.5px'}}></div>
          <div className="star white" style={{top: '60%', left: '15%', width: '1px', height: '1px'}}></div>
          <div className="star purple" style={{top: '70%', left: '85%', width: '2px', height: '2px'}}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <Image 
                src="/images/logo.svg" 
                alt="capturGO Logo" 
                width={120}
                height={40}
                className="h-10 w-auto mx-auto hover:opacity-80 transition-opacity"
                priority
                quality={100}
              />
            </Link>
          </div>

          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-transparent bg-gradient-to-r from-captur-purple to-purple-400 bg-clip-text leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have taken a wrong turn. 
              Let's get you back on the right route with capturGO!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Go Home Button */}
            <Link 
              href="/"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-captur-purple hover:bg-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Go to Home</span>
            </Link>

            {/* Join Discord Button */}
            <Link 
              href="https://discord.gg/mWgtjcNe"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-800/50 hover:bg-gray-700/60 text-white font-semibold rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Join Discord</span>
            </Link>
          </div>

          {/* Additional Help Text */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Need help? Join our community on Discord or return to the homepage to explore capturGO.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
