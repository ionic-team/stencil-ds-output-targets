import path from 'path';
import type {
  CompilerCtx, ComponentCompilerMeta, Config, OutputTargetDist,
} from '@stencil/core/internal';
import { OutputTargetSvelte } from './types';
import { sortBy, normalizePath, dashToPascalCase } from './utils';
import { createComponentDefinition } from './generate-svelte-component';
import { generate$$TypeDefs, generateTypings, replaceMethodDefs } from './generate-svelte-typings';

const svelte = require('svelte/compiler');

const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const APPLY_POLYFILLS = 'applyPolyfills';
const DEFAULT_LOADER_DIR = '/dist/loader';

const ignoreChecks = () => [
  '/* eslint-disable */',
  '/* tslint:disable */',
  '// @ts-nocheck',
].join('\n');

const getFilteredComponents = (
  excludeComponents: string[] = [],
  cmps: ComponentCompilerMeta[],
) => sortBy<ComponentCompilerMeta>(
  cmps,
  (cmp: ComponentCompilerMeta) => cmp.tagName,
).filter(
  (c: ComponentCompilerMeta) => !excludeComponents.includes(c.tagName) && !c.internal,
);

export const getPathToCorePackageLoader = (config: Config, outputTarget: OutputTargetSvelte) => {
  const basePkg = outputTarget.componentCorePackage || '';
  const distOutputTarget = config.outputTargets?.find((o) => o.type === 'dist') as OutputTargetDist;

  const distAbsEsmLoaderPath = (distOutputTarget?.esmLoaderPath
    && path.isAbsolute(distOutputTarget.esmLoaderPath))
    ? distOutputTarget.esmLoaderPath
    : null;

  const distRelEsmLoaderPath = config.rootDir && distAbsEsmLoaderPath
    ? path.relative(config.rootDir, distAbsEsmLoaderPath)
    : null;

  const loaderDir = outputTarget.loaderDir || distRelEsmLoaderPath || DEFAULT_LOADER_DIR;
  return normalizePath(path.join(basePkg, loaderDir));
};

export function generateProxies(
  config: Config,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetSvelte,
) {
  const pathToCorePackageLoader = getPathToCorePackageLoader(config, outputTarget);

  let sourceImports = `import '${pathToCorePackageLoader}';`;
  let registerCustomElements = '';

  if (outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${APPLY_POLYFILLS}, ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${APPLY_POLYFILLS}().then(() => ${REGISTER_CUSTOM_ELEMENTS}());`;
  } else if (!outputTarget.includePolyfills && outputTarget.includeDefineCustomElements) {
    sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${pathToCorePackageLoader}';\n`;
    registerCustomElements = `${REGISTER_CUSTOM_ELEMENTS}();`;
  }

  const fileName = (c: ComponentCompilerMeta) => dashToPascalCase(c.tagName);

  const buildImports = (
    dir: string,
    ext = '',
  ) => components.map((c) => `import ${fileName(c)} from '${dir}/${fileName(c)}${ext}';`).join('\n');

  const buildExports = () => components.map((c) => `export { ${fileName(c)} };`).join('\n');

  const entry = [
    ignoreChecks(),
    sourceImports,
    registerCustomElements,
    buildImports('./components'),
    buildExports(),
  ].join('\n');

  const uncompiledFiles = components.map((c) => ({
    name: fileName(c),
    meta: c,
    content: createComponentDefinition(c, outputTarget.componentBindings),
  }));

  const uncompiledEntry = [
    ignoreChecks(),
    buildImports('.', '.svelte'),
    buildExports(),
  ].join('\n');

  const compiledFiles = uncompiledFiles.map((file) => ({
    name: file.name,
    meta: file.meta,
    content: svelte.compile(file.content, {
      name: file.name,
      legacy: outputTarget.legacy,
      accessors: outputTarget.accessors,
      css: false,
      preserveComments: true,
      outputFilename: file.name,
    }).js.code,
  }));

  return {
    entry,
    uncompiledEntry,
    uncompiledFiles,
    compiledFiles,
  };
}

export const svelteProxyOutput = async (
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetSvelte,
  components: ComponentCompilerMeta[],
) => {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);

  const output = generateProxies(config, filteredComponents, outputTarget);
  await compilerCtx.fs.writeFile(outputTarget.proxiesFile, output.entry);
  const outputDir = path.dirname(outputTarget.proxiesFile);
  const uncompiledDir = path.resolve(outputDir, 'svelte');
  const compiledDir = path.resolve(outputDir, 'components');

  await compilerCtx.fs.writeFile(path.resolve(uncompiledDir, 'index.js'), output.uncompiledEntry);

  await Promise.all(output.uncompiledFiles.map((file) => {
    const filePath = path.resolve(uncompiledDir, `${file.name}.svelte`);
    return compilerCtx.fs.writeFile(filePath, file.content);
  }));

  await Promise.all(output.compiledFiles.map((file) => {
    const filePath = path.resolve(compiledDir, `${file.name}.ts`);
    const { content, meta } = file;

    return compilerCtx.fs.writeFile(
      filePath,
      [
        ignoreChecks(),
        `import { Components, JSX } from '${outputTarget.componentCorePackage}';\n`,
        generateTypings(meta),
        replaceMethodDefs(meta, generate$$TypeDefs(meta, content)),
      ].join('\n'),
    );
  }));
};
