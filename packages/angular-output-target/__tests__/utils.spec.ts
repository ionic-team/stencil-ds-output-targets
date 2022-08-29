import { createImportStatement, createComponentEventTypeImports } from '../src/utils';

describe('createImportStatement()', () => {
  it('should create an import statement', () => {
    const importStatement = createImportStatement(['Component'], '@angular/core');

    expect(importStatement).toEqual(`import { Component } from '@angular/core';`);
  });

  it('should create an import statement with multiple imports', () => {
    const importStatement = createImportStatement(['Component', 'NgModule'], '@angular/core');

    expect(importStatement).toEqual(`import { Component, NgModule } from '@angular/core';`);
  });

  it('should not create an import statement if no imports are provided', () => {
    const importStatement = createImportStatement([], '@angular/core');

    expect(importStatement).toEqual('');
  });
});

describe('createComponentEventTypeImports()', () => {
  let testEvents: any[] = [
    {
      complexType: {
        references: {
          MyEvent: {
            location: 'import',
          },
        },
      },
    },
    {
      complexType: {
        references: {
          MyOtherEvent: {
            location: 'import',
          },
        },
      },
    },
  ];

  describe('www output', () => {
    it('should create an import statement for each event', () => {
      const imports = createComponentEventTypeImports('MyComponent', testEvents, {
        componentCorePackage: '@ionic/core',
      });

      expect(imports).toEqual(
        `import type { MyEvent as IMyComponentMyEvent } from '@ionic/core';
import type { MyOtherEvent as IMyComponentMyOtherEvent } from '@ionic/core';`
      );
    });
  });

  describe('custom elements output', () => {
    describe('with custom elements dir', () => {
      it('should create an import statement for each event', () => {
        const imports = createComponentEventTypeImports('MyComponent', testEvents, {
          componentCorePackage: '@ionic/core',
          includeImportCustomElements: true,
          customElementsDir: 'custom-elements',
        });

        expect(imports).toEqual(
          `import type { MyEvent as IMyComponentMyEvent } from '@ionic/core/custom-elements';
import type { MyOtherEvent as IMyComponentMyOtherEvent } from '@ionic/core/custom-elements';`
        );
      });
    });

    describe('without custom elements dir', () => {
      it('should create an import statement for each event', () => {
        const imports = createComponentEventTypeImports('MyComponent', testEvents, {
          componentCorePackage: '@ionic/core',
          includeImportCustomElements: true,
        });

        expect(imports).toEqual(
          `import type { MyEvent as IMyComponentMyEvent } from '@ionic/core/components';
import type { MyOtherEvent as IMyComponentMyOtherEvent } from '@ionic/core/components';`
        );
      });
    });
  });
});
