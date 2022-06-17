import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const RadioGroup = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.myChange = createEvent(this, "myChange", 7);
    this.inputId = `my-rg-${radioGroupIds++}`;
    this.labelId = `${this.inputId}-lbl`;
    /**
     * If `true`, the radios can be deselected.
     */
    this.allowEmptySelection = false;
    /**
     * The name of the control, which is submitted with the form data.
     */
    this.name = this.inputId;
    this.onClick = (ev) => {
      const selectedRadio = ev.target && ev.target.closest('my-radio');
      if (selectedRadio) {
        const currentValue = this.value;
        const newValue = selectedRadio.value;
        if (newValue !== currentValue) {
          this.value = newValue;
        }
        else if (this.allowEmptySelection) {
          this.value = undefined;
        }
      }
    };
  }
  valueChanged(value) {
    this.myChange.emit({ value });
  }
  async connectedCallback() {
    // Get the list header if it exists and set the id
    // this is used to set aria-labelledby
    const el = this.el;
    const header = el.querySelector('my-list-header') || el.querySelector('my-item-divider');
    if (header) {
      const label = header.querySelector('my-label');
      if (label) {
        this.labelId = label.id = this.name + '-lbl';
      }
    }
  }
  render() {
    return h(Host, { role: "radiogroup", "aria-labelledby": this.labelId, onClick: this.onClick });
  }
  get el() { return this; }
  static get watchers() { return {
    "value": ["valueChanged"]
  }; }
}, [0, "my-radio-group", {
    "allowEmptySelection": [4, "allow-empty-selection"],
    "name": [1],
    "value": [1032]
  }]);
let radioGroupIds = 0;
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["my-radio-group"];
  components.forEach(tagName => { switch (tagName) {
    case "my-radio-group":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RadioGroup);
      }
      break;
  } });
}

const MyRadioGroup = RadioGroup;
const defineCustomElement = defineCustomElement$1;

export { MyRadioGroup, defineCustomElement };
