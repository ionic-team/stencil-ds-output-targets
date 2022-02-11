import { setComponentNamespaceImport } from './set-component-namespace-import';

describe('setComponentNamespaceImport', () => {

  it('should set the typed import when including custom elements', () => {
    const imports = {};

    setComponentNamespaceImport({
      componentCorePackage: '@ionic/core',
      includeImportCustomElements: true,
      customElementsDir: 'components'
    }, './components.d.ts', imports);

    expect(imports['@ionic/core/components']).toEqual([{
      value: 'Components',
      typeOnly: true
    }]);
  });

  it('should set the module import when not custom elements', () => {
    const imports = {};
    setComponentNamespaceImport({
      componentCorePackage: '@ionic/core',
      includeImportCustomElements: false,
    }, './components.d.ts', imports);

    expect(imports['@ionic/core']).toEqual(['Components']);
  });

  it('should use a relative path when componentCorePackage is unset', () => {
    const imports = {};

    setComponentNamespaceImport({
      componentCorePackage: undefined,
      includeImportCustomElements: false,
    }, './components.d.ts', imports);

    expect(imports['./components.d.ts']).toEqual(['Components']);
  });

});
