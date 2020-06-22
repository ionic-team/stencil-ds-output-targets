import path from 'path';
import { OutputTargetVue } from './types';
import { dashToPascalCase, normalizePath, readPackageJson, relativeImport, sortBy } from './utils';
import { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';

export async function vueProxyOutput(
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetVue,
  components: ComponentCompilerMeta[],
  config: Config,
) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;

  await generateProxies(compilerCtx, filteredComponents, outputTarget, rootDir);
  await copyResources(config, outputTarget);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy<ComponentCompilerMeta>(cmps, (cmp: ComponentCompilerMeta) => cmp.tagName).filter(
    (c: ComponentCompilerMeta) => !excludeComponents.includes(c.tagName) && !c.internal,
  );
}

async function generateProxies(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetVue,
  rootDir: string,
) {
  const pkgData = await readPackageJson(rootDir);
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender } from './vue-componet-lib/utils';\n`;

  const typeImports = !outputTarget.componentCorePackage
    ? `import { ${IMPORT_TYPES} } from '${normalizePath(componentsTypeFile)}';\n`
    : `import { ${IMPORT_TYPES} } from '${normalizePath(outputTarget.componentCorePackage)}';\n`;

  const sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS}, ${APPLY_POLYFILLS} } from '${normalizePath(
    path.join(
      outputTarget.componentCorePackage || '',
      outputTarget.loaderDir || DEFAULT_LOADER_DIR,
    ),
  )}';\n`;

  const registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;

  const final: string[] = [
    imports,
    typeImports,
    sourceImports,
    registerCustomElements,
    createIgnoredElementsString(components),
    components.map(createComponentDefinition).join('\n'),
  ];

  const finalText = final.join('\n') + '\n';

  return compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
}
function createIgnoredElementsString(components: ComponentCompilerMeta[]) {
  const ignoredElements = components
    .map((component) => {
      `'${component.tagName}',`;
    })
    .join('\n');

  return `
  const customElementTags = [
    ${ignoredElements}
  ];
  Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];
  `;
}

function createComponentDefinition(cmpMeta: ComponentCompilerMeta) {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

  const props = cmpMeta.properties
    .map(
      (prop) => `${prop.name} as PropOptions<${IMPORT_TYPES}.${tagNameAsPascal}['${prop.name}']>,`,
    )
    .join('\n');

  const model = '';

  const methods = cmpMeta.methods
    .map(
      (method) =>
        `${method.name}(...args): ${method.complexType} { this.$refs.wc.${method.name}(...args)}`,
    )
    .join('\n');

  return `
  export const ${tagNameAsPascal} = Vue.extend({
    props: {
      ${props}
    },
    ${model}
    methods: {
      ${methods}
    }
    render: createCommonRender('${cmpMeta.tagName}'),
  });
  `;
}

async function copyResources(config: Config, outputTarget: OutputTargetVue) {
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
