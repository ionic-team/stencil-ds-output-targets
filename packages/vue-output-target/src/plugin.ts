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
    routerLinkComponents: outputTarget.routerLinkComponents || [],
    vetur: outputTarget.vetur ?? false
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }
  if (outputTarget.proxiesFile == null) {
    throw new Error('proxiesFile is required');
  }

  if (outputTarget.vetur && !outputTarget.docsFile) {
    throw new Error('docsFile is required when outputting Vetur files')
  }

  if (outputTarget.vetur && (!outputTarget.veturTagsFile || !outputTarget.veturAttributesFile)) {
    throw new Error('veturTagsFile and veturAttributesFile are required when outputting Vetur file')
  }

  if (outputTarget.directivesProxyFile && !path.isAbsolute(outputTarget.directivesProxyFile)) {
    results.proxiesFile = normalizePath(path.join(config.rootDir, outputTarget.proxiesFile));
  }

  return results;
}
