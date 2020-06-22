import Vue, { VNode, CreateElement } from 'vue';

export const createCommonRender = (tagName: string, eventNames: string[] = []) =>
  function (createElement: CreateElement): VNode {
    const vueElement = this as Vue;
    const allListeners = eventNames.reduce((listeners, eventName) => {
      return {
        ...listeners,
        [eventName]: (event: any) => {
          vueElement.$emit(eventName, (event as any).detail.value);
        },
      };
    }, vueElement.$listeners);

    return createElement(
      tagName,
      {
        ref: 'wc',
        domProps: vueElement.$props,
        on: allListeners,
      },
      [vueElement.$slots.default],
    );
  };

export const createCommonMethod = <T extends Function>(methodName: string) =>
  (function (...args: any[]) {
    this.$refs.wc[methodName](...args);
  } as unknown) as T;
