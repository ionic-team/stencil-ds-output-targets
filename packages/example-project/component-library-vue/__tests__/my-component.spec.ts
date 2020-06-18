import { mount } from '@vue/test-utils';
import { MyComponent } from '../src';

describe('MyComponent', () => {
  it('should be rendered by Vue', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.element.tagName.toLowerCase()).toEqual('my-component');
  });
});
