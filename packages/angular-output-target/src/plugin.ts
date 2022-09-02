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
    const timespan = buildCtx.createTimeSpan(`generate angular proxies started`, true);

    await angularDirectiveProxyOutput(compilerCtx, outputTarget, buildCtx.components, config);

    timespan.finish(`generate angular proxies finished`);
  },
});

export function normalizeOutputTarget(config: Config, outputTarget: OutputTargetAngular) {
  const results: OutputTargetAngular = {
    ...outputTarget,
    excludeComponents: outputTarget.excludeComponents || [],
    valueAccessorConfigs: outputTarget.valueAccessorConfigs || [],
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }

  if ((outputTarget as any).directivesProxyFile !== undefined) {
    throw new Error('directivesProxyFile has been removed. Use proxyDeclarationFile instead.');
  }

  if (outputTarget.proxyDeclarationFile == null) {
    throw new Error('proxyDeclarationFile is required. Please set it in the Stencil config.');
  }

  if (outputTarget.proxyDeclarationFile && !path.isAbsolute(outputTarget.proxyDeclarationFile)) {
    results.proxyDeclarationFile = normalizePath(path.join(config.rootDir, outputTarget.proxyDeclarationFile));
  }

  if (outputTarget.directivesArrayFile && !path.isAbsolute(outputTarget.directivesArrayFile)) {
    results.directivesArrayFile = normalizePath(path.join(config.rootDir, outputTarget.directivesArrayFile));
  }

  if (outputTarget.directivesUtilsFile && !path.isAbsolute(outputTarget.directivesUtilsFile)) {
    results.directivesUtilsFile = normalizePath(path.join(config.rootDir, outputTarget.directivesUtilsFile));
  }

  return results;
}
