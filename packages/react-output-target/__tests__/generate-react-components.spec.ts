import { ComponentCompilerMeta } from '@stencil/core/internal';
import { generateProxies } from '../src/output-react';
import { PackageJSON, OutputTargetReact } from '../src/types';

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  };
  const rootDir: string = '';
  beforeEach(() => {});

  it('should include both polyfills and definCustomElements when both are true in the outputTarget', () => {
    const outputTarget: OutputTargetReact = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/proxies.ts',
      includePolyfills: true,
      includeDefineCustomElements: true,
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import { JSX } from 'component-library';

import { applyPolyfills, defineCustomElements } from 'component-library/loader';

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

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import { JSX } from 'component-library';

import { defineCustomElements } from 'component-library/loader';

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

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import { JSX } from 'component-library';




`,
    );
  });
});
