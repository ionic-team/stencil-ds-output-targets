import type { ComponentCompilerMeta } from '@stencil/core/internal';
import { Project } from 'ts-morph';
import { kebabToPascalCase } from './utils/string-utils';

export const createStencilNextComponents = ({
  components,
  esModules,
}: {
  components: ComponentCompilerMeta[];
  esModules?: boolean;
}) => {
  const project = new Project({ useInMemoryFileSystem: true });
  const useClientDirective = `'use client';\n\n`;
  const disableEslint = `/* eslint-disable */\n`;
  const autogeneratedComment = `/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */\n\n`;

  const sourceFile = project.createSourceFile(
    'component.ts',
    useClientDirective + autogeneratedComment + disableEslint
  );

  if (esModules) {
    for (const component of components) {
      const tagName = component.tagName;
      const reactTagName = kebabToPascalCase(tagName);
      const fileName = kebabToPascalCase(component.tagName);
      sourceFile.addExportDeclaration({
        moduleSpecifier: `./${fileName}.js`,
        namedExports: esModules ? [`default as ${reactTagName}`] : components.map((c) => kebabToPascalCase(c.tagName)),
      });
    }
  } else {
    /**
     * Explicitly export all components from the server file.
     * Note: we can't do `export * from './components.server';` because Next.js fails with an error
     *   `Error: It's currently unsupported to use "export *" in a client boundary. Please use named exports instead.`
     */
    sourceFile.addExportDeclaration({
      moduleSpecifier: `./components.server.js`,
      namedExports: components.map((c) => kebabToPascalCase(c.tagName)),
    });
  }

  sourceFile.organizeImports();
  sourceFile.formatText();

  return sourceFile.getFullText();
};
