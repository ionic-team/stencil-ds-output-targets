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

  it('should render attributes as dash-case', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyComponentElement>(
      renderWithStrictMode(<MyButton buttonType="my-button-type" />)
    );
    expect(myComponent.hasAttribute('buttonType')).toBe(false);
    expect(myComponent.getAttribute('button-type')).toBe('my-button-type');
  });

  it('should get strings as props and attrs', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyComponentElement>(
      renderWithStrictMode(<MyComponent first="blue" />)
    );
    expect(myComponent.first).toEqual('blue');
    expect(myComponent.getAttribute('first')).toBe('blue');
  });

  it('should get numbers as props and attrs', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyComponentElement>(
      renderWithStrictMode(<MyComponent age={39} />)
    );
    expect(myComponent.age).toEqual(39);
    expect(myComponent.getAttribute('age')).toBe('39');
  });

  it('should get booleans as props and attrs', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyInputElement>(
      renderWithStrictMode(<MyInput clearInput />)
    );
    expect(myComponent.clearInput).toEqual(true);
    expect(myComponent.getAttribute('clear-input')).toBe('true');
  });

  it('should get arrays as props only', () => {
    const { webcomponent: myComponent } = includeWebComponent<HTMLMyComponentElement>(
      renderWithStrictMode(<MyComponent kidsNames={['billy', 'jane']} />)
    );
    expect(myComponent.kidsNames).toEqual(['billy', 'jane']);
    expect(myComponent.hasAttribute('kidsNames')).toBe(false);
    expect(myComponent.hasAttribute('kids-names')).toBe(false);
  });
});

describe('createComponent - ref', () => {
  test('should pass ref on to web component instance', () => {
    const myButtonRef: React.RefObject<any> = React.createRef();
    const { webcomponent: myButtonItem } = includeWebComponent<HTMLMyButtonElement>(
      renderWithStrictMode(<MyButton ref={myButtonRef}>ButtonNameA</MyButton>)
    );
    expect(myButtonRef.current).toEqual(myButtonItem);
  });
});

describe('createComponent - events', () => {
  test('should set events on handler', () => {
    const FakeOnClick = jest.fn((e) => e);

    const { webcomponent } = includeWebComponent<HTMLMyButtonElement>(
      renderWithStrictMode(<MyButton onClick={FakeOnClick}>ButtonNameA</MyButton>)
    );
    fireEvent.click(webcomponent);
    expect(FakeOnClick).toBeCalledTimes(1);
  });

  test('should add custom events', () => {
    const myInputRef: React.RefObject<any> = React.createRef();
    const FakeFocus = jest.fn();

    const { webcomponent } = includeWebComponent<HTMLMyInputElement>(
      renderWithStrictMode(<MyInput ref={myInputRef} onMyFocus={FakeFocus} />)
    );
    const attachedEvents = (webcomponent as any).__events;
    expect(Object.keys(attachedEvents)).toContain('myFocus');
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
