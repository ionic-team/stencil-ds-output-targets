import { mount } from '@vue/test-utils';
import { MyCheckbox } from '../src';

describe('MyCheckbox', () => {
  const Component = {
    template: `<my-checkbox type="text" v-model="itemIsChecked"></my-checkbox>`,
    data() {
      return {
        itemIsChecked: false,
      };
    },
  };
  const wrapper = mount(Component, {
    components: { MyCheckbox },
  });
  it('on myChange value the bound component attribute should update', () => {
    const myCheckboxEl = wrapper.find('my-checkbox').element as HTMLMyCheckboxElement;
    myCheckboxEl.dispatchEvent(new CustomEvent('myChange', { detail: { value: true } }));

    expect(wrapper.vm.$data.itemIsChecked).toEqual(true);
  });
});
