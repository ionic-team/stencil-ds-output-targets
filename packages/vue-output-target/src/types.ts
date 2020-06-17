export interface OutputTargetVue {
  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  loaderDir?: string;
}

export interface PackageJSON {
  types: string;
}
