import { describe, it, expect } from 'vitest';
import { reactOutputTarget } from './react-output-target';

describe('reactOutputTarget', () => {
  it('should throw an error if the output target dist-custom-elements is not configured', () => {
    const { validate } = reactOutputTarget({
      outDir: 'dist/components',
    });

    if (validate) {
      expect(() =>
        validate(
          {
            outputTargets: [],
          } as any,
          []
        )
      ).toThrowError(
        `The 'react-output-target' requires 'dist-custom-elements' output target. Add { type: 'dist-custom-elements' }, to the outputTargets config.`
      );
    }
  });

  it('should throw an error if the package.json file cannot be found', () => {
    const { validate } = reactOutputTarget({
      outDir: 'dist/components',
    });

    if (validate) {
      expect(() =>
        validate(
          {
            outputTargets: [
              {
                type: 'dist-custom-elements',
              },
            ],
          } as any,
          []
        )
      ).toThrowError(
        'Unable to find the package name in the package.json file: undefined. Please provide the stencilPackageName manually to the react-output-target output target.'
      );
    }
  });

  it('should not throw an error if the package name is provided', () => {
    const { validate } = reactOutputTarget({
      outDir: 'dist/components',
      stencilPackageName: 'my-components',
    });

    if (validate) {
      expect(() =>
        validate(
          {
            outputTargets: [
              {
                type: 'dist-custom-elements',
              },
            ],
          } as any,
          []
        )
      ).not.toThrowError();
    }
  });

  it('uses the customElementsDir provided by the caller instead of the calculated value', () => {
    const { validate, __internal_getCustomElementsDir } = reactOutputTarget({
      outDir: 'dist/components',
      stencilPackageName: 'my-components',
      customElementsDir: 'my-custom-dir',
    });

    if (validate) {
      const config = {
        outputTargets: [
          {
            type: 'dist-custom-elements',
            dir: 'my-components',
          },
        ],
      } as any;

      validate(config, []);

      expect(__internal_getCustomElementsDir()).toBe('my-custom-dir');
    }
  });
});
