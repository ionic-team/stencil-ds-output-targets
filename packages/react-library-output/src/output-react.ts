import path from 'path';
import { OutputTargetReact } from './types';
import { dashToPascalCase, readPackageJson, relativeImport, sortBy } from './utils';
import { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';

export async function reactProxyOutput(compilerCtx: CompilerCtx, outputTarget: OutputTargetReact, components: ComponentCompilerMeta[], config: Config) {
  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;

  await generateProxies(compilerCtx, filteredComponents, outputTarget, rootDir);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, cmp => cmp.tagName)
    .filter(c => !excludeComponents.includes(c.tagName) && !c.internal);
}

async function generateProxies(compilerCtx: CompilerCtx, components: ComponentCompilerMeta[], outputTarget: OutputTargetReact, rootDir: string) {
  const pkgData = await readPackageJson(rootDir);
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.proxiesFile, dtsFilePath, '.d.ts');

  const imports = `/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from '@ionic-enterprise/react-component-lib';\n`;

  const typeImports = !outputTarget.componentCorePackage ?
    `import { ${IMPORT_TYPES} } from '${componentsTypeFile}';\n` :
    `import { ${IMPORT_TYPES} } from '${outputTarget.componentCorePackage}';\n`;

  const sourceImports = `import { ${REGISTER_CUSTOM_ELEMENTS} } from '${path.join(outputTarget.componentCorePackage || '', outputTarget.loaderDir || DEFAULT_LOADER_DIR)}';\n`;

  const registerCustomElements = `${REGISTER_CUSTOM_ELEMENTS}(window);`;

  const final: string[] = [
    imports,
    typeImports,
    sourceImports,
    registerCustomElements,
    components.map(createComponentDefinition).join('\n')
  ];

  const finalText = final.join('\n') + '\n';

  return compilerCtx.fs.writeFile(outputTarget.proxiesFile, finalText);
}

function createComponentDefinition(cmpMeta: ComponentCompilerMeta) {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

  cmpMeta.properties.forEach(prop => {
    console.log(JSON.stringify(prop, null, 2));
  });

  return [
    `export const ${tagNameAsPascal} = createReactComponent<${IMPORT_TYPES}.${tagNameAsPascal}, HTML${tagNameAsPascal}Element>('${cmpMeta.tagName}');`
  ];
}

export const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'JSX';
const REGISTER_CUSTOM_ELEMENTS = 'defineCustomElements';
const DEFAULT_LOADER_DIR = '/loader';
