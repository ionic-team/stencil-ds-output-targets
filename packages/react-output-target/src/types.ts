export interface OutputTargetReact {
  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  loaderDir?: string;
  skipRegister?: boolean;
}

export interface PackageJSON {
  types: string;
}
