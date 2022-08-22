export interface OutputTargetAngular {
  componentCorePackage?: string;
  /**
   * The relative path from the root directory of the Stencil library to the proxy file that will be generated.
   *
   * @deprecated Use `proxyDeclarationFile` instead. This property will be removed in an upcoming release.
   */
  directivesProxyFile?: string;
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
  /**
   * The relative path from the root directory of the Stencil library to the proxy file that will be generated.
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
