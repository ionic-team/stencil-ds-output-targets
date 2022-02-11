import { ImportCollection } from "../types";
import { OutputTargetAngular } from "../../types";
import { getCustomElementsDir, normalizePath, setImportStatement } from "../../utils";

/**
 * Sets the appropriate import statement type for the package.
 *
 * If the output target is using custom elements, then we only
 * import type declarations and annotations.
 *
 * ```ts
 * import type { Components } from 'package-name';
 * ```
 *
 * Otherwise, we import the entire entry point.
 *
 * ```ts
 * import { Components } from 'package-name';
 * ```
 *
 * @param outputTarget The output target configuration. Includes information regarding the package name and whether to build custom elements.
 * @param componentsTypeFile The path to the components type file (.d.ts)
 * @param importCollection The collection of imports to add to the generated output.
 */
export function setComponentNamespaceImport(outputTarget: Pick<OutputTargetAngular, 'componentCorePackage' | 'customElementsDir' | 'includeImportCustomElements'>, componentsTypeFile: string, importCollection: {
  modules: ImportCollection,
  types: ImportCollection
}) {
  const baseModulePath = outputTarget.componentCorePackage ?
    normalizePath(outputTarget.componentCorePackage) :
    normalizePath(componentsTypeFile);

  if (outputTarget.includeImportCustomElements) {
    setImportStatement(importCollection.types, `${baseModulePath}/${getCustomElementsDir(outputTarget.customElementsDir)}`, 'Components');
  } else {
    setImportStatement(importCollection.modules, baseModulePath, 'Components');
  }
}
