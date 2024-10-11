import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

import { Color, StyleEventDetail } from '../element-interface';
import { findItemLabel } from '../../utils/helpers';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @part container - The container for the radio mark.
 * @part mark - The checkmark or dot used to indicate the checked state.
 */
@Component({
  tag: 'my-radio',
  shadow: true,
})
export class Radio implements ComponentInterface {
  private inputId = `my-rb-${radioButtonIds++}`;
  private radioGroup: HTMLMyRadioGroupElement | null = null;

  @Element() el!: HTMLElement;

  /**
   * If `true`, the radio is selected.
   */
  @State() checked = false;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  @Prop() color?: Color;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /**
   * If `true`, the user cannot interact with the radio.
   */
  @Prop() disabled = false;

  /**
   * the value of the radio.
   */
  @Prop() value?: any | null;

  /**
   * Emitted when the styles change.
   * @internal
   */
  @Event() myStyle!: EventEmitter<StyleEventDetail>;

  /**
   * Emitted when the radio button has focus.
   */
  @Event() myFocus!: EventEmitter<void>;

  /**
   * Emitted when the radio button loses focus.
   */
  @Event() myBlur!: EventEmitter<void>;

  /**
   * Emitted when the radio button loses focus.
   */
  @Event() mySelect!: EventEmitter<void>;

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

  @Watch('color')
  @Watch('checked')
  @Watch('disabled')
  emitStyle() {
    this.myStyle.emit({
      'radio-checked': this.checked,
      'interactive-disabled': this.disabled,
    });
  }

  private updateState = () => {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value;
    }
  };

  private onFocus = () => {
    this.myFocus.emit();
  };

  private onBlur = () => {
    this.myBlur.emit();
  };

  render() {
    const { inputId, disabled, checked, el } = this;
    const labelId = inputId + '-lbl';
    const label = findItemLabel(el);
    if (label) {
      label.id = labelId;
    }
    return (
      <Host
        role="radio"
        aria-disabled={disabled ? 'true' : null}
        aria-checked={`${checked}`}
        aria-labelledby={labelId}
        class={{
          interactive: true,
          'radio-checked': checked,
          'radio-disabled': disabled,
        }}
      >
        <div class="radio-icon" part="container">
          <div class="radio-inner" part="mark" />
        </div>
        <button type="button" onFocus={this.onFocus} onBlur={this.onBlur} disabled={disabled}></button>
      </Host>
    );
  }
}

let radioButtonIds = 0;
