import { dashToPascalCase } from './utils';

/**
 * Creates an Angular module declaration for a component wrapper.
 * @param componentTagName The tag name of the Stencil component.
 * @returns The Angular module declaration as a string.
 */
const createAngularModuleForComponent = (componentTagName: string) => {
  const tagNameAsPascal = dashToPascalCase(componentTagName);

  const moduleDefinition = `
@NgModule({
  declarations: [${tagNameAsPascal}],
  exports: [${tagNameAsPascal}]
})
export class ${tagNameAsPascal}Module {}
`;

  return moduleDefinition;
};

/**
 * Creates an Angular module for each component.
 * @param componentTagNames The tag names of the components to create modules for.
 * @returns An array of Angular modules.
 */
export const generateAngularModules = (componentTagNames: string[]) => {
  return componentTagNames.map(createAngularModuleForComponent);
};
