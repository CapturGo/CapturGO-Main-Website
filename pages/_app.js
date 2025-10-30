import Head from 'next/head';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width" />
          <link href="/images/logo.svg" rel="icon" media="(prefers-color-scheme: light)" />
          <link href="/images/logo.svg" rel="icon" media="(prefers-color-scheme: dark)" />
          <link rel="apple-touch-icon" href="/images/logo.svg" />
          
          {/* Open Graph / Social Media Meta Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://capturgo.com/" />
          <meta property="og:title" content="capturGO - Earn Rewards for Navigation Data" />
          <meta property="og:description" content="Join the decentralized location intelligence network. Earn tokens by contributing navigation data through active and passive participation." />
          <meta property="og:image" content="/images/socialcard.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="capturGO - Decentralized Navigation Rewards" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://capturgo.com/" />
          <meta name="twitter:title" content="capturGO - Earn Rewards for Navigation Data" />
          <meta name="twitter:description" content="Join the decentralized location intelligence network. Earn tokens by contributing navigation data through active and passive participation." />
          <meta name="twitter:image" content="/images/socialcard.png" />
          <meta name="twitter:image:alt" content="capturGO - Decentralized Navigation Rewards" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Analytics />
        <SpeedInsights debug={false} />
    </AuthProvider>
  );
}

export default MyApp;
