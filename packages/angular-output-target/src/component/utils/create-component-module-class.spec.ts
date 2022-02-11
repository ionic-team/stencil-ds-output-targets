import { createComponentModuleClass } from './create-component-module-class';

describe('createComponentModuleClass', () => {

  it('should work', () => {
    const res = createComponentModuleClass('MyComponent');
    expect(res).toBe(
      `@NgModule({
  imports: [CommonModule],
  declarations: [MyComponent],
  exports: [MyComponent]
})
export class MyComponentModule {}`
    );
  });

});
