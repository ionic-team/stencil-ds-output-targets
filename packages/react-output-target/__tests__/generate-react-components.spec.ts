import { ComponentCompilerMeta, Config } from '@stencil/core/internal';
import { createComponentDefinition, generateProxies, getPathToCorePackageLoader } from '../src/output-react';
import { PackageJSON, OutputTargetReact } from '../src/types';

describe('createComponentDefinition', () => {
  it('should create a React component with custom element support', () => {
    const output = createComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    }, {
      includeImportCustomElements: true
    });
    expect(output[0]).toEqual(`export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component', undefined, undefined, defineMyComponent);`);
  });

  it('should create a React component without custom element support', () => {
    const output = createComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    }, {});
    expect(output[0]).toEqual(`export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component');`);
  });

  it('should create a React component with a prefix', () => {
    const output = createComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    }, {
      componentNameFormatter: (suggestedName: string, _) => {
        return `Prefixed${suggestedName}`;
      },
    });
    expect(output[0]).toEqual(`export const PrefixedMyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component');`);
  });

  const validFormatters = [
    (suggestedName: string, _) => `Prefixed${suggestedName}`,
    (suggestedName: string, _) => `_${suggestedName}`,
    (suggestedName: string, _) => suggestedName,
    (suggestedName: string, _) => `$${suggestedName}$`,
  ];

  test.each(validFormatters)('should for the react component name with valid formatters', (componentNameFormatter) => {
    createComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    }, {
      componentNameFormatter
    });
  });

  const invalidFormatters = [
    (suggestedName: string, _) => `.${suggestedName}`,
    (suggestedName: string, _) => `Test ${suggestedName}`,
    (_suggestedName: string, _) => ``,
    (_suggestedName: string, _) => ` `,
    (_suggestedName: string, _) => `eval`,
    (_suggestedName: string, _) => null,
    (_suggestedName: string, _) => `x x`,
    (_suggestedName: string, _) => `no-dashes`,
  ];

  test.each(invalidFormatters)('should error with an invalid react component name', (componentNameFormatter) => {
    expect(() => {
      createComponentDefinition({
        properties: [],
        tagName: 'my-component',
        methods: [],
        events: [],
      }, {
        componentNameFormatter
      });

    }).toThrowError();
  });
});

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  };
  const rootDir: string = '';
  const config: Config = { outputTargets: [] };

  it('should include both polyfills and defineCustomElements when both are true in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includePolyfills: true,
      includeDefineCustomElements: true,
    };

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library';

import { applyPolyfills, defineCustomElements } from 'component-library/dist/loader';

applyPolyfills().then(() => defineCustomElements());

`,
    );
  });

  it('should include only defineCustomElements when includePolyfills is false in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includePolyfills: false,
      includeDefineCustomElements: true,
    };

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library';

import { defineCustomElements } from 'component-library/dist/loader';

defineCustomElements();

`,
    );
  });

  it('should not include defineCustomElements or applyPolyfills if both are false in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includePolyfills: false,
      includeDefineCustomElements: false,
    };

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library';




`,
    );
  });

  it('should include importCustomElements if true in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includeImportCustomElements: true,
    };

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library/components';




`,
    );
  });

  it('should include importCustomElements with custom path if defined in outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includeImportCustomElements: true,
      customElementsDir: 'custom-dir/hello'
    };

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library/custom-dir/hello';




`,
    );
  });
});

describe('getPathToCorePackageLoader', () => {
  let config: Config;
  let outputTarget: OutputTargetReact;

  beforeEach(() => {
    config = { outputTargets: [], rootDir: '/User/app/root' };
    outputTarget = {
      componentCorePackage: 'my-library',
      proxiesFile: '../my-library-react/src/proxies.ts',
    };
  });

  it('should use default w/ null output targets', () => {
    config.outputTargets = null;
    const p = getPathToCorePackageLoader(config, outputTarget);
    expect(p).toBe('my-library/dist/loader');
  });

  it('should use default w/ no output targets', () => {
    config.outputTargets = [];
    const p = getPathToCorePackageLoader(config, outputTarget);
    expect(p).toBe('my-library/dist/loader');
  });

  it('should use default w/ no dist output target', () => {
    config.outputTargets = [
      {
        type: 'www',
      },
    ];
    const p = getPathToCorePackageLoader(config, outputTarget);
    expect(p).toBe('my-library/dist/loader');
  });

  it('should use default w/ dist output target but no esmLoaderPath', () => {
    config.outputTargets = [
      {
        type: 'dist',
      },
    ];
    const p = getPathToCorePackageLoader(config, outputTarget);
    expect(p).toBe('my-library/dist/loader');
  });

  it('should use default w/ dist output target esmLoaderPath not absolute path', () => {
    config.outputTargets = [
      {
        type: 'dist',
        esmLoaderPath: '../custom-loader-dir',
      },
    ];
    const p = getPathToCorePackageLoader(config, outputTarget);
    expect(p).toBe('my-library/dist/loader');
  });

  it('should use esmLoaderPath from dist output target that is an absolute path', () => {
    config.outputTargets = [
      {
        type: 'dist',
        esmLoaderPath: '/User/app/root/custom-loader-dir',
      },
    ];
    const p = getPathToCorePackageLoader(config, outputTarget);
    expect(p).toBe('my-library/custom-loader-dir');
  });

  it('should use loaderDir', () => {
    config.outputTargets = [
      {
        type: 'dist',
        esmLoaderPath: '/User/app/root/custom-loader-dir',
      },
    ];
    outputTarget.loaderDir = 'my-loader-dir';
    const p = getPathToCorePackageLoader(config, outputTarget);
    expect(p).toBe('my-library/my-loader-dir');
  });
});
