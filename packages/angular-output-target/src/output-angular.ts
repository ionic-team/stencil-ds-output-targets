import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';
import type { OutputTargetAngular, PackageJSON } from './types';
import {
  relativeImport,
  normalizePath,
  sortBy,
  readPackageJson,
  dashToPascalCase,
  createImportStatement,
} from './utils';
import { createAngularComponentDefinition, createComponentTypeDefinition } from './generate-angular-component';
import { generateAngularDirectivesFile } from './generate-angular-directives-file';
import generateValueAccessors from './generate-value-accessors';

export async function angularDirectiveProxyOutput(
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetAngular,
  components: ComponentCompilerMeta[],
  config: Config
) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(config, rootDir);

  const finalText = generateProxies(filteredComponents, pkgData, outputTarget, config.rootDir as string);

  await Promise.all([
    compilerCtx.fs.writeFile(outputTarget.proxyDeclarationFile, finalText),
    copyResources(config, outputTarget),
    generateAngularDirectivesFile(compilerCtx, filteredComponents, outputTarget),
    generateValueAccessors(compilerCtx, filteredComponents, outputTarget, config),
  ]);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, (cmp) => cmp.tagName).filter((c) => !excludeComponents.includes(c.tagName) && !c.internal);
}

async function copyResources(config: Config, outputTarget: OutputTargetAngular) {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const srcDirectory = path.join(__dirname, '..', 'angular-component-lib');
  const destDirectory = path.join(path.dirname(outputTarget.proxyDeclarationFile), 'angular-component-lib');

  return config.sys.copy(
    [
      {
        src: srcDirectory,
        dest: destDirectory,
        keepDirStructure: false,
        warn: false,
      },
    ],
    srcDirectory
  );
}

export function generateProxies(
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetAngular,
  rootDir: string
) {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxyDeclarationFile, dtsFilePath, '.d.ts');

  /**
   * The collection of named imports from @angular/core.
   */
  const angularCoreImports = [
    'ChangeDetectionStrategy',
    'ChangeDetectorRef',
    'Component',
    'ElementRef',
    'EventEmitter',
    'NgZone',
  ];

  /**
   * The collection of named imports from the angular-component-lib/utils.
   */
  const componentLibImports = ['ProxyCmp', 'proxyOutputs'];

  const imports = `/* tslint:disable */
/* auto-generated angular directive proxies */
${createImportStatement(angularCoreImports, '@angular/core')}

${createImportStatement(componentLibImports, './angular-component-lib/utils')}\n`;
  /**
   * Generate JSX import type from correct location.
   * When using custom elements build, we need to import from
   * either the "components" directory or customElementsDir
   * otherwise we risk bundlers pulling in lazy loaded imports.
   */
  const generateTypeImports = () => {
    let importLocation = outputTarget.componentCorePackage
      ? normalizePath(outputTarget.componentCorePackage)
      : normalizePath(componentsTypeFile);
    importLocation += outputTarget.includeImportCustomElements
      ? `/${outputTarget.customElementsDir || 'components'}`
      : '';
    return `import ${outputTarget.includeImportCustomElements ? 'type ' : ''
      }{ ${IMPORT_TYPES} } from '${importLocation}';\n`;
  };

  const typeImports = generateTypeImports();

  let sourceImports = '';

  /**
   * Build an array of Custom Elements build imports and namespace them
   * so that they do not conflict with the React wrapper names. For example,
   * IonButton would be imported as IonButtonCmp so as to not conflict with the
   * IonButton React Component that takes in the Web Component as a parameter.
   */
  if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
    const cmpImports = components.map((component) => {
      const pascalImport = dashToPascalCase(component.tagName);

      return `import { defineCustomElement as define${pascalImport} } from '${normalizePath(
        outputTarget.componentCorePackage
      )}/${outputTarget.customElementsDir || 'components'}/${component.tagName}.js';`;
    });

    sourceImports = cmpImports.join('\n');
  }

  const proxyFileOutput = [];

  const filterInternalProps = (prop: { name: string; internal: boolean }) => !prop.internal;
  const mapPropName = (prop: { name: string }) => prop.name;

  const { includeImportCustomElements, componentCorePackage, customElementsDir } = outputTarget;

  for (let cmpMeta of components) {
    const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

    const inputs: string[] = [];

    if (cmpMeta.properties) {
      inputs.push(...cmpMeta.properties.filter(filterInternalProps).map(mapPropName));
    }

    if (cmpMeta.virtualProperties) {
      inputs.push(...cmpMeta.virtualProperties.map(mapPropName));
    }

    inputs.sort();

    const outputs: string[] = [];

    if (cmpMeta.events) {
      outputs.push(...cmpMeta.events.filter(filterInternalProps).map(mapPropName));
    }

    const methods: string[] = [];

    if (cmpMeta.methods) {
      methods.push(...cmpMeta.methods.filter(filterInternalProps).map(mapPropName));
    }

    /**
     * For each component, we need to generate:
     * 1. The @Component decorated class
     * 2. The component interface (using declaration merging for types).
     */
    const componentDefinition = createAngularComponentDefinition(
      cmpMeta.tagName,
      inputs,
      outputs,
      methods,
      includeImportCustomElements
    );
    const componentTypeDefinition = createComponentTypeDefinition(
      tagNameAsPascal,
      cmpMeta.events,
      componentCorePackage,
      includeImportCustomElements,
      customElementsDir
    );

    proxyFileOutput.push(componentDefinition, '\n');
    proxyFileOutput.push(componentTypeDefinition, '\n');
  }

  const final: string[] = [imports, typeImports, sourceImports, ...proxyFileOutput];

  return final.join('\n') + '\n';
}

const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'Components';
