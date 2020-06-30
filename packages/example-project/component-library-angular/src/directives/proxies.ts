/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'component-library';

import { Button as IButton } from 'component-library/dist/types/components/my-button/my-button';
export declare interface MyButton extends Components.MyButton {}
@ProxyCmp({
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type']
})
@Component({
  selector: 'my-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type'],
  outputs: ['myFocus', 'myBlur']
})
export class MyButton {
  /** Emitted when the button has focus. */
  myFocus!: IButton['myFocus'];
  /** Emitted when the button loses focus. */
  myBlur!: IButton['myBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myFocus', 'myBlur']);
  }
}

import { Checkbox as ICheckbox } from 'component-library/dist/types/components/my-checkbox/my-checkbox';
export declare interface MyCheckbox extends Components.MyCheckbox {}
@ProxyCmp({
  inputs: ['checked', 'color', 'disabled', 'indeterminate', 'mode', 'name', 'value']
})
@Component({
  selector: 'my-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checked', 'color', 'disabled', 'indeterminate', 'mode', 'name', 'value'],
  outputs: ['myChange', 'myFocus', 'myBlur']
})
export class MyCheckbox {
  /** Emitted when the checked property has changed. @bindAttr checked,@bindType boolean*/
  myChange!: ICheckbox['myChange'];
  /** Emitted when the toggle has focus. */
  myFocus!: ICheckbox['myFocus'];
  /** Emitted when the toggle loses focus. */
  myBlur!: ICheckbox['myBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myChange', 'myFocus', 'myBlur']);
  }
}

import { MyComponent as IMyComponent } from 'component-library/dist/types/components/my-component/my-component';
export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({
  inputs: ['age', 'first', 'kidsNames', 'last', 'middle']
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['age', 'first', 'kidsNames', 'last', 'middle'],
  outputs: ['myCustomEvent']
})
export class MyComponent {
  /** Testing an event without value */
  myCustomEvent!: IMyComponent['myCustomEvent'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myCustomEvent']);
  }
}

import { Input as IInput } from 'component-library/dist/types/components/my-input/my-input';
export declare interface MyInput extends Components.MyInput {}
@ProxyCmp({
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'my-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  outputs: ['myInput', 'myChange', 'myBlur', 'myFocus']
})
export class MyInput {
  /** Emitted when a keyboard input occurred. */
  myInput!: IInput['myInput'];
  /** Emitted when the value has changed. @bindAttr value,@bindType text my-input[type=text],@bindType number my-input[type=number]*/
  myChange!: IInput['myChange'];
  /** Emitted when the input loses focus. */
  myBlur!: IInput['myBlur'];
  /** Emitted when the input has focus. */
  myFocus!: IInput['myFocus'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myInput', 'myChange', 'myBlur', 'myFocus']);
  }
}

import { Popover as IPopover } from 'component-library/dist/types/components/my-dialog/my-dialog';
export declare interface MyPopover extends Components.MyPopover {}
@ProxyCmp({
  inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'my-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'],
  outputs: ['myPopoverDidPresent', 'myPopoverWillPresent', 'myPopoverWillDismiss', 'myPopoverDidDismiss']
})
export class MyPopover {
  /** Emitted after the popover has presented. */
  myPopoverDidPresent!: IPopover['didPresent'];
  /** Emitted before the popover has presented. */
  myPopoverWillPresent!: IPopover['willPresent'];
  /** Emitted before the popover has dismissed. */
  myPopoverWillDismiss!: IPopover['willDismiss'];
  /** Emitted after the popover has dismissed. */
  myPopoverDidDismiss!: IPopover['didDismiss'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myPopoverDidPresent', 'myPopoverWillPresent', 'myPopoverWillDismiss', 'myPopoverDidDismiss']);
  }
}

import { Radio as IRadio } from 'component-library/dist/types/components/my-radio/my-radio';
export declare interface MyRadio extends Components.MyRadio {}
@ProxyCmp({
  inputs: ['color', 'disabled', 'mode', 'name', 'value']
})
@Component({
  selector: 'my-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'disabled', 'mode', 'name', 'value'],
  outputs: ['myFocus', 'myBlur', 'mySelect']
})
export class MyRadio {
  /** Emitted when the radio button has focus. */
  myFocus!: IRadio['myFocus'];
  /** Emitted when the radio button loses focus. */
  myBlur!: IRadio['myBlur'];
  /** Emitted when the radio button loses focus. @bindAttr checked,@bindType radio*/
  mySelect!: IRadio['mySelect'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myFocus', 'myBlur', 'mySelect']);
  }
}

import { RadioGroup as IRadioGroup } from 'component-library/dist/types/components/my-radio-group/my-radio-group';
export declare interface MyRadioGroup extends Components.MyRadioGroup {}
@ProxyCmp({
  inputs: ['allowEmptySelection', 'name', 'value']
})
@Component({
  selector: 'my-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['allowEmptySelection', 'name', 'value'],
  outputs: ['myChange']
})
export class MyRadioGroup {
  /** Emitted when the value has changed. @bindAttr value,@bindType select*/
  myChange!: IRadioGroup['myChange'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myChange']);
  }
}

import { Range as IRange } from 'component-library/dist/types/components/my-range/my-range';
export declare interface MyRange extends Components.MyRange {}
@ProxyCmp({
  inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'mode', 'name', 'pin', 'snaps', 'step', 'ticks', 'value']
})
@Component({
  selector: 'my-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'mode', 'name', 'pin', 'snaps', 'step', 'ticks', 'value'],
  outputs: ['myChange', 'myFocus', 'myBlur']
})
export class MyRange {
  /** Emitted when the value property has changed. @bindAttr value,@bindType select*/
  myChange!: IRange['myChange'];
  /** Emitted when the range has focus. */
  myFocus!: IRange['myFocus'];
  /** Emitted when the range loses focus. */
  myBlur!: IRange['myBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myChange', 'myFocus', 'myBlur']);
  }
}
