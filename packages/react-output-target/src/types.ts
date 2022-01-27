/**
 * An output target configuration interface used to configure Stencil to properly generate the bindings necessary to use
 * Stencil components in a React application
 */
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

/**
 * Describes the fields of a package.json file necessary to generate the Stencil-React bindings
 */
export interface PackageJSON {
  types: string;
}
