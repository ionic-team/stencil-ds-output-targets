import type { ComponentCompilerEvent } from "@stencil/core/internal";
import { getCustomElementsDir, normalizePath } from "../../utils";
import { ImportCollection, ImportStatement } from "../types";

const getComponentModuleName = (componentCorePackage: string, includeImportCustomElements: boolean, customElementsDir?: string) => {
  if (componentCorePackage !== undefined) {
    const dirPath = includeImportCustomElements ? `/${getCustomElementsDir(customElementsDir)}` : '';
    return normalizePath(`${componentCorePackage}${dirPath}`);
  }
  return componentCorePackage;
}

const createOutputEventType = (output: ComponentCompilerEvent, typeName: string) => {
  let eventName = output.name;
  if (output.name.indexOf('-') !== -1) {
    // If an event name includes a dash, we need to wrap it in quotes.
    // https://github.com/ionic-team/stencil-ds-output-targets/issues/212
    eventName = `'${output.name}'`;
  }

  return (
    (output.docs?.text && output.docs.text.trim().length > 0 ? (
      `/**
      * ${output.docs.text}${output.docs.tags.length > 0 ? ` ${output.docs.tags.map((tag) => `@${tag.name} ${tag.text}`)}` : ''}
      */\n`) : '') +
    `${eventName}: EventEmitter<CustomEvent<${typeName.trim()}>>;`
  );
}

export function mapEventTypes(config: {
  componentClassName: string;
  componentCorePackage: string;
  includeImportCustomElements: boolean;
  customElementsDir: string
}, outputs: ComponentCompilerEvent[], imports: ImportCollection) {
  const eventTypes: string[] = [];

  for (const output of outputs) {
    for (const [reference, refObject] of Object.entries(output.complexType.references)) {
      // Global location references are not generated.
      if (refObject.location === 'local' || refObject.location === 'import') {
        let exportedTypeName = `I${reference}`;

        if (!reference.startsWith(config.componentClassName)) {
          // If the event type does not being with the component class name,
          // we append the component class name to the event type.
          exportedTypeName = `I${config.componentClassName}${reference}`;
        }

        const componentModuleName = getComponentModuleName(
          config.componentCorePackage,
          config.includeImportCustomElements,
          config.customElementsDir
        );

        if (!imports[componentModuleName]) {
          imports[componentModuleName] = [];
        }

        const importValue: ImportStatement = {
          value: `${reference} as ${exportedTypeName}`,
          typeOnly: true
        };

        if (imports[componentModuleName].findIndex(i => {
          if (typeof i === 'string') {
            return i === importValue.value;
          } else {
            return i.value === importValue.value;
          }
        }) === -1) {
          imports[componentModuleName].push(importValue);
        }

        eventTypes.push(createOutputEventType(output, exportedTypeName));
      }
    };
  }

  return eventTypes;
}
