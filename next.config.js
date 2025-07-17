/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/page.html',
        destination: '/',
      },
      {
        source: '/waitlist/page.html',
        destination: '/waitlist',
      },
    ];
  },
  trailingSlash: false,
};

module.exports = nextConfig;
