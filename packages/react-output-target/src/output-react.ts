import path from 'path';
import type { OutputTargetReact, PackageJSON } from './types';
import { dashToPascalCase, normalizePath, readPackageJson, relativeImport, sortBy } from './utils';
import type { CompilerCtx, ComponentCompilerMeta, Config, CopyResults, OutputTargetDist } from '@stencil/core/internal';

/**
 * Generate and write the Stencil-React bindings to disc
 * @param config the Stencil configuration associated with the project
 * @param compilerCtx the compiler context of the current Stencil build
 * @param outputTarget the output target configuration for generating the React wrapper
 * @param components the components to generate the bindings for
 */
export async function reactProxyOutput(
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetReact,
  components: ReadonlyArray<ComponentCompilerMeta>
): Promise<void> {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(rootDir);

  const finalText = generateProxies(config, filteredComponents, pkgData, outputTarget, rootDir);
  await compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
  await copyResources(config, outputTarget);
}

/**
 * Removes all components from the provided `cmps` list that exist in the provided `excludedComponents` list
 * @param excludeComponents the list of components that should be removed from the provided `cmps` list
 * @param cmps a list of components
 * @returns the filtered list of components
 */
function getFilteredComponents(
  excludeComponents: ReadonlyArray<string> = [],
  cmps: readonly ComponentCompilerMeta[]
): ReadonlyArray<ComponentCompilerMeta> {
  return sortBy(cmps, (cmp) => cmp.tagName).filter((c) => !excludeComponents.includes(c.tagName) && !c.internal);
}

/**
 * Generate the code that will be responsible for creating the Stencil-React bindings
 * @param config the Stencil configuration associated with the project
 * @param components the Stencil components to generate wrappers for
 * @param pkgData `package.json` data for the Stencil project
 * @param outputTarget the output target configuration used to generate the Stencil-React bindings
 * @param rootDir the directory of the Stencil project
 * @returns the generated code to create the Stencil-React bindings
 */
export function generateProxies(
  config: Config,
  components: ReadonlyArray<ComponentCompilerMeta>,
  pkgData: PackageJSON,
  outputTarget: OutputTargetReact,
  rootDir: string
): string {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');
  const pathToCorePackageLoader = getPathToCorePackageLoader(config, outputTarget);

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';\n`;

  /**
   * Generate JSX import type from correct location.
   * When using custom elements build, we need to import from
   * either the "components" directory or customElementsDir
   * otherwise we risk bundlers pulling in lazy loaded imports.
   */
  const generateTypeImports = () => {
    if (outputTarget.componentCorePackage !== undefined) {
      const dirPath = outputTarget.includeImportCustomElements
        ? `/${outputTarget.customElementsDir || 'components'}`
        : '';
      return `import type { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}${dirPath}';\n`;
    }

    return `import type { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`;
  };

  const typeImports = generateTypeImports();

  let sourceImports = '';
  let registerCustomElements = '';

  /**
   * Build an array of Custom Elements build imports and namespace them so that they do not conflict with the React
   * wrapper names. For example, IonButton would be imported as IonButtonCmp to not conflict with the IonButton React
   * Component that takes in the Web Component as a parameter.
   */
  if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
    const cmpImports = components.map((component) => {
      const pascalImport = dashToPascalCase(component.tagName);

      return `import { defineCustomElement as define${pascalImport} } from '${normalizePath(
        outputTarget.componentCorePackage!
      )}/${outputTarget.customElementsDir || 'components'}/${component.tagName}.js';`;
    });

    sourceImports = cmpImports.join('\n');
  } else if (outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${APPLY_POLYFILLS}, ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;
  } else if (!outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${REGISTER_CUSTOM_ELEMENTS}();`;
  }

  const final: ReadonlyArray<string> = [
    imports,
    typeImports,
    sourceImports,
    registerCustomElements,
    components
      .map((cmpMeta) => createComponentDefinition(cmpMeta, outputTarget.includeImportCustomElements))
      .join('\n'),
  ];

  return final.join('\n') + '\n';
}

/**
 * Defines the React component that developers will import to use in their applications.
 * @param cmpMeta Meta data for a single Web Component
 * @param includeCustomElement If `true`, the Web Component instance will be passed in to createReactComponent to be
 * registered with the Custom Elements Registry.
 * @returns An array where each entry is a string version of the React component definition.
 */
export function createComponentDefinition(
  cmpMeta: ComponentCompilerMeta,
  includeCustomElement: boolean = false
): ReadonlyArray<string> {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  let template = `export const ${tagNameAsPascal} = /*@__PURE__*/createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>('${cmpMeta.tagName}'`;

  if (includeCustomElement) {
    template += `, undefined, undefined, define${tagNameAsPascal}`;
  }

  template += `);`;

  return [template];
}

/**
 * Copy resources used to generate the Stencil-React bindings. The resources copied here are not specific a project's
 * Stencil components, but rather the logic used to do the actual component generation.
 * @param config the Stencil configuration associated with the project
 * @param outputTarget the output target configuration for generating the Stencil-React bindings
 * @returns The results of performing the copy
 */
async function copyResources(config: Config, outputTarget: OutputTargetReact): Promise<CopyResults> {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const srcDirectory = path.join(__dirname, '..', 'react-component-lib');
  const destDirectory = path.join(path.dirname(outputTarget.proxiesFile), 'react-component-lib');

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

/**
 * Derive the path to the loader
 * @param config the Stencil configuration for the project
 * @param outputTarget the output target used for generating the Stencil-React bindings
 * @returns the derived loader path
 */
export function getPathToCorePackageLoader(config: Config, outputTarget: OutputTargetReact): string {
  const basePkg = outputTarget.componentCorePackage || '';
  const distOutputTarget = config.outputTargets?.find((o) => o.type === 'dist') as OutputTargetDist;

  const distAbsEsmLoaderPath =
    distOutputTarget?.esmLoaderPath && path.isAbsolute(distOutputTarget.esmLoaderPath)
      ? distOutputTarget.esmLoaderPath
      : null;

  const distRelEsmLoaderPath =
    config.rootDir && distAbsEsmLoaderPath ? path.relative(config.rootDir, distAbsEsmLoaderPath) : null;

  const loaderDir = outputTarget.loaderDir || distRelEsmLoaderPath || DEFAULT_LOADER_DIR;
  return normalizePath(path.join(basePkg, loaderDir));
}

export const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'JSX';
const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/dist/loader';
