import type { Config, OutputTargetCustom } from '@stencil/core/internal';
import { normalizePath } from './utils';
import type { OutputTargetVue } from './types';
import { vueProxyOutput } from './output-vue';
import path from 'path';

export const vueOutputTarget = (outputTarget: OutputTargetVue): OutputTargetCustom => ({
  type: 'custom',
  name: 'vue-library',
  validate(config) {
    return normalizeOutputTarget(config, outputTarget);
  },
  async generator(config, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan(`generate vue started`, true);

    await vueProxyOutput(config, compilerCtx, outputTarget, buildCtx.components);

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
    includeImportCustomElements: outputTarget.includeImportCustomElements ?? true
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }
  if (outputTarget.proxiesFile == null) {
    throw new Error('proxiesFile is required');
  }
  if (outputTarget.includeDefineCustomElements && outputTarget.includeImportCustomElements) {
    throw new Error('includeImportCustomElements cannot be used at the same time as includeDefineCustomElements since includeDefineCustomElements is used for lazy loading components. Set `includeDefineCustomElements: false` in your Vue output target config to resolve this.');
  }

  if (outputTarget.directivesProxyFile && !path.isAbsolute(outputTarget.directivesProxyFile)) {
    results.proxiesFile = normalizePath(path.join(config.rootDir, outputTarget.proxiesFile));
  }

  return results;
}
