import { mount } from '@vue/test-utils';
import { MyRange } from '../src';

describe('MyRadioGroup', () => {
  const Component = {
    template: `<my-range min="0" max="100" type="text" v-model="testText"></my-range>`,
    data() {
      return {
        testText: '',
      };
    },
  };
  const wrapper = mount(Component, {
    components: { MyRange },
  });
  it('on myChange value the bound component attribute should update', () => {
    const myRangeEl = wrapper.find('my-range');
    myRangeEl.trigger('myChange', { value: '50' });
    expect(wrapper.vm.$data.testText).toEqual('50');
  });
});
