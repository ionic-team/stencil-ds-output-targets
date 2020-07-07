/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import Vue, { PropOptions } from 'vue';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

import { Components } from 'component-library';

import { applyPolyfills, defineCustomElements } from 'component-library/loader';

applyPolyfills().then(() => defineCustomElements());

const customElementTags: string[] = [
 'my-button',
 'my-checkbox',
 'my-component',
 'my-input',
 'my-popover',
 'my-radio',
 'my-radio-group',
 'my-range',
];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];


export const MyButton = /*@__PURE__*/ Vue.extend({

  props: {
    color: {} as PropOptions<Components.MyButton['color']>,
    buttonType: {} as PropOptions<Components.MyButton['buttonType']>,
    disabled: {} as PropOptions<Components.MyButton['disabled']>,
    expand: {} as PropOptions<Components.MyButton['expand']>,
    fill: {} as PropOptions<Components.MyButton['fill']>,
    download: {} as PropOptions<Components.MyButton['download']>,
    href: {} as PropOptions<Components.MyButton['href']>,
    rel: {} as PropOptions<Components.MyButton['rel']>,
    shape: {} as PropOptions<Components.MyButton['shape']>,
    size: {} as PropOptions<Components.MyButton['size']>,
    strong: {} as PropOptions<Components.MyButton['strong']>,
    target: {} as PropOptions<Components.MyButton['target']>,
    type: {} as PropOptions<Components.MyButton['type']>,
  },


  render: createCommonRender('my-button', ['myFocus', 'myBlur']),
});


export const MyCheckbox = /*@__PURE__*/ Vue.extend({

  props: {
    color: {} as PropOptions<Components.MyCheckbox['color']>,
    name: {} as PropOptions<Components.MyCheckbox['name']>,
    checked: {} as PropOptions<Components.MyCheckbox['checked']>,
    indeterminate: {} as PropOptions<Components.MyCheckbox['indeterminate']>,
    disabled: {} as PropOptions<Components.MyCheckbox['disabled']>,
    value: {} as PropOptions<Components.MyCheckbox['value']>,
  },

  model: {
    prop: 'checked',
    event: 'myChange'
  },

  render: createCommonRender('my-checkbox', ['myChange', 'myFocus', 'myBlur', 'myStyle']),
});


export const MyComponent = /*@__PURE__*/ Vue.extend({

  props: {
    first: {} as PropOptions<Components.MyComponent['first']>,
    middle: {} as PropOptions<Components.MyComponent['middle']>,
    last: {} as PropOptions<Components.MyComponent['last']>,
    age: {} as PropOptions<Components.MyComponent['age']>,
    kidsNames: {} as PropOptions<Components.MyComponent['kidsNames']>,
  },


  render: createCommonRender('my-component', ['myCustomEvent']),
});


export const MyInput = /*@__PURE__*/ Vue.extend({

  props: {
    color: {} as PropOptions<Components.MyInput['color']>,
    accept: {} as PropOptions<Components.MyInput['accept']>,
    autocapitalize: {} as PropOptions<Components.MyInput['autocapitalize']>,
    autocomplete: {} as PropOptions<Components.MyInput['autocomplete']>,
    autocorrect: {} as PropOptions<Components.MyInput['autocorrect']>,
    autofocus: {} as PropOptions<Components.MyInput['autofocus']>,
    clearInput: {} as PropOptions<Components.MyInput['clearInput']>,
    clearOnEdit: {} as PropOptions<Components.MyInput['clearOnEdit']>,
    disabled: {} as PropOptions<Components.MyInput['disabled']>,
    enterkeyhint: {} as PropOptions<Components.MyInput['enterkeyhint']>,
    inputmode: {} as PropOptions<Components.MyInput['inputmode']>,
    max: {} as PropOptions<Components.MyInput['max']>,
    maxlength: {} as PropOptions<Components.MyInput['maxlength']>,
    min: {} as PropOptions<Components.MyInput['min']>,
    minlength: {} as PropOptions<Components.MyInput['minlength']>,
    multiple: {} as PropOptions<Components.MyInput['multiple']>,
    name: {} as PropOptions<Components.MyInput['name']>,
    pattern: {} as PropOptions<Components.MyInput['pattern']>,
    placeholder: {} as PropOptions<Components.MyInput['placeholder']>,
    readonly: {} as PropOptions<Components.MyInput['readonly']>,
    required: {} as PropOptions<Components.MyInput['required']>,
    spellcheck: {} as PropOptions<Components.MyInput['spellcheck']>,
    step: {} as PropOptions<Components.MyInput['step']>,
    size: {} as PropOptions<Components.MyInput['size']>,
    type: {} as PropOptions<Components.MyInput['type']>,
    value: {} as PropOptions<Components.MyInput['value']>,
  },

  model: {
    prop: 'value',
    event: 'myChange'
  },

  methods: {
    setFocus: createCommonMethod('setFocus') as Components.MyInput['setFocus'],
    getInputElement: createCommonMethod('getInputElement') as Components.MyInput['getInputElement'],
  },
  render: createCommonRender('my-input', ['myInput', 'myChange', 'myBlur', 'myFocus']),
});


