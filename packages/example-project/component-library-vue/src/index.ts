/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineContainer, defineStencilSSRComponent } from '@stencil/vue-output-target/runtime';

import type { JSX } from 'component-library';

export const MyButton = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyButton>('my-button', undefined, [
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
      'myBlur',
    ])
  : defineStencilSSRComponent({
      tagName: 'my-button',
      hydrateModule: import('component-library/hydrate'),
      props: {
        color: String,
        buttonType: String,
        disabled: Boolean,
        expand: String,
        fill: String,
        download: String,
        href: String,
        rel: String,
        shape: String,
        size: String,
        strong: Boolean,
        target: String,
        type: String,
        onMyFocus: Function,
        onMyBlur: Function,
      },
    });

export const MyCheckbox = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyCheckbox, JSX.MyCheckbox['checked']>(
      'my-checkbox',
      undefined,
      ['color', 'name', 'checked', 'indeterminate', 'disabled', 'value', 'myChange', 'myFocus', 'myBlur', 'myStyle'],
      'checked',
      'myChange'
    )
  : defineStencilSSRComponent({
      tagName: 'my-checkbox',
      hydrateModule: import('component-library/hydrate'),
      props: {
        color: String,
        name: String,
        checked: Boolean,
        indeterminate: Boolean,
        disabled: Boolean,
        value: String,
        onMyChange: Function,
        onMyFocus: Function,
        onMyBlur: Function,
        onMyStyle: Function,
      },
    });

export const MyComponent = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyComponent>('my-component', undefined, [
      'first',
      'middle',
      'last',
      'age',
      'kidsNames',
      'myCustomEvent',
    ])
  : defineStencilSSRComponent({
      tagName: 'my-component',
      hydrateModule: import('component-library/hydrate'),
      props: {
        first: String,
        middle: String,
        last: String,
        age: Number,
        kidsNames: String,
        onMyCustomEvent: Function,
      },
    });

export const MyInput = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyInput, JSX.MyInput['value']>(
      'my-input',
      undefined,
      [
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
        'myFocus',
      ],
      'value',
      'myChange'
    )
  : defineStencilSSRComponent({
      tagName: 'my-input',
      hydrateModule: import('component-library/hydrate'),
      props: {
        color: String,
        accept: String,
        autocapitalize: String,
        autocomplete: String,
        autocorrect: String,
        autofocus: Boolean,
        clearInput: Boolean,
        clearOnEdit: Boolean,
        disabled: Boolean,
        enterkeyhint: String,
        inputmode: String,
        max: String,
        maxlength: Number,
        min: String,
        minlength: Number,
        multiple: Boolean,
        name: String,
        pattern: String,
        placeholder: String,
        readonly: Boolean,
        required: Boolean,
        spellcheck: Boolean,
        step: String,
        size: Number,
        type: String,
        value: String,
        onMyInput: Function,
        onMyChange: Function,
        onMyBlur: Function,
        onMyFocus: Function,
      },
    });

export const MyPopover = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyPopover>('my-popover', undefined, [
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
      'myPopoverDidDismiss',
    ])
  : defineStencilSSRComponent({
      tagName: 'my-popover',
      hydrateModule: import('component-library/hydrate'),
      props: {
        component: String,
        componentProps: String,
        keyboardClose: Boolean,
        cssClass: String,
        backdropDismiss: Boolean,
        event: String,
        showBackdrop: Boolean,
        translucent: Boolean,
        animated: Boolean,
        onMyPopoverDidPresent: Function,
        onMyPopoverWillPresent: Function,
        onMyPopoverWillDismiss: Function,
        onMyPopoverDidDismiss: Function,
      },
    });

export const MyRadio = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyRadio>('my-radio', undefined, [
      'color',
      'name',
      'disabled',
      'value',
      'myStyle',
      'myFocus',
      'myBlur',
      'mySelect',
    ])
  : defineStencilSSRComponent({
      tagName: 'my-radio',
      hydrateModule: import('component-library/hydrate'),
      props: {
        color: String,
        name: String,
        disabled: Boolean,
        value: String,
        onMyStyle: Function,
        onMyFocus: Function,
        onMyBlur: Function,
        onMySelect: Function,
      },
    });

export const MyRadioGroup = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyRadioGroup, JSX.MyRadioGroup['value']>(
      'my-radio-group',
      undefined,
      ['allowEmptySelection', 'name', 'value', 'myChange'],
      'value',
      'myChange'
    )
  : defineStencilSSRComponent({
      tagName: 'my-radio-group',
      hydrateModule: import('component-library/hydrate'),
      props: {
        allowEmptySelection: Boolean,
        name: String,
        value: String,
        onMyChange: Function,
      },
    });

export const MyRange = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyRange, JSX.MyRange['value']>(
      'my-range',
      undefined,
      [
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
        'myBlur',
      ],
      'value',
      'myChange'
    )
  : defineStencilSSRComponent({
      tagName: 'my-range',
      hydrateModule: import('component-library/hydrate'),
      props: {
        color: String,
        debounce: Number,
        name: String,
        dualKnobs: Boolean,
        min: Number,
        max: Number,
        pin: Boolean,
        snaps: Boolean,
        step: Number,
        ticks: Boolean,
        disabled: Boolean,
        value: Number,
        onMyChange: Function,
        onMyStyle: Function,
        onMyFocus: Function,
        onMyBlur: Function,
      },
    });
