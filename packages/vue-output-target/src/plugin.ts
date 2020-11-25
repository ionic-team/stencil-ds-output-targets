import { Config, OutputTargetCustom } from '@stencil/core/internal';
import { normalizePath } from './utils';
import { OutputTargetVue } from './types';
import { vueProxyOutput } from './output-vue';
import path from 'path';

export const vueOutputTarget = (outputTarget: OutputTargetVue): OutputTargetCustom => ({
  type: 'custom',
  name: 'vue-library',
  validate(config) {
    return normalizeOutputTarget(config, outputTarget);
  },
  async generator(config, compilerCtx, buildCtx) {
    const normalizedOutputTarget = normalizeOutputTarget(config, outputTarget) as Required<
      OutputTargetVue
    >;
    const timespan = buildCtx.createTimeSpan(`generate vue started`, true);

    await vueProxyOutput(compilerCtx, normalizedOutputTarget, buildCtx.components, config);

    timespan.finish(`generate vue finished`);
  },
});

export function normalizeOutputTarget(config: Config, outputTarget: any) {
  const results: OutputTargetVue = {
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
}
