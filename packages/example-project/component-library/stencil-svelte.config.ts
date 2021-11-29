import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget, ComponentModelConfig } from '@stencil/vue-output-target';
import { svelteOutputTarget, ComponentBindingConfig } from '@stencil/svelte-output-target';

const svelteComponentBindings: ComponentBindingConfig[] = [
  {
    elements: ['my-input', 'my-range'],
    event: 'myChange',
    targetProp: 'value',
  },
  {
    elements: ['my-checkbox'],
    event: 'myChange',
    targetProp: 'checked',
  },
  {
    elements: ['my-range', 'my-radio-group'],
    event: 'myChange',
    targetProp: 'value',
  },
];

export const config: Config = {
  namespace: 'component-library',
  taskQueue: 'async',
  outputTargets: [
    svelteOutputTarget({
      accessors: true,
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-svelte/src/proxies.ts',
      componentBindings: svelteComponentBindings,
    }),
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
    },
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
