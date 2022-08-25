import { generateAngularModules } from '../src/generate-angular-modules';

describe('generateAngularModules()', () => {
  it('should generate an Angular module for each component', () => {
    const components = ['my-component', 'my-other-component'];

    const modules = generateAngularModules(components);

    expect(modules).toEqual([
      `
@NgModule({
  declarations: [MyComponent],
  exports: [MyComponent]
})
export class MyComponentModule {}
`,
      `
@NgModule({
  declarations: [MyOtherComponent],
  exports: [MyOtherComponent]
})
export class MyOtherComponentModule {}
`,
    ]);
  });
});
