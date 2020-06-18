import Vue, { VNode, PropOptions } from 'vue';
import { JSX } from 'component-library';

const customElementTags = ['my-component'];

Vue.config.ignoredElements = [...Vue.config.ignoredElements, ...customElementTags];

export const MyComponent = Vue.extend({
  props: {
    age: {} as PropOptions<JSX.MyComponent['age']>,
    first: {} as PropOptions<JSX.MyComponent['first']>,
    kidsNames: {} as PropOptions<JSX.MyComponent['kidsNames']>,
    last: {} as PropOptions<JSX.MyComponent['last']>,
    middle: {} as PropOptions<JSX.MyComponent['middle']>,
  },
  render(createElement): VNode {
    return createElement(
      'my-component',
      {
        ref: 'wc',
        domProps: this.$props,
      },
      [this.$slots.default],
    );
  },
});
