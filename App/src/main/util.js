/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    // return `http://localhost:${port}`
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  // const port = process.env.PORT || 1212;
  //   return `http://localhost:${port}`
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
