export interface OutputTargetAngular {
  componentCorePackage?: string;
  directivesProxyFile: string;
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
  valueAccessorConfigs?: AngularModelConfig[];
  excludeComponents?: string[];
}

export type ValueAccessorTypes = 'text' | 'radio' | 'select' | 'number' | 'boolean';

export interface AngularModelConfig {
  elementSelectors: string | string[];
  event: string;
  targetAttr: string;
  type: ValueAccessorTypes;
}

export interface PackageJSON {
  types: string;
}
