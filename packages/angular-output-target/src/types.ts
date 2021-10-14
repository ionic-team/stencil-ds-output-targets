export interface OutputTargetAngular {
  componentCorePackage?: string;
  directivesProxyFile: string;
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
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
