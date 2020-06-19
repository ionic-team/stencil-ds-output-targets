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

  it('should get numbers as props', () => {
    const wrapper = mount(MyComponent, {
      propsData: {
        age: 39,
      },
    });
    expect(wrapper.props().age).toEqual(39);
    expect((wrapper.element as HTMLMyComponentElement).age).toEqual(39);
  });

  it('should get arrays as props', () => {
    const wrapper = mount(MyComponent, {
      propsData: {
        kidsNames: ['billy', 'jane'],
      },
    });
    expect(wrapper.props().kidsNames).toEqual(['billy', 'jane']);
    expect((wrapper.element as HTMLMyComponentElement).kidsNames).toEqual(['billy', 'jane']);
  });
});
/*
describe('createComponent - ref', () => {
  test('should pass ref on to web component instance', () => {
    const myButtonRef: React.RefObject<any> = React.createRef();
    const { webcomponent: myButtonItem } = includeWebComponent<HTMLMyButtonElement>(
      renderWithStrictMode(<MyButton ref={myButtonRef}>ButtonNameA</MyButton>),
    );
    expect(myButtonRef.current).toEqual(myButtonItem);
  });
});

describe('createComponent - events', () => {
  test('should set events on handler', () => {
    const FakeOnClick = jest.fn((e) => e);

    const { webcomponent } = includeWebComponent<HTMLMyButtonElement>(
      renderWithStrictMode(<MyButton onClick={FakeOnClick}>ButtonNameA</MyButton>),
    );
    fireEvent.click(webcomponent);
    expect(FakeOnClick).toBeCalledTimes(1);
  });

  test('should add custom events', () => {
    const myInputRef: React.RefObject<any> = React.createRef();
    const FakeFocus = jest.fn();

    const { webcomponent } = includeWebComponent<HTMLMyInputElement>(
      renderWithStrictMode(<MyInput ref={myInputRef} onIonFocus={FakeFocus} />),
    );
    const attachedEvents = (webcomponent as any).__events;
    expect(Object.keys(attachedEvents)).toContain('ionFocus');
  });
});
*/
