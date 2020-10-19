import path from 'path';
import type { OutputTargetVue, PackageJSON } from './types';
import type {
  CompilerCtx,
  ComponentCompilerMeta,
  Config,
  OutputTargetDist,
} from '@stencil/core/internal';
import { createComponentDefinition } from './generate-vue-component';
import { normalizePath, readPackageJson, relativeImport, sortBy } from './utils';

export async function vueProxyOutput(
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetVue,
  components: ComponentCompilerMeta[],
) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(rootDir);

  const finalText = generateProxies(config, filteredComponents, pkgData, outputTarget, rootDir);
  await compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);

  if (outputTarget.vetur) {
    const docsJson = await compilerCtx.fs.readFile(outputTarget.docsFile!);
    const { veturTags, veturAttributes } = generateVetur(JSON.parse(docsJson), filteredComponents);

    await Promise.all([
      compilerCtx.fs.writeFile(outputTarget.veturTagsFile!, JSON.stringify(veturTags, null, 2)),
      compilerCtx.fs.writeFile(outputTarget.veturAttributesFile!, JSON.stringify(veturAttributes, null, 2))
    ]);
  }

  await copyResources(config, outputTarget);
}

// TODO types
export function generateVetur(
  docsJson: any,
  components: ComponentCompilerMeta[]
) {
  const tagsObject: any = {};
  const attributesObject: any = {};
  docsJson.components.forEach((component: any) => {
    const shouldIncludeComponent = components.find(cmp => cmp.tagName === component.tag);
    if (shouldIncludeComponent) {
      tagsObject[component.tag] = {
        description: component.docs,
        attributes: component.props.map((prop: any) => prop.name)
      }

      component.props.forEach((prop: any) => {
        attributesObject[`${component.tag}/${prop.name}`] = {
          type: prop.type,
          description: prop.docs
        }
      });
    }
  });

  return {
    veturTags: tagsObject,
    veturAttributes: attributesObject
  }
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy<ComponentCompilerMeta>(cmps, (cmp: ComponentCompilerMeta) => cmp.tagName).filter(
    (c: ComponentCompilerMeta) => !excludeComponents.includes(c.tagName) && !c.internal,
  );
}

export function generateProxies(
  config: Config,
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetVue,
  rootDir: string,
) {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');
  const pathToCorePackageLoader = getPathToCorePackageLoader(config, outputTarget);

  const imports = `/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';\n`;

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
    sourceImports,
    registerCustomElements,
    components
      .map(createComponentDefinition(IMPORT_TYPES, outputTarget.componentModels, outputTarget.routerLinkComponents))
      .join('\n'),
  ];

  return final.join('\n') + '\n';
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

export function getPathToCorePackageLoader(config: Config, outputTarget: OutputTargetVue) {
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
