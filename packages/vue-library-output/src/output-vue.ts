import { OutputTargetVue } from './types';
import { sortBy } from './utils';
import generateProxies from './generate-proxies';
import generateVueArray from './generate-vue-array';
import generateVueUtils from './generate-vue-utils';
import generateValueAccessors from './generate-value-accessors';

import { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';


export function angularDirectiveProxyOutput(compilerCtx: CompilerCtx, outputTarget: OutputTargetVue, components: ComponentCompilerMeta[], config: Config) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);

  return Promise.all([
    generateProxies(compilerCtx, filteredComponents, outputTarget, config.rootDir as string),
    generateVueArray(compilerCtx, filteredComponents, outputTarget),
    generateVueUtils(compilerCtx, outputTarget),
    generateValueAccessors(compilerCtx, filteredComponents, outputTarget, config),
  ]);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, cmp => cmp.tagName)
    .filter(c => !excludeComponents.includes(c.tagName) && !c.internal);
}
