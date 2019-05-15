export interface OutputTargetReact {
  type: 'react';

  componentCorePackage?: string;
  proxiesFile: string;
  excludeComponents?: string[];
  modulesDir?: string;
}

export interface PackageJSON {
  types: string;
}
