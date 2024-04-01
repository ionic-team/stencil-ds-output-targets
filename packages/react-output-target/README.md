# @stencil/react-output-target

Stencil can generate React class component wrappers for your web components. This allows your Stencil components to be used within a React application. The benefits of using Stencil's component wrappers over the standard web components include:

- Typings for your components
- JSX bindings for custom events (event names are renamed to match React's convention of `onEventName`)
- Tag names are renamed to match PascalCase convention.
- Adds support for property types outside of string and number (supports: functions, objects and arrays).

For a detailed guide on how to add the react output target to a project, visit: https://stenciljs.com/docs/react.

## Installation

```bash
npm install @stencil/react-output-target --save-dev
```

## Usage

In your `stencil.config.ts` add the following configuration to the `outputTargets` section:

```ts
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'demo',
  outputTargets: [
    reactOutputTarget({
      outDir: '../component-library-react/src/',
    }),
    {
      type: 'dist-custom-elements',
    },
  ],
};
```

## Config Options

| Property             | Description                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `outDir`             | The directory where the React components will be generated.                                                                 |
| `esModule`           | If `true`, the output target will generate ES module files for each React component wrapper. Defaults to `false`.           |
| `stencilPackageName` | The name of the package that exports the Stencil components. Defaults to the package.json detected by the Stencil compiler. |
