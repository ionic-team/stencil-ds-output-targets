import { h, Component, Event, EventEmitter, Prop, Host } from '@stencil/core';

export interface SlideValue {
  value: number;
}

export interface AdvancedType {
  one: number;
  two: string;
  three: number[];
}

@Component({
  tag: 'demo-component',
  shadow: true,
  styles: `
    :host {
      background-color: red;
    }
    input {
      padding: 10px;
    }
  `,
})
export class DemoComponent {
  @Event() slideFocus!: EventEmitter<SlideValue>;

  @Prop() min: number = 0;

  @Prop() max: number = 10;

  @Prop() advanced: AdvancedType = null;

  @Prop({ mutable: true }) value?: string | null = '';

  focusOccurred = (e: Event) => {
    this.value = (e.currentTarget as HTMLInputElement).value;
    this.slideFocus.emit({
      value: parseInt(this.value, 10),
    });
  };

  render() {
    return (
      <Host>
        <label>
          <slot />
          <input
            id="demo-component-input"
            type="range"
            name="points"
            min={this.min}
            max={this.max}
            onFocus={this.focusOccurred}
          />
        </label>
      </Host>
    );
  }
}
