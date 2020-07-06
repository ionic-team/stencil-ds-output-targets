export interface OutputTargetReact {
  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  loaderDir?: string;
  includePolyfills?: boolean;
  includeDefineCustomElements?: boolean;
  // @deprecated
  tagNameModifier: (tagName: string) => string;
}

export interface PackageJSON {
  types: string;
}
