import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';
import type { OutputTargetAngular, PackageJSON } from './types';
import { relativeImport, normalizePath, sortBy, readPackageJson } from './utils';
import { createComponentDefinition } from './generate-angular-component';
import { generateAngularDirectivesFile } from './generate-angular-directives-file';
import generateValueAccessors from './generate-value-accessors';

export async function angularDirectiveProxyOutput(
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetAngular,
  components: ComponentCompilerMeta[],
  config: Config,
) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(rootDir);

  const finalText = generateProxies(
    filteredComponents,
    pkgData,
    outputTarget,
    config.rootDir as string,
  );

  await Promise.all([
    compilerCtx.fs.writeFile(outputTarget.directivesProxyFile, finalText),
    copyResources(config, outputTarget),
    generateAngularDirectivesFile(compilerCtx, filteredComponents, outputTarget),
    generateValueAccessors(compilerCtx, filteredComponents, outputTarget, config),
  ]);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, (cmp) => cmp.tagName).filter(
    (c) => !excludeComponents.includes(c.tagName) && !c.internal,
  );
}

async function copyResources(config: Config, outputTarget: OutputTargetAngular) {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const srcDirectory = path.join(__dirname, '..', 'angular-component-lib');
  const destDirectory = path.join(
    path.dirname(outputTarget.directivesProxyFile),
    'angular-component-lib',
  );

  return config.sys.copy(
    [
      {
        src: srcDirectory,
        dest: destDirectory,
        keepDirStructure: false,
        warn: false,
      },
    ],
    srcDirectory,
  );
}

export function generateProxies(
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetAngular,
  rootDir: string,
) {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.directivesProxyFile, dtsFilePath, '.d.ts');

  const imports = `/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';\n`;

  const typeImports = !outputTarget.componentCorePackage
    ? `import { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';`
    : `import { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}';`;

  const final: string[] = [
    imports,
    typeImports,
    components
      .map(createComponentDefinition(
        outputTarget.componentCorePackage!,
          distTypesDir,
          rootDir,
          outputTarget.tagNameModifier,
      ))
      .join('\n'),
  ];

  return final.join('\n') + '\n';
}

const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'Components';
