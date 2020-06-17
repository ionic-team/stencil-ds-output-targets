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
@Component({ selector: 'my-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type'], outputs: ['ionFocus', 'ionBlur'] })
export class MyButton {
  /** Emitted when the button has focus. */
  ionFocus!: IButton['ionFocus'];
  /** Emitted when the button loses focus. */
  ionBlur!: IButton['ionBlur'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionFocus', 'ionBlur']);
  }
}

export declare interface MyComponent extends Components.MyComponent {}
@ProxyCmp({inputs: ['age', 'first', 'kidsNames', 'last', 'middle']})
@Component({ selector: 'my-component', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['age', 'first', 'kidsNames', 'last', 'middle'] })
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
import { Input as IInput } from 'component-library/dist/types/components/my-input/my-input';
export declare interface MyInput extends Components.MyInput {}
@ProxyCmp({inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'], 'methods': ['setFocus', 'getInputElement']})
@Component({ selector: 'my-input', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'], outputs: ['ionInput', 'ionChange', 'ionBlur', 'ionFocus'] })
export class MyInput {
  /** Emitted when a keyboard input occurred. */
  ionInput!: IInput['ionInput'];
  /** Emitted when the value has changed. */
  ionChange!: IInput['ionChange'];
  /** Emitted when the input loses focus. */
  ionBlur!: IInput['ionBlur'];
  /** Emitted when the input has focus. */
  ionFocus!: IInput['ionFocus'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionInput', 'ionChange', 'ionBlur', 'ionFocus']);
  }
}
import { Popover as IPopover } from 'component-library/dist/types/components/my-dialog/my-dialog';
export declare interface MyPopover extends Components.MyPopover {}
@ProxyCmp({inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'], 'methods': ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']})
@Component({ selector: 'my-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'], outputs: ['ionPopoverDidPresent', 'ionPopoverWillPresent', 'ionPopoverWillDismiss', 'ionPopoverDidDismiss'] })
export class MyPopover {
  /** Emitted after the popover has presented. */
  ionPopoverDidPresent!: IPopover['didPresent'];
  /** Emitted before the popover has presented. */
  ionPopoverWillPresent!: IPopover['willPresent'];
  /** Emitted before the popover has dismissed. */
  ionPopoverWillDismiss!: IPopover['willDismiss'];
  /** Emitted after the popover has dismissed. */
  ionPopoverDidDismiss!: IPopover['didDismiss'];
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionPopoverDidPresent', 'ionPopoverWillPresent', 'ionPopoverWillDismiss', 'ionPopoverDidDismiss']);
  }
}
