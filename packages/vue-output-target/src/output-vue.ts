import path from 'path';
import { OutputTargetVue, PackageJSON } from './types';
import { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';
import { createComponentDefinition } from './generate-vue-component';
import { normalizePath, readPackageJson, relativeImport, sortBy } from './utils';

export async function vueProxyOutput(
  compilerCtx: CompilerCtx,
  outputTarget: Required<OutputTargetVue>,
  components: ComponentCompilerMeta[],
  config: Config,
) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(rootDir);

  const finalText = generateProxies(filteredComponents, pkgData, outputTarget, rootDir);
  await compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
  await copyResources(config, outputTarget);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy<ComponentCompilerMeta>(cmps, (cmp: ComponentCompilerMeta) => cmp.tagName).filter(
    (c: ComponentCompilerMeta) => !excludeComponents.includes(c.tagName) && !c.internal,
  );
}

export function generateProxies(
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetVue,
  rootDir: string,
) {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';\n`;

  const typeImports = !outputTarget.componentCorePackage
    ? `import { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`
    : `import { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}';\n`;

  const pathToCorePackageLoader = normalizePath(
    path.join(
      outputTarget.componentCorePackage || '',
      outputTarget.loaderDir || DEFAULT_LOADER_DIR,
    ),
  );
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
    sourceImports,
    registerCustomElements,
    createIgnoredElementsString(components),
    components
      .map(createComponentDefinition(IMPORT_TYPES, outputTarget.componentModels))
      .join('\n'),
  ];

  return final.join('\n') + '\n';
}

function createIgnoredElementsString(components: ComponentCompilerMeta[]) {
  const ignoredElements = components.map((component) => ` '${component.tagName}',`).join('\n');

  return `
const customElementTags: string[] = [
${ignoredElements}
];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];\n`;
}

async function copyResources(config: Config, outputTarget: Required<OutputTargetVue>) {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  const srcDirectory = path.join(__dirname, '..', 'vue-component-lib');
  const destDirectory = path.join(path.dirname(outputTarget.proxiesFile), 'vue-component-lib');

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
const IMPORT_TYPES = 'Components';
const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/loader';
