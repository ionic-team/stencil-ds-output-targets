import type { Config, OutputTargetCustom } from '@stencil/core/internal';
import { normalizePath } from './utils';
import { angularDirectiveProxyOutput } from './output-angular';
import type { OutputTargetAngular } from './types';

export const angularOutputTarget = (outputTarget: OutputTargetAngular): OutputTargetCustom => ({
  type: 'custom',
  name: 'angular-library',
  validate(config) {
    return normalizeOutputTarget(config, outputTarget);
  },
  async generator(config, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan(`generate angular proxies started`, true);

    await angularDirectiveProxyOutput(compilerCtx, outputTarget, buildCtx.components, config);

    timespan.finish(`generate angular proxies finished`);
  },
});

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
    throw new Error('directivesProxyFile is required');
  }

  if (config.sys) {
    if (
      outputTarget.directivesProxyFile &&
      !config.sys?.isAbsolutePath(outputTarget.directivesProxyFile)
    ) {
      const proxyPath =
        config.sys.joinPaths(config.rootDir, outputTarget.directivesProxyFile) || '';
      results.directivesProxyFile = normalizePath(proxyPath);
    }

    if (
      outputTarget.directivesArrayFile &&
      !config.sys?.isAbsolutePath(outputTarget.directivesArrayFile)
    ) {
      const arrayPath =
        config.sys.joinPaths(config.rootDir, outputTarget.directivesArrayFile) || '';
      results.directivesArrayFile = normalizePath(arrayPath);
    }

    if (
      outputTarget.directivesUtilsFile &&
      !config.sys?.isAbsolutePath(outputTarget.directivesUtilsFile)
    ) {
      const utilsPath =
        config.sys.joinPaths(config.rootDir, outputTarget.directivesUtilsFile) || '';
      results.directivesUtilsFile = normalizePath(utilsPath);
    }
  }

  return results;
}
