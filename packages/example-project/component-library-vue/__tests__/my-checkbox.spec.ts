import { mount } from '@vue/test-utils';
import { MyCheckbox } from '../src';

describe('MyRadioGroup', () => {
  const Component = {
    template: `<my-checkbox type="text" v-model="itemIsChecked"></my-checkbox>`,
  };
  const wrapper = mount(Component, {
    components: { MyCheckbox },
    data: {
      itemIsChecked: false,
    },
  });
  it('on myChange value the bound component attribute should update', () => {
    const myCheckboxEl = wrapper.find('my-checkbox');
    myCheckboxEl.trigger('myChange', { target: { checked: true } });
    expect(wrapper.vm.$data.itemIsChecked).toEqual(true);
  });
});
