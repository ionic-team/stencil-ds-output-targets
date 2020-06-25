import { mount } from '@vue/test-utils';
import { MyComponent } from '../src';

describe('MyComponent', () => {
  it('should be rendered by Vue', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.element.tagName.toLowerCase()).toEqual('my-component');
  });

  it('should get attributes assigned to the component', () => {
    const wrapper = mount(MyComponent, {
      attrs: {
        id: 'one',
      },
    });
    expect((wrapper.element as HTMLMyComponentElement).getAttribute('id')).toEqual('one');
  });

  it('should get strings as props', () => {
    const wrapper = mount(MyComponent, {
      propsData: {
        first: 'blue',
      },
    });
    expect(wrapper.props().first).toEqual('blue');
    expect((wrapper.element as HTMLMyComponentElement).first).toEqual('blue');
  });

  it('should get numbers as props', () => {
    const wrapper = mount(MyComponent, {
      propsData: {
        age: 39,
      },
    });
    expect(wrapper.props().age).toEqual(39);
    expect((wrapper.element as HTMLMyComponentElement).age).toEqual(39);
  });

  it('should get arrays as props', () => {
    const wrapper = mount(MyComponent, {
      propsData: {
        kidsNames: ['billy', 'jane'],
      },
    });
    expect(wrapper.props().kidsNames).toEqual(['billy', 'jane']);
    expect((wrapper.element as HTMLMyComponentElement).kidsNames).toEqual(['billy', 'jane']);
  });

  it('on myChange value the bound component attribute should update', () => {
    const onMyCustomEvent = jest.fn();
    const Component = {
      template: `<MyComponent type="text" v-on:myCustomEvent="customEventAction"></MyComponent>`,
      components: { MyComponent },
      methods: {
        customEventAction: onMyCustomEvent,
      },
    };
    const wrapper = mount(Component);
    const myComponentEl = wrapper.find('my-component').element as HTMLMyCheckboxElement;
    myComponentEl.dispatchEvent(new CustomEvent('myCustomEvent', { detail: 5 }));

    expect(onMyCustomEvent).toBeCalledTimes(1);
    expect(onMyCustomEvent).toBeCalledWith(5);
  });
});
