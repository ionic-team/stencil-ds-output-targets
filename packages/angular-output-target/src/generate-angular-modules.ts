import { dashToPascalCase } from './utils';

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
  const modules = componentTagNames.map(createAngularModuleForComponent);
  return modules;
};
