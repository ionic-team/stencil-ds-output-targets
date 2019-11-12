import path from 'path';
import { OutputTargetReact } from './types';
import { dashToPascalCase, readPackageJson, relativeImport, sortBy, normalizePath } from './utils';
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

  const imports = `/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';\n`;

  const typeImports = !outputTarget.componentCorePackage
    ? `import { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`
    : `import { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}';\n`;

  const sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS}, ${APPLY_POLYFILLS} } from '${normalizePath(
    path.join(
      outputTarget.componentCorePackage || '',
      outputTarget.loaderDir || DEFAULT_LOADER_DIR,
    ),
  )}';\n`;

  const registerCustomElements = `${APPLY_POLYFILLS}().then(() => { ${REGISTER_CUSTOM_ELEMENTS}(window); });`;

  const final: string[] = [
    imports,
    typeImports,
    sourceImports,
    registerCustomElements,
    components.map(createComponentDefinition).join('\n'),
  ];

  const finalText = final.join('\n') + '\n';

  return compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
}

function createComponentDefinition(cmpMeta: ComponentCompilerMeta) {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

  return [
    `export const ${tagNameAsPascal} = createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>('${
      cmpMeta.tagName
    }');`,
  ];
}

async function copyResources(config: Config, outputTarget: OutputTargetReact) {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly intialized at this step. Notify the developer');
  }
  const srcDirectory = path.join(__dirname, '..', 'react-component-lib');
  const destDirectory = path.join(path.dirname(outputTarget.proxiesFile), 'react-component-lib');
  const resourcesFilesToCopy = await config.sys.glob('**/*.*', { cwd: srcDirectory });

  return config.sys.copy(
    resourcesFilesToCopy.map(rf => ({
      src: path.join(srcDirectory, '../react-component-lib/', rf),
      dest: path.join(destDirectory, rf),
      warn: false,
    })),
  );
}

export const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'JSX';
const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/loader';
