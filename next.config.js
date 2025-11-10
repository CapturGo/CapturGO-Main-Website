/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variable security - only expose public variables
  env: {
    // Explicitly define which env vars are safe to expose
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  
  // Performance optimizations
  // experimental: {
  //   optimizeCss: true,
  //   scrollRestoration: true,
  // },
  
  // Image optimization
  images: {
    domains: ['capturgo.com', 'capturnetwork.xyz'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  async rewrites() {
    return [
      {
        source: '/page.html',
        destination: '/',
      },
      {
        source: '/discover/page.html',
        destination: '/#discover',
      },
      {
        source: '/features/page.html',
        destination: '/#features',
      },
      {
        source: '/faqs/page.html',
        destination: '/#faq',
      },
      // SEO-friendly redirects for common search terms
      {
        source: '/captur',
        destination: '/',
      },
      {
        source: '/captur-network',
        destination: '/',
      },
      {
        source: '/depin',
        destination: '/',
      },
      {
        source: '/navigation-app',
        destination: '/',
      },
      {
        source: '/gps-rewards',
        destination: '/',
      },
      // Redirect removed explore pages
      {
        source: '/explore/:path*',
        destination: '/',
      },
    ];
  },
  
  async redirects() {
    return [
      // Redirect common misspellings and variations
      {
        source: '/capture-go',
        destination: '/',
        permanent: true,
      },
      {
        source: '/captur-go',
        destination: '/',
        permanent: true,
      },
      {
        source: '/capturo',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  trailingSlash: false,
};

module.exports = nextConfig;
