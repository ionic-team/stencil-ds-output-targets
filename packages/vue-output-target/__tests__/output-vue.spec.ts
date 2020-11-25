import { ComponentCompilerMeta } from '@stencil/core/internal';
import { generateProxies } from '../src/output-vue';
import { PackageJSON, OutputTargetVue } from '../src/types';

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  };
  const rootDir: string = '';

  it('should include both polyfills and definCustomElements when both are true in the outputTarget', () => {
    const outputTarget: OutputTargetVue = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-vue/src/proxies.ts',
      includePolyfills: true,
      includeDefineCustomElements: true,
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

import { Components } from 'component-library';

import { applyPolyfills, defineCustomElements } from 'component-library/loader';

applyPolyfills().then(() => defineCustomElements());

const customElementTags: string[] = [

];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];


`,
    );
  });

  it('should include only defineCustomElements when includePolyfills is false in the outputTarget', () => {
    const outputTarget: OutputTargetVue = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-vue/src/proxies.ts',
      includePolyfills: false,
      includeDefineCustomElements: true,
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

import { Components } from 'component-library';

import { defineCustomElements } from 'component-library/loader';

defineCustomElements();

const customElementTags: string[] = [

];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];


`,
    );
  });

  it('should not include defineCustomElements or applyPolyfills if both are false in the outputTarget', () => {
    const outputTarget: OutputTargetVue = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-vue/src/proxies.ts',
      includePolyfills: false,
      includeDefineCustomElements: false,
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

import { Components } from 'component-library';




const customElementTags: string[] = [

];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];


`,
    );
  });
});
