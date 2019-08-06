import React from 'react';
import { createReactComponent } from '../createComponent';
import { RenderResult, cleanup, fireEvent, render } from 'react-testing-library';
import { JSX } from './fixture-component-lib';

afterEach(cleanup);

describe('createComponent - values', () => {
  test('should set values on item', () => {
    const DemoComponent = createReactComponent<JSX.DemoComponent, HTMLDemoComponentElement>(
      'demo-component',
    );
    const { getByText } = render(
      <DemoComponent min={1} max={1000} advanced={{ one: 1, two: 'two', three: [0, 1, 2, 3] }}>
        ButtonNameA
      </DemoComponent>,
    );
    const demoComponent = getByText('ButtonNameA');
    expect((demoComponent as any).min).toEqual(1);
    expect((demoComponent as any).max).toEqual(1000);
    expect((demoComponent as any).advanced).toEqual({ one: 1, two: 'two', three: [0, 1, 2, 3] });
  });
});

describe('createComponent - events', () => {
  test('should set events on handler', () => {
    const FakeOnClick = jest.fn(e => e);
    const DemoComponent = createReactComponent<JSX.DemoComponent, HTMLDemoComponentElement>(
      'demo-component',
    );

    const { getByText } = render(<DemoComponent onClick={FakeOnClick}>ButtonNameA</DemoComponent>);
    fireEvent.click(getByText('ButtonNameA'));
    expect(FakeOnClick).toBeCalledTimes(1);
  });

  test('should add custom events', () => {
    const FakeIonFocus = jest.fn(e => e);
    const DemoComponent = createReactComponent<JSX.DemoComponent, HTMLDemoComponentElement>(
      'demo-component',
    );

    const { getByText } = render(
      <DemoComponent onSlideFocus={FakeIonFocus}>ButtonNameA</DemoComponent>,
    );
    const inputItem = getByText('ButtonNameA');
    expect(Object.keys((inputItem as any).__events)).toEqual(['slideFocus']);
  });
});

describe('createComponent - ref', () => {
  test('should pass ref on to web component instance', () => {
    const ionButtonRef: React.RefObject<any> = React.createRef();
    const DemoComponent = createReactComponent<JSX.DemoComponent, HTMLDemoComponentElement>(
      'demo-component',
    );

    const { getByText } = render(<DemoComponent ref={ionButtonRef}>ButtonNameA</DemoComponent>);
    const ionButtonItem = getByText('ButtonNameA');
    expect(ionButtonRef.current).toEqual(ionButtonItem);
  });
});

describe('when working with css classes', () => {
  const myClass = 'my-class';
  const myClass2 = 'my-class2';
  const customClass = 'custom-class';
  const DemoComponent = createReactComponent<JSX.DemoComponent, HTMLDemoComponentElement>(
    'demo-component',
  );

  describe('when a class is added to className', () => {
    let renderResult: RenderResult;
    let button: HTMLElement;

    beforeEach(() => {
      renderResult = render(<DemoComponent className={myClass}>Hello!</DemoComponent>);
      button = renderResult.getByText(/Hello/);
    });

    it('then it should be in the class list', () => {
      expect(button.classList.contains(myClass)).toBeTruthy();
    });

    it('when a class is added to class list outside of React, then that class should still be in class list when rendered again', () => {
      button.classList.add(customClass);
      expect(button.classList.contains(customClass)).toBeTruthy();
      renderResult.rerender(<DemoComponent className={myClass}>Hello!</DemoComponent>);
      expect(button.classList.contains(customClass)).toBeTruthy();
    });
  });

  describe('when multiple classes are added to className', () => {
    let renderResult: RenderResult;
    let button: HTMLElement;

    beforeEach(() => {
      renderResult = render(
        <DemoComponent className={myClass + ' ' + myClass2}>Hello!</DemoComponent>,
      );
      button = renderResult.getByText(/Hello/);
    });

    it('then both classes should be in class list', () => {
      expect(button.classList.contains(myClass)).toBeTruthy();
      expect(button.classList.contains(myClass2)).toBeTruthy();
    });

    it('when one of the classes is removed, then only the remaining class should be in class list', () => {
      expect(button.classList.contains(myClass)).toBeTruthy();
      expect(button.classList.contains(myClass2)).toBeTruthy();

      renderResult.rerender(<DemoComponent className={myClass}>Hello!</DemoComponent>);

      expect(button.classList.contains(myClass)).toBeTruthy();
      expect(button.classList.contains(myClass2)).toBeFalsy();
    });

    it('when a custom class is added outside of React and one of the classes is removed, then only the remaining class and the custom class should be in class list', () => {
      button.classList.add(customClass);
      expect(button.classList.contains(myClass)).toBeTruthy();
      expect(button.classList.contains(myClass2)).toBeTruthy();
      expect(button.classList.contains(customClass)).toBeTruthy();

      renderResult.rerender(<DemoComponent className={myClass}>Hello!</DemoComponent>);

      expect(button.classList.contains(myClass)).toBeTruthy();
      expect(button.classList.contains(myClass)).toBeTruthy();
      expect(button.classList.contains(myClass2)).toBeFalsy();
    });
  });
});
