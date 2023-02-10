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

  it('should throw an error if directivesProxyFile is not set', () => {
    expect(() => {
      normalizeOutputTarget(config, {} as any);
    }).toThrow(new Error('directivesProxyFile is required. Please set it in the Stencil config.'));
  });

  it('should return defaults for excludeComponents and valueAccessorConfigs', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      directivesProxyFile: '/component-library-angular/src/components.ts',
    } as OutputTargetAngular);

    expect(results).toEqual({
      directivesProxyFile: '/component-library-angular/src/components.ts',
      excludeComponents: [],
      valueAccessorConfigs: [],
    });
  });
});
