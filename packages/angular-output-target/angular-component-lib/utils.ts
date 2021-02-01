import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

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

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach(
    (eventName) =>
      (instance[eventName] = fromEvent(el, eventName).pipe(
        map((event: any) => {
          if (Object.hasOwnProperty.call(event, 'detail')) {
            return event.detail;
          }
          return event;
        }),
      )),
  );
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
