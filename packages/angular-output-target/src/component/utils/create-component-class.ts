import type { ComponentCompilerEvent } from "@stencil/core/internal";

/**
 * Creates the markup for the Angular component's Typescript class.
 * @param componentClassName The name of the component class.
 * @param outputs  The list of event names that the component emits.
 * @returns
 *
 * ```ts
 * export class MyComponent {
 *   protected el: HTMLElement;
 *   constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
 *     c.detach();
 *     this.el = r.nativeElement;
 *     proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
 *   }
 * }
 * ```
 */
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
