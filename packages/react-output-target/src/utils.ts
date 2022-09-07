import path from 'path';
import { promisify } from 'util';
import fs from 'fs';
import type { PackageJSON } from './types';

const readFile = promisify(fs.readFile);

/**
 * Send a string to lowercase
 * @param str the string to lowercase
 * @returns the lowercased string
 */
export const toLowerCase = (str: string) => str.toLowerCase();

/**
 * Convert a string using dash-case to PascalCase
 * @param str the string to convert to PascalCase
 * @returns the PascalCased string
 */
export const dashToPascalCase = (str: string): string =>
  toLowerCase(str)
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');

/**
 * Sorts a provided array by a property belonging to an item that exists on each item in the array
 * @param array the array to sort
 * @param prop a function to look up a field on an entry in the provided array
 * @returns a shallow copy of the array, sorted by the property resolved by `prop`
 */
export function sortBy<T>(array: ReadonlyArray<T>, prop: (item: T) => string): ReadonlyArray<T> {
  return array.slice().sort((a, b) => {
    const nameA = prop(a);
    const nameB = prop(b);
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

/**
 * Normalize a path
 * @param str the path to normalize
 * @returns the normalized path
 */
export function normalizePath(str: string): string {
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

/**
 * Generate the relative import from `pathFrom` to `pathTo`
 * @param pathFrom the path that shall be used as the origin in determining the relative path
 * @param pathTo the path that shall be used as the destination in determining the relative path
 * @param ext an extension to remove from the final path
 * @returns the derived relative import
 */
export function relativeImport(pathFrom: string, pathTo: string, ext?: string): string {
  let relativePath = path.relative(path.dirname(pathFrom), path.dirname(pathTo));
  if (relativePath === '') {
    relativePath = '.';
  } else if (relativePath[0] !== '.') {
    relativePath = './' + relativePath;
  }
  return normalizePath(`${relativePath}/${path.basename(pathTo, ext)}`);
}

/**
 * Attempts to read a `package.json` file at the provided directory.
 * @param rootDir the directory to search for the `package.json` file to read
 * @returns the read and parsed `package.json` file
 */
export async function readPackageJson(rootDir: string): Promise<PackageJSON> {
  const pkgJsonPath = path.join(rootDir, 'package.json');

  let pkgJson: string;
  try {
    pkgJson = await readFile(pkgJsonPath, 'utf8');
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

const EXTENDED_PATH_REGEX = /^\\\\\?\\/;
const NON_ASCII_REGEX = /[^\x00-\x80]+/;
const SLASH_REGEX = /\\/g;
