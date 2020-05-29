import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MyComponent, MyButton, MyInput } from '../src';
import '@testing-library/jest-dom';

describe('MyComponent', () => {
  it('should be rendered by React', () => {
    const { container } = render(<MyComponent />);
    const component = container.getElementsByTagName('my-component')[0];
    expect(component).toBeInTheDocument();
  });

  it('should get strings as props', () => {
    const { container } = render(<MyComponent first="blue" />);
    const component = container.getElementsByTagName('my-component')[0];
    expect(component.first).toEqual('blue');
  });
});

describe('createComponent - events', () => {
  test('should set events on handler', () => {
    const FakeOnClick = jest.fn((e) => e);

    const { getByText } = render(<MyButton onClick={FakeOnClick}>ButtonNameA</MyButton>);
    fireEvent.click(getByText('ButtonNameA'));
    expect(FakeOnClick).toBeCalledTimes(1);
  });

  test('should add custom events', () => {
    const FakeIonFocus = jest.fn((e) => e);

    const { getByText } = render(<MyInput onFocus={FakeIonFocus}>ButtonNameA</MyInput>);
    const ionInputItem = getByText('ButtonNameA');
    expect(Object.keys((ionInputItem as any).__events)).toEqual(['ionFocus']);
  });
});

describe('createComponent - ref', () => {
  test('should pass ref on to web component instance', () => {
    const ionButtonRef: React.RefObject<any> = React.createRef();

    const { getByText } = render(<MyButton ref={ionButtonRef}>ButtonNameA</MyButton>);
    const ionButtonItem = getByText('ButtonNameA');
    expect(ionButtonRef.current).toEqual(ionButtonItem);
  });
});
