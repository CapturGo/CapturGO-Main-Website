import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Script from 'next/script';

export default function Home({ meta, content }) {

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {meta.description && <meta name="description" content={meta.description} />}
        {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      </Head>
      <div className="framer-root" dangerouslySetInnerHTML={{ __html: content }} />
      <Script
        src="https://events.framer.com/script?v=2"
        strategy="afterInteractive"
        data-fid="ff2aee2c258bbbc8fd4a8334d9b76a0b47bfb5bdc8cc1c1229f7c149b4fbb035"
      />
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'home', 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract only the necessary meta information
  const title = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || 'CapturGO';
  const description = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];
  const ogImage = content.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i)?.[1];
  
  // Extract main content div
  const mainContent = content.match(/<div[^>]*class="framer-[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1] || '';
  
  return {
    props: {
      meta: {
        title,
        description,
        ogImage,
      },
      content: mainContent,
    },
    revalidate: 1, // Enable ISR
  };
}
