import { mount } from '@vue/test-utils';
import { MyRadio } from '../src';

describe('MyRadioGroup', () => {
  const Component = {
    template: `<my-radio v-model="isChecked"></my-radio>`,
    data() {
      return {
        isChecked: '',
      };
    },
  };
  const wrapper = mount(Component, {
    components: { MyRadio },
  });
  it('on myChange value the bound component attribute should update', () => {
    const myRangeEl = wrapper.find('my-radio');
    myRangeEl.trigger('mySelect', { checked: true });
    expect(wrapper.vm.$data.isChecked).toEqual(true);
  });
});
