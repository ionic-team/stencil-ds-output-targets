import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const myComponentCss = ":host{display:block}";

const MyComponent$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
}, [1, "my-component", {
    "first": [1],
    "middle": [1],
    "last": [1],
    "age": [2],
    "kidsNames": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
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
