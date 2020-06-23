/* eslint-disable */
/* tslint:disable */
/* auto-generated react proxies */
import { createReactComponent } from './react-component-lib';

import { JSX } from 'component-library';

export function componentsFactory(transformTagName: (tagName: string) => string = tagName => tagName) {
  return {
    MyButton: /*@__PURE__*/createReactComponent<JSX.MyButton, HTMLMyButtonElement>(transformTagName('my-button')),
    MyCheckbox: /*@__PURE__*/createReactComponent<JSX.MyCheckbox, HTMLMyCheckboxElement>(transformTagName('my-checkbox')),
    MyComponent: /*@__PURE__*/createReactComponent<JSX.MyComponent, HTMLMyComponentElement>(transformTagName('my-component')),
    MyInput: /*@__PURE__*/createReactComponent<JSX.MyInput, HTMLMyInputElement>(transformTagName('my-input')),
    MyPopover: /*@__PURE__*/createReactComponent<JSX.MyPopover, HTMLMyPopoverElement>(transformTagName('my-popover')),
    MyRadio: /*@__PURE__*/createReactComponent<JSX.MyRadio, HTMLMyRadioElement>(transformTagName('my-radio')),
    MyRadioGroup: /*@__PURE__*/createReactComponent<JSX.MyRadioGroup, HTMLMyRadioGroupElement>(transformTagName('my-radio-group')),
    MyRange: /*@__PURE__*/createReactComponent<JSX.MyRange, HTMLMyRangeElement>(transformTagName('my-range'))
  };
}

const components = componentsFactory();
export const MyButton = components.MyButton;
export const MyCheckbox = components.MyCheckbox;
export const MyComponent = components.MyComponent;
export const MyInput = components.MyInput;
export const MyPopover = components.MyPopover;
export const MyRadio = components.MyRadio;
export const MyRadioGroup = components.MyRadioGroup;
export const MyRange = components.MyRange;
