import path from 'path';
import { OutputTargetReact } from './types';
import { dashToPascalCase, normalizePath, readPackageJson, relativeImport, sortBy } from './utils';
import { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';

export async function reactProxyOutput(
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetReact,
  components: ComponentCompilerMeta[],
  config: Config,
) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;

  await generateProxies(compilerCtx, filteredComponents, outputTarget, rootDir);
  await copyResources(config, outputTarget);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, cmp => cmp.tagName).filter(
    c => !excludeComponents.includes(c.tagName) && !c.internal,
  );
}

async function generateProxies(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetReact,
  rootDir: string,
) {
  const pkgData = await readPackageJson(rootDir);
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');
  const proxiesFileExtname = path.extname(outputTarget.proxiesFile);
  const proxiesFilesBaseNameWithoutExtension = path.basename(outputTarget.proxiesFile, proxiesFileExtname);
  const providerFilePath = path.dirname(outputTarget.proxiesFile);
  const providerFilenameWithoutExtension = `${proxiesFilesBaseNameWithoutExtension}-provider`;
  const providerFile = path.resolve(providerFilePath, `${providerFilenameWithoutExtension}.ts`);

  const comments = `/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */`;
  const imports = `import { createReactComponent } from './react-component-lib';\n`;

  const typeImports = !outputTarget.componentCorePackage
    ? `import { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`
    : `import { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}';\n`;

  const sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS}, ${APPLY_POLYFILLS} } from '${normalizePath(
    path.join(
      outputTarget.componentCorePackage || '',
      outputTarget.loaderDir || DEFAULT_LOADER_DIR,
    ),
  )}';\n`;

  const providerReexport = `export * from './${providerFilenameWithoutExtension}';\n`;

  const registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;

  const final: string[] = [
    comments,
    sourceImports,
    providerReexport,
    registerCustomElements
  ];

  const finalText = final.join('\n') + '\n';

  const createComponentsFromFactory = `const components = componentsFactory();`;
  const factoryFunction = `export function componentsFactory(transformTagName: (tagName: string) => string = tagName => tagName) {
  return {
${components.map(createComponentDefinition).join(',\n')}
  };
}\n`;

  const provider: string[] = [
    comments,
    imports,
    typeImports,
    factoryFunction,
    createComponentsFromFactory,
    components.map(createComponentExport).join('\n')
  ];
  const providerText = provider.join('\n') + '\n';

  await compilerCtx.fs.writeFile(providerFile, providerText);
  await compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
}

function createComponentExport(cmpMeta: ComponentCompilerMeta) {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

  return `export const ${tagNameAsPascal} = components.${tagNameAsPascal};`;
}

function createComponentDefinition(cmpMeta: ComponentCompilerMeta) {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

  return `    ${tagNameAsPascal}: /*@__PURE__*/createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>(transformTagName('${cmpMeta.tagName}'))`;
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

export const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'JSX';
const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/loader';
