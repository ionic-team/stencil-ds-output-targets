import { createComponentDefinition } from '../src/generate-vue-component';

describe('createComponentDefinition', () => {
  const generateComponentDefinition = createComponentDefinition('Components', []);

  it('should create a Vue component with the render method using createCommonRender', () => {
    const output = generateComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [],
      events: [],
    });

    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('my-component', []),
});
`);
  });

  it('should pass event references to the createCommonRender function', () => {
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
export const MyComponent = /*@__PURE__*/ Vue.extend({



  render: createCommonRender('my-component', ['my-event']),
});
`);
  });

  it('should add a prop with Reference to the original component library prop type', () => {
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
export const MyComponent = /*@__PURE__*/ Vue.extend({

  props: {
    myProp: {} as PropOptions<Components.MyComponent['myProp']>,
  },


  render: createCommonRender('my-component', []),
});
`);
  });

  it('should add a method with Reference to the original component library prop type', () => {
    const output = generateComponentDefinition({
      properties: [],
      tagName: 'my-component',
      methods: [
        {
          name: 'myProp',
          internal: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            signature: '',
            parameters: [],
            references: {},
            return: '',
          },
        },
      ],
      events: [],
    });

    expect(output).toEqual(`
export const MyComponent = /*@__PURE__*/ Vue.extend({



  methods: {
    myProp: createCommonMethod('myProp') as Components.MyComponent['myProp'],
  },
  render: createCommonRender('my-component', []),
});
`);
  });
});
