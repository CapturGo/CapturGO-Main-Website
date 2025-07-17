import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Script from 'next/script';

export default function Home({ content }) {
  // Extract the body content from the HTML
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch?.[1] || '';

  // Extract head content
  const headMatch = content.match(/<head[^>]*>([\s\S]*)<\/head>/i);
  const headContent = headMatch?.[1] || '';

  // Extract meta information
  const title = headContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || 'CapturGO';
  const description = headContent.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];
  const ogImage = headContent.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i)?.[1];

  // Extract Framer module preloads
  const modulePreloads = [...headContent.matchAll(/<link[^>]*rel="modulepreload"[^>]*href="([^"]*)"/g)].map(match => match[1]);

  // Extract Framer main script
  const mainScript = headContent.match(/<script[^>]*data-framer-bundle="main"[^>]*src="([^"]*)"/i)?.[1];

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {modulePreloads.map((href, i) => (
          <link key={i} rel="modulepreload" href={href} fetchpriority="low" />
        ))}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
      {mainScript && (
        <Script
          type="module"
          src={mainScript}
          strategy="afterInteractive"
          data-framer-bundle="main"
          fetchpriority="low"
        />
      )}
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'home', 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  
  return {
    props: {
      content,
    },
    revalidate: 1, // Enable ISR
  };
}

// Ensure this page is served at the root
export async function getStaticPaths() {
  return {
    paths: [
      { params: {} }
    ],
    fallback: false
  };
}
