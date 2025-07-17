/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/static/home.html',
      },
      {
        source: '/waitlist',
        destination: '/static/waitlist.html',
      },
      {
        source: '/page.html',
        destination: '/static/home.html',
      },
      {
        source: '/waitlist/page.html',
        destination: '/static/waitlist.html',
      },
    ];
  },
  trailingSlash: false,
};

module.exports = nextConfig;
