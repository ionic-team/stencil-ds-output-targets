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
    }).toThrow(new Error('rootDir is not set and it should be set by Stencil'));
  });

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget(config, {});
    }).toThrow(new Error('`directivesProxyFile` must be set in stencil.config.ts'));
  });

  it('should return defaults for excludeComponents and valueAccessorConfig', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      directivesProxyFile: '/component-library-angular/src/components.ts',
    });

    expect(results).toEqual({
      directivesProxyFile: '/component-library-angular/src/components.ts',
      excludeComponents: [],
      valueAccessorConfig: [],
    } as OutputTargetAngular);
  });
});
