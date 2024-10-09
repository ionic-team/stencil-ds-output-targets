import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

export interface RadioGroupChangeEventDetail {
  value: any;
}

@Component({
  tag: 'my-radio-group',
})
export class RadioGroup implements ComponentInterface {
  private inputId = `my-rg-${radioGroupIds++}`;
  private labelId = `${this.inputId}-lbl`;

  @Element() el!: HTMLElement;

  /**
   * If `true`, the radios can be deselected.
   */
  @Prop() allowEmptySelection = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /**
   * the value of the radio group.
   */
  @Prop({ mutable: true }) value?: any | null;

  @Watch('value')
  valueChanged(value: any | undefined) {
    this.myChange.emit({ value });
  }

  /**
   * Emitted when the value has changed.
   */
  @Event() myChange!: EventEmitter<RadioGroupChangeEventDetail>;

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

  private onClick = (ev: Event) => {
    const selectedRadio = ev.target && (ev.target as HTMLElement).closest('my-radio');
    if (selectedRadio) {
      const currentValue = this.value;
      const newValue = selectedRadio.value;
      if (newValue !== currentValue) {
        this.value = newValue;
      } else if (this.allowEmptySelection) {
        this.value = undefined;
      }
    }
  };

  render() {
    return <Host role="radiogroup" aria-labelledby={this.labelId} onClick={this.onClick}></Host>;
  }
}

let radioGroupIds = 0;
