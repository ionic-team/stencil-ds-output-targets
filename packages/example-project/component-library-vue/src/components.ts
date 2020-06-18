import Vue, { PropType, VNode } from 'vue';
import { JSX } from 'component-library';

Vue.config.ignoredElements.push('my-component');

export const MyComponent = Vue.extend({
  props: {
    age: {
      type: Object as PropType<JSX.MyComponent['age']>,
      required: false,
    },
    first: {
      type: Object as PropType<JSX.MyComponent['first']>,
      required: false,
    },
    kidsNames: {
      type: Object as PropType<JSX.MyComponent['kidsNames']>,
      required: false,
    },
    last: {
      type: Object as PropType<JSX.MyComponent['last']>,
      required: false,
    },
    middle: {
      type: Object as PropType<JSX.MyComponent['middle']>,
      required: false,
    },
  },
  render(createElement): VNode {
    return createElement(
      'my-component',
      {
        ref: 'wc',
        ...this.props,
      },
      [this.$slots.default],
    );
  },
});
