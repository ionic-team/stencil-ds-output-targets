import { createEvent, h, Host, proxyCustomElement } from '@stencil/core/internal/client';

let Input = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.myInput = createEvent(this, "myInput", 7);
    this.myChange = createEvent(this, "myChange", 7);
    this.myBlur = createEvent(this, "myBlur", 7);
    this.myFocus = createEvent(this, "myFocus", 7);
    this.inputId = `my-input-${inputIds++}`;
    this.didBlurAfterEdit = false;
    this.hasFocus = false;
    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
     */
    this.autocapitalize = 'off';
    /**
     * Indicates whether the value of the control can be automatically completed by the browser.
     */
    this.autocomplete = 'off';
    /**
     * Whether auto correction should be enabled when the user is entering/editing the text value.
     */
    this.autocorrect = 'off';
    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
     */
    this.autofocus = false;
    /**
     * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
     */
    this.clearInput = false;
    /**
     * If `true`, the user cannot interact with the input.
     */
    this.disabled = false;
    /**
     * The name of the control, which is submitted with the form data.
     */
    this.name = this.inputId;
    /**
     * If `true`, the user cannot modify the value.
     */
    this.readonly = false;
    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    this.required = false;
    /**
     * If `true`, the element will have its spelling and grammar checked.
     */
    this.spellcheck = false;
    /**
     * The type of control to display. The default type is text.
     */
    this.type = 'text';
    /**
     * The value of the input.
     */
    this.value = '';
    this.onInput = (ev) => {
      const input = ev.target;
      if (input) {
        this.value = input.value || '';
      }
      this.myInput.emit(ev);
    };
    this.onBlur = () => {
      this.hasFocus = false;
      this.focusChanged();
      this.myBlur.emit();
    };
    this.onFocus = () => {
      this.hasFocus = true;
      this.focusChanged();
      this.myFocus.emit();
    };
    this.onKeydown = (ev) => {
      if (this.shouldClearOnEdit()) {
        // Did the input value change after it was blurred and edited?
        // Do not clear if user is hitting Enter to submit form
        if (this.didBlurAfterEdit && this.hasValue() && ev.key !== 'Enter') {
          // Clear the input
          this.clearTextInput();
        }
        // Reset the flag
        this.didBlurAfterEdit = false;
      }
    };
    this.clearTextInput = (ev) => {
      if (this.clearInput && !this.readonly && !this.disabled && ev) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      this.value = '';
      /**
       * This is needed for clearOnEdit
       * Otherwise the value will not be cleared
       * if user is inside the input
       */
      if (this.nativeInput) {
        this.nativeInput.value = '';
      }
    };
  }
  /**
   * Update the native input element when the value changes
   */
  valueChanged() {
    this.myChange.emit({ value: this.value == null ? this.value : this.value.toString() });
  }
  componentWillLoad() {
    // If the my-input has a tabindex attribute we get the value
    // and pass it down to the native input, then remove it from the
    // my-input to avoid causing tabbing twice on the same element
    if (this.el.hasAttribute('tabindex')) {
      const tabindex = this.el.getAttribute('tabindex');
      this.tabindex = tabindex !== null ? tabindex : undefined;
      this.el.removeAttribute('tabindex');
    }
  }
  /**
   * Sets focus on the specified `my-input`. Use this method instead of the global
   * `input.focus()`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  /**
   * Returns the native `<input>` element used under the hood.
   */
  getInputElement() {
    return Promise.resolve(this.nativeInput);
  }
  shouldClearOnEdit() {
    const { type, clearOnEdit } = this;
    return clearOnEdit === undefined ? type === 'password' : clearOnEdit;
  }
  getValue() {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }
  focusChanged() {
    // If clearOnEdit is enabled and the input blurred but has a value, set a flag
    if (!this.hasFocus && this.shouldClearOnEdit() && this.hasValue()) {
      this.didBlurAfterEdit = true;
    }
  }
  hasValue() {
    return this.getValue().length > 0;
  }
  render() {
    const value = this.getValue();
    const labelId = this.inputId + '-lbl';
    return (h(Host, { "aria-disabled": this.disabled ? 'true' : null, class: {
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
      } }, h("input", { class: "native-input", ref: (input) => (this.nativeInput = input), "aria-labelledby": labelId, disabled: this.disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, enterKeyHint: this.enterkeyhint, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder || '', readOnly: this.readonly, required: this.required, spellcheck: this.spellcheck ? 'true' : undefined, step: this.step, size: this.size, tabindex: this.tabindex, type: this.type, value: value, onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeydown }), this.clearInput && !this.readonly && !this.disabled && (h("button", { type: "button", class: "input-clear-icon", tabindex: "-1", onTouchStart: this.clearTextInput, onMouseDown: this.clearTextInput }))));
  }
  get el() { return this; }
  static get watchers() { return {
    "value": ["valueChanged"]
  }; }
};
let inputIds = 0;
Input = /*@__PURE__*/ proxyCustomElement(Input, [2, "my-input", {
    "color": [1],
    "accept": [1],
    "autocapitalize": [1],
    "autocomplete": [1],
    "autocorrect": [1],
    "autofocus": [4],
    "clearInput": [4, "clear-input"],
    "clearOnEdit": [4, "clear-on-edit"],
    "disabled": [4],
    "enterkeyhint": [1],
    "inputmode": [1],
    "max": [1],
    "maxlength": [2],
    "min": [1],
    "minlength": [2],
    "multiple": [4],
    "name": [1],
    "pattern": [1],
    "placeholder": [1],
    "readonly": [4],
    "required": [4],
    "spellcheck": [4],
    "step": [1],
    "size": [2],
    "type": [1],
    "value": [1032],
    "hasFocus": [32],
    "setFocus": [64],
    "getInputElement": [64]
  }]);
function defineCustomElement$1() {
  const components = ["my-input"];
  components.forEach(tagName => { switch (tagName) {
    case "my-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Input);
      }
      break;
  } });
}

const MyInput = Input;
const defineCustomElement = defineCustomElement$1;

export { MyInput, defineCustomElement };
