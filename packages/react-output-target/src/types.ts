export interface OutputTargetReact {
  componentCorePackage?: string;
  proxiesFile: string;
  noAutoPolyfills?: boolean;
  noAutoRegister?: boolean;
  excludeComponents?: string[];
  loaderDir?: string;
}

export interface PackageJSON {
  types: string;
}
