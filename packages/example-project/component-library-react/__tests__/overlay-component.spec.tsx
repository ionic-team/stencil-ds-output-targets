import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { MyPopover } from '../src';
import '@testing-library/jest-dom';

describe('createOverlayComponent - events', () => {
  test('should set events on handler', async () => {
    const onDismiss = jest.fn();
    const { baseElement, container } = render(
      <>
        <MyPopover isOpen={false} onDidDismiss={onDismiss} buttons={[]}>
          ButtonNameA
        </MyPopover>
        <span>ButtonNameA</span>
      </>,
    );
    expect(container).toContainHTML('<div><span>ButtonNameA</span></div>');
    expect(baseElement.querySelector('ion-action-sheet-controller')).toBeInTheDocument();
  });

  test('should create component and attach props on opening', async () => {
    const onDidDismiss = jest.fn();
    const { baseElement, rerender, container } = render(
      <MyPopover isOpen={false} onDidDismiss={onDidDismiss} buttons={[]}>
        ButtonNameA
      </MyPopover>,
    );

    const [element, presentFunction] = createControllerElement();
    const actionSheetController = augmentController(baseElement, container, element);

    const attachEventPropsSpy = jest.spyOn(utils, 'attachEventProps');

    rerender(
      <MyPopover isOpen={true} onDidDismiss={onDidDismiss} buttons={[]}>
        ButtonNameA
      </MyPopover>,
    );

    await waitForElement(() => container.querySelector('ion-action-sheet'));

    expect((actionSheetController as any).create).toHaveBeenCalled();
    expect(presentFunction).toHaveBeenCalled();
    expect(attachEventPropsSpy).toHaveBeenCalledWith(element, {
      buttons: [],
      onMyPopover: onDidDismiss,
    });
  });

  test('should dismiss component on hiding', async () => {
    const [element, , dismissFunction] = createControllerElement();

    const { baseElement, rerender, container } = render(
      <MyPopover isOpen={false} onDidDismiss={jest.fn()} buttons={[]}>
        ButtonNameA
      </MyPopover>,
    );

    augmentController(baseElement, container, element);

    rerender(
      <MyPopover isOpen={true} onDidDismiss={jest.fn()} buttons={[]}>
        ButtonNameA
      </MyPopover>,
    );

    await waitForElement(() => container.querySelector('ion-action-sheet'));

    rerender(
      <MyPopover isOpen={false} onDidDismiss={jest.fn()} buttons={[]}>
        ButtonNameA
      </MyPopover>,
    );

    expect(dismissFunction).toHaveBeenCalled();
  });
});
