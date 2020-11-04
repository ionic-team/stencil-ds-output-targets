/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer } from './vue-component-lib/utils';

import { JSX } from 'component-library';

import { applyPolyfills, defineCustomElements } from 'component-library/loader';

applyPolyfills().then(() => defineCustomElements());

export const MyButton = /*@__PURE__*/ defineContainer<JSX.MyButton>('my-button', [
  'color',
  'buttonType',
  'disabled',
  'expand',
  'fill',
  'download',
  'href',
  'rel',
  'shape',
  'size',
  'strong',
  'target',
  'type',
  'myFocus',
  'myBlur'
]);


export const MyCheckbox = /*@__PURE__*/ defineContainer<JSX.MyCheckbox>('my-checkbox', [
  'color',
  'name',
  'checked',
  'indeterminate',
  'disabled',
  'value',
  'myChange',
  'myFocus',
  'myBlur',
  'myStyle'
],
{
  "modelProp": "checked",
  "modelUpdateEvent": "myChange"
});


export const MyComponent = /*@__PURE__*/ defineContainer<JSX.MyComponent>('my-component', [
  'first',
  'middle',
  'last',
  'age',
  'kidsNames',
  'myCustomEvent'
]);


export const MyInput = /*@__PURE__*/ defineContainer<JSX.MyInput>('my-input', [
  'color',
  'accept',
  'autocapitalize',
  'autocomplete',
  'autocorrect',
  'autofocus',
  'clearInput',
  'clearOnEdit',
  'disabled',
  'enterkeyhint',
  'inputmode',
  'max',
  'maxlength',
  'min',
  'minlength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'required',
  'spellcheck',
  'step',
  'size',
  'type',
  'value',
  'myInput',
  'myChange',
  'myBlur',
  'myFocus'
],
{
  "modelProp": "value",
  "modelUpdateEvent": "myChange"
});


export const MyPopover = /*@__PURE__*/ defineContainer<JSX.MyPopover>('my-popover', [
  'component',
  'componentProps',
  'keyboardClose',
  'cssClass',
  'backdropDismiss',
  'event',
  'showBackdrop',
  'translucent',
  'animated',
  'myPopoverDidPresent',
  'myPopoverWillPresent',
  'myPopoverWillDismiss',
  'myPopoverDidDismiss'
]);


export const MyRadio = /*@__PURE__*/ defineContainer<JSX.MyRadio>('my-radio', [
  'color',
  'name',
  'disabled',
  'value',
  'myStyle',
  'myFocus',
  'myBlur',
  'mySelect'
],
{
  "modelProp": "checked",
  "modelUpdateEvent": "mySelect"
});


export const MyRadioGroup = /*@__PURE__*/ defineContainer<JSX.MyRadioGroup>('my-radio-group', [
  'allowEmptySelection',
  'name',
  'value',
  'myChange'
],
{
  "modelProp": "value",
  "modelUpdateEvent": "myChange"
});


export const MyRange = /*@__PURE__*/ defineContainer<JSX.MyRange>('my-range', [
  'color',
  'debounce',
  'name',
  'dualKnobs',
  'min',
  'max',
  'pin',
  'snaps',
  'step',
  'ticks',
  'disabled',
  'value',
  'myChange',
  'myStyle',
  'myFocus',
  'myBlur'
],
{
  "modelProp": "value",
  "modelUpdateEvent": "myChange"
});

