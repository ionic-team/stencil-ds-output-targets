export interface OutputTargetReact {
  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  modulesDir?: string;
}

export interface PackageJSON {
  types: string;
}
