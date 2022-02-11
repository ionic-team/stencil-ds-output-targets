import { createComponentBarrelConst } from './create-component-barrel-const';
describe('createComponentBarrelConst', () => {

  it('should work with no components', () => {
    const res = createComponentBarrelConst([]);

    expect(res).toEqual('export const COMPONENTS = [];');
  });

  it('should work with a single component', () => {
    const res = createComponentBarrelConst(['my-component']);

    expect(res).toEqual(
      `export const COMPONENTS = [
  ProxyComponents.MyComponent
];`
    );
  });

  it('should work with multiple components', () => {
    const res = createComponentBarrelConst(['my-component', 'my-other-component']);

    expect(res).toEqual(
      `export const COMPONENTS = [
  ProxyComponents.MyComponent,
  ProxyComponents.MyOtherComponent
];`
    );
  });

});
