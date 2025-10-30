/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
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
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://va.vercel-scripts.com https://vitals.vercel-insights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com https://www.google.com; frame-src https://www.google.com; object-src 'none'; base-uri 'self';",
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
