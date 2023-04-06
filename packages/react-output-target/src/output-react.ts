import path from 'path';
import type { OutputTargetReact, PackageJSON } from './types';
import { dashToPascalCase, normalizePath, readPackageJson, relativeImport, sortBy } from './utils';
import type {
  CompilerCtx,
  ComponentCompilerMeta,
  Config,
  OutputTargetDist,
} from '@stencil/core/internal';
import fs from 'fs';

export async function reactProxyOutput(
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetReact,
  components: ComponentCompilerMeta[],
) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(rootDir);

  const finalText = generateProxies(config, filteredComponents, pkgData, outputTarget, rootDir);
  await compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
  await copyResources(config, outputTarget);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, (cmp) => cmp.tagName).filter(
    (c) => !excludeComponents.includes(c.tagName) && !c.internal,
  );
}

export function generateProxies(
  config: Config,
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetReact,
  rootDir: string,
) {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');
  const pathToCorePackageLoader = getPathToCorePackageLoader(config, outputTarget);

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */\n`;

  /**
   * Generate JSX import type from correct location.
   * When using custom elements build, we need to import from
   * either the "components" directory or customElementsDir
   * otherwise we risk bundlers pulling in lazy loaded imports.
   */
  const generateTypeImports = () => {
    if (outputTarget.componentCorePackage !== undefined) {
      const dirPath = outputTarget.includeImportCustomElements ? `/${outputTarget.customElementsDir || 'components'}` : '';
      return `import type { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}${dirPath}';\n`;
    }

    return `import type { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`;
  }

  let typeImports = generateTypeImports();

  let reactLibImport = `import { createReactComponent } from './react-component-lib';\n`;


  let sourceImports = '';
  let registerCustomElements = '';

  /**
   * Build an array of Custom Elements build imports and namespace them
   * so that they do not conflict with the React wrapper names. For example,
   * IonButton would be imported as IonButtonCmp so as to not conflict with the
   * IonButton React Component that takes in the Web Component as a parameter.
   */
  if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
    
    reactLibImport = '';
    typeImports = '';

    // const cmpImports = components.map(component => {
    //   const pascalImport = dashToPascalCase(component.tagName);

    //   return `import { ${pascalImport} as ${pascalImport}Cmp, defineCustomElement as defineCustomElement${pascalImport} } from '${normalizePath(outputTarget.componentCorePackage!)}/${outputTarget.customElementsDir ||
    //     'components'
    //   }/${component.tagName}.js';`;
    // });

    // sourceImports = cmpImports.join('\n');

  } else if (outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${APPLY_POLYFILLS}, ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;
  } else if (!outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${REGISTER_CUSTOM_ELEMENTS}();`;
  }


  let customExports = '';
  
  if (outputTarget.includeImportCustomElements && outputTarget.componentCorePackage !== undefined) {
    customExports = `export { `;
    customExports += components.map(cmpMeta => {
      const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
      return tagNameAsPascal;
    }).join(", ");
    customExports += ` } `;
  }

  const final: string[] = [
    imports,
    reactLibImport,
    typeImports,
    sourceImports,
    registerCustomElements,
    components.map(cmpMeta => createComponentDefinition(cmpMeta, outputTarget.includeImportCustomElements,outputTarget,generateTypeImports())).join('\n'),
    customExports,
  ].filter(Boolean);

  return final.join('\n') + '\n';
}


/**
 * Defines the React component that developers will import
 * to use in their applications.
 * @param cmpMeta: Meta data for a single Web Component
 * @param includeCustomElement: If `true`, the Web Component instance
 * will be passed in to createReactComponent to be registered
 * with the Custom Elements Registry.
 * @returns An array where each entry is a string version
 * of the React component definition.
 */
export function createComponentDefinition(cmpMeta: ComponentCompilerMeta, includeCustomElement: boolean = false, outputTarget: OutputTargetReact, typeImports: String): string[] {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  let template = '';

  if(!includeCustomElement){
    template = `export const ${tagNameAsPascal} = /*@__PURE__*/createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>('${cmpMeta.tagName}'`;
    template += `);`;
  }
  
  if (includeCustomElement) {
    template = `// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';\n
${typeImports}
`;

    template += `import { ${tagNameAsPascal} as ${tagNameAsPascal}Cmp, defineCustomElement as defineCustomElement${tagNameAsPascal} } from '${normalizePath(outputTarget.componentCorePackage!)}/${outputTarget.customElementsDir ||
      'components'
    }/${cmpMeta.tagName}.js';\n`;

    template += `export const ${tagNameAsPascal} = /*@__PURE__*/createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>('${cmpMeta.tagName}'`;
    template += `, undefined, undefined, ${tagNameAsPascal}Cmp, defineCustomElement${tagNameAsPascal}`;
    template += `);\n`;

    fs.writeFileSync(path.join(path.dirname(outputTarget.proxiesFile), `${tagNameAsPascal}.ts`), template);

    template = `import { ${tagNameAsPascal} } from './${tagNameAsPascal}'`
  }

  
  return [
    template
  ];
}

async function copyResources(config: Config, outputTarget: OutputTargetReact) {
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
    srcDirectory,
  );
}

export function getPathToCorePackageLoader(config: Config, outputTarget: OutputTargetReact) {
  const basePkg = outputTarget.componentCorePackage || '';
  const distOutputTarget = config.outputTargets?.find((o) => o.type === 'dist') as OutputTargetDist;

  const distAbsEsmLoaderPath =
    distOutputTarget?.esmLoaderPath && path.isAbsolute(distOutputTarget.esmLoaderPath)
      ? distOutputTarget.esmLoaderPath
      : null;

  const distRelEsmLoaderPath =
    config.rootDir && distAbsEsmLoaderPath
      ? path.relative(config.rootDir, distAbsEsmLoaderPath)
      : null;

  const loaderDir = outputTarget.loaderDir || distRelEsmLoaderPath || DEFAULT_LOADER_DIR;
  return normalizePath(path.join(basePkg, loaderDir));
}

export const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'JSX';
const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/dist/loader';
