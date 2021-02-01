import { createComponentDefinition } from '../src/generate-vue-component';

describe('createComponentDefinition', () => {
  it('should create a Vue component with the render method using createCommonRender', () => {
    const output = createComponentDefinition(
      'Components',
      [],
    )({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    });

    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ defineContainer<JSX.MyComponent>('my-component',
  [],
  [],
  
);
`);
  });

  it('should pass event references to the createCommonRender function', () => {
    const output = createComponentDefinition(
      'Components',
      [],
    )({
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
export const MyComponent = /*@__PURE__*/ defineContainer<JSX.MyComponent>('my-component',
  [],
  ['my-event'],
  
);
`);
  });

  it('should add a prop with Reference to the original component library prop type', () => {
    const output = createComponentDefinition(
      'Components',
      [],
    )({
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
export const MyComponent = /*@__PURE__*/ defineContainer<JSX.MyComponent>('my-component',
  ['myProp'],
  [],
  
);
`);
  });

  it('should add a method with Reference to the original component library prop type', () => {
    const output = createComponentDefinition('Components', [
      {
        event: 'myChange',
        targetAttr: 'myProp',
        elements: 'my-component',
      },
    ])({
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
      events: [
        {
          internal: false,
          name: 'myChange',
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
export const MyComponent = /*@__PURE__*/ defineContainer<JSX.MyComponent>('my-component',
  ['myProp'],
  ['myChange'],
  {
    modelProp: 'myProp',
    modelUpdateEvent: 'myChange'
  },
);
`);
  });
});
