export interface OutputTargetSvelte {
  componentCorePackage?: string;
  legacy?: boolean;
  proxiesFile: string;
  excludeComponents?: string[];
  accessors?: boolean;
  componentBindings?: ComponentBindingConfig[];
  loaderDir?: string;
  includePolyfills?: boolean;
  includeDefineCustomElements?: boolean;
}

export interface ComponentBindingConfig {
  elements: string | string[];
  event: string;
  targetProp: string;
}

export interface PackageJSON {
  types: string;
}
