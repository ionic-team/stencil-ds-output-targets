import { createModuleBarrelConst } from './create-module-barrel-const';
describe('createModuleBarrelConst', () => {

  it('should work with no modules', () => {
    const res = createModuleBarrelConst([]);

    expect(res).toEqual('export const MODULES = [];');
  });

  it('should work with a single module', () => {
    const res = createModuleBarrelConst(['my-component']);

    expect(res).toEqual(
      `export const MODULES = [
  ProxyModules.MyComponentModule
];`
    );
  });

  it('should work with multiple modules', () => {
    const res = createModuleBarrelConst(['my-component', 'my-other-component']);

    expect(res).toEqual(
      `export const MODULES = [
  ProxyModules.MyComponentModule,
  ProxyModules.MyOtherComponentModule
];`
    );
  });

});
