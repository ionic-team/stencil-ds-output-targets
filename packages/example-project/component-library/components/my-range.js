import { attachShadow, createEvent, h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { c as clamp, d as debounceEvent, r as renderHiddenInput } from './helpers.js';

let Range = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.myChange = createEvent(this, "myChange", 7);
    this.myStyle = createEvent(this, "myStyle", 7);
    this.myFocus = createEvent(this, "myFocus", 7);
    this.myBlur = createEvent(this, "myBlur", 7);
    this.noUpdate = false;
    this.hasFocus = false;
    this.ratioA = 0;
    this.ratioB = 0;
    /**
     * How long, in milliseconds, to wait to trigger the
     * `myChange` event after each change in the range value.
     */
    this.debounce = 0;
    /**
     * The name of the control, which is submitted with the form data.
     */
    this.name = '';
    /**
     * Show two knobs.
     */
    this.dualKnobs = false;
    /**
     * Minimum integer value of the range.
     */
    this.min = 0;
    /**
     * Maximum integer value of the range.
     */
    this.max = 100;
    /**
     * If `true`, a pin with integer value is shown when the knob
     * is pressed.
     */
    this.pin = false;
    /**
     * If `true`, the knob snaps to tick marks evenly spaced based
     * on the step property value.
     */
    this.snaps = false;
    /**
     * Specifies the value granularity.
     */
    this.step = 1;
    /**
     * If `true`, tick marks are displayed based on the step value.
     * Only applies when `snaps` is `true`.
     */
    this.ticks = true;
    /**
     * If `true`, the user cannot interact with the range.
     */
    this.disabled = false;
    /**
     * the value of the range.
     */
    this.value = 0;
    this.clampBounds = (value) => {
      return clamp(this.min, value, this.max);
    };
    this.ensureValueInBounds = (value) => {
      if (this.dualKnobs) {
        return {
          lower: this.clampBounds(value.lower),
          upper: this.clampBounds(value.upper),
        };
      }
      else {
        return this.clampBounds(value);
      }
    };
    this.handleKeyboard = (knob, isIncrease) => {
      let step = this.step;
      step = step > 0 ? step : 1;
      step = step / (this.max - this.min);
      if (!isIncrease) {
        step *= -1;
      }
      if (knob === 'A') {
        this.ratioA = clamp(0, this.ratioA + step, 1);
      }
      else {
        this.ratioB = clamp(0, this.ratioB + step, 1);
      }
      this.updateValue();
    };
    this.onBlur = () => {
      if (this.hasFocus) {
        this.hasFocus = false;
        this.myBlur.emit();
        this.emitStyle();
      }
    };
    this.onFocus = () => {
      if (!this.hasFocus) {
        this.hasFocus = true;
        this.myFocus.emit();
        this.emitStyle();
      }
    };
  }
  debounceChanged() {
    this.myChange = debounceEvent(this.myChange, this.debounce);
  }
  minChanged() {
    if (!this.noUpdate) {
      this.updateRatio();
    }
  }
  maxChanged() {
    if (!this.noUpdate) {
      this.updateRatio();
    }
  }
  disabledChanged() {
    this.emitStyle();
  }
  valueChanged(value) {
    if (!this.noUpdate) {
      this.updateRatio();
    }
    value = this.ensureValueInBounds(value);
    this.myChange.emit({ value });
  }
  connectedCallback() {
    this.updateRatio();
    this.debounceChanged();
    this.disabledChanged();
  }
  getValue() {
    const value = this.value || 0;
    if (this.dualKnobs) {
      if (typeof value === 'object') {
        return value;
      }
      return {
        lower: 0,
        upper: value,
      };
    }
    else {
      if (typeof value === 'object') {
        return value.upper;
      }
      return value;
    }
  }
  emitStyle() {
    this.myStyle.emit({
      interactive: true,
      'interactive-disabled': this.disabled,
    });
  }
  get valA() {
    return ratioToValue(this.ratioA, this.min, this.max, this.step);
  }
  get valB() {
    return ratioToValue(this.ratioB, this.min, this.max, this.step);
  }
  get ratioLower() {
    if (this.dualKnobs) {
      return Math.min(this.ratioA, this.ratioB);
    }
    return 0;
  }
  get ratioUpper() {
    if (this.dualKnobs) {
      return Math.max(this.ratioA, this.ratioB);
    }
    return this.ratioA;
  }
  updateRatio() {
    const value = this.getValue();
    const { min, max } = this;
    if (this.dualKnobs) {
      this.ratioA = valueToRatio(value.lower, min, max);
      this.ratioB = valueToRatio(value.upper, min, max);
    }
    else {
      this.ratioA = valueToRatio(value, min, max);
    }
  }
  updateValue() {
    this.noUpdate = true;
    const { valA, valB } = this;
    this.value = !this.dualKnobs
      ? valA
      : {
        lower: Math.min(valA, valB),
        upper: Math.max(valA, valB),
      };
    this.noUpdate = false;
  }
  render() {
    const { min, max, step, el, handleKeyboard, pressedKnob, disabled, pin, ratioLower, ratioUpper, } = this;
    const barStart = `${ratioLower * 100}%`;
    const barEnd = `${100 - ratioUpper * 100}%`;
    const doc = document;
    const isRTL = doc.dir === 'rtl';
    const start = isRTL ? 'right' : 'left';
    const end = isRTL ? 'left' : 'right';
    const tickStyle = (tick) => {
      return {
        [start]: tick[start],
      };
    };
    const barStyle = {
      [start]: barStart,
      [end]: barEnd,
    };
    const ticks = [];
    if (this.snaps && this.ticks) {
      for (let value = min; value <= max; value += step) {
        const ratio = valueToRatio(value, min, max);
        const tick = {
          ratio,
          active: ratio >= ratioLower && ratio <= ratioUpper,
        };
        tick[start] = `${ratio * 100}%`;
        ticks.push(tick);
      }
    }
    renderHiddenInput(true, el, this.name, JSON.stringify(this.getValue()), disabled);
    return (h(Host, { onFocusin: this.onFocus, onFocusout: this.onBlur, class: {
        'range-disabled': disabled,
        'range-pressed': pressedKnob !== undefined,
        'range-has-pin': pin,
      } }, h("slot", { name: "start" }), h("div", { class: "range-slider" }, ticks.map((tick) => (h("div", { style: tickStyle(tick), role: "presentation", class: {
        'range-tick': true,
        'range-tick-active': tick.active,
      }, part: tick.active ? 'tick-active' : 'tick' }))), h("div", { class: "range-bar", role: "presentation", part: "bar" }), h("div", { class: "range-bar range-bar-active", role: "presentation", style: barStyle, part: "bar-active" }), renderKnob(isRTL, {
      knob: 'A',
      pressed: pressedKnob === 'A',
      value: this.valA,
      ratio: this.ratioA,
      pin,
      disabled,
      handleKeyboard,
      min,
      max,
    }), this.dualKnobs &&
      renderKnob(isRTL, {
        knob: 'B',
        pressed: pressedKnob === 'B',
        value: this.valB,
        ratio: this.ratioB,
        pin,
        disabled,
        handleKeyboard,
        min,
        max,
      })), h("slot", { name: "end" })));
  }
  get el() { return this; }
  static get watchers() { return {
    "debounce": ["debounceChanged"],
    "min": ["minChanged"],
    "max": ["maxChanged"],
    "disabled": ["disabledChanged"],
    "value": ["valueChanged"]
  }; }
};
const renderKnob = (isRTL, { knob, value, ratio, min, max, disabled, pressed, pin, handleKeyboard }) => {
  const start = isRTL ? 'right' : 'left';
  const knobStyle = () => {
    const style = {};
    style[start] = `${ratio * 100}%`;
    return style;
  };
  return (h("div", { onKeyDown: (ev) => {
      const key = ev.key;
      if (key === 'ArrowLeft' || key === 'ArrowDown') {
        handleKeyboard(knob, false);
        ev.preventDefault();
        ev.stopPropagation();
      }
      else if (key === 'ArrowRight' || key === 'ArrowUp') {
        handleKeyboard(knob, true);
        ev.preventDefault();
        ev.stopPropagation();
      }
    }, class: {
      'range-knob-handle': true,
      'range-knob-a': knob === 'A',
      'range-knob-b': knob === 'B',
      'range-knob-pressed': pressed,
      'range-knob-min': value === min,
      'range-knob-max': value === max,
    }, style: knobStyle(), role: "slider", tabindex: disabled ? -1 : 0, "aria-valuemin": min, "aria-valuemax": max, "aria-disabled": disabled ? 'true' : null, "aria-valuenow": value }, pin && (h("div", { class: "range-pin", role: "presentation", part: "pin" }, Math.round(value))), h("div", { class: "range-knob", role: "presentation", part: "knob" })));
};
const ratioToValue = (ratio, min, max, step) => {
  let value = (max - min) * ratio;
  if (step > 0) {
    value = Math.round(value / step) * step + min;
  }
  return clamp(min, value, max);
};
const valueToRatio = (value, min, max) => {
  return clamp(0, (value - min) / (max - min), 1);
};
Range = /*@__PURE__*/ proxyCustomElement(Range, [1, "my-range", {
    "color": [1],
    "debounce": [2],
    "name": [1],
    "dualKnobs": [4, "dual-knobs"],
    "min": [2],
    "max": [2],
    "pin": [4],
    "snaps": [4],
    "step": [2],
    "ticks": [4],
    "disabled": [4],
    "value": [1026],
    "ratioA": [32],
    "ratioB": [32],
    "pressedKnob": [32]
  }]);
function defineCustomElement$1() {
  const components = ["my-range"];
  components.forEach(tagName => { switch (tagName) {
    case "my-range":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Range);
      }
      break;
  } });
}

const MyRange = Range;
const defineCustomElement = defineCustomElement$1;

export { MyRange, defineCustomElement };
