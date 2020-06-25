/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() { return this.el[item]; },
      set(val: any) { this.z.runOutsideAngular(() => (this.el[item] = val)); }
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { inputs?: any; methods?: any }) {
  const decorator =  function(cls: any){
    if (opts.inputs) {
      proxyInputs(cls, opts.inputs);
    }
    if (opts.methods) {
      proxyMethods(cls, opts.methods);
    }
    return cls;
  };
  return decorator;
}

import { Components } from 'component-library'
import { Button as IButton } from 'component-library/dist/types/components/my-button/my-button';
export declare interface MyButton extends Components.MyButton {}
@ProxyCmp({inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type']})
@Component({ selector: 'my-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type'], outputs: ['myFocus', 'myBlur'] })
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
@ProxyCmp({inputs: ['checked', 'color', 'disabled', 'indeterminate', 'mode', 'name', 'value']})
@Component({ selector: 'my-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['checked', 'color', 'disabled', 'indeterminate', 'mode', 'name', 'value'], outputs: ['myChange', 'myFocus', 'myBlur'] })
export class MyCheckbox {
  /** Emitted when the checked property has changed. */
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

export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({inputs: ['age', 'first', 'kidsNames', 'last', 'middle']})
@Component({ selector: 'my-component', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['age', 'first', 'kidsNames', 'last', 'middle'] })
export class MyComponent {
  myCustomEvent!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myCustomEvent']);
  }
}
import { Input as IInput } from 'component-library/dist/types/components/my-input/my-input';
export declare interface MyInput extends Components.MyInput {}
@ProxyCmp({inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'], 'methods': ['setFocus', 'getInputElement']})
@Component({ selector: 'my-input', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'], outputs: ['myInput', 'myChange', 'myBlur', 'myFocus'] })
export class MyInput {
  /** Emitted when a keyboard input occurred. */
  myInput!: IInput['myInput'];
  /** Emitted when the value has changed. */
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
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'my-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'], outputs: ['myPopoverDidPresent', 'myPopoverWillPresent', 'myPopoverWillDismiss', 'myPopoverDidDismiss'] })
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
@ProxyCmp({inputs: ['color', 'disabled', 'mode', 'name', 'value']})
@Component({ selector: 'my-radio', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'disabled', 'mode', 'name', 'value'], outputs: ['myFocus', 'myBlur'] })
export class MyRadio {
  /** Emitted when the radio button has focus. */
  myFocus!: IRadio['myFocus'];
  /** Emitted when the radio button loses focus. */
  myBlur!: IRadio['myBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['myFocus', 'myBlur', 'mySelect']);
  }
}
import { RadioGroup as IRadioGroup } from 'component-library/dist/types/components/my-radio-group/my-radio-group';
export declare interface MyRadioGroup extends Components.MyRadioGroup {}
@ProxyCmp({inputs: ['allowEmptySelection', 'name', 'value']})
@Component({ selector: 'my-radio-group', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['allowEmptySelection', 'name', 'value'], outputs: ['myChange'] })
export class MyRadioGroup {
  /** Emitted when the value has changed. */
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
@ProxyCmp({inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'mode', 'name', 'pin', 'snaps', 'step', 'ticks', 'value']})
@Component({ selector: 'my-range', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'mode', 'name', 'pin', 'snaps', 'step', 'ticks', 'value'], outputs: ['myChange', 'myFocus', 'myBlur'] })
export class MyRange {
  /** Emitted when the value property has changed. */
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
