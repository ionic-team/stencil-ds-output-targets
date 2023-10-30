import { dashToPascalCase } from './utils';
import { ComponentCompilerMeta } from '@stencil/core/internal';
import { ComponentModelConfig } from './types';

export const createComponentDefinition =
  (
    importTypes: string,
    componentModelConfig: ComponentModelConfig[] | undefined,
    includeCustomElement: boolean = false
  ) =>
  (cmpMeta: Pick<ComponentCompilerMeta, 'properties' | 'tagName' | 'methods' | 'events'>) => {
    const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
    const importAs = includeCustomElement ? 'define' + tagNameAsPascal : 'undefined';

    let props: string[] = [];

    if (Array.isArray(cmpMeta.properties) && cmpMeta.properties.length > 0) {
      props = cmpMeta.properties.map((prop) => `'${prop.name}'`);
    }

    if (Array.isArray(cmpMeta.events) && cmpMeta.events.length > 0) {
      props = [...props, ...cmpMeta.events.map((event) => `'${event.name}'`)];
    }

    const componentType = `${importTypes}.${tagNameAsPascal}`;
    const findModel =
      componentModelConfig && componentModelConfig.find((config) => config.elements.includes(cmpMeta.tagName));
    const modelType = findModel !== undefined ? `, ${componentType}["${findModel.targetAttr}"]` : '';

    let templateString = `
export const ${tagNameAsPascal} = /*@__PURE__*/ defineContainer<${componentType}${modelType}>('${cmpMeta.tagName}', ${importAs}`;

    if (props.length > 0) {
      templateString += `, [
  ${props.length > 0 ? props.join(',\n  ') : ''}
]`;
      /**
       * If there are no props,
       * but v-model is still used,
       * make sure we pass in an empty array
       * otherwise all of the defineContainer properties
       * will be off by one space.
       * Note: If you are using v-model then
       * the props array should never be empty
       * as there must be a prop for v-model to update,
       * but this check is there so builds do not crash.
       */
    } else if (findModel) {
      templateString += `, []`;
    }

    if (findModel) {
      const targetProp = findModel.targetAttr;

      /**
       * If developer is trying to bind v-model support to a component's
       * prop, but that prop was not defined, warn them of this otherwise
       * v-model will not work as expected.
       */
      if (!props.includes(`'${targetProp}'`)) {
        console.warn(
          `Your '${cmpMeta.tagName}' component is configured to have v-model support bound to '${targetProp}', but '${targetProp}' is not defined as a property on the component. v-model integration may not work as expected.`
        );
      }

      templateString += `,\n`;
      templateString += `'${targetProp}', '${findModel.event}'`;
    }

    templateString += `);\n`;

    return templateString;
  };
