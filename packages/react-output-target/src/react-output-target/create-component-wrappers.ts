import type { ComponentCompilerMeta } from '@stencil/core/internal';
import { Project, SourceFile, } from 'ts-morph';
import { createStencilReactComponents } from './create-stencil-react-components';
import { kebabToPascalCase } from './utils/string-utils';

export const createComponentWrappers = async ({
  stencilPackageName,
  components,
  outDir,
  customElementsDir,
  esModules,
  experimentalUseClient,
  excludeComponents,
  project
}: {
  stencilPackageName: string;
  components: ComponentCompilerMeta[];
  customElementsDir: string;
  outDir: string;
  esModules?: boolean;
  experimentalUseClient?: boolean;
  excludeComponents?: string[];
  project: Project
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
        useClient: experimentalUseClient
      });

      const sourceFile = project.createSourceFile(outputPath, stencilReactComponent, { overwrite: true });

      sourceFiles.push(sourceFile);
    }
  } else {
    /**
     * Generate a single entry point for all the components
     */
    const outputPath = `${outDir}/components.ts`;

    const stencilReactComponents = createStencilReactComponents({
      components: filteredComponents,
      stencilPackageName,
      customElementsDir,
      defaultExport: false,
      useClient: experimentalUseClient
    });

    const sourceFile = project.createSourceFile(outputPath, stencilReactComponents, { overwrite: true });

    await sourceFile.save();

    sourceFiles.push(sourceFile);
  }
  return sourceFiles;
};
