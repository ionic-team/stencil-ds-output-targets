import { Config } from '@stencil/core/internal';
import { OutputTargetAngular } from '../src/types';
import { normalizeOutputTarget } from '../src/plugin';

describe('normalizeOutputTarget', () => {
  const config: Config = {
    rootDir: '/dev/',
  };

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget({}, {});
    }).toThrow(new Error('rootDir is not set and it should be set by stencil itself'));
  });

  it('should throw an error if proxyDeclarationFile and directivesProxyFile is not set', () => {
    expect(() => {
      normalizeOutputTarget(config, {});
    }).toThrow(new Error('proxyDeclarationFile is required. Please set it in the Stencil config.'));
  });

  it('should return defaults for excludeComponents and valueAccessorConfig', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      proxyDeclarationFile: '/component-library-angular/src/components.ts',
    });

    expect(results).toEqual({
      proxyDeclarationFile: '/component-library-angular/src/components.ts',
      excludeComponents: [],
      valueAccessorConfig: [],
    } as OutputTargetAngular);
  });
});
