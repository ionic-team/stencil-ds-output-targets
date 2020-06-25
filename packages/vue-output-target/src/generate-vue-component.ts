import { dashToPascalCase } from './utils';
import { ComponentCompilerMeta } from '@stencil/core/internal';
import { ComponentModelConfig } from './types';

export const createComponentDefinition = (
  importTypes: string,
  componentModelConfigs: ComponentModelConfig[] | undefined,
) => (cmpMeta: ComponentCompilerMeta) => {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  let props = '';
  let model = '';
  let methods = '';

  if (Array.isArray(cmpMeta.properties) && cmpMeta.properties.length > 0) {
    const relevantPropsConfig = cmpMeta.properties
      .map(
        (prop) =>
          `    ${prop.name}: {} as PropOptions<${importTypes}.${tagNameAsPascal}['${prop.name}']>,`,
      )
      .join('\n');

    props = `
  props: {
${relevantPropsConfig}
  },`;
  }

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
  },`;
    }
  }

  if (Array.isArray(cmpMeta.methods) && cmpMeta.methods.length > 0) {
    const relevantMethodConfig = cmpMeta.methods
      .map(
        (method) =>
          `    ${method.name}: createCommonMethod('${method.name}') as ${importTypes}.${tagNameAsPascal}['${method.name}'],`,
      )
      .join('\n');

    methods = `
  methods: {
${relevantMethodConfig}
  },`;
  }

  return `
export const ${tagNameAsPascal} = /*@__PURE__*/ Vue.extend({
${props}
${model}
${methods}
  render: createCommonRender('${cmpMeta.tagName}', [${cmpMeta.events
    .map((e) => `'${e.name}'`)
    .join(', ')}]),
});
  `;
};
