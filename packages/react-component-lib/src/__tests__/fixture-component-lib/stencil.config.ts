import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'demo-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
  ],
};
