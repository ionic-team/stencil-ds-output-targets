import path from 'path';

import { OutputTargetAngular } from './types';
import { GENERATED_DTS, dashToPascalCase, readPackageJson, relativeImport, normalizePath } from './utils';

import { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';

export default async function generateProxies(compilerCtx: CompilerCtx, components: ComponentCompilerMeta[], outputTarget: OutputTargetAngular, rootDir: string) {
  const proxies = getProxies(components);
  const pkgData = await readPackageJson(rootDir);
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const componentsTypeFile = relativeImport(outputTarget.directivesProxyFile, dtsFilePath, '.d.ts');

  const imports = `/* tslint:disable */
/* auto-generated angular directive proxies */
import { Component, ElementRef, ChangeDetectorRef, EventEmitter } from '@angular/core';`;

  const sourceImports = !outputTarget.componentCorePackage ?
    `import { Components } from '${normalizePath(componentsTypeFile)}';` :
    `import { Components } from '${normalizePath(outputTarget.componentCorePackage)}'`;

  const final: string[] = [
    imports,
    getProxyUtils(outputTarget),
    sourceImports,
    proxies,
  ];

  const finalText = final.join('\n') + '\n';

  return compilerCtx.fs.writeFile(outputTarget.directivesProxyFile, finalText);
}

function getProxies(components: ComponentCompilerMeta[]) {
  return components
    .map(getProxy)
    .join('\n');
}

function getProxy(cmpMeta: ComponentCompilerMeta) {
  // Collect component meta
  const inputs = getInputs(cmpMeta);
  const outputs = getOutputs(cmpMeta);
  const methods = getMethods(cmpMeta);

  // Process meta
  const hasInputs = inputs.length > 0;
  const hasOutputs = outputs.length > 0;
  const hasMethods = methods.length > 0;

  // Generate Angular @Directive
  const directiveOpts = [
    `selector: \'${cmpMeta.tagName}\'`,
    `changeDetection: 0`,
    `template: '<ng-content></ng-content>'`
  ];
  if (inputs.length > 0) {
    directiveOpts.push(`inputs: ['${inputs.join(`', '`)}']`);
  }

  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  const lines = [`
export declare interface ${tagNameAsPascal} extends Components.${tagNameAsPascal} {}`];

  if (hasInputs) {
    lines.push(`@ProxyInputs(['${inputs.join(`', '`)}'])`);
  }

  lines.push(`@Component({ ${directiveOpts.join(', ')} })
export class ${tagNameAsPascal} {`);

  // Generate outputs
  outputs.forEach(output => {
    lines.push(`  ${output}!: EventEmitter<CustomEvent>;`);
  });

  lines.push('  protected el: HTMLElement;');
  lines.push(`  constructor(c: ChangeDetectorRef, r: ElementRef) {
    c.detach();
    this.el = r.nativeElement;`);
  if (hasOutputs) {
    lines.push(`    proxyOutputs(this, this.el, ['${outputs.join(`', '`)}']);`);
  }
  lines.push(`  }`);
  lines.push(`}`);

  if (hasMethods) {
    lines.push(`proxyMethods(${tagNameAsPascal}, ['${methods.join(`', '`)}']);`);
  }

  return lines.join('\n');
}

function getInputs(cmpMeta: ComponentCompilerMeta): string[] {
  return [
    ...cmpMeta.properties.filter(prop => !prop.internal).map(prop => prop.name),
    ...cmpMeta.virtualProperties.map(prop => prop.name)
  ].sort();
}

function getOutputs(cmpMeta: ComponentCompilerMeta): string[] {
  return cmpMeta.events.filter(ev => !ev.internal).map(prop => prop.name);
}

function getMethods(cmpMeta: ComponentCompilerMeta): string[] {
  return cmpMeta.methods.filter(method => !method.internal).map(prop => prop.name);
}

function getProxyUtils(outputTarget: OutputTargetAngular) {
  if (!outputTarget.directivesUtilsFile) {
    return PROXY_UTILS.replace(/export function(?! ProxyInputs)/g, 'function');
  } else {
    const utilsPath = relativeImport(outputTarget.directivesProxyFile, outputTarget.directivesUtilsFile, '.ts');
    return `import { ProxyInputs, proxyMethods, proxyOutputs } from '${normalizePath(utilsPath)}';\n`;
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
