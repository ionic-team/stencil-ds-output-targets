import Vue, { VNode, PropOptions } from 'vue';
import { Components } from 'component-library';

/**
 * Ensure the web components that we are wrappering are ignored by Vue
 */
const customElementTags = ['my-component', 'my-input'];
Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];

export const MyComponent = Vue.extend({
  props: {
    age: {} as PropOptions<Components.MyComponent['age']>,
    first: {} as PropOptions<Components.MyComponent['first']>,
    kidsNames: {} as PropOptions<Components.MyComponent['kidsNames']>,
    last: {} as PropOptions<Components.MyComponent['last']>,
    middle: {} as PropOptions<Components.MyComponent['middle']>,
  },
  render(createElement): VNode {
    return createElement(
      'my-component',
      {
        ref: 'wc',
        domProps: this.$props,
        on: this.$listeners,
      },
      [this.$slots.default],
    );
  },
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
  methods: {
    focus(): void {
      this.$refs.wc.focus();
    },
  },
  render(createElement): VNode {
    return createElement(
      'my-input',
      {
        ref: 'wc',
        domProps: this.$props,
        on: this.$listeners,
      },
      [this.$slots.default],
    );
  },
});
