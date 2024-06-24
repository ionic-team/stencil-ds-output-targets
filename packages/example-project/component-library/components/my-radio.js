import { attachShadow, createEvent, h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { f as findItemLabel } from './helpers2.js';

let Radio = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.myStyle = createEvent(this, "myStyle", 7);
    this.myFocus = createEvent(this, "myFocus", 7);
    this.myBlur = createEvent(this, "myBlur", 7);
    this.mySelect = createEvent(this, "mySelect", 7);
    this.inputId = `my-rb-${radioButtonIds++}`;
    this.radioGroup = null;
    /**
     * If `true`, the radio is selected.
     */
    this.checked = false;
    /**
     * The name of the control, which is submitted with the form data.
     */
    this.name = this.inputId;
    /**
     * If `true`, the user cannot interact with the radio.
     */
    this.disabled = false;
    this.updateState = () => {
      if (this.radioGroup) {
        this.checked = this.radioGroup.value === this.value;
      }
    };
    this.onFocus = () => {
      this.myFocus.emit();
    };
    this.onBlur = () => {
      this.myBlur.emit();
    };
  }
  connectedCallback() {
    if (this.value === undefined) {
      this.value = this.inputId;
    }
    const radioGroup = (this.radioGroup = this.el.closest('my-radio-group'));
    if (radioGroup) {
      this.updateState();
      radioGroup.addEventListener('myChange', this.updateState);
    }
  }
  disconnectedCallback() {
    const radioGroup = this.radioGroup;
    if (radioGroup) {
      radioGroup.removeEventListener('myChange', this.updateState);
      this.radioGroup = null;
    }
  }
  componentWillLoad() {
    this.emitStyle();
  }
  emitStyle() {
    this.myStyle.emit({
      'radio-checked': this.checked,
      'interactive-disabled': this.disabled,
    });
  }
  render() {
    const { inputId, disabled, checked, el } = this;
    const labelId = inputId + '-lbl';
    const label = findItemLabel(el);
    if (label) {
      label.id = labelId;
    }
    return (h(Host, { role: "radio", "aria-disabled": disabled ? 'true' : null, "aria-checked": `${checked}`, "aria-labelledby": labelId, class: {
        interactive: true,
        'radio-checked': checked,
        'radio-disabled': disabled,
      } }, h("div", { class: "radio-icon", part: "container" }, h("div", { class: "radio-inner", part: "mark" })), h("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: disabled })));
  }
  get el() { return this; }
  static get watchers() { return {
    "color": ["emitStyle"],
    "checked": ["emitStyle"],
    "disabled": ["emitStyle"]
  }; }
};
let radioButtonIds = 0;
Radio = /*@__PURE__*/ proxyCustomElement(Radio, [1, "my-radio", {
    "color": [1],
    "name": [1],
    "disabled": [4],
    "value": [8],
    "checked": [32]
  }]);
function defineCustomElement$1() {
  const components = ["my-radio"];
  components.forEach(tagName => { switch (tagName) {
    case "my-radio":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Radio);
      }
      break;
  } });
}

const MyRadio = Radio;
const defineCustomElement = defineCustomElement$1;

export { MyRadio, defineCustomElement };
