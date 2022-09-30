/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from 'component-library/components';

import { MyButton as MyButtonCmp } from 'component-library/components/my-button.js';
import { MyCheckbox as MyCheckboxCmp } from 'component-library/components/my-checkbox.js';
import { MyComponent as MyComponentCmp } from 'component-library/components/my-component.js';
import { MyInput as MyInputCmp } from 'component-library/components/my-input.js';
import { MyPopover as MyPopoverCmp } from 'component-library/components/my-popover.js';
import { MyRadio as MyRadioCmp } from 'component-library/components/my-radio.js';
import { MyRadioGroup as MyRadioGroupCmp } from 'component-library/components/my-radio-group.js';
import { MyRange as MyRangeCmp } from 'component-library/components/my-range.js';

export declare interface MyButton extends Components.MyButton {}
@ProxyCmp({
  tagName: 'my-button',
  customElement: MyButtonCmp,
  inputs: [
    'buttonType',
    'color',
    'disabled',
    'download',
    'expand',
    'fill',
    'href',
    'mode',
    'rel',
    'shape',
    'size',
    'strong',
    'target',
    'type',
  ],
})
@Component({
  selector: 'my-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: [
    'buttonType',
    'color',
    'disabled',
    'download',
    'expand',
    'fill',
    'href',
    'mode',
    'rel',
    'shape',
    'size',
    'strong',
    'target',
    'type',
  ],
  outputs: ['myFocus', 'myBlur'],
})
export class MyButton {
  /** Emitted when the button has focus. */
  myFocus!: EventEmitter<CustomEvent<void>>;
  /** Emitted when the button loses focus. */
  myBlur!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myFocus', 'myBlur']);
  }
}

import { CheckboxChangeEventDetail as ICheckboxCheckboxChangeEventDetail } from 'component-library';
export declare interface MyCheckbox extends Components.MyCheckbox {}
@ProxyCmp({
  tagName: 'my-checkbox',
  customElement: MyCheckboxCmp,
  inputs: ['checked', 'color', 'disabled', 'indeterminate', 'mode', 'name', 'value'],
})
@Component({
  selector: 'my-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'color', 'disabled', 'indeterminate', 'mode', 'name', 'value'],
  outputs: ['myChange', 'myFocus', 'myBlur'],
})
export class MyCheckbox {
  /** Emitted when the checked property has changed. */
  myChange!: EventEmitter<CustomEvent<ICheckboxCheckboxChangeEventDetail>>;
  /** Emitted when the toggle has focus. */
  myFocus!: EventEmitter<CustomEvent<void>>;
  /** Emitted when the toggle loses focus. */
  myBlur!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myChange', 'myFocus', 'myBlur']);
  }
}

export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({
  tagName: 'my-component',
  customElement: MyComponentCmp,
  inputs: ['age', 'first', 'kidsNames', 'last', 'middle'],
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['age', 'first', 'kidsNames', 'last', 'middle'],
  outputs: ['myCustomEvent'],
})
export class MyComponent {
  /** Testing an event without value */
  myCustomEvent!: EventEmitter<CustomEvent<number>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myCustomEvent']);
  }
}

import { InputChangeEventDetail as IInputInputChangeEventDetail } from 'component-library';
export declare interface MyInput extends Components.MyInput {}
@ProxyCmp({
  tagName: 'my-input',
  customElement: MyInputCmp,
  inputs: [
    'accept',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'clearInput',
    'clearOnEdit',
    'color',
    'disabled',
    'enterkeyhint',
    'inputmode',
    'max',
    'maxlength',
    'min',
    'minlength',
    'mode',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'size',
    'spellcheck',
    'step',
    'type',
    'value',
  ],
  methods: ['setFocus', 'getInputElement'],
})
@Component({
  selector: 'my-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: [
    'accept',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'clearInput',
    'clearOnEdit',
    'color',
    'disabled',
    'enterkeyhint',
    'inputmode',
    'max',
    'maxlength',
    'min',
    'minlength',
    'mode',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'size',
    'spellcheck',
    'step',
    'type',
    'value',
  ],
  outputs: ['myInput', 'myChange', 'myBlur', 'myFocus'],
})
export class MyInput {
  /** Emitted when a keyboard input occurred. */
  myInput!: EventEmitter<CustomEvent<KeyboardEvent>>;
  /** Emitted when the value has changed. */
  myChange!: EventEmitter<CustomEvent<IInputInputChangeEventDetail>>;
  /** Emitted when the input loses focus. */
  myBlur!: EventEmitter<CustomEvent<void>>;
  /** Emitted when the input has focus. */
  myFocus!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myInput', 'myChange', 'myBlur', 'myFocus']);
  }
}

