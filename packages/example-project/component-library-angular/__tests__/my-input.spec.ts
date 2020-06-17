import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '../src/config.testing';
import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentLibraryModule } from '../src/index';

@Component({
  template: `<my-input type="text" [(ngModel)]="testText"></my-input>`,
})
class TestHoverFocusComponent {
  testText: string = '';
}

describe('MyInput', () => {
  let component: TestHoverFocusComponent;
  let myInputEl: DebugElement;
  let fixture: ComponentFixture<TestHoverFocusComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        imports: [FormsModule, ComponentLibraryModule],
        declarations: [TestHoverFocusComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(TestHoverFocusComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      myInputEl = fixture.debugElement.query(By.css('my-input'));
    });
  }));

  it('on myChange type="text" the bound component attribute should update', () => {
    const { componentInstance: myAngularComponent } = fixture;
    myInputEl.triggerEventHandler('myChange', { target: { value: 'text' } });
    expect(myAngularComponent.testText).toEqual('text');
  });
});
