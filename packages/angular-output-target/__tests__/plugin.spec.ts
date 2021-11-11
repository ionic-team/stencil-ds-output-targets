import { Config } from '@stencil/core/internal';
import { OutputTargetAngular } from '../src/types';
import { normalizeOutputTarget } from '../src/plugin';
import { createTestingSystem } from './helpers';

describe('normalizeOutputTarget', () => {
  const config = createTestingSystem();

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget({}, {});
    }).toThrow(new Error('rootDir is not set and it should be set by stencil itself'));
  });

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget(config, {});
    }).toThrow(new Error('directivesProxyFile is required'));
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