import { OverlayEventDetail as IPopoverOverlayEventDetail } from 'component-library';
export declare interface MyPopover extends Components.MyPopover {}
@ProxyCmp({
  tagName: 'my-popover',
  customElement: MyPopoverCmp,
  inputs: [
    'animated',
    'backdropDismiss',
    'component',
    'componentProps',
    'cssClass',
    'event',
    'keyboardClose',
    'mode',
    'showBackdrop',
    'translucent',
  ],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss'],
})
@Component({
  selector: 'my-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: [
    'animated',
    'backdropDismiss',
    'component',
    'componentProps',
    'cssClass',
    'event',
    'keyboardClose',
    'mode',
    'showBackdrop',
    'translucent',
  ],
  outputs: ['myPopoverDidPresent', 'myPopoverWillPresent', 'myPopoverWillDismiss', 'myPopoverDidDismiss'],
})
export class MyPopover {
  /** Emitted after the popover has presented. */
  myPopoverDidPresent!: EventEmitter<CustomEvent<void>>;
  /** Emitted before the popover has presented. */
  myPopoverWillPresent!: EventEmitter<CustomEvent<void>>;
  /** Emitted before the popover has dismissed. */
  myPopoverWillDismiss!: EventEmitter<CustomEvent<IPopoverOverlayEventDetail>>;
  /** Emitted after the popover has dismissed. */
  myPopoverDidDismiss!: EventEmitter<CustomEvent<IPopoverOverlayEventDetail>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, [
      'myPopoverDidPresent',
      'myPopoverWillPresent',
      'myPopoverWillDismiss',
      'myPopoverDidDismiss',
    ]);
  }
}

export declare interface MyRadio extends Components.MyRadio {}
@ProxyCmp({
  tagName: 'my-radio',
  customElement: MyRadioCmp,
  inputs: ['color', 'disabled', 'mode', 'name', 'value'],
})
@Component({
  selector: 'my-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'disabled', 'mode', 'name', 'value'],
  outputs: ['myFocus', 'myBlur', 'mySelect'],
})
export class MyRadio {
  /** Emitted when the radio button has focus. */
  myFocus!: EventEmitter<CustomEvent<void>>;
  /** Emitted when the radio button loses focus. */
  myBlur!: EventEmitter<CustomEvent<void>>;
  /** Emitted when the radio button loses focus. */
  mySelect!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myFocus', 'myBlur', 'mySelect']);
  }
}

import { RadioGroupChangeEventDetail as IRadioGroupRadioGroupChangeEventDetail } from 'component-library';
export declare interface MyRadioGroup extends Components.MyRadioGroup {}
@ProxyCmp({
  tagName: 'my-radio-group',
  customElement: MyRadioGroupCmp,
  inputs: ['allowEmptySelection', 'name', 'value'],
})
@Component({
  selector: 'my-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['allowEmptySelection', 'name', 'value'],
  outputs: ['myChange'],
})
export class MyRadioGroup {
  /** Emitted when the value has changed. */
  myChange!: EventEmitter<CustomEvent<IRadioGroupRadioGroupChangeEventDetail>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myChange']);
  }
}

import { RangeChangeEventDetail as IRangeRangeChangeEventDetail } from 'component-library';
export declare interface MyRange extends Components.MyRange {}
@ProxyCmp({
  tagName: 'my-range',
  customElement: MyRangeCmp,
  inputs: [
    'color',
    'debounce',
    'disabled',
    'dualKnobs',
    'max',
    'min',
    'mode',
    'name',
    'pin',
    'snaps',
    'step',
    'ticks',
    'value',
  ],
})
@Component({
  selector: 'my-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: [
    'color',
    'debounce',
    'disabled',
    'dualKnobs',
    'max',
    'min',
    'mode',
    'name',
    'pin',
    'snaps',
    'step',
    'ticks',
    'value',
  ],
  outputs: ['myChange', 'myFocus', 'myBlur'],
})
export class MyRange {
  /** Emitted when the value property has changed. */
  myChange!: EventEmitter<CustomEvent<IRangeRangeChangeEventDetail>>;
  /** Emitted when the range has focus. */
  myFocus!: EventEmitter<CustomEvent<void>>;
  /** Emitted when the range loses focus. */
  myBlur!: EventEmitter<CustomEvent<void>>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myChange', 'myFocus', 'myBlur']);
  }
}
