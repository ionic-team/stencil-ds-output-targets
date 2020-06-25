import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '../src/config.testing';
import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentLibraryModule } from '../src/index';

@Component({
  template: `<my-range min="0" max="100" type="text" [(ngModel)]="testText"></my-range>`,
})
class TestSelectValueAccessorComponent {
  testText: string = '';
}

describe('MyRange', () => {
  let myRangeEl: DebugElement;
  let fixture: ComponentFixture<TestSelectValueAccessorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [FormsModule, ComponentLibraryModule],
        declarations: [TestSelectValueAccessorComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestSelectValueAccessorComponent);
      fixture.detectChanges();
      myRangeEl = fixture.debugElement.query(By.css('my-range'));
    });
  }));

  it('on myChange value the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myRangeEl.nativeElement.value = 50;
    myRangeEl.nativeElement.dispatchEvent(new CustomEvent('myChange', { detail: { value: 50 } }));
    expect(myAngularComponent.testText).toEqual(50);
  });
});
