import { OverlayEventDetail, type CheckboxChangeEventDetail, type InputChangeEventDetail, type MyCheckboxCustomEvent, type MyInputCustomEvent, type MyRadioGroupCustomEvent, type MyRangeCustomEvent, type RadioGroupChangeEventDetail, type RangeChangeEventDetail } from "component-library";
import { defineCustomElement as defineMyButton, MyButton as MyButtonElement } from "component-library/components/my-button.js";
import { defineCustomElement as defineMyCheckbox, MyCheckbox as MyCheckboxElement } from "component-library/components/my-checkbox.js";
import { defineCustomElement as defineMyComponent, MyComponent as MyComponentElement } from "component-library/components/my-component.js";
import { defineCustomElement as defineMyInput, MyInput as MyInputElement } from "component-library/components/my-input.js";
import { defineCustomElement as defineMyPopover, MyPopover as MyPopoverElement } from "component-library/components/my-popover.js";
import { defineCustomElement as defineMyRadioGroup, MyRadioGroup as MyRadioGroupElement } from "component-library/components/my-radio-group.js";
import { defineCustomElement as defineMyRadio, MyRadio as MyRadioElement } from "component-library/components/my-radio.js";
import { defineCustomElement as defineMyRange, MyRange as MyRangeElement } from "component-library/components/my-range.js";
import React from 'react';
import type { EventName } from '../react-component-lib';
import { createComponent as createComponentWrapper, Options } from '../react-component-lib';

const createComponent = <T extends HTMLElement, E extends Record<string, EventName | string>>({ defineCustomElement, ...options }: Options<T, E> & { defineCustomElement: () => void }) => {
  if (typeof defineCustomElement !== 'undefined') {
    defineCustomElement();
  }
  return createComponentWrapper<T, E>(options);
};

type MyButtonEvents = {
  onMyFocus: EventName<CustomEvent<void>>,
  onMyBlur: EventName<CustomEvent<void>>
};

export const MyButton = createComponent<MyButtonElement, MyButtonEvents>({
  tagName: 'my-button',
  elementClass: MyButtonElement,
  react: React,
  events: {
    onMyFocus: 'myFocus',
    onMyBlur: 'myBlur'
  } as MyButtonEvents,
  defineCustomElement: defineMyButton
});

type MyCheckboxEvents = {
  onMyChange: EventName<MyCheckboxCustomEvent<CheckboxChangeEventDetail>>,
  onMyFocus: EventName<CustomEvent<void>>,
  onMyBlur: EventName<CustomEvent<void>>
};

export const MyCheckbox = createComponent<MyCheckboxElement, MyCheckboxEvents>({
  tagName: 'my-checkbox',
  elementClass: MyCheckboxElement,
  react: React,
  events: {
    onMyChange: 'myChange',
    onMyFocus: 'myFocus',
    onMyBlur: 'myBlur'
  } as MyCheckboxEvents,
  defineCustomElement: defineMyCheckbox
});

type MyComponentEvents = { onMyCustomEvent: EventName<CustomEvent<number>> };

export const MyComponent = createComponent<MyComponentElement, MyComponentEvents>({
  tagName: 'my-component',
  elementClass: MyComponentElement,
  react: React,
  events: { onMyCustomEvent: 'myCustomEvent' } as MyComponentEvents,
  defineCustomElement: defineMyComponent
});

type MyInputEvents = {
  onMyInput: EventName<MyInputCustomEvent<KeyboardEvent>>,
  onMyChange: EventName<MyInputCustomEvent<InputChangeEventDetail>>,
  onMyBlur: EventName<CustomEvent<void>>,
  onMyFocus: EventName<CustomEvent<void>>
};

export const MyInput = createComponent<MyInputElement, MyInputEvents>({
  tagName: 'my-input',
  elementClass: MyInputElement,
  react: React,
  events: {
    onMyInput: 'myInput',
    onMyChange: 'myChange',
    onMyBlur: 'myBlur',
    onMyFocus: 'myFocus'
  } as MyInputEvents,
  defineCustomElement: defineMyInput
});

type MyPopoverEvents = {
  onMyPopoverDidPresent: EventName<CustomEvent<void>>,
  onMyPopoverWillPresent: EventName<CustomEvent<void>>,
  onMyPopoverWillDismiss: EventName<CustomEvent<OverlayEventDetail<any>>>,
  onMyPopoverDidDismiss: EventName<CustomEvent<OverlayEventDetail<any>>>
};

export const MyPopover = createComponent<MyPopoverElement, MyPopoverEvents>({
  tagName: 'my-popover',
  elementClass: MyPopoverElement,
  react: React,
  events: {
    onMyPopoverDidPresent: 'myPopoverDidPresent',
    onMyPopoverWillPresent: 'myPopoverWillPresent',
    onMyPopoverWillDismiss: 'myPopoverWillDismiss',
    onMyPopoverDidDismiss: 'myPopoverDidDismiss'
  } as MyPopoverEvents,
  defineCustomElement: defineMyPopover
});

type MyRadioEvents = {
  onMyFocus: EventName<CustomEvent<void>>,
  onMyBlur: EventName<CustomEvent<void>>,
  onMySelect: EventName<CustomEvent<void>>
};

export const MyRadio = createComponent<MyRadioElement, MyRadioEvents>({
  tagName: 'my-radio',
  elementClass: MyRadioElement,
  react: React,
  events: {
    onMyFocus: 'myFocus',
    onMyBlur: 'myBlur',
    onMySelect: 'mySelect'
  } as MyRadioEvents,
  defineCustomElement: defineMyRadio
});

type MyRadioGroupEvents = { onMyChange: EventName<MyRadioGroupCustomEvent<RadioGroupChangeEventDetail>> };

export const MyRadioGroup = createComponent<MyRadioGroupElement, MyRadioGroupEvents>({
  tagName: 'my-radio-group',
  elementClass: MyRadioGroupElement,
  react: React,
  events: { onMyChange: 'myChange' } as MyRadioGroupEvents,
  defineCustomElement: defineMyRadioGroup
});

type MyRangeEvents = {
  onMyChange: EventName<MyRangeCustomEvent<RangeChangeEventDetail>>,
  onMyFocus: EventName<CustomEvent<void>>,
  onMyBlur: EventName<CustomEvent<void>>
};

export const MyRange = createComponent<MyRangeElement, MyRangeEvents>({
  tagName: 'my-range',
  elementClass: MyRangeElement,
  react: React,
  events: {
    onMyChange: 'myChange',
    onMyFocus: 'myFocus',
    onMyBlur: 'myBlur'
  } as MyRangeEvents,
  defineCustomElement: defineMyRange
});