export const MyPopover = /*@__PURE__*/ Vue.extend({

  props: {
    component: {} as PropOptions<Components.MyPopover['component']>,
    componentProps: {} as PropOptions<Components.MyPopover['componentProps']>,
    keyboardClose: {} as PropOptions<Components.MyPopover['keyboardClose']>,
    cssClass: {} as PropOptions<Components.MyPopover['cssClass']>,
    backdropDismiss: {} as PropOptions<Components.MyPopover['backdropDismiss']>,
    event: {} as PropOptions<Components.MyPopover['event']>,
    showBackdrop: {} as PropOptions<Components.MyPopover['showBackdrop']>,
    translucent: {} as PropOptions<Components.MyPopover['translucent']>,
    animated: {} as PropOptions<Components.MyPopover['animated']>,
  },


  methods: {
    present: createCommonMethod('present') as Components.MyPopover['present'],
    dismiss: createCommonMethod('dismiss') as Components.MyPopover['dismiss'],
    onDidDismiss: createCommonMethod('onDidDismiss') as Components.MyPopover['onDidDismiss'],
    onWillDismiss: createCommonMethod('onWillDismiss') as Components.MyPopover['onWillDismiss'],
  },
  render: createCommonRender('my-popover', ['myPopoverDidPresent', 'myPopoverWillPresent', 'myPopoverWillDismiss', 'myPopoverDidDismiss']),
});


export const MyRadio = /*@__PURE__*/ Vue.extend({

  props: {
    color: {} as PropOptions<Components.MyRadio['color']>,
    name: {} as PropOptions<Components.MyRadio['name']>,
    disabled: {} as PropOptions<Components.MyRadio['disabled']>,
    value: {} as PropOptions<Components.MyRadio['value']>,
  },

  model: {
    prop: 'checked',
    event: 'mySelect'
  },

  render: createCommonRender('my-radio', ['myStyle', 'myFocus', 'myBlur', 'mySelect']),
});


export const MyRadioGroup = /*@__PURE__*/ Vue.extend({

  props: {
    allowEmptySelection: {} as PropOptions<Components.MyRadioGroup['allowEmptySelection']>,
    name: {} as PropOptions<Components.MyRadioGroup['name']>,
    value: {} as PropOptions<Components.MyRadioGroup['value']>,
  },

  model: {
    prop: 'value',
    event: 'myChange'
  },

  render: createCommonRender('my-radio-group', ['myChange']),
});


export const MyRange = /*@__PURE__*/ Vue.extend({

  props: {
    color: {} as PropOptions<Components.MyRange['color']>,
    debounce: {} as PropOptions<Components.MyRange['debounce']>,
    name: {} as PropOptions<Components.MyRange['name']>,
    dualKnobs: {} as PropOptions<Components.MyRange['dualKnobs']>,
    min: {} as PropOptions<Components.MyRange['min']>,
    max: {} as PropOptions<Components.MyRange['max']>,
    pin: {} as PropOptions<Components.MyRange['pin']>,
    snaps: {} as PropOptions<Components.MyRange['snaps']>,
    step: {} as PropOptions<Components.MyRange['step']>,
    ticks: {} as PropOptions<Components.MyRange['ticks']>,
    disabled: {} as PropOptions<Components.MyRange['disabled']>,
    value: {} as PropOptions<Components.MyRange['value']>,
  },

  model: {
    prop: 'value',
    event: 'myChange'
  },

  render: createCommonRender('my-range', ['myChange', 'myStyle', 'myFocus', 'myBlur']),
});

