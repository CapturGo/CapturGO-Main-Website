import { getHtmlContent } from '../components/HtmlContent';

export default function Home({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export async function getStaticProps() {
  const htmlContent = getHtmlContent('page.html');
  return {
    props: {
      htmlContent,
    },
  };
}
