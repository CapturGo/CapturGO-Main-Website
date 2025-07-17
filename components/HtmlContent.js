import fs from 'fs';
import path from 'path';

export function getHtmlContent(filePath) {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return fileContents;
}
