import { mount } from '@vue/test-utils';
import { MyRadioGroup } from '../src';

describe('MyRadioGroup', () => {
  const Component = {
    template: `
  <my-radio-group name="" v-model="selectedName">
    <label><my-radio slot="start" value="biff"></my-radio></label>
    <label><my-radio slot="start" value="griff"></my-radio></label>
    <label><my-radio slot="start" value="buford"></my-radio></label>
  </my-radio-group>`,
    data() {
      return {
        selectedName: '',
      };
    },
  };
  const wrapper = mount(Component, {
    components: { MyRadioGroup },
  });
  it('on myChange value the bound component attribute should update', async () => {
    const myRadioGroupEl = wrapper.find('my-radio-group').element as HTMLMyRadioElement;
    myRadioGroupEl.dispatchEvent(new CustomEvent('my-change', { detail: { value: 'buford' } }));
    expect(wrapper.vm.$data.selectedName).toEqual('buford');
  });
});
