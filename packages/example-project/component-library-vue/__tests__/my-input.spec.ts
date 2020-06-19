import { mount } from '@vue/test-utils';
import { MyInput } from '../src';

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
