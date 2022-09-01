import { Config } from '@stencil/core/internal';
import { OutputTargetAngular } from '../src/types';
import { normalizeOutputTarget } from '../src/plugin';

describe('normalizeOutputTarget', () => {
  const config: Config = {
    rootDir: '/dev/',
  };

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget({}, {} as any);
    }).toThrow(new Error('rootDir is not set and it should be set by stencil itself'));
  });

  it('should throw an error if proxyDeclarationFile', () => {
    expect(() => {
      normalizeOutputTarget(config, {} as any);
    }).toThrow(new Error('proxyDeclarationFile is required. Please set it in the Stencil config.'));
  });

  it('should throw an error if directivesProxyFile is defined', () => {
    expect(() => {
      normalizeOutputTarget(config, {
        directivesProxyFile: '/example-path',
      } as any);
    }).toThrow(new Error('directivesProxyFile has been removed. Use proxyDeclarationFile instead.'));
  });

  it('should return defaults for excludeComponents and valueAccessorConfigs', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      proxyDeclarationFile: '/component-library-angular/src/components.ts',
    } as OutputTargetAngular);

    expect(results).toEqual({
      proxyDeclarationFile: '/component-library-angular/src/components.ts',
      excludeComponents: [],
      valueAccessorConfigs: [],
    });
  });
});
