window.matchMedia =
  window.matchMedia ||
  (function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  } as any);

(window as any).CSSStyleSheet = class {
  constructor() {
    throw Error();
  }
} as any;
