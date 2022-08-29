import { ComponentCompilerMeta } from '@stencil/core/internal';
import { generateProxies } from '../src/output-angular';
import { PackageJSON, OutputTargetAngular } from '../src/types';

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  };
  const rootDir: string = '';

  it('should use types from the component-library when it is provided to the config', () => {
    const outputTarget: OutputTargetAngular = {
      componentCorePackage: 'component-library',
      proxyDeclarationFile: '../component-library-angular/src/proxies.ts',
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(
      finalText.includes(`import { Components } from '../../angular-output-target/dist/types/components';`)
    ).toBeFalsy();
    expect(finalText.includes(`import { Components } from 'component-library';`)).toBeTruthy();
  });

  it('should use a relative path to types when a component-library is not provided', () => {
    const outputTarget: OutputTargetAngular = {
      proxyDeclarationFile: '../component-library-angular/src/proxies.ts',
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText.includes(`import { Components } from 'component-library';`)).toBeFalsy();
    expect(
      finalText.includes(`import { Components } from '../../angular-output-target/dist/types/components';`)
    ).toBeTruthy();
  });

  describe('when createSingleComponentAngularModules is true', () => {
    it('should throw an error if includeImportCustomElements is false', () => {
      const outputTarget: OutputTargetAngular = {
        proxyDeclarationFile: '../component-library-angular/src/proxies.ts',
        createSingleComponentAngularModules: true,
        includeImportCustomElements: false,
      };

      expect(() => {
        generateProxies(components, pkgData, outputTarget, rootDir);
      }).toThrow(
        new Error(
          'Generating single component Angular modules requires the "includeImportCustomElements" option to be set to true.'
        )
      );
    });

    it('should throw an error if includeImportCustomElements is undefined', () => {
      const outputTarget: OutputTargetAngular = {
        proxyDeclarationFile: '../component-library-angular/src/proxies.ts',
        createSingleComponentAngularModules: true,
      };

      expect(() => {
        generateProxies(components, pkgData, outputTarget, rootDir);
      }).toThrow(
        new Error(
          'Generating single component Angular modules requires the "includeImportCustomElements" option to be set to true.'
        )
      );
    });

    it('should create an Angular module for each component', () => {
      const outputTarget: OutputTargetAngular = {
        proxyDeclarationFile: '../component-library-angular/src/proxies.ts',
        includeImportCustomElements: true,
        createSingleComponentAngularModules: true,
        componentCorePackage: '@ionic/core'
      };

      components.push({
        tagName: 'my-component',
        componentClassName: 'MyComponent',
        properties: [],
        virtualProperties: [],
        events: [],
        methods: [],
      } as unknown as ComponentCompilerMeta);

      const finalText = generateProxies(components, pkgData, outputTarget, rootDir);

      expect(finalText.includes('export class MyComponentModule')).toBeTruthy();
    });
  });

  describe('when createSingleComponentAngularModules is false', () => {
    it('should not create an Angular module for each component', () => {
      const outputTarget: OutputTargetAngular = {
        proxyDeclarationFile: '../component-library-angular/src/proxies.ts',
        includeImportCustomElements: true,
        createSingleComponentAngularModules: false,
        componentCorePackage: '@ionic/core'
      };

      components.push({
        tagName: 'my-component',
        componentClassName: 'MyComponent',
        properties: [],
        virtualProperties: [],
        events: [],
        methods: [],
      } as unknown as ComponentCompilerMeta);

      const finalText = generateProxies(components, pkgData, outputTarget, rootDir);

      expect(finalText.includes('export class MyComponentModule')).toBeFalsy();
    });
  });
});
