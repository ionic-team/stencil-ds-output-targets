/* eslint-disable */
/* tslint:disable */
/* auto-generated vue proxies */
import { defineComponent, h, PropType } from 'vue';

import { Components } from 'component-library';

export const MyComponent = /*@__PURE__*/ defineComponent({
  props: {
    first: {
      type: String as PropType<Components.MyComponent['first']>,
    },
    middle: {
      type: String as PropType<Components.MyComponent['middle']>,
    },
    last: {
      type: String as PropType<Components.MyComponent['last']>,
    },
    age: {
      type: Number as PropType<Components.MyComponent['age']>,
    },
    kidsNames: {
      type: Array as PropType<Components.MyComponent['kidsNames']>,
    },
  },
  setup(_props, { slots }) {
    return () => h('my-component', { domProps: { first: 'blue' } }, slots);
  },
});
