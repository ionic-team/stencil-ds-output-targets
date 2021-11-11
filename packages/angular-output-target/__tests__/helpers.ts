import { Config } from '@stencil/core/internal';
import { relative, normalize, dirname, basename, isAbsolute, join } from 'path';

export const createTestingSystem = (): Config => {
  return {
    rootDir: '/dev/',
    sys: {
      resolvePath: normalize,
      relative: relative,
      dirname: dirname,
      basename: basename,
      isAbsolutePath: isAbsolute,
      joinPaths: join,
    },
  } as Config;
};
