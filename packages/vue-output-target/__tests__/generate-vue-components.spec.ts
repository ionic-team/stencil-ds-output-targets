import { createComponentDefinition } from '../src/generate-vue-component';

describe('createComponentDefinition', () => {
  it('should create a Vue component with the render method using createCommonRender', () => {
    const generateComponentDefinition = createComponentDefinition('Components', []);
    const output = generateComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    });
    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', undefined);
`);
  });
  it('should create a Vue component with custom element support', () => {
    const generateComponentDefinition = createComponentDefinition('Components', [], true);
    const output = generateComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    });
    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', defineMyComponent);
`);
  });

  it('should create v-model bindings', () => {
    const generateComponentDefinition = createComponentDefinition('Components', [
      {
        elements: ['my-component'],
        event: 'ionChange',
        targetAttr: 'value',
      },
    ]);
    const output = generateComponentDefinition({
      properties: [
        {
          name: 'value',
          internal: false,
          mutable: false,
          optional: false,
          required: false,
          type: 'string',
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
          docs: {
            text: '',
            tags: [],
          },
        },
      ],
      tagName: 'my-component',
      methods: [],
      events: [
        {
          internal: false,
          name: 'ionChange',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
        },
      ],
    });

    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent, Components.MyComponent["value"]>('my-component', undefined, [
  'value',
  'ionChange'
],
'value', 'ionChange');
`);
  });

  it('should add router and v-model bindings', () => {
    const generateComponentDefinition = createComponentDefinition('Components', [
      {
        elements: ['my-component'],
        event: 'ionChange',
        targetAttr: 'value',
      },
    ]);
    const output = generateComponentDefinition({
      tagName: 'my-component',
      properties: [
        {
          name: 'value',
          internal: false,
          mutable: false,
          optional: false,
          required: false,
          type: 'string',
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
          docs: {
            text: '',
            tags: [],
          },
        },
      ],
      events: [
        {
          internal: false,
          name: 'ionChange',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
        },
      ],
    });

    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent, Components.MyComponent["value"]>('my-component', undefined, [
  'value',
  'ionChange'
],
'value', 'ionChange');
`);
  });

  it('should pass event references to the createCommonRender function', () => {
    const generateComponentDefinition = createComponentDefinition('Components');
    const output = generateComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [
        {
          internal: false,
          name: 'my-event',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
        },
      ],
    });

    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', undefined, [
  'my-event'
]);
`);
  });

  it('should add a prop with Reference to the original component library prop type', () => {
    const generateComponentDefinition = createComponentDefinition('Components');
    const output = generateComponentDefinition({
      properties: [
        {
          name: 'myProp',
          internal: false,
          mutable: false,
          optional: false,
          required: false,
          type: 'string',
          complexType: {
            original: '',
            resolved: '',
            references: {},
          },
          docs: {
            text: '',
            tags: [],
          },
        },
      ],
      tagName: 'my-component',
      methods: [],
      events: [],
    });

    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', undefined, [
  'myProp'
]);
`);
  });
});
