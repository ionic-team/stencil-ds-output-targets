import { EventEmitter } from '@angular/core';

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item];
      },
      set(val: any) {
        this.z.runOutsideAngular(() => (this.el[item] = val));
      },
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

const eventMethodName = (name: string) => 'on' + name[0].toUpperCase() + name.slice(1);

const parseEvent = (event: any) => {
  if ('detail' in event) {
    return event.detail;
  }
  return event;
};

export const proxyOutputs = (instance: any, el: HTMLElement, events: string[]) => {
  events.forEach((eventName) => {
    instance[eventName] = new EventEmitter();
    // instance[eventMethodName(eventName)] = (event: Event) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   instance[eventName].emit(parseEvent(event));
    // };
  });
};

export const addProxyOutputListener = (instance: any, el: HTMLElement, events: string[]) => {
  // events.forEach((eventName) => {
  //   el.addEventListener(eventName, instance[eventMethodName(eventName)]);
  // });
};

export const removeProxyOutputListener = (instance: any, el: HTMLElement, events: string[]) => {
  // events.forEach((eventName) => {
  //   el.removeEventListener(eventName, instance[eventMethodName(eventName)]);
  // });
};

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { inputs?: any; methods?: any }) {
  const decorator = function (cls: any) {
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
