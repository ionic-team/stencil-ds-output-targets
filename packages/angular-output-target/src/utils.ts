import { Config } from '@stencil/core/internal';
import path from 'path';
import { ImportCollection, ImportStatement, TypeImportStatement } from './component/types';
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

export function relativeImport(pathFrom: string, pathTo: string, ext?: string) {
  let relativePath = path.relative(path.dirname(pathFrom), path.dirname(pathTo));
  if (relativePath === '') {
    relativePath = '.';
  } else if (relativePath[0] !== '.') {
    relativePath = './' + relativePath;
  }
  return normalizePath(`${relativePath}/${path.basename(pathTo, ext)}`);
}

export function isRelativePath(path: string) {
  return path && path.startsWith('.');
}

export async function readPackageJson(config: Config, rootDir: string) {
  const pkgJsonPath = path.join(rootDir, 'package.json');

  let pkgJson: string;
  try {
    pkgJson = (await config.sys?.readFile(pkgJsonPath, 'utf8')) as string;
  } catch (e) {
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

/**
 * Returns the custom elements directory. Defaults to `components`.
 */
export function getCustomElementsDir(customElementsDir?: string) {
  return customElementsDir ?? 'components';
}

export function setImportStatement(collection: ImportCollection, packageName: string, statement: ImportStatement) {
  if (!collection[packageName]) {
    collection[packageName] = [];
  }
  collection[packageName].push(statement);
}

export function flattenImportCollection(collection: ImportCollection) {
  let lastPkg = '';
  return Object.entries(collection)
    .sort(([pkgA], [pkgB]) => {
      if (!pkgA.startsWith('./') && pkgB.startsWith('./')) {
        return -1;
      } else if (pkgA.startsWith('./') && !pkgB.startsWith('./')) {
        return 1;
      }
      return pkgA.localeCompare(pkgB)
    })
    .map(([pkgName, imports]) => {
      let separator = '';
      if (lastPkg.slice(0, 1) === '@' && pkgName.slice(0, 1) !== '@') {
        // The last package was a scoped package, but this one is not.
        // We need to add a newline to separate the two.
        separator = '\n';
      }
      lastPkg = pkgName;

      const normalizedImports = imports.filter(x => typeof x === 'string' || typeof 'x' !== 'string' && x.typeOnly === false).sort();
      const typedImports = imports.filter(x => typeof x !== 'string' && x.typeOnly === true).sort();

      return (
        separator +
        (normalizedImports.length > 0 ? (
          `import {
${normalizedImports.map(i => `  ${i}`).join(',\n')}
} from '${pkgName}';`
        ) : '') +
        (normalizedImports.length > 0 && typedImports.length > 0 ? '\n' : '') +
        (typedImports.length > 0 ? (
          `import type {
${typedImports.map(i => `  ${(i as TypeImportStatement).value}`).join(',\n')}
} from '${pkgName}';`
        ) : '')
      );
    }).join('\n');
}

export function mergeImportCollections(...collections: ImportCollection[]) {
  const res: ImportCollection = {};
  for (const collection of collections) {
    for (const pkgName of Object.keys(collection)) {
      if (!res[pkgName]) {
        res[pkgName] = [];
      }
      res[pkgName] = [
        ...res[pkgName],
        ...collection[pkgName],
      ];
    }
  }
  return res;
}

const EXTENDED_PATH_REGEX = /^\\\\\?\\/;
const NON_ASCII_REGEX = /[^\x00-\x80]+/;
const SLASH_REGEX = /\\/g;
