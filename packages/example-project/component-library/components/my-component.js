import { attachShadow, createEvent, h, proxyCustomElement } from '@stencil/core/internal/client';

const myComponentCss = ":host{display:block}";

let MyComponent$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.myCustomEvent = createEvent(this, "myCustomEvent", 7);
  }
  emitCustomEvent() {
    this.myCustomEvent.emit(5);
  }
  getText() {
    return `${this.first} ${this.middle} ${this.last}`;
  }
  render() {
    return h("div", { onClick: this.emitCustomEvent.bind(this) }, "Hello, World! I'm ", this.getText());
  }
  static get style() { return myComponentCss; }
};
MyComponent$1 = /*@__PURE__*/ proxyCustomElement(MyComponent$1, [1, "my-component", {
    "first": [1],
    "middle": [1],
    "last": [1],
    "age": [2],
    "kidsNames": [16]
  }]);
function defineCustomElement$1() {
  const components = ["my-component"];
  components.forEach(tagName => { switch (tagName) {
    case "my-component":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MyComponent$1);
      }
      break;
  } });
}

const MyComponent = MyComponent$1;
const defineCustomElement = defineCustomElement$1;

export { MyComponent, defineCustomElement };
