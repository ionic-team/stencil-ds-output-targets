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
    }, true);
    expect(output[0]).toEqual(`export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component', undefined, undefined, MyComponentCmp);`);
  });

  it('should create a React component without custom element support', () => {
    const output = createComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    });
    expect(output[0]).toEqual(`export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component');`);
  });
});

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  };
  const rootDir: string = '';
  const config: Config = { outputTargets: [] };

  it('should include both polyfills and definCustomElements when both are true in the outputTarget', () => {
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
