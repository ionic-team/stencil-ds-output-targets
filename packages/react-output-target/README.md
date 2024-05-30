# @stencil/react-output-target

Automate the creation of React component wrappers for your Stencil web components.

This package includes an output target for code generation that allows developers to generate a React component wrapper for each Stencil component and a minimal runtime package built around [@lit/react](https://www.npmjs.com/package/@lit/react) that is required to use the generated React components in your React library or application.

## Features

- ♻️ Automate the generation of React component wrappers for Stencil components
- 🌐 Generate React functional component wrappers with JSX bindings for custom events and properties
- ⌨️ Typings and auto-completion for React components in your IDE

## Setup

### Your Stencil Component Library

Install the `@stencil/react-output-target` package in your Stencil project as a development dependency:

```bash
npm install @stencil/react-output-target --save-dev
```

Configure the output target in your `stencil.config.ts` file:

```ts
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  outputTargets: [
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../path-to-react-library-or-app/src/',
    }),
    // dist-custom-elements output target is required for the React output target
    { type: 'dist-custom-elements' },
  ],
};
```

Build your Stencil project to generate the React component wrappers:

```bash
npm run build
```

The component wrappers will be generated in the specified output directory.

### Your React Application or Library

Install the `@stencil/react-output-target` runtime package in your React project:

```bash
npm install @stencil/react-output-target
```

> **Note:** The `@stencil/react-output-target` runtime package is required to use the generated React component wrappers. This package must be a dependency in your React project.

Verify or update your `tsconfig.json` file to include the following settings:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler"
  }
}
```

> `moduleResolution": "bundler"` is required to resolve the secondary entry points in the `@stencil/react-output-target` runtime package. You can learn more about this setting in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution).

Verify or install Typescript v5.0 or later in your project:

```bash
npm install typescript@5 --save-dev
```

That's it! You can now import and use your Stencil components as React components in your React application or library.

## Output Target Options

| Property                | Description                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `outDir` (required)     | The directory where the React components will be generated.                                                                                                    |
| `esModule`              | If `true`, the output target will generate a separate ES module for each React component wrapper. Defaults to `false`.                                         |
| `stencilPackageName`    | The name of the package that exports the Stencil components. Defaults to the package.json detected by the Stencil compiler.                                    |
| `excludeComponents`     | An array of component tag names to exclude from the React output target. Useful if you want to prevent certain web components from being in the React library. |
| `experimentalUseClient` | If `true`, the generated output target will include the [`use client;`](https://react.dev/reference/react/use-client) directive.                               |
