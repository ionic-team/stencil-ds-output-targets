export interface OutputTargetVue {
  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  componentModels?: ComponentModelConfig[];
  loaderDir?: string;
  includePolyfills?: boolean;
  includeDefineCustomElements?: boolean;
}

export interface ComponentModelConfig {
  elements: string | string[];
  event: string;
  targetAttr: string;
}

export interface PackageJSON {
  types: string;
}
