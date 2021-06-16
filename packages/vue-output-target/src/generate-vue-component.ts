import { dashToPascalCase } from './utils';
import { ComponentCompilerMeta } from '@stencil/core/internal';
import { ComponentModelConfig } from './types';

export const createComponentDefinition = (
  importTypes: string,
  componentModelConfig: ComponentModelConfig[] | undefined,
  includeCustomElement: boolean = false
) => (cmpMeta: Pick<ComponentCompilerMeta, 'properties' | 'tagName' | 'methods' | 'events'>) => {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  const importAs = (includeCustomElement) ? tagNameAsPascal + 'Cmp' : 'undefined';

  let props: string[] = [];

  if (Array.isArray(cmpMeta.properties) && cmpMeta.properties.length > 0) {
    props = cmpMeta.properties.map((prop) => `'${prop.name}'`);
  }

  if (Array.isArray(cmpMeta.events) && cmpMeta.events.length > 0) {
    props = [
      ...props,
      ...cmpMeta.events.map((event) => `'${event.name}'`)
    ]
  }

  let templateString = `
export const ${tagNameAsPascal} = /*@__PURE__*/ defineContainer<${importTypes}.${tagNameAsPascal}>('${cmpMeta.tagName}', ${importAs}`;

  const findModel = componentModelConfig && componentModelConfig.find(config => config.elements.includes(cmpMeta.tagName));

  if (props.length > 0) {
    templateString += `, [
  ${props.length > 0 ? props.join(',\n  ') : ''}
]`;
  /**
   * If there are no props,
   * but but v-model is stil used,
   * make sure we pass in an empty array
   * otherwise all of the defineContainer properties
   * will be off by one space.
   * Note: If you are using v-model then
   * the props array should never be empty
   * as there must be a prop for v-model to update,
   * but this check is there so builds do not crash.
   */
  } else if (findModel) {
    templateString += `, []`
  }


  if (findModel) {
    const targetProp = findModel.targetAttr;

    /**
     * If developer is trying to bind v-model support to a component's
     * prop, but that prop was not defined, warn them of this otherwise
     * v-model will not work as expected.
     */
    if (!props.includes(`'${targetProp}'`)) {
      console.warn(`Your '${cmpMeta.tagName}' component is configured to have v-model support bound to '${targetProp}', but '${targetProp}' is not defined as a property on the component. v-model integration may not work as expected.`);
    }

    templateString += `,\n`;
    templateString += `'${targetProp}', '${findModel.event}'`;

    if (findModel.externalEvent) {
      templateString += `, '${findModel.externalEvent}'`;
    }
  }

  templateString += `);\n`;

  return templateString;
};
