import type { OutputTargetAngular } from './types';
import { dashToPascalCase, relativeImport } from './utils';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import path from 'path';

export function generateAngularDirectivesFile(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular,
  valueAccessorDirectiveClasses: string[] = []
): Promise<any> {
  // Only create the file if it is defined in the stencil configuration
  if (!outputTarget.directivesArrayFile) {
    return Promise.resolve();
  }

  const directivesProxyPath = relativeImport(outputTarget.directivesArrayFile, outputTarget.directivesProxyFile, '.ts');
  const directives = components
    .map((cmpMeta) => dashToPascalCase(cmpMeta.tagName))
    .map((className) => `d.${className}`)
    .join(',\n  ');
  const valueAccessorsDirectivesFile = path.join(path.dirname(outputTarget.directivesProxyFile), 'value-accessor-directives.ts');
  const valueAccessorsDirectivesProxyPath = relativeImport(outputTarget.directivesArrayFile, valueAccessorsDirectivesFile, '.ts');
  const valueAccessors = valueAccessorDirectiveClasses
    .map((className) => `va.${className}`)
    .join(',\n  ');

  const c = valueAccessorDirectiveClasses.length > 0 ? `
import * as d from '${directivesProxyPath}';
import * as va from '${valueAccessorsDirectivesProxyPath}';

export const DIRECTIVES = [
  ${directives},
  ${valueAccessors}
];
` : `
import * as d from '${directivesProxyPath}';

export const DIRECTIVES = [
  ${directives}
];
`;
  return compilerCtx.fs.writeFile(outputTarget.directivesArrayFile, c);
}
