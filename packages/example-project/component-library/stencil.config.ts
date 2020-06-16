import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['my-input'],
    event: 'ionChange',
    targetAttr: 'value',
    type: 'text',
  },
];

export const config: Config = {
  namespace: 'component-library',
  taskQueue: 'async',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'component-library',
      directivesProxyFile: '../component-library-angular/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    reactOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
