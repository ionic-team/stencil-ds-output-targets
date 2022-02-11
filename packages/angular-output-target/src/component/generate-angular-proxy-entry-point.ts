import type { CompilerCtx, ComponentCompilerMeta } from "@stencil/core/internal";
import type { OutputTargetAngular } from "../types";
import { relativeImport } from "../utils";
import { ProxyVariableName } from "./constants/component.const";
import { createComponentBarrelConst } from "./utils/create-component-barrel-const";
import { createModuleBarrelConst } from "./utils/create-module-barrel-const";

/**
 * Generates an entry point for developers to consume in their primary Angular module to
 * declare and export the generated Angular component proxies.
 *
 * Developers can then use the output of this function such as:
 * ```ts
 * import { COMPONENTS } from './path/to/proxy';
 *
 * ...
 *
 * {
 *  declarations: [
 *    ...COMPONENTS
 *  ],
 *  exports: [
 *    ...COMPONENTS
 *  ],
 * }
 * ```
 */
export function generateAngularProxyEntryPoint(compilerCtx: CompilerCtx, components: ComponentCompilerMeta[], outputTarget: OutputTargetAngular): Promise<any> {
  // The manual Promise<any> return type is required to avoid the error:
  // No overload matches this call.
  // This is likely due to a mismatched type between this projects Typescript version
  // with the type signature of Promise.all and Stencil's version.
  const { directivesProxyFile, directivesArrayFile, singleComponentAngularModules } = outputTarget;
  if (!directivesArrayFile) {
    // Skip generating the components entry point if it is not defined in the stencil.config.ts.
    return Promise.resolve();
  }

  const proxyPath = relativeImport(directivesArrayFile, directivesProxyFile, '.ts');

  const componentTagNames = components.map(c => c.tagName);

  const output =
    `import * as ${ProxyVariableName} from '${proxyPath}';

${createComponentBarrelConst(componentTagNames)}
${singleComponentAngularModules ? '\n' + createModuleBarrelConst(componentTagNames) : ''}
`.trim();

  return compilerCtx.fs.writeFile(directivesArrayFile, output);
}
