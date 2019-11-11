import { OutputTargetAngular } from './types';

import { CompilerCtx } from '@stencil/core/internal';


export default async function generateAngularUtils(compilerCtx: CompilerCtx, outputTarget: OutputTargetAngular) {
  if (outputTarget.directivesUtilsFile) {
    await compilerCtx.fs.writeFile(outputTarget.directivesUtilsFile, '/* tslint:disable */\n' + PROXY_UTILS);
  }
}

const PROXY_UTILS = `import { fromEvent } from 'rxjs';

export function ProxyInputs(inputs: string[]) {
  const decorator = function <T extends {new(...args:any[])}>(constructor:T) {
    const Prototype = constructor.prototype;
    inputs.forEach((item) => {
      Object.defineProperty(Prototype, item, {
        get() { return this.el[item]; },
        set(val: any) { this.el[item] = val; },
      });
    });
    return constructor;
  };
  return decorator;
}

export function proxyMethods(Cmp: any, methods: string[]) {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function() {
      const args = arguments;
      return this.el.componentOnReady().then((el: any) => el[methodName].apply(el, args));
    };
  });
}

export function proxyOutputs(instance: any, el: any, events: string[]) {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}
`;

