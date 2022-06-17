import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { e as eventMethod } from './helpers.js';

const Popover = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.didPresent = createEvent(this, "myPopoverDidPresent", 7);
    this.willPresent = createEvent(this, "myPopoverWillPresent", 7);
    this.willDismiss = createEvent(this, "myPopoverWillDismiss", 7);
    this.didDismiss = createEvent(this, "myPopoverDidDismiss", 7);
    this.presented = false;
    this.overlayIndex = 0;
    /**
     * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
     */
    this.keyboardClose = true;
    /**
     * If `true`, the popover will be dismissed when the backdrop is clicked.
     */
    this.backdropDismiss = true;
    /**
     * If `true`, a backdrop will be displayed behind the popover.
     */
    this.showBackdrop = true;
    /**
     * If `true`, the popover will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    this.translucent = false;
    /**
     * If `true`, the popover will animate.
     */
    this.animated = true;
    this.onDismiss = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      this.dismiss();
    };
    this.onBackdropTap = () => {
      this.dismiss(undefined, 'backdrop');
    };
  }
  /**
   * Present the popover overlay after it has been created.
   */
  async present() {
    return Promise.resolve();
  }
  /**
   * Dismiss the popover overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'.
   */
  async dismiss(_data, _role) {
    return Promise.resolve(true);
  }
  /**
   * Returns a promise that resolves when the popover did dismiss.
   */
  onDidDismiss() {
    return eventMethod(this.el, 'myPopoverDidDismiss');
  }
  /**
   * Returns a promise that resolves when the popover will dismiss.
   */
  onWillDismiss() {
    return eventMethod(this.el, 'myPopoverWillDismiss');
  }
  render() {
    return (h(Host, { "aria-modal": "true", "no-router": true, tabindex: "-1", style: {
        zIndex: `${20000 + this.overlayIndex}`,
      }, class: {
        'popover-translucent': this.translucent,
      }, onIonDismiss: this.onDismiss, onIonBackdropTap: this.onBackdropTap }, h("my-backdrop", { tappable: this.backdropDismiss, visible: this.showBackdrop }), h("div", { class: "popover-wrapper" }, h("div", { class: "popover-arrow" }), h("div", { class: "popover-content" }))));
  }
  get el() { return this; }
}, [2, "my-popover", {
    "component": [1],
    "componentProps": [16],
    "keyboardClose": [4, "keyboard-close"],
    "cssClass": [1, "css-class"],
    "backdropDismiss": [4, "backdrop-dismiss"],
    "event": [8],
    "showBackdrop": [4, "show-backdrop"],
    "translucent": [4],
    "animated": [4],
    "present": [64],
    "dismiss": [64],
    "onDidDismiss": [64],
    "onWillDismiss": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["my-popover"];
  components.forEach(tagName => { switch (tagName) {
    case "my-popover":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Popover);
      }
      break;
  } });
}

const MyPopover = Popover;
const defineCustomElement = defineCustomElement$1;

export { MyPopover, defineCustomElement };
