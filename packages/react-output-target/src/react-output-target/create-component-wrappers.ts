import path from 'node:path';
import type { ComponentCompilerMeta } from '@stencil/core/internal';
import { Project, SourceFile } from 'ts-morph';
import { createStencilReactComponents } from './create-stencil-react-components';
import { createStencilNextComponents } from './create-next-wrapper';
import { kebabToPascalCase } from './utils/string-utils';

export const createComponentWrappers = async ({
  stencilPackageName,
  components,
  outDir,
  customElementsDir,
  esModules,
  experimentalUseClient,
  excludeComponents,
  project,
  hydrateModule,
}: {
  stencilPackageName: string;
  components: ComponentCompilerMeta[];
  customElementsDir: string;
  outDir: string;
  esModules?: boolean;
  experimentalUseClient?: boolean;
  excludeComponents?: string[];
  project: Project;
  hydrateModule?: string;
}) => {
  const sourceFiles: SourceFile[] = [];

  const filteredComponents = components.filter((c) => {
    if (c.internal === true) {
      /**
       * Skip internal components
       */
      return false;
    }
    if (excludeComponents?.includes(c.tagName)) {
      /**
       * Skip excluded components
       */
      return false;
    }

    return true;
  });

  if (filteredComponents.length === 0) {
    return [];
  }

  if (esModules === true) {
    /**
     * Generate an entry point for each individual component
     */
    for (const component of filteredComponents) {
      const fileName = kebabToPascalCase(component.tagName);
      const outputPath = `${outDir}/${fileName}.ts`;

      const stencilReactComponent = createStencilReactComponents({
        components: [component],
        stencilPackageName,
        customElementsDir,
        defaultExport: true,
        useClient: experimentalUseClient,
        hydrateModule,
      });

      const sourceFile = project.createSourceFile(outputPath, stencilReactComponent, { overwrite: true });

      sourceFiles.push(sourceFile);
    }
  } else {
    /**
     * Generate a single entry point for all the components
     */
    let outputPath = `${outDir}/components.ts`;

    if (hydrateModule) {
      const mainOutputPath = outputPath;
      const moduleSpecifier = `./serverComponents`;
      outputPath = path.join(outDir, moduleSpecifier + '.ts');

      const clientReExport = createStencilNextComponents({
        components: filteredComponents,
        moduleSpecifier,
      });
      const reExportsourceFile = project.createSourceFile(mainOutputPath, clientReExport, { overwrite: true });
      await reExportsourceFile.save();
      sourceFiles.push(reExportsourceFile);
    }

    const stencilReactComponents = createStencilReactComponents({
      components: filteredComponents,
      stencilPackageName,
      customElementsDir,
      defaultExport: false,
      useClient: experimentalUseClient,
      hydrateModule,
    });

    const sourceFile = project.createSourceFile(outputPath, stencilReactComponents, { overwrite: true });
    await sourceFile.save();
    sourceFiles.push(sourceFile);
  }
  return sourceFiles;
};
