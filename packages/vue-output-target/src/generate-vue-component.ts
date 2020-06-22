import { dashToPascalCase } from './utils';
import { ComponentCompilerMeta } from '@stencil/core/internal';
import { ComponentModelConfig } from './types';

export const createComponentDefinition = (
  importTypes: string,
  componentModelConfigs: ComponentModelConfig[] | undefined,
) => (cmpMeta: ComponentCompilerMeta) => {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  let model = '';

  const props = cmpMeta.properties
    .map(
      (prop) => `${prop.name} as PropOptions<${importTypes}.${tagNameAsPascal}['${prop.name}']>,`,
    )
    .join('\n');

  if (Array.isArray(componentModelConfigs)) {
    const relevantModelConfig = componentModelConfigs.find((modelConfig) => {
      if (Array.isArray(modelConfig.elements)) {
        return modelConfig.elements.includes(cmpMeta.tagName);
      }

      return modelConfig.elements === cmpMeta.tagName;
    });

    if (relevantModelConfig) {
      model = `
      model: {
        prop: '${relevantModelConfig.targetAttr}',
        event: '${relevantModelConfig.event}'
      }
      `;
    }
  }

  const methods = cmpMeta.methods
    .map(
      (method) =>
        `${method.name}(...args): ${method.complexType} { this.$refs.wc.${method.name}(...args)}`,
    )
    .join('\n');

  return `
  export const ${tagNameAsPascal} = Vue.extend({
    props: {
      ${props}
    },
    ${model}
    methods: {
      ${methods}
    }
    render: createCommonRender('${cmpMeta.tagName}'),
  });
  `;
};
