export interface OutputTargetVue {
  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  componentModels?: ComponentModelConfig[];
  loaderDir?: string;
  includePolyfills?: boolean;
  includeDefineCustomElements?: boolean;
  routerLinkComponents?: string[];
  vetur?: boolean;
  docsFile?: string;
  veturTagsFile?: string;
  veturAttributesFile?: string;
}

export interface ComponentOptions {
  modelProp?: string;
  modelUpdateEvent?: string;
  routerLinkComponent?: boolean;
}

export interface ComponentModelConfig {
  elements: string | string[];
  event: string;
  targetAttr: string;
}

export interface PackageJSON {
  types: string;
}
