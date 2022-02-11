import type { ComponentCompilerEvent, ComponentCompilerMeta } from "@stencil/core/internal";
import { dashToPascalCase, getCustomElementsDir, normalizePath } from "../../utils";
import { ImportCollection } from "../types";

export function createComponentInterface(config: {
  metadata: ComponentCompilerMeta;
  outputs: ComponentCompilerEvent[];
  includeImportCustomElements: boolean;
  customElementsDir: string;
  componentCorePackage: string;
}, typeImports: ImportCollection) {
  const { outputs, metadata, componentCorePackage, includeImportCustomElements, customElementsDir } = config;
  const componentTagNamePascal = dashToPascalCase(metadata.tagName);

  const getComponentModuleName = () => {
    if (componentCorePackage !== undefined) {
      const dirPath = includeImportCustomElements ? `/${getCustomElementsDir(customElementsDir)}` : '';
      return normalizePath(`${componentCorePackage}${dirPath}`);
    }
    return componentCorePackage;
  }

  const createEventType = (event: ComponentCompilerEvent, typeName: string) => {
    return (
      `/**
   * ${event.docs.text} ${event.docs.tags.map((tag) => `@${tag.name} ${tag.text}`)}
   */
  ${event.name}: EventEmitter<CustomEvent<${typeName.trim()}>>;`
    );
  }

  const importStatements: string[] = [];
  const eventTypes: string[] = [];

  for (const output of outputs) {
    Object.entries(output.complexType.references).forEach(([reference, refObject]) => {
      if (refObject.location === 'local' || refObject.location === 'import') {
        const exportedTypeName = `I${metadata.componentClassName}${reference}`;
        const componentModuleName = getComponentModuleName();

        if (!typeImports[componentModuleName]) {
          typeImports[componentModuleName] = [];
        }

        const importValue = `${reference} as ${exportedTypeName}`;

        if (typeImports[componentModuleName].indexOf(importValue) === -1) {
          typeImports[componentModuleName].push(importValue);
        }

        eventTypes.push(createEventType(output, exportedTypeName));
      }
    });
  }

  return (
    importStatements.join('\n') + '\n' +
    (eventTypes.length < 1 ?
      '// eslint-disable-next-line @typescript-eslint/no-empty-interface' + '\n' : '') +
    `export declare interface ${componentTagNamePascal} extends Components.${componentTagNamePascal} {
  ${eventTypes.join('\n')}
}`
  );
}
