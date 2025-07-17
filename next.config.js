/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home/index.html',
      },
      {
        source: '/waitlist',
        destination: '/waitlist/index.html',
      },
    ];
  },
};

module.exports = nextConfig;
