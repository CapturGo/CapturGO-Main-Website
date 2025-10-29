import Head from 'next/head';
import Script from 'next/script';
import { PrivyProvider } from '@privy-io/react-auth';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const handleLogin = (user) => {
    console.log('User logged in:', user);
  };

  return (
    <PrivyProvider
      appId="cmd7xav3n00sjl20mrl75bo20"
      onSuccess={handleLogin}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#000000',
          logo: '/images/logo.svg',
        },
        loginMethods: ['email', 'google', 'twitter']
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width" />
        <link href="/images/logo.svg" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="/images/logo.svg" rel="icon" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/images/logo.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
      <SpeedInsights />
    </PrivyProvider>
  );
}

export default MyApp;
