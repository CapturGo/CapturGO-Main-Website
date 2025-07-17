import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="Framer 6aebf05" />
        <link href="https://framerusercontent.com/images/xEfd8hVBpgxZ6XJg31OCw9iMRqI.png" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="https://framerusercontent.com/images/xEfd8hVBpgxZ6XJg31OCw9iMRqI.png" rel="icon" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="https://framerusercontent.com/images/oLxRh3vRcMnJ2sB4FQPrc0Bog.png" />
      </Head>
      <Component {...pageProps} />
      <Script
        src="https://events.framer.com/script?v=2"
        data-fid="ff2aee2c258bbbc8fd4a8334d9b76a0b47bfb5bdc8cc1c1229f7c149b4fbb035"
        data-no-nt
        strategy="afterInteractive"
      />
    </>
  );
}

export default MyApp;
