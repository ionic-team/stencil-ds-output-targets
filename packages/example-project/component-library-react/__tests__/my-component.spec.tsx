import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { MyComponent, MyButton, MyInput } from '../src';
import '@testing-library/jest-dom';
import { HTMLStencilElement } from 'component-library/dist/types/stencil-public-runtime';

describe('MyComponent', () => {
  it('should be rendered by React', () => {
    const { container } = renderWithStrictMode(<MyComponent />);
    const component = container.getElementsByTagName('my-component')[0];
    expect(component).toBeInTheDocument();
  });

  it('should get strings as props', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyComponentElement>(
      renderWithStrictMode(<MyComponent first="blue" />),
    );
    expect(myComponent.first).toEqual('blue');
  });

  it('should get numbers as props', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyComponentElement>(
      renderWithStrictMode(<MyComponent age={39} />),
    );
    expect(myComponent.age).toEqual(39);
  });

  it('should get arrays as props', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyComponentElement>(
      renderWithStrictMode(<MyComponent kidsNames={['billy', 'jane']} />),
    );
    expect(myComponent.kidsNames).toEqual(['billy', 'jane']);
  });
});

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
      renderWithStrictMode(<MyInput ref={myInputRef} onMyFocus={FakeFocus} />),
    );
    const attachedEvents = (webcomponent as any).__events;
    expect(Object.keys(attachedEvents)).toContain('myFocus');
  });

  test('should clean up unused events', async () => {
    const FakeFocus = jest.fn();

    const { webcomponent, rerender } = includeWebComponent<HTMLMyInputElement>(
      renderWithStrictMode(<MyInput onMyFocus={FakeFocus} />),
    );

    const attachedEvents = (webcomponent as any).__events;
    expect(Object.keys(attachedEvents)).toContain('myFocus');

    rerender(
      <React.StrictMode>
        <MyInput />
      </React.StrictMode>,
    );

    expect(Object.keys(attachedEvents)).not.toContain('myFocus');
  });
});

function includeWebComponent<T extends HTMLStencilElement>(results: RenderResult) {
  const webcomponent = results.container.children[0] as T;
  return {
    ...results,
    webcomponent,
  };
}

function renderWithStrictMode(children: React.ReactElement) {
  return render(<React.StrictMode>{children}</React.StrictMode>);
}
