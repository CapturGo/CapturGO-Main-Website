/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/page.html',
      },
      {
        source: '/waitlist',
        destination: '/waitlist/page.html',
      },
    ];
  },
};

module.exports = nextConfig;
