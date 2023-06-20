import { ComponentCompilerMeta, Config } from '@stencil/core/internal';
import { createComponentDefinition, generateProxies, getPathToCorePackageLoader } from '../src/output-react';
import { PackageJSON, OutputTargetReact } from '../src/types';

describe('createComponentDefinition', () => {
  it('should create a React component with custom element support', () => {
    const output = createComponentDefinition(
      // @ts-ignore
      {
        properties: [],
        tagName: 'my-component',
        methods: [],
        events: [],
      },
      true,
      { proxiesFile: '', componentCorePackage: 'test_package' },
      ''
    );

    expect(output.indexContents[0]).toEqual(`import { MyComponent } from './MyComponent'`);
    expect(output.componentFileName).toEqual('MyComponent.ts');
    expect(output.componentFileContents).toEqual(`// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';


import { MyComponent as MyComponentCmp, defineCustomElement as defineCustomElementMyComponent } from 'test_package/components/my-component.js';
export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component', undefined, undefined, MyComponentCmp, defineCustomElementMyComponent);
`);
  });

  it('should create a React component without custom element support', () => {
    let cmpMeta = {
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    };

    const output = createComponentDefinition(
      // @ts-ignore
      cmpMeta,
      false,
      { proxiesFile: '', componentCorePackage: 'test_package' },
      ''
    );

    expect(output.indexContents[0]).toEqual(`import { MyComponent } from './MyComponent'`);
    expect(output.componentFileName).toEqual('MyComponent.ts');
    expect(output.componentFileContents).toEqual(`// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';


export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component');`);
  });
});

describe('generateProxies', () => {
  // @ts-ignore
  const components: ComponentCompilerMeta[] = [{ properties: [], tagName: 'my-component', methods: [], events: [] }];
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

    const generateProxiesOutput = generateProxies(config, components, pkgData, outputTarget, rootDir);

    expect(generateProxiesOutput.indexText).toEqual(
      `import { applyPolyfills, defineCustomElements } from 'component-library/dist/loader';

applyPolyfills().then(() => defineCustomElements());
import { MyComponent } from './MyComponent'

`
    );
  });

  it('should include only defineCustomElements when includePolyfills is false in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includePolyfills: false,
      includeDefineCustomElements: true,
    };

    const generateProxiesOutput = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(generateProxiesOutput.indexText).toEqual(
      `import { defineCustomElements } from 'component-library/dist/loader';

defineCustomElements();
import { MyComponent } from './MyComponent'

`
    );
    expect(generateProxiesOutput.componentExports[0].fileName).toEqual('MyComponent.ts');
    expect(generateProxiesOutput.componentExports[0].fileContents).toEqual(
      `// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library';

export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component');`
    );
  });

  it('should not include defineCustomElements or applyPolyfills if both are false in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includePolyfills: false,
      includeDefineCustomElements: false,
    };

    const generateProxiesOutput = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(generateProxiesOutput.indexText.trim()).toEqual(`import { MyComponent } from './MyComponent'`);
    expect(generateProxiesOutput.componentExports[0].fileName).toEqual('MyComponent.ts');
    expect(generateProxiesOutput.componentExports[0].fileContents.trim()).toEqual(`// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library';

export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component');`);
  });

  it('should include importCustomElements if true in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includeImportCustomElements: true,
    };

    const generateProxiesOutput = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(generateProxiesOutput.indexText.trim())
      .toEqual(`import { defineCustomElement as defineMyComponent } from 'component-library/components/my-component.js';

import { MyComponent } from './MyComponent'`);
    expect(generateProxiesOutput.componentExports[0].fileName).toEqual('MyComponent.ts');
    expect(generateProxiesOutput.componentExports[0].fileContents.trim()).toEqual(`// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library/components';

import { MyComponent as MyComponentCmp, defineCustomElement as defineCustomElementMyComponent } from 'component-library/components/my-component.js';
export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component', undefined, undefined, MyComponentCmp, defineCustomElementMyComponent);`);
  });

  it('should include importCustomElements with custom path if defined in outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includeImportCustomElements: true,
      customElementsDir: 'custom-dir/hello',
    };

    const generateProxiesOutput = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(generateProxiesOutput.indexText.trim())
      .toEqual(`import { defineCustomElement as defineMyComponent } from 'component-library/custom-dir/hello/my-component.js';

import { MyComponent } from './MyComponent'`);
    expect(generateProxiesOutput.componentExports[0].fileName).toEqual('MyComponent.ts');
    expect(generateProxiesOutput.componentExports[0].fileContents.trim()).toEqual(`// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import type { JSX } from 'component-library/custom-dir/hello';

import { MyComponent as MyComponentCmp, defineCustomElement as defineCustomElementMyComponent } from 'component-library/custom-dir/hello/my-component.js';
export const MyComponent = /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component', undefined, undefined, MyComponentCmp, defineCustomElementMyComponent);`);
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
