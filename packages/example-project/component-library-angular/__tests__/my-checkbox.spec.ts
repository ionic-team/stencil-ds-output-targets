import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '../src/config.testing';
import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentLibraryModule } from '../src/index';

@Component({
  template: `<my-checkbox type="text" [(ngModel)]="itemIsChecked"></my-checkbox>`,
})
class TestBooleanValueAccessorComponent {
  itemIsChecked: boolean = false;
}

describe('MyCheckbox', () => {
  let myCheckboxEl: DebugElement;
  let fixture: ComponentFixture<TestBooleanValueAccessorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [FormsModule, ComponentLibraryModule],
        declarations: [TestBooleanValueAccessorComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestBooleanValueAccessorComponent);
      fixture.detectChanges();
      myCheckboxEl = fixture.debugElement.query(By.css('my-checkbox'));
    });
  }));

  it('myChange updates the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myCheckboxEl.nativeElement.checked = true;
    myCheckboxEl.nativeElement.dispatchEvent(new CustomEvent('myChange', { detail: { value: true } }));
    expect(myAngularComponent.itemIsChecked).toEqual(true);
  });
});
