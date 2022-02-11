import type { Config, OutputTargetCustom } from '@stencil/core/internal';
import { normalizePath } from './utils';
import { angularDirectiveProxyOutput } from './output-angular';
import type { OutputTargetAngular } from './types';
import path from 'path';

export const angularOutputTarget = (outputTarget: OutputTargetAngular): OutputTargetCustom => ({
  type: 'custom',
  name: 'angular-library',
  validate(config) {
    return normalizeOutputTarget(config, outputTarget);
  },
  async generator(config, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan(`generating angular component wrappers`, true);

    await angularDirectiveProxyOutput(compilerCtx, outputTarget, buildCtx.components, config);

    timespan.finish(`finished generating angular component wrappers`);
  },
});

/**
 * Normalizes an object of config file paths and sets the absolute file path
 * onto the original output target instance.
 */
const normalizePaths = (config: Config, outputTarget: OutputTargetAngular, paths: { [key in keyof OutputTargetAngular]: string }) => {
  for (const [key, value] of Object.entries(paths)) {
    if (value && !path.isAbsolute(value)) {
      (outputTarget as any)[key] = normalizePath(path.join(config.rootDir!, value));
    }
  }
}

export function normalizeOutputTarget(config: Config, outputTarget: any) {
  const results: OutputTargetAngular = {
    ...outputTarget,
    excludeComponents: outputTarget.excludeComponents || [],
    valueAccessorConfig: outputTarget.valueAccessorConfig || [],
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }

  if (outputTarget.directivesProxyFile == null) {
    throw new Error('`directivesProxyFile` must be set in stencil.config.ts');
  }

  normalizePaths(config, results, {
    directivesProxyFile: outputTarget.directivesProxyFile,
    directivesArrayFile: outputTarget.directivesArrayFile,
    directivesUtilsFile: outputTarget.directivesUtilsFile,
  });

  return results;
}
