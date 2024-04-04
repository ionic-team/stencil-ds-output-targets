import { Project, SourceFile, VariableDeclarationKind } from 'ts-morph';
import { kebabToPascalCase, eventListenerName } from './utils/string-utils';
import type { ComponentCompilerMeta } from '@stencil/core/internal';

interface ReactEvent {
  originalName: string;
  name: string;
  type: string;
}

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
      const tagName = component.tagName;
      const outputPath = `${outDir}/${tagName}.ts`;

      const sourceFile = createComponentWrapper(
        project,
        outputPath,
        [component],
        stencilPackageName,
        customElementsDir,
        true,
        experimentalUseClient
      );
      await sourceFile.save();

      sourceFiles.push(sourceFile);
    }
  } else {
    /**
     * Generate a single entry point for all the components
     */
    const outputPath = `${outDir}/components.ts`;

    const sourceFile = createComponentWrapper(project, outputPath, filteredComponents, stencilPackageName, customElementsDir, false, experimentalUseClient);
    await sourceFile.save();

    sourceFiles.push(sourceFile);
  }
  return sourceFiles;
};

const createComponentWrapper = (
  project: Project,
  outputPath: string,
  components: ComponentCompilerMeta[],
  stencilPackageName: string,
  customElementsDir: string,
  defaultExport = false,
  useClient = false
) => {
  const sourceFile = project.createSourceFile(
    outputPath,
    `${useClient ? `'use client';\n\n` : ''}import React from 'react';
import { createComponent } from '@stencil-labs/react';
import type { EventName } from '@stencil-labs/react';
`, { overwrite: true }
  );

  for (const component of components) {
    const tagName = component.tagName;
    const reactTagName = kebabToPascalCase(tagName);
    const componentElement = `${reactTagName}Element`;
    const componentCustomEvent = `${reactTagName}CustomEvent`;

    sourceFile.addImportDeclaration({
      moduleSpecifier: `${stencilPackageName}/${customElementsDir}/${tagName}.js`,
      namedImports: [
        {
          name: reactTagName,
          alias: `${reactTagName}Element`,
        },
        {
          name: 'defineCustomElement',
          alias: `define${reactTagName}`,
        },
      ],
    });

    const publicEvents = (component.events || []).filter((e) => e.internal === false);

    const events: ReactEvent[] = [];

    for (const event of publicEvents) {
      const hasComplexType = Object.keys(event.complexType.references).includes(event.complexType.original);

      if (hasComplexType) {
        const isGlobalType = event.complexType.references[event.complexType.original].location === 'global';
        /**
         * Global type references should not have an explicit import.
         * The type should be available globally.
         */
        if (!isGlobalType) {
          sourceFile.addImportDeclaration({
            moduleSpecifier: stencilPackageName,
            namedImports: [
              {
                name: event.complexType.original,
                isTypeOnly: true,
              },
            ],
          });
        }

        /**
         * Import the CustomEvent type for the web component from the Stencil package.
         *
         * For example:
         * ```
         * import type { ComponentCustomEvent } from 'my-component-library';
         * ```
         */
        sourceFile.addImportDeclaration({
          moduleSpecifier: stencilPackageName,
          namedImports: [
            {
              name: componentCustomEvent,
              isTypeOnly: true,
            },
          ],
        });

        events.push({
          originalName: event.name,
          name: eventListenerName(event.name),
          type: `EventName<${componentCustomEvent}<${event.complexType.resolved}>>`,
        });
      } else {
        events.push({
          originalName: event.name,
          name: eventListenerName(event.name),
          type: `EventName<CustomEvent<${event.complexType.resolved}>>`,
        });
      }
    }

    const componentEventNamesType = `${reactTagName}Events`;

    sourceFile.addTypeAlias({
      name: componentEventNamesType,
      type: events.length > 0 ? `{ ${events.map((e) => `${e.name}: ${e.type}`).join(',\n')} }` : 'NonNullable<unknown>',
    });

    const statement = sourceFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: reactTagName,
          initializer: `createComponent<${componentElement}, ${componentEventNamesType}>({
          tagName: '${tagName}',
          elementClass: ${componentElement},
          react: React,
          events: { ${events.map((e) => `${e.name}: '${e.originalName}'`).join(',\n')}} as ${componentEventNamesType},
          defineCustomElement: define${reactTagName}
        })`,
        },
      ],
    });

    if (defaultExport) {
      sourceFile.addExportAssignment({
        isExportEquals: false,
        expression: reactTagName,
      });
    } else {
      statement.setIsExported(true);
    }
  }

  sourceFile.organizeImports();
  sourceFile.formatText();

  return sourceFile;
};
