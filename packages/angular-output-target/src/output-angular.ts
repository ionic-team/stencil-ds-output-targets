import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';
import type { OutputTargetAngular, PackageJSON } from './types';
import { relativeImport, normalizePath, sortBy, readPackageJson, dashToPascalCase } from './utils';
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
  const pkgData = await readPackageJson(config, rootDir);

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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';\n`;

  /**
   * Generate JSX import type from correct location.
   * When using custom elements build, we need to import from
   * either the "components" directory or customElementsDir
   * otherwise we risk bundlers pulling in lazy loaded imports.
   */
   const generateTypeImports = () => {
    let importLocation = outputTarget.componentCorePackage ? normalizePath(outputTarget.componentCorePackage) : normalizePath(componentsTypeFile);
    importLocation += outputTarget.includeImportCustomElements ? `/${outputTarget.customElementsDir || 'components'}` : '';
    return `import ${outputTarget.includeImportCustomElements ? 'type ' : ''}{ ${IMPORT_TYPES} } from '${importLocation}';\n`;
  }

  const typeImports = generateTypeImports();

  let sourceImports = '';

  /**
   * Build an array of Custom Elements build imports and namespace them
   * so that they do not conflict with the React wrapper names. For example,
   * IonButton would be imported as IonButtonCmp so as to not conflict with the
   * IonButton React Component that takes in the Web Component as a parameter.
   */
  if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
    const cmpImports = components.map(component => {
      const pascalImport = dashToPascalCase(component.tagName);

      return `import { defineCustomElement as define${pascalImport} } from '${normalizePath(outputTarget.componentCorePackage!)}/${outputTarget.customElementsDir ||
        'components'
      }/${component.tagName}.js';`;
    });

    sourceImports = cmpImports.join('\n');

  }

  const final: string[] = [
    imports,
    typeImports,
    sourceImports,
    components
      .map(createComponentDefinition(outputTarget.componentCorePackage!, distTypesDir, rootDir, outputTarget.includeImportCustomElements, outputTarget.customElementsDir))
      .join('\n'),
  ];

  return final.join('\n') + '\n';
}

const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'Components';
