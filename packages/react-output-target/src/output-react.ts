import path from 'path';
import type { OutputTargetReact, PackageJSON } from './types';
import { dashToPascalCase, normalizePath, readPackageJson, relativeImport, sortBy } from './utils';
import type {
  CompilerCtx,
  ComponentCompilerMeta,
  Config,
  OutputTargetDist,
} from '@stencil/core/internal';

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
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';\n
import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';\n
import { StyleReactProps } from './react-component-lib/interfaces';\n`;

  const typeDeclaration = 'type ReactComponent<T, P> = ForwardRefExoticComponent<PropsWithoutRef<T> & Omit<React.HTMLAttributes<P>, "style"> & StyleReactProps & RefAttributes<P>>;';

  const typeImports = !outputTarget.componentCorePackage
    ? `import type { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`
    : `import type { ${IMPORT_TYPES} } from '${normalizePath(
        outputTarget.componentCorePackage,
      )}';\n`;

  let sourceImports = '';
  let registerCustomElements = '';

  if (outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${APPLY_POLYFILLS}, ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;
  } else if (!outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${REGISTER_CUSTOM_ELEMENTS}();`;
  }

  const final: string[] = [
    imports,
    typeImports,
    typeDeclaration,
    sourceImports,
    registerCustomElements,
    components.map(createComponent).join('\n'),
    `\nconst ${SETUP_REACT_COMPONENTS} = (prefix?: string) => {`,
    components.map(createComponentDefinition).join('\n'),
    '}\n',
    `export { ${SETUP_REACT_COMPONENTS}, ${components.map(getComponentName).join(', ')} };`,
  ];

  return final.join('\n') + '\n';
}

function getComponentName(cmpMeta: ComponentCompilerMeta) {
  return dashToPascalCase(cmpMeta.tagName);
}

function createComponent(cmpMeta: ComponentCompilerMeta) {
  const tagNameAsPascal = getComponentName(cmpMeta);
  return `let ${tagNameAsPascal}: ReactComponent<JSX.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>;`;
}

function createComponentDefinition(cmpMeta: ComponentCompilerMeta) {
  const tagNameAsPascal = getComponentName(cmpMeta);
  
  return [
    `${tagNameAsPascal} = /*@__PURE__*/createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>(\`${`\${prefix ? \`\${prefix}-\` : ''}${cmpMeta.tagName}`}\`);`,
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
const SETUP_REACT_COMPONENTS = 'setupComponents';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/dist/loader';