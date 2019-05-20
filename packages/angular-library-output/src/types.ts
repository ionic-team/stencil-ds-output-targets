export interface OutputTargetAngular {
  componentCorePackage?: string;
  directivesProxyFile: string;
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
  ngModelConfigs?: NgModelConfig[];
  excludeComponents?: string[];
}

export interface NgModelConfig {
  elementSelectors: string | string[];
  event: string;
  targetAttr: string;
  type: 'text' | 'radio' | 'select' | 'number' | 'boolean';
}

export interface PackageJSON {
  types: string;
}
