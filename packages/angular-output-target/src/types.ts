export interface OutputTargetAngular {
  /**
   * The package name of the component library.
   * This is used to generate the import statements.
   */
  componentCorePackage: string;
  /**
   * @deprecated Use `proxyDeclarationFile` instead. This property has been replaced.
   */
  directivesProxyFile?: string; // TODO: Remove this type once the example project uses the local dep vs. remote.
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
  /**
   * The path to the proxy file that will be generated. This can be an absolute path
   * or a relative path from the root directory of the Stencil library.
   */
  proxyDeclarationFile: string;
  valueAccessorConfigs?: ValueAccessorConfig[];
  excludeComponents?: string[];
  includeImportCustomElements?: boolean;
  customElementsDir?: string;
}

export type ValueAccessorTypes = 'text' | 'radio' | 'select' | 'number' | 'boolean';

export interface ValueAccessorConfig {
  elementSelectors: string | string[];
  event: string;
  targetAttr: string;
  type: ValueAccessorTypes;
}

export interface PackageJSON {
  types: string;
}
