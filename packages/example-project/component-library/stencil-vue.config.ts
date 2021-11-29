import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget, ComponentModelConfig } from '@stencil/vue-output-target';
import { svelteOutputTarget, ComponentBindingConfig } from '@stencil/svelte-output-target';

const vueComponentModels: ComponentModelConfig[] = [
  {
    elements: ['my-input', 'my-range'],
    event: 'myChange',
    targetAttr: 'value',
  },
  {
    elements: ['my-checkbox'],
    event: 'myChange',
    targetAttr: 'checked',
  },
  {
    elements: ['my-range', 'my-radio-group'],
    event: 'myChange',
    targetAttr: 'value',
  },
];

export const config: Config = {
  namespace: 'component-library',
  taskQueue: 'async',
  outputTargets: [
    vueOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-vue/src/proxies.ts',
      componentModels: vueComponentModels,
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
