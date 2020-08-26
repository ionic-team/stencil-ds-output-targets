import { createComponentDefinition } from '../src/generate-svelte-component';

describe('createComponentDefinition', () => {
  it('should create a Svelte component', () => {
    const output = createComponentDefinition({
      tagName: 'my-component',
      properties: [{ 
        name: 'propOne', 
        attribute: 'prop-one' 
      }, { 
        name: 'propTwo',
        attribute: 'prop-two' 
      }, { 
        name: 'propThree',
      }],
      methods: [{ name: 'methodOne' }, { name: 'methodTwo' }, { name: 'methodThree' }],
      events: [{ name: 'eventOne' }, { name: 'eventTwo' }, { name: 'eventThree' }],
    } as any);

    expect(output).toMatchSnapshot();
  });
});
