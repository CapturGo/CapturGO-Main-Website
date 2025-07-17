import { getHtmlContent } from '../components/HtmlContent';

export default function Waitlist({ htmlContent }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export async function getStaticProps() {
  const htmlContent = getHtmlContent('waitlist/page.html');
  return {
    props: {
      htmlContent,
    },
  };
}
