import { Config } from '@stencil/core/internal';
import type { PackageJSON } from './types';

export const toLowerCase = (str: string) => str.toLowerCase();

export const dashToPascalCase = (str: string) =>
  toLowerCase(str)
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');

export function sortBy<T>(array: T[], prop: (item: T) => string) {
  return array.slice().sort((a, b) => {
    const nameA = prop(a);
    const nameB = prop(b);
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

export function normalizePath(str: string) {
  // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
  // https://github.com/sindresorhus/slash MIT
  // By Sindre Sorhus
  if (typeof str !== 'string') {
    throw new Error(`invalid path to normalize`);
  }
  str = str.trim();

  if (EXTENDED_PATH_REGEX.test(str) || NON_ASCII_REGEX.test(str)) {
    return str;
  }

  str = str.replace(SLASH_REGEX, '/');

  // always remove the trailing /
  // this makes our file cache look ups consistent
  if (str.charAt(str.length - 1) === '/') {
    const colonIndex = str.indexOf(':');
    if (colonIndex > -1) {
      if (colonIndex < str.length - 2) {
        str = str.substring(0, str.length - 1);
      }
    } else if (str.length > 1) {
      str = str.substring(0, str.length - 1);
    }
  }

  return str;
}

export function relativeImport(config: Config, pathFrom: string, pathTo: string, ext?: string) {
  if (!config.sys || !config.sys.relative || !config.sys.dirname || !config.sys.basename) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const to = config.sys.resolvePath(config.sys.dirname(pathFrom));

  let relativePath = config.sys.joinPaths(config.sys.dirname(to), config.sys.dirname(pathTo));

  if (relativePath === '') {
    relativePath = '.';
  } else if (relativePath[0] !== '.') {
    relativePath = './' + relativePath;
  }

  return normalizePath(`${relativePath}/${config.sys.basename(pathTo, ext)}`);
}

export function isRelativePath(path: string) {
  return path && path.startsWith('.');
}

export async function readPackageJson(config: Config, rootDir: string) {
  if (!config.sys || !config.sys.readFile) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const pkgJsonPath = config.sys.joinPaths(rootDir, 'package.json');
  const pkgJson = await config.sys.readFile(pkgJsonPath, 'utf8');

  if (!pkgJson) {
    throw new Error(`Missing "package.json" file for distribution: ${pkgJsonPath}`);
  }

  let pkgData: PackageJSON;
  try {
    pkgData = JSON.parse(pkgJson);
  } catch (e) {
    throw new Error(`Error parsing package.json: ${pkgJsonPath}, ${e}`);
  }

  return pkgData;
}

const EXTENDED_PATH_REGEX = /^\\\\\?\\/;
const NON_ASCII_REGEX = /[^\x00-\x80]+/;
const SLASH_REGEX = /\\/g;
