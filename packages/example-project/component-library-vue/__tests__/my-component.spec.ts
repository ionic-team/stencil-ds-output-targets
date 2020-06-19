import { mount } from '@vue/test-utils';
import { MyComponent, MyInput } from '../src';

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
});

describe('MyInput', () => {
  it('should expose methods that map to wc', () => {
    const wrapper = mount(MyInput);
    const wc = wrapper.find('my-input').element;
    const fakeFocus = jest.fn();
    wc.focus = fakeFocus;
    wrapper.vm.focus();
    expect(fakeFocus).toBeCalledTimes(1);
  });
  it('should set events on handler', () => {
    const Component = {
      template: `<MyInput v-on:click="$emit('click')"></MyInput>`,
    };
    const onClick = jest.fn();
    const wrapper = mount(Component, {
      components: { MyInput },
      listeners: {
        click: onClick,
      },
    });

    wrapper.find('my-input').trigger('click');
    expect(onClick).toBeCalledTimes(1);
  });

  it('should add custom events', () => {
    const Component = {
      template: `<MyInput v-on:ion-focus="$emit('ion-focus')"></MyInput>`,
    };
    const onIonFocus = jest.fn();
    const wrapper = mount(Component, {
      components: { MyInput },
      listeners: {
        'ion-focus': onIonFocus,
      },
    });

    wrapper.find('my-input').trigger('ion-focus');
    expect(onIonFocus).toBeCalledTimes(1);
  });
});
