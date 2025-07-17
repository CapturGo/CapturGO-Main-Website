import fs from 'fs';
import path from 'path';
import Head from 'next/head';

export default function Home({ content }) {
  // Extract the body content from the HTML
  const bodyContent = content.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';

  // Extract head content (title, meta tags, etc.)
  const headContent = content.match(/<head[^>]*>([\s\S]*)<\/head>/i)?.[1] || '';
  const title = headContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || 'CapturGO';
  const description = headContent.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
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
  };
}
