import { ImportCollection } from "../types";

export function createTypeImports(typedImports: ImportCollection) {
  const importStatements: string[] = [];

  for (const [modulePath, imports] of Object.entries(typedImports)) {
    // Sort imports alphabetically
    imports.sort();
    if (imports.length > 0) {
      importStatements.push(
        `import type {
${imports.map((importValue) => `  ${importValue}`).join(',\n')}
} from '${modulePath}';`
      );
    }
  }

  return importStatements.join('\n');
}
