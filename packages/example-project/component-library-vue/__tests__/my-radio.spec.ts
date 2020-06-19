import { mount } from '@vue/test-utils';
import { MyRadio } from '../src';

describe('MyRadioGroup', () => {
  const Component = {
    template: `<my-radio [(ngModel)]="isChecked"></my-radio>`,
  };
  const wrapper = mount(Component, {
    components: { MyRadio },
    data: {
      testText: '',
    },
  });
  it('on myChange value the bound component attribute should update', () => {
    const myRangeEl = wrapper.find('my-range');
    myRangeEl.trigger('mySelect', { target: { checked: true } });
    expect(wrapper.vm.$data.isChecked).toEqual(true);
  });
});
