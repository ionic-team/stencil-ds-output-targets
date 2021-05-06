import { Config } from '@stencil/core/internal';
import { OutputTargetReact } from '../src/types';
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

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget(config, {});
    }).toThrow(new Error('proxiesFile is required'));
  });

  it('should return defaults for excludedComponents, includePolyfills, and includeDefineCustomElements', () => {
    const results: OutputTargetReact = normalizeOutputTarget(config, {
      proxiesFile: '../component-library-react/src/components.ts',
    });

    expect(results).toEqual({
      proxiesFile: '../component-library-react/src/components.ts',
      excludeComponents: [],
      includePolyfills: true,
      includeDefineCustomElements: true,
    } as OutputTargetReact);
  });

  it('Polyfills and DefinCustomElements should be false when set that way', () => {
    const results: OutputTargetReact = normalizeOutputTarget(config, {
      proxiesFile: '../component-library-react/src/components.ts',
      includePolyfills: false,
      includeDefineCustomElements: false,
    });

    expect(results.includeDefineCustomElements).toEqual(false);
    expect(results.includeDefineCustomElements).toEqual(false);
  });

  it('Polyfills and DefinCustomElements should be true when set that way', () => {
    const results: OutputTargetReact = normalizeOutputTarget(config, {
      proxiesFile: '../component-library-react/src/components.ts',
      includePolyfills: true,
      includeDefineCustomElements: true,
    });

    expect(results.includeDefineCustomElements).toEqual(true);
    expect(results.includeDefineCustomElements).toEqual(true);
  });
});
