import path from 'path';
import { normalizePath } from './normalizePath';

export function relativeImport(pathFrom: string, pathTo: string, ext?: string) {
  let relativePath = path.relative(path.dirname(pathFrom), path.dirname(pathTo));
  if (relativePath === '') {
    relativePath = '.';
  } else if (relativePath[0] !== '.') {
    relativePath = './' + relativePath;
  }
  return normalizePath(`${relativePath}/${path.basename(pathTo, ext)}`);
}
