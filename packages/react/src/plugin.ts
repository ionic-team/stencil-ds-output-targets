import type { Config, OutputTargetCustom } from '@stencil/core/internal';
import { normalizePath } from './utils';
import type { OutputTargetReact } from './types';
import { reactProxyOutput } from './output-react';
import path from 'path';

export const reactOutputTarget = (outputTarget: OutputTargetReact): OutputTargetCustom => ({
  type: 'custom',
  name: 'react-library',
  validate(config) {
    return normalizeOutputTarget(config, outputTarget);
  },
  async generator(config, compilerCtx, buildCtx) {
    const timespan = buildCtx.createTimeSpan(`generate react started`, true);

    await reactProxyOutput(config, compilerCtx, outputTarget, buildCtx.components);

    timespan.finish(`generate react finished`);
  },
});

export function normalizeOutputTarget(config: Config, outputTarget: any) {
  const results: OutputTargetReact = {
    ...outputTarget,
    excludeComponents: outputTarget.excludeComponents || [],
    includePolyfills: outputTarget.includePolyfills ?? true,
    includeDefineCustomElements: outputTarget.includeDefineCustomElements ?? true,
  };

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself');
  }
  if (outputTarget.proxiesFile == null) {
    throw new Error('proxiesFile is required');
  }

  if (outputTarget.includeDefineCustomElements && outputTarget.includeImportCustomElements) {
    throw new Error('includeDefineCustomElements cannot be used at the same time as includeImportCustomElements since includeDefineCustomElements is used for lazy loading components. Set `includeDefineCustomElements: false` in your React output target config to resolve this.');
  }

  if (outputTarget.includeImportCustomElements && outputTarget.includePolyfills) {
    throw new Error('includePolyfills cannot be used at the same time as includeImportCustomElements. Set `includePolyfills: false` in your React output target config to resolve this.')
  }

  if (outputTarget.directivesProxyFile && !path.isAbsolute(outputTarget.directivesProxyFile)) {
    results.proxiesFile = normalizePath(path.join(config.rootDir, outputTarget.proxiesFile));
  }

  return results;
}
