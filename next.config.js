/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/page.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/waitlist/page.html',
        destination: '/waitlist',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
