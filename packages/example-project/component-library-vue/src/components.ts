import Vue, { PropOptions } from 'vue';
import { Components } from 'component-library';
import { createCommonRender, createCommonMethod } from './vue-component-lib/utils';

/**
 * Ensure the web components that we are wrappering are ignored by Vue
 */
const customElementTags = [
  'my-component',
  'my-input',
  'my-checkbox',
  'my-radio',
  'my-radio-group',
  'my-range',
];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];

export const MyComponent = Vue.extend({
  props: {
    age: {} as PropOptions<Components.MyComponent['age']>,
    first: {} as PropOptions<Components.MyComponent['first']>,
    kidsNames: {} as PropOptions<Components.MyComponent['kidsNames']>,
    last: {} as PropOptions<Components.MyComponent['last']>,
    middle: {} as PropOptions<Components.MyComponent['middle']>,
  },
  render: createCommonRender('my-component'),
});

export const MyInput = Vue.extend({
  props: {
    accept: {} as PropOptions<Components.MyInput['accept']>,
    autocapitalize: {} as PropOptions<Components.MyInput['autocapitalize']>,
    autocomplete: {} as PropOptions<Components.MyInput['autocomplete']>,
    autocorrect: {} as PropOptions<Components.MyInput['autocorrect']>,
    autofocus: {} as PropOptions<Components.MyInput['autofocus']>,
    clearInput: {} as PropOptions<Components.MyInput['clearInput']>,
    clearOnEdit: {} as PropOptions<Components.MyInput['clearOnEdit']>,
    color: {} as PropOptions<Components.MyInput['color']>,
    disabled: {} as PropOptions<Components.MyInput['disabled']>,
    enterkeyhint: {} as PropOptions<Components.MyInput['enterkeyhint']>,
    inputmode: {} as PropOptions<Components.MyInput['inputmode']>,
    max: {} as PropOptions<Components.MyInput['max']>,
    maxlength: {} as PropOptions<Components.MyInput['maxlength']>,
    min: {} as PropOptions<Components.MyInput['min']>,
    minlength: {} as PropOptions<Components.MyInput['minlength']>,
    mode: {} as PropOptions<Components.MyInput['mode']>,
    multiple: {} as PropOptions<Components.MyInput['multiple']>,
    name: {} as PropOptions<Components.MyInput['name']>,
    pattern: {} as PropOptions<Components.MyInput['pattern']>,
    placeholder: {} as PropOptions<Components.MyInput['placeholder']>,
    readonly: {} as PropOptions<Components.MyInput['readonly']>,
    required: {} as PropOptions<Components.MyInput['required']>,
    size: {} as PropOptions<Components.MyInput['size']>,
    spellcheck: {} as PropOptions<Components.MyInput['spellcheck']>,
    step: {} as PropOptions<Components.MyInput['step']>,
    type: {} as PropOptions<Components.MyInput['type']>,
    value: {} as PropOptions<Components.MyInput['value']>,
  },
  model: {
    prop: 'value',
    event: 'my-change',
  },
  methods: {
    setFocus: createCommonMethod('setFocus') as Components.MyInput['setFocus'],
  },
  render: createCommonRender('my-input'),
});

export const MyCheckbox = Vue.extend({
  props: {
    checked: {} as PropOptions<Components.MyCheckbox['checked']>,
    color: {} as PropOptions<Components.MyCheckbox['color']>,
    disabled: {} as PropOptions<Components.MyCheckbox['disabled']>,
    indeterminate: {} as PropOptions<Components.MyCheckbox['indeterminate']>,
    mode: {} as PropOptions<Components.MyCheckbox['mode']>,
    name: {} as PropOptions<Components.MyCheckbox['name']>,
    value: {} as PropOptions<Components.MyCheckbox['value']>,
  },
  model: {
    prop: 'checked',
    event: 'myChange',
  },
  render: createCommonRender('my-checkbox', ['myChange']),
});

export const MyRadioGroup = Vue.extend({
  props: {
    allowEmptySelection: {} as PropOptions<Components.MyRadioGroup['allowEmptySelection']>,
    name: {} as PropOptions<Components.MyRadioGroup['name']>,
    value: {} as PropOptions<Components.MyRadioGroup['value']>,
  },
  model: {
    prop: 'value',
    event: 'myChange',
  },
  render: createCommonRender('my-radio-group', ['myChange']),
});

export const MyRadio = Vue.extend({
  props: {
    color: {} as PropOptions<Components.MyRadio['color']>,
    disabled: {} as PropOptions<Components.MyRadio['disabled']>,
    mode: {} as PropOptions<Components.MyRadio['mode']>,
    name: {} as PropOptions<Components.MyRadio['name']>,
    value: {} as PropOptions<Components.MyRadio['value']>,
  },
  model: {
    prop: 'checked',
    event: 'myChange',
  },
  render: createCommonRender('my-radio', ['myChange']),
});

export const MyRange = Vue.extend({
  props: {
    color: {} as PropOptions<Components.MyRange['color']>,
    debounce: {} as PropOptions<Components.MyRange['debounce']>,
    disabled: {} as PropOptions<Components.MyRange['disabled']>,
    dualKnobs: {} as PropOptions<Components.MyRange['dualKnobs']>,
    max: {} as PropOptions<Components.MyRange['max']>,
    min: {} as PropOptions<Components.MyRange['min']>,
    mode: {} as PropOptions<Components.MyRange['mode']>,
    name: {} as PropOptions<Components.MyRange['name']>,
    pin: {} as PropOptions<Components.MyRange['pin']>,
    snaps: {} as PropOptions<Components.MyRange['snaps']>,
    step: {} as PropOptions<Components.MyRange['step']>,
    ticks: {} as PropOptions<Components.MyRange['ticks']>,
    value: {} as PropOptions<Components.MyRange['value']>,
  },
  model: {
    prop: 'value',
    event: 'myChange',
  },
  render: createCommonRender('my-range', ['myChange']),
});
