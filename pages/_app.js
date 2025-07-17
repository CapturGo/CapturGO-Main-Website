import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="Framer 6aebf05" />
        <script async src="https://events.framer.com/script?v=2" data-fid="ff2aee2c258bbbc8fd4a8334d9b76a0b47bfb5bdc8cc1c1229f7c149b4fbb035" data-no-nt></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
