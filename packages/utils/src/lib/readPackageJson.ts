import { Config } from '@stencil/core/internal';
import type { PackageJSON } from '../types/package_json';
import path from "path";

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