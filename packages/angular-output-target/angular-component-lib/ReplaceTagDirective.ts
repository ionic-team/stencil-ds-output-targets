import { AfterViewChecked, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { StencilProxyComponent } from './StencilProxyComponent';

@Directive({
  selector: '[replaceTag]',
})
export class ReplaceTagDirective implements AfterViewChecked {
  constructor(
    private templateRef: TemplateRef<any>,
    private vcf: ViewContainerRef,
    private host: StencilProxyComponent
  ) {}

  private _tag: string;
  private _needUpdate: boolean = false;
  private _webComponentElement: HTMLElement;

  @Input('replaceTag')
  set tag(t: string) {
    this._tag = t;
    this._needUpdate = true;
    this.vcf.clear();
    let template = this.templateRef.elementRef.nativeElement.previousElementSibling; //@fixme robusten
    if (template) {
      this.templateRef.elementRef.nativeElement.parentNode.removeChild(template);
    }
    this.vcf.createEmbeddedView(this.templateRef);
  }

  ngAfterViewChecked() {
    if (this._needUpdate) {
      this._updateTemplate();
      this._needUpdate = false;
    }
  }

  private _updateTemplate() {
    let template = this.templateRef.elementRef.nativeElement.previousElementSibling;
    if (template) {
      this._webComponentElement = document.createElement(this._tag);
      this.mirrorProperties(
        this.templateRef.elementRef.nativeElement.previousElementSibling,
        this._webComponentElement
      );

      // this._webComponentElement.innerHTML = template.innerHTML;
      Array.from(template.childNodes).forEach((node) => {
        this._webComponentElement.appendChild(node as Node);
      });

      // this.templateRef.elementRef.nativeElement.parentNode.replaceChild(this._webComponentElement, template);
      template.style.display = 'none';
      this.templateRef.elementRef.nativeElement.parentNode.appendChild(this._webComponentElement, template);
    }
  }

  public handlePropertyChanges() {
    this.mirrorProperties(this.templateRef.elementRef.nativeElement.parentElement, this._webComponentElement);
  }

  private mirrorProperties(from: HTMLElement, to: HTMLElement) {
    const properties: [string, any][] = Object.entries(from);

    for (let [key, value] of properties) {
      if (this.host.availableInputProperties.includes(key) && value !== undefined) {
        // @todo
        // @ts-ignore
        to[key] = value;
      }
    }
  }
}
