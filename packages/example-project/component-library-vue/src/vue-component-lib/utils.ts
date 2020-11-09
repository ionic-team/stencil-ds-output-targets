import Vue, { VNode, CreateElement } from 'vue';

export const createCommonRender = (tagName: string, eventNames: string[] = []) =>
  function (createElement: CreateElement): VNode {
    const vueElement = this as Vue;
    const allListeners = eventNames.reduce((listeners, eventName) => {
      return {
        ...listeners,
        [eventName]: (event: CustomEvent<any>) => {
          let emittedValue = event.detail;
          if (event.detail?.value) {
            emittedValue = event.detail.value;
          }
          vueElement.$emit(eventName, emittedValue);
        },
      };
    }, vueElement.$listeners);

    const attributes = vueElement.$props
      ? Object.keys(vueElement.$props).reduce((attrs: any, prop: string) => {
          const attributeName = toDashCase(prop);
          attrs[attributeName] = vueElement.$props[prop];
          return attrs;
        }, {})
      : {};

    return createElement(
      tagName,
      {
        ref: 'wc',
        domProps: {
          ...vueElement.$props,
        },
        on: allListeners,
        attrs: { ...attributes },
      },
      [vueElement.$slots.default],
    );
  };

export const createCommonMethod = (methodName: string) =>
  function (...args: any[]) {
    this.$refs.wc[methodName](...args);
  } as unknown;

export const toLowerCase = (str: string) => str.toLowerCase();

export const toDashCase = (str: string) =>
  toLowerCase(
    str
      .replace(/([A-Z0-9])/g, (g) => ' ' + g[0])
      .trim()
      .replace(/ /g, '-'),
  );
