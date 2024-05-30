import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentLibraryModule } from '../src/index';

@Component({
  template: `<my-radio [(ngModel)]="isChecked"></my-radio>`,
})
class TestRadioValueAccessorComponent {
  isChecked: boolean = false;
}

describe('MyRadio', () => {
  let myRadioEl: DebugElement;
  let fixture: ComponentFixture<TestRadioValueAccessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ComponentLibraryModule],
      declarations: [TestRadioValueAccessorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestRadioValueAccessorComponent);
    fixture.detectChanges();
    myRadioEl = fixture.debugElement.query(By.css('my-radio'));
  });

  it('on mySelect checked the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myRadioEl.nativeElement.checked = true;
    myRadioEl.nativeElement.dispatchEvent(new CustomEvent('mySelect', { detail: { checked: true } }));
    expect(myAngularComponent.isChecked).toEqual(true);
  });
});
