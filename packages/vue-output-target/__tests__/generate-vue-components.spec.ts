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
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', MyComponentCmp);
`
  });
  it('should create v-model bindings', () => {
    const generateComponentDefinition = createComponentDefinition('Components', [{
      elements: ['my-component'],
      event: 'ionChange',
      targetAttr: 'value'
    }]);
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
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', MyComponentCmp, [
  'value',
  'ionChange'
],
{
  "modelProp": "value",
  "modelUpdateEvent": "ionChange"
});
`);
  });

  it('should add router bindings', () => {
    const generateComponentDefinition = createComponentDefinition('Components', [], ['my-component']);
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
    });

  expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', MyComponentCmp, [
  'value'
],
{
  "routerLinkComponent": true
});
`);
  });

  it('should add router and v-model bindings', () => {
    const generateComponentDefinition = createComponentDefinition('Components', [{
      elements: ['my-component'],
      event: 'ionChange',
      targetAttr: 'value'
    }], ['my-component']);
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
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', MyComponentCmp, [
  'value',
  'ionChange'
],
{
  "modelProp": "value",
  "modelUpdateEvent": "ionChange",
  "routerLinkComponent": true
});
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
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', MyComponentCmp, [
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
export const MyComponent = /*@__PURE__*/ defineContainer<Components.MyComponent>('my-component', MyComponentCmp, [
  'myProp'
]);
`);
  });
});
