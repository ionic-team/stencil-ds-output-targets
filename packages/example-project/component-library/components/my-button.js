import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { h as hasShadowDom } from './helpers.js';

const Button = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.myFocus = createEvent(this, "myFocus", 7);
    this.myBlur = createEvent(this, "myBlur", 7);
    this.inItem = false;
    this.inListHeader = false;
    this.inToolbar = false;
    /**
     * The type of button.
     */
    this.buttonType = 'button';
    /**
     * If `true`, the user cannot interact with the button.
     */
    this.disabled = false;
    /**
     * If `true`, activates a button with a heavier font weight.
     */
    this.strong = false;
    /**
     * The type of the button.
     */
    this.type = 'button';
    this.handleClick = (ev) => {
      if (this.type === 'button') {
        window.location.href = this.href;
      }
      else if (hasShadowDom(this.el)) {
        // this button wants to specifically submit a form
        // climb up the dom to see if we're in a <form>
        // and if so, then use JS to submit it
        const form = this.el.closest('form');
        if (form) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          fakeButton.type = this.type;
          fakeButton.style.display = 'none';
          form.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
    this.onFocus = () => {
      this.myFocus.emit();
    };
    this.onBlur = () => {
      this.myBlur.emit();
    };
  }
  get hasIconOnly() {
    return !!this.el.querySelector('my-icon[slot="icon-only"]');
  }
  render() {
    const { buttonType, type, disabled, rel, target, size, href, expand, hasIconOnly, shape, strong, } = this;
    const finalSize = size === undefined && this.inItem ? 'small' : size;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs = TagType === 'button'
      ? { type }
      : {
        download: this.download,
        href,
        rel,
        target,
      };
    let fill = this.fill;
    if (fill === undefined) {
      fill = this.inToolbar || this.inListHeader ? 'clear' : 'solid';
    }
    return (h(Host, { onClick: this.handleClick, "aria-disabled": disabled ? 'true' : null, class: {
        [buttonType]: true,
        [`${buttonType}-${expand}`]: expand !== undefined,
        [`${buttonType}-${finalSize}`]: finalSize !== undefined,
        [`${buttonType}-${shape}`]: shape !== undefined,
        [`${buttonType}-${fill}`]: true,
        [`${buttonType}-strong`]: strong,
        'button-has-icon-only': hasIconOnly,
        'button-disabled': disabled,
        'my-activatable': true,
        'my-focusable': true,
      } }, h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: disabled, onFocus: this.onFocus, onBlur: this.onBlur }), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" })))));
  }
  get el() { return this; }
}, [1, "my-button", {
    "color": [1],
    "buttonType": [1025, "button-type"],
    "disabled": [516],
    "expand": [513],
    "fill": [1537],
    "download": [1],
    "href": [1],
    "rel": [1],
    "shape": [513],
    "size": [513],
    "strong": [4],
    "target": [1],
    "type": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["my-button"];
  components.forEach(tagName => { switch (tagName) {
    case "my-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Button);
      }
      break;
  } });
}

const MyButton = Button;
const defineCustomElement = defineCustomElement$1;

export { MyButton, defineCustomElement };
