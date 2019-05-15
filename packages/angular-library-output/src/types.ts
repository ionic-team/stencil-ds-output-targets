export interface OutputTargetAngular {
  type: 'angular';

  componentCorePackage?: string;
  directivesProxyFile: string;
  directivesArrayFile?: string;
  directivesUtilsFile?: string;
  excludeComponents?: string[];
}

export interface PackageJSON {
  types: string;
}
