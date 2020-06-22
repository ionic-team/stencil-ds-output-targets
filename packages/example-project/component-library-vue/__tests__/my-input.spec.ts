import { mount } from '@vue/test-utils';
import { MyInput } from '../src';

describe('MyInput', () => {
  it('should expose methods that map to wc', () => {
    const wrapper = mount(MyInput);
    const wc = wrapper.find('my-input').element as HTMLMyInputElement;
    const fakeFocus = jest.fn();

    wc.setFocus = fakeFocus;
    wrapper.vm.setFocus();
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
});
