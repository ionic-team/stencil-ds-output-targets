import { ComponentCompilerMeta, Config } from '@stencil/core/internal';
import { generateProxies } from '../src/output-svelte';
import { PackageJSON, OutputTargetSvelte } from '../src/types';

describe('generateProxies', () => {
  const components: ComponentCompilerMeta[] = [];
  const config: Config = { outputTargets: [] };
  const componentCorePackage = 'component-library';
  const proxiesFile = '../component-library-svelte/src/proxies.ts';

  it('should include both polyfills and definCustomElements when both are true in the outputTarget', () => {
    const outputTarget: OutputTargetSvelte = {
      componentCorePackage,
      proxiesFile,
      includePolyfills: true,
      includeDefineCustomElements: true,
    };

    const output = generateProxies(config, components, outputTarget);
    expect(output.entry).toMatchSnapshot();
  });

  it('should include only defineCustomElements when includePolyfills is false in the outputTarget', () => {
    const outputTarget: OutputTargetSvelte = {
      componentCorePackage,
      proxiesFile,
      includePolyfills: false,
      includeDefineCustomElements: true,
    };

    const output = generateProxies(config, components, outputTarget);
    expect(output.entry).toMatchSnapshot();
  });

  it('should not include defineCustomElements or applyPolyfills if both are false in the outputTarget', () => {
    const outputTarget: OutputTargetSvelte = {
      componentCorePackage,
      proxiesFile,
      includePolyfills: false,
      includeDefineCustomElements: false,
    };

    const output = generateProxies(config, components, outputTarget);
    expect(output.entry).toMatchSnapshot();
  });
});
