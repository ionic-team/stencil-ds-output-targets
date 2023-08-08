import type { Config, OutputTargetCustom } from '@stencil/core/internal';
import { normalizePath } from './utils';
import { angularDirectiveProxyOutput } from './output-angular';
import { OutputType, type OutputTargetAngular } from './types';
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
    customElementsDir: outputTarget.customElementsDir || 'components',
    outputType: outputTarget.outputType || OutputType.Component,
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }

  if (outputTarget.directivesProxyFile == null) {
    throw new Error('directivesProxyFile is required. Please set it in the Stencil config.');
  }

  if (outputTarget.directivesProxyFile && !path.isAbsolute(outputTarget.directivesProxyFile)) {
    results.directivesProxyFile = normalizePath(path.join(config.rootDir, outputTarget.directivesProxyFile));
  }

  if (outputTarget.directivesArrayFile && !path.isAbsolute(outputTarget.directivesArrayFile)) {
    results.directivesArrayFile = normalizePath(path.join(config.rootDir, outputTarget.directivesArrayFile));
  }

  if ((outputTarget as any).includeSingleComponentAngularModules !== undefined) {
    throw new Error(
      "The 'includeSingleComponentAngularModules' option has been removed. Please use 'outputType' instead."
    );
  }

  if (outputTarget.outputType === OutputType.Scam) {
    console.warn(
      `**Experimental**: outputType: "${OutputType.Scam}" is a developer preview feature and may change or be removed in the future.`
    );
  }

  return results;
}
