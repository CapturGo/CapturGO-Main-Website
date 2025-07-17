import fs from 'fs';
import path from 'path';

export default function Waitlist({ content }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'waitlist', 'index.html');
  const content = fs.readFileSync(filePath, 'utf8');
  
  return {
    props: {
      content,
    },
  };
}
