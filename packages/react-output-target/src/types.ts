export interface OutputTargetReact {
  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  loaderDir?: string;
  includePolyfills?: boolean;
  includeDefineCustomElements?: boolean;
  includeImportCustomElements?: boolean;
  customElementsDir?: string;
}

export interface PackageJSON {
  types: string;
}
