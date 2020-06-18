import { mount } from '@vue/test-utils';
import { MyComponent } from '../src';

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
});
