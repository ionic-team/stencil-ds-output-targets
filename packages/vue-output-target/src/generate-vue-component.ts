import { dashToPascalCase } from './utils';
import { ComponentCompilerMeta } from '@stencil/core/internal';
import { ComponentModelConfig } from './types';

export const createComponentDefinition = (
  importTypes: string,
  componentModelConfigs: ComponentModelConfig[] | undefined,
) => (cmpMeta: Pick<ComponentCompilerMeta, 'properties' | 'tagName' | 'methods' | 'events'>) => {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  let props = '';
  let model = '';
  let methods = '';
  let bindingEvent: string = '';
  let bindingValue: string = '';

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

  // Use provided model bindings from config if available
  if (Array.isArray(componentModelConfigs)) {
    const modelConfig = componentModelConfigs.find((modelConfig) => {
      if (Array.isArray(modelConfig.elements)) {
        return modelConfig.elements.includes(cmpMeta.tagName);
      }

      return modelConfig.elements === cmpMeta.tagName;
    });
    if (modelConfig) {
      bindingEvent = modelConfig?.event;
      bindingValue = modelConfig?.targetAttr;
    }

    // Else check if any of the component Events have bindAttr annotations
  } else {
    for (let event of cmpMeta.events) {
      const bindingInfo = event.docs.tags.find((t) => t.name === 'bindAttr');
      if (bindingInfo?.text) {
        bindingValue = bindingInfo.text;
        bindingEvent = event.name;
        break;
      }
    }
  }

  if (bindingValue && bindingEvent) {
    model = `
  model: {
    prop: '${bindingValue}',
    event: '${bindingEvent}'
  },`;
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
});\n`;
};
