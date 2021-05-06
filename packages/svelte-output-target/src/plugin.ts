import type { Config, OutputTargetCustom } from '@stencil/core/internal';
import path from 'path';
import { normalizePath } from './utils';
import type { OutputTargetSvelte } from './types';
import { svelteProxyOutput } from './output-svelte';

export const normalizeOutputTarget = (config: Config, outputTarget: any) => {
  const results: OutputTargetSvelte = {
    ...outputTarget,
    excludeComponents: outputTarget.excludeComponents || [],
    componentModels: outputTarget.componentModels || [],
    includePolyfills: outputTarget.includePolyfills ?? true,
    includeDefineCustomElements: outputTarget.includeDefineCustomElements ?? true,
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }

  if (outputTarget.proxiesFile == null) {
    throw new Error('proxiesFile is required');
  }

  if (outputTarget.directivesProxyFile && !path.isAbsolute(outputTarget.directivesProxyFile)) {
    results.proxiesFile = normalizePath(path.join(config.rootDir, outputTarget.proxiesFile));
  }

  return results;
};

export const svelteOutputTarget = (outputTarget: OutputTargetSvelte): OutputTargetCustom => ({
  type: 'custom',
  name: 'svelte-library',
  validate(config) {
    return normalizeOutputTarget(config, outputTarget);
  },
  async generator(config, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan('generate svelte started', true);

    await svelteProxyOutput(config, compilerCtx, outputTarget, buildCtx.components);

    timespan.finish('generate svelte finished');
  },
});
