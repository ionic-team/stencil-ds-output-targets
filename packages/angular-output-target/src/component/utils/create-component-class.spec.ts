import { createComponentClass } from './create-component-class';
describe('createComponentClass', () => {

  it('should work', () => {
    const res = createComponentClass('MyComponent', [
      { name: 'ionChange' },
      { name: 'ionFocus' },
      { name: 'ionBlur' }
    ]);
    expect(res).toBe(
      `export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['ionChange', 'ionFocus', 'ionBlur']);
  }
}`
    );
  });

  it('should work when there are no outputs', () => {
    const res = createComponentClass('MyComponent', []);
    expect(res).toEqual(
      `export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`
    );
  })

});
