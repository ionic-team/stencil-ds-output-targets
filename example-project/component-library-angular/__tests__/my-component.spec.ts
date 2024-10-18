import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComponent } from './../src/index';

describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const { nativeElement: myComponent, componentInstance: myAngularComponent } = fixture;
    myAngularComponent.age = 39;
    expect(myComponent.age).toEqual(39);
  });

  it('should get strings as props', () => {
    const { nativeElement: myComponent, componentInstance: myAngularComponent } = fixture;
    myAngularComponent.first = 'blue';
    expect(myComponent.first).toEqual('blue');
  });

  it('should get numbers as props', () => {
    const { nativeElement: myComponent, componentInstance: myAngularComponent } = fixture;
    myAngularComponent.age = 39;
    expect(myComponent.age).toEqual(39);
  });

  it('should get arrays as props', () => {
    const { nativeElement: myComponent, componentInstance: myAngularComponent } = fixture;
    myAngularComponent.kidsNames = ['billy', 'jane'];
    expect(myComponent.kidsNames).toEqual(['billy', 'jane']);
  });
});
