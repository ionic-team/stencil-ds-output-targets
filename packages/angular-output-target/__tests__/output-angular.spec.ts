import type { ComponentCompilerMeta, Config, CopyTask } from '@stencil/core/internal';
import type { PackageJSON, OutputTargetAngular } from '../src/types';
import { generateProxies } from '../src/output-angular';
import { createTestingSystem } from './helpers';

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const pkgData: PackageJSON = {
    types: 'dist/types/index.d.ts',
  };
  const rootDir: string = '';
  const config = createTestingSystem();

  it('should use types from the component-library when it is provided to the config', () => {
    const outputTarget: OutputTargetAngular = {
      componentCorePackage: 'component-library',
      directivesProxyFile: '../component-library-angular/src/proxies.ts',
    };

    const finalText = generateProxies(
      components,
      pkgData,
      outputTarget,
      rootDir,
      config,
      {} as any,
    );
    expect(finalText).toEqual(
      `/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'component-library';

`,
    );
  });

  it('should use a relative path to types when a component-library is not provided', () => {
    const outputTarget: OutputTargetAngular = {
      directivesProxyFile: '../component-library-angular/src/proxies.ts',
    };

    const finalText = generateProxies(
      components,
      pkgData,
      outputTarget,
      rootDir,
      config,
      {} as any,
    );
    expect(finalText).toEqual(
      `/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '../component-library-angular/dist/types/components';

`,
    );
  });
});
