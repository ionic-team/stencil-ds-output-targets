import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '../src/config.testing';
import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentLibraryModule } from '../src/index';

@Component({
  template: `<my-radio-group name="" [(ngModel)]="selectedName">
    <label><my-radio slot="start" value="biff"></my-radio></label>
    <label><my-radio slot="start" value="griff"></my-radio></label>
    <label><my-radio slot="start" value="buford"></my-radio></label>
  </my-radio-group>`,
})
class TestRadioValueAccessorComponent {
  selectedName: 'biff' | 'griff' | 'buford' = 'biff';
}

describe('MyRadioGroup', () => {
  let myRadioGroupEl: DebugElement;
  let fixture: ComponentFixture<TestRadioValueAccessorComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [FormsModule, ComponentLibraryModule],
        declarations: [TestRadioValueAccessorComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestRadioValueAccessorComponent);
      fixture.detectChanges();
      myRadioGroupEl = fixture.debugElement.query(By.css('my-radio-group'));
    });
  }));

  it('on myChange value the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myRadioGroupEl.nativeElement.value = 'buford';
    myRadioGroupEl.nativeElement.dispatchEvent(
      new CustomEvent('myChange', { detail: { value: 'buford' } }),
    );
    expect(myAngularComponent.selectedName).toEqual('buford');
  });
});
