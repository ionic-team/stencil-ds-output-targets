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
      directivesProxyFile: '../component-library-angular/src/proxies.ts',
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { EventEmitter as StencilEventEmitter } from '@stencil/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'component-library';
type StencilEventEmitterValueType<Type> = Type extends StencilEventEmitter<infer X> ? X : never

`,
    );
  });

  it('should use a relative path to types when a component-library is not provided', () => {
    const outputTarget: OutputTargetAngular = {
      directivesProxyFile: '../component-library-angular/src/proxies.ts',
    };

    const finalText = generateProxies(components, pkgData, outputTarget, rootDir);
    expect(finalText).toEqual(
      `/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { EventEmitter as StencilEventEmitter } from '@stencil/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '../../angular-output-target/dist/types/components';
type StencilEventEmitterValueType<Type> = Type extends StencilEventEmitter<infer X> ? X : never

`,
    );
  });

});
