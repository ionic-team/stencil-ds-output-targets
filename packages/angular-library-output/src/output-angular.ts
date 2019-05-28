import { OutputTargetAngular } from './types';
import { sortBy } from './utils';
import generateProxies from './generate-proxies';
import generateAngularArray from './generate-angular-array';
import generateAngularUtils from './generate-angular-utils';
import generateValueAccessors from './generate-value-accessors';

import { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';


export function angularDirectiveProxyOutput(compilerCtx: CompilerCtx, outputTarget: OutputTargetAngular, components: ComponentCompilerMeta[], rootDir: string) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);

  return Promise.all([
    generateProxies(compilerCtx, filteredComponents, outputTarget, rootDir),
    generateAngularArray(compilerCtx, filteredComponents, outputTarget),
    generateAngularUtils(compilerCtx, outputTarget),
    generateValueAccessors(compilerCtx, filteredComponents, outputTarget, rootDir),
  ]);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, cmp => cmp.tagName)
    .filter(c => !excludeComponents.includes(c.tagName) && !c.internal);
}
