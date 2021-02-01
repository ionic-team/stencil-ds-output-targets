import { dashToPascalCase } from './utils';
import type { ComponentCompilerMeta } from '@stencil/core/internal';
import type { ComponentModelConfig } from './types';

export const createComponentDefinition = (
  importTypes: string,
  componentModelConfigs: ComponentModelConfig[] | undefined,
) => (cmpMeta: Pick<ComponentCompilerMeta, 'properties' | 'tagName' | 'methods' | 'events'>) => {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  let props = '[],\n';
  let events = '[],\n';
  let model = '';

  if (Array.isArray(cmpMeta.properties) && cmpMeta.properties.length > 0) {
    props = cmpMeta.properties.map((prop) => `'${prop.name}'`).join(',\n');
    props = `[${props}],`;
  }

  if (Array.isArray(cmpMeta.events) && cmpMeta.events.length > 0) {
    events = cmpMeta.events.map((event) => `'${event.name}'`).join(',\n');
    events = `[${events}],`;
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
  {
    modelProp: '${relevantModelConfig.targetAttr}',
    modelUpdateEvent: '${relevantModelConfig.event}'
  },\n`;
    }
  }

  return `
export const ${tagNameAsPascal} = /*@__PURE__*/ defineContainer<JSX.${tagNameAsPascal}>('${
    cmpMeta.tagName
  }',
  ${props.trim()}
  ${events.trim()}
  ${model.trim()}
);\n`;
};
