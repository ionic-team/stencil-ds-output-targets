import { ComponentCompilerMeta } from '@stencil/core/internal';
import { dashToPascalCase } from './utils';

export const svelte2TSX = () => `
class Svelte2TsxComponent<
  Props extends {} = {},
  Events extends {} = {},
  Slots extends {} = {}
> {
  $$prop_def: Props;

  $$events_def: Events;

  $$slot_def: Slots;

  constructor(options: {
    target: Element;
    anchor?: Element;
    props?: Props;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
  });

  $on<K extends keyof Events>(event: K, handler: (e: Events[K]) => any): void;
  $destroy(): void;
  $set(props: Partial<Props>): void;
}
`;

export const generateTypings = (meta: ComponentCompilerMeta) => {
  const name = dashToPascalCase(meta.tagName);
  const jsxEventName = (eventName: string) => `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;

  const types = `
interface ${name}Props {
  ${
  meta.properties
    .map((prop) => `\n/** ${prop.docs.text} */\n${prop.name}?: Components.${name}["${prop.name}"]`)
    .join('\n  ')}
}

interface ${name}Events {
  ${
  meta.events
    .map((event) => `\n/** ${event.docs.text} */\n${event.name}: Parameters<JSX.${name}["${jsxEventName(event.name)}"]>[0]["detail"]`)
    .join('\n  ')}
}

interface ${name}Slots {
  default: any
}

${svelte2TSX()}

export default class ${name} extends Svelte2TsxComponent<
  ${name}Props, 
  ${name}Events, 
  ${name}Slots
> {
  get getWebComponent(): HTML${name}Element | undefined;
  ${
  meta.methods
    .map((method) => `\n/** ${method.docs.text} */\nget ${method.name}(): Components.${name}["${method.name}"]`)
    .join('\n  ')}
}
    `;

  return types;
};
