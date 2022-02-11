import { ComponentCompilerEvent } from "@stencil/core/internal";

export function createComponentClass(componentClassName: string, outputs: Pick<ComponentCompilerEvent, 'name'>[]) {
  const outputNames = outputs.map(output => output.name);
  return (
    `export class ${componentClassName} {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;` +
    (outputNames.length > 0 ? (
      '\n' +
      `    proxyOutputs(this, this.el, [${outputNames.map(outputName => `'${outputName}'`).join(', ').trim()}]);`
    ) : '') + `
  }
}`
  );
}
