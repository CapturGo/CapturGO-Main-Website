import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Script from 'next/script';

export default function Waitlist({ content }) {
  // Extract only the essential content and meta information
  const title = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || 'CapturGO Waitlist';
  const description = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];
  const ogImage = content.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i)?.[1];
  
  // Extract main content div
  const mainContent = content.match(/<div[^>]*class="framer-[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1] || '';

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Head>
      <div className="framer-root" dangerouslySetInnerHTML={{ __html: mainContent }} />
      <Script
        src="https://events.framer.com/script?v=2"
        strategy="afterInteractive"
        data-fid="ff2aee2c258bbbc8fd4a8334d9b76a0b47bfb5bdc8cc1c1229f7c149b4fbb035"
      />
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'waitlist', 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  
  return {
    props: {
      content,
    },
    revalidate: 1, // Enable ISR
  };
}
