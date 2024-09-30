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
        color: [String, 'color'],
        buttonType: [String, 'button-type'],
        disabled: [Boolean, 'disabled'],
        expand: [String, 'expand'],
        fill: [String, 'fill'],
        download: [String, 'download'],
        href: [String, 'href'],
        rel: [String, 'rel'],
        shape: [String, 'shape'],
        size: [String, 'size'],
        strong: [Boolean, 'strong'],
        target: [String, 'target'],
        type: [String, 'type'],
        onMyFocus: [Function],
        onMyBlur: [Function],
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
        color: [String, 'color'],
        name: [String, 'name'],
        checked: [Boolean, 'checked'],
        indeterminate: [Boolean, 'indeterminate'],
        disabled: [Boolean, 'disabled'],
        value: [String, 'value'],
        onMyChange: [Function],
        onMyFocus: [Function],
        onMyBlur: [Function],
        onMyStyle: [Function],
      },
    });

export const MyComponent = /*@__PURE__*/ globalThis.window
  ? defineContainer<JSX.MyComponent>('my-component', undefined, [
      'first',
      'middle',
      'last',
      'age',
      'kidsNames',
      'favoriteKidName',
      'myCustomEvent',
    ])
  : defineStencilSSRComponent({
      tagName: 'my-component',
      hydrateModule: import('component-library/hydrate'),
      props: {
        first: [String, 'first'],
        middle: [String, 'middle'],
        last: [String, 'last'],
        age: [Number, 'age'],
        favoriteKidName: [String, 'favorite-kid-name'],
        onMyCustomEvent: [Function],
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
        color: [String, 'color'],
        accept: [String, 'accept'],
        autocapitalize: [String, 'autocapitalize'],
        autocomplete: [String, 'autocomplete'],
        autocorrect: [String, 'autocorrect'],
        autofocus: [Boolean, 'autofocus'],
        clearInput: [Boolean, 'clear-input'],
        clearOnEdit: [Boolean, 'clear-on-edit'],
        disabled: [Boolean, 'disabled'],
        enterkeyhint: [String, 'enterkeyhint'],
        inputmode: [String, 'inputmode'],
        max: [String, 'max'],
        maxlength: [Number, 'maxlength'],
        min: [String, 'min'],
        minlength: [Number, 'minlength'],
        multiple: [Boolean, 'multiple'],
        name: [String, 'name'],
        pattern: [String, 'pattern'],
        placeholder: [String, 'placeholder'],
        readonly: [Boolean, 'readonly'],
        required: [Boolean, 'required'],
        spellcheck: [Boolean, 'spellcheck'],
        step: [String, 'step'],
        size: [Number, 'size'],
        type: [String, 'type'],
        onMyInput: [Function],
        onMyChange: [Function],
        onMyBlur: [Function],
        onMyFocus: [Function],
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
        component: [String, 'component'],
        keyboardClose: [Boolean, 'keyboard-close'],
        cssClass: [String, 'css-class'],
        backdropDismiss: [Boolean, 'backdrop-dismiss'],
        showBackdrop: [Boolean, 'show-backdrop'],
        translucent: [Boolean, 'translucent'],
        animated: [Boolean, 'animated'],
        onMyPopoverDidPresent: [Function],
        onMyPopoverWillPresent: [Function],
        onMyPopoverWillDismiss: [Function],
        onMyPopoverDidDismiss: [Function],
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
        color: [String, 'color'],
        name: [String, 'name'],
        disabled: [Boolean, 'disabled'],
        onMyStyle: [Function],
        onMyFocus: [Function],
        onMyBlur: [Function],
        onMySelect: [Function],
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
        allowEmptySelection: [Boolean, 'allow-empty-selection'],
        name: [String, 'name'],
        onMyChange: [Function],
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
        color: [String, 'color'],
        debounce: [Number, 'debounce'],
        name: [String, 'name'],
        dualKnobs: [Boolean, 'dual-knobs'],
        min: [Number, 'min'],
        max: [Number, 'max'],
        pin: [Boolean, 'pin'],
        snaps: [Boolean, 'snaps'],
        step: [Number, 'step'],
        ticks: [Boolean, 'ticks'],
        disabled: [Boolean, 'disabled'],
        value: [Number, 'value'],
        onMyChange: [Function],
        onMyStyle: [Function],
        onMyFocus: [Function],
        onMyBlur: [Function],
      },
    });
