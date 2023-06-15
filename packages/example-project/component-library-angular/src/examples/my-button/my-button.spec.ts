import { TestBed } from '@angular/core/testing';
import { MyButtonComponent } from './my-button.component';

describe('MyButtonComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MyButtonComponent]
  }));

  it('should create my-button', () => {
    const fixture = TestBed.createComponent(MyButtonComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('my-button').textContent).toContain('Test');
  });

});
