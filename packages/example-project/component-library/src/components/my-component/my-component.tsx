import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * The age
   */
  @Prop() age: number;

  /**
   * The array of child names
   */
  @Prop() kidsNames: string[];

  /**
   * Testing an event without value
   */
  @Event() myCustomEvent: EventEmitter<number>;

  emitCustomEvent() {
    this.myCustomEvent.emit(5);
  }

  private getText(): string {
    return `${this.first} ${this.middle} ${this.last}`;
  }

  render() {
    return <div onClick={this.emitCustomEvent.bind(this)}>Hello, World! I'm {this.getText()}</div>;
  }
}
