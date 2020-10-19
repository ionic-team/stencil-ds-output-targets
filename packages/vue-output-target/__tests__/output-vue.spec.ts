import { ComponentCompilerMeta } from '@stencil/core/internal';
import { generateProxies, generateVetur } from '../src/output-vue';
import { PackageJSON, OutputTargetVue } from '../src/types';

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  };
  const rootDir: string = '';
  const config: Config = { outputTargets: [] };

  it('should include both polyfills and definCustomElements when both are true in the outputTarget', () => {
    const outputTarget: OutputTargetVue = {
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-vue/src/proxies.ts',
      includePolyfills: true,
      includeDefineCustomElements: true,
    };

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from 'component-library';

import { applyPolyfills, defineCustomElements } from 'component-library/dist/loader';

applyPolyfills().then(() => defineCustomElements());

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

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from 'component-library';

import { defineCustomElements } from 'component-library/dist/loader';

defineCustomElements();

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

    const finalText = generateProxies(config, components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import type { JSX } from 'component-library';




`,
    );
  });
});

describe('generateVetur', () => {
  it('should generate vetur output files', () => {
    const docsJson = {
      "timestamp": "2020-10-19T22:05:00",
      "compiler": {
        "name": "@stencil/core",
        "version": "1.17.3",
        "typescriptVersion": "3.9.7"
      },
      "components": [
        {
          "filePath": "./src/components/my-button/my-button.tsx",
          "encapsulation": "shadow",
          "tag": "my-button",
          "readme": "# ion-button\n\n\n",
          "docs": "My button description",
          "docsTags": [],
          "usage": {},
          "props": [
            {
              "name": "buttonType",
              "type": "string",
              "mutable": true,
              "attr": "button-type",
              "reflectToAttr": false,
              "docs": "The type of button.",
              "docsTags": [],
              "default": "'button'",
              "values": [
                {
                  "type": "string"
                }
              ],
              "optional": false,
              "required": false
            },
            {
              "name": "color",
              "type": "string",
              "mutable": false,
              "attr": "color",
              "reflectToAttr": false,
              "docs": "The color to use from your application's color palette.",
              "docsTags": [],
              "values": [
                {
                  "type": "string"
                }
              ],
              "optional": true,
              "required": false
            },
            {
              "name": "disabled",
              "type": "boolean",
              "mutable": false,
              "attr": "disabled",
              "reflectToAttr": true,
              "docs": "If true, the user cannot interact with the button.",
              "docsTags": [],
              "default": "false",
              "values": [
                {
                  "type": "boolean"
                }
              ],
              "optional": false,
              "required": false
            }
          ],
          "methods": [],
          "events": [],
          "listeners": [],
          "styles": [],
          "slots": [],
          "parts": [],
          "dependents": [],
          "dependencies": [],
          "dependencyGraph": {}
        },
        {
          "filePath": "./src/components/my-card/my-card.tsx",
          "encapsulation": "shadow",
          "tag": "my-card",
          "readme": "# ion-card\n\n\n",
          "docs": "My card description",
          "docsTags": [],
          "usage": {},
          "props": [
            {
              "name": "color",
              "type": "string",
              "mutable": false,
              "attr": "color",
              "reflectToAttr": false,
              "docs": "The color to use from your application's color palette.",
              "docsTags": [],
              "values": [
                {
                  "type": "string"
                }
              ],
              "optional": true,
              "required": false
            }
          ],
          "methods": [],
          "events": [],
          "listeners": [],
          "styles": [],
          "slots": [],
          "parts": [],
          "dependents": [],
          "dependencies": [],
          "dependencyGraph": {}
        },
      ]
    };

    const { veturTags, veturAttributes } = generateVetur(docsJson, [{ tagName: 'my-button' }]);

    const tagsKeys = Object.keys(veturTags);
    const attributeKeys = Object.keys(veturAttributes);

    expect(tagsKeys).toEqual(['my-button']);
    expect(attributeKeys).toEqual(['my-button/buttonType', 'my-button/color', 'my-button/disabled']);
  });
});
