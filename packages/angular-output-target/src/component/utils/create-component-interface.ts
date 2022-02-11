import type { ComponentCompilerEvent, ComponentCompilerMeta } from "@stencil/core/internal";
import { dashToPascalCase } from "../../utils";
import { ImportCollection } from "../types";
import { mapEventTypes } from "./map-event-types";

export function createComponentInterface(config: {
  metadata: ComponentCompilerMeta;
  outputs: ComponentCompilerEvent[];
  includeImportCustomElements: boolean;
  customElementsDir: string;
  componentCorePackage: string;
}, imports: ImportCollection) {
  const { outputs, metadata, componentCorePackage, includeImportCustomElements, customElementsDir } = config;
  const componentTagNamePascal = dashToPascalCase(metadata.tagName);

  const eventTypes = mapEventTypes({
    componentClassName: metadata.componentClassName,
    includeImportCustomElements,
    componentCorePackage,
    customElementsDir
  }, outputs, imports);

  return (
    (eventTypes.length < 1 ?
      '// eslint-disable-next-line @typescript-eslint/no-empty-interface' + '\n' : '') +
    `export declare interface ${componentTagNamePascal} extends Components.${componentTagNamePascal} {
  ${eventTypes.join('\n')}
}`
  );
}
