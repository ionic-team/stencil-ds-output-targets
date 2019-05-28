export interface OutputTargetAngular {
  componentCorePackage?: string;
  directivesProxyFile: string;
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
  valueAccessorConfigs?: ValueAccesorConfig[];
  excludeComponents?: string[];
}

export type ValueAccessorTypes = 'text' | 'radio' | 'select' | 'number' | 'boolean';

export interface ValueAccesorConfig {
  elementSelectors: string | string[];
  event: string;
  targetAttr: string;
  type: ValueAccessorTypes;
}

export interface PackageJSON {
  types: string;
}
