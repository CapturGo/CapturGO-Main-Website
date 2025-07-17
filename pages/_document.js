import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
        <script async src="https://events.framer.com/script?v=2" data-fid="ff2aee2c258bbbc8fd4a8334d9b76a0b47bfb5bdc8cc1c1229f7c149b4fbb035" data-no-nt></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="svg-templates" style={{ position: 'absolute', overflow: 'hidden', bottom: 0, left: 0, width: 0, height: 0, zIndex: 0, contain: 'strict' }} aria-hidden="true"></div>
      </body>
    </Html>
  );
}
