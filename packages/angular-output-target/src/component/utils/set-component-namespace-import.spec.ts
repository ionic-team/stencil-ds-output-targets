import { setComponentNamespaceImport } from './set-component-namespace-import';

describe('setComponentNamespaceImport', () => {

  it('should set the typed import when including custom elements', () => {
    const imports = {};
    const typedImports = {};

    setComponentNamespaceImport({
      componentCorePackage: '@ionic/core',
      includeImportCustomElements: true,
      customElementsDir: 'components'
    }, './components.d.ts', {
      modules: imports,
      types: typedImports,
    });

    expect(typedImports['@ionic/core/components']).toEqual(['Components']);
    expect(imports).toEqual({});
  });

  it('should set the module import when not custom elements', () => {
    const imports = {};
    const typedImports = {};

    setComponentNamespaceImport({
      componentCorePackage: '@ionic/core',
      includeImportCustomElements: false,
    }, './components.d.ts', {
      modules: imports,
      types: typedImports,
    });

    expect(imports['@ionic/core']).toEqual(['Components']);
    expect(typedImports).toEqual({});
  });

  it('should use a relative path when componentCorePackage is unset', () => {
    const imports = {};
    const typedImports = {};

    setComponentNamespaceImport({
      componentCorePackage: undefined,
      includeImportCustomElements: false,
    }, './components.d.ts', {
      modules: imports,
      types: typedImports,
    });

    expect(imports['./components.d.ts']).toEqual(['Components']);
    expect(typedImports).toEqual({});
  });

});
