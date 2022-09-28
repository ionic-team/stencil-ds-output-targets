import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget, ComponentModelConfig } from '@stencil/vue-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['my-input[type=text]'],
    event: 'myChange',
    targetAttr: 'value',
    type: 'text',
  },
  {
    elementSelectors: ['my-input[type=number]'],
    event: 'myChange',
    targetAttr: 'value',
    type: 'number',
  },
  {
    elementSelectors: ['my-checkbox'],
    event: 'myChange',
    targetAttr: 'checked',
    type: 'boolean',
  },
  {
    elementSelectors: ['my-range', 'my-radio-group'],
    event: 'myChange',
    targetAttr: 'value',
    type: 'select',
  },
];

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
    angularOutputTarget({
      componentCorePackage: 'component-library',
      directivesProxyFile: '../component-library-angular/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
      includeImportCustomElements: true
    }),
    reactOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/components.ts',
    }),
    vueOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-vue/src/proxies.ts',
      componentModels: vueComponentModels,
    }),
    {
      type: 'dist-custom-elements',
      dir: 'components'
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
