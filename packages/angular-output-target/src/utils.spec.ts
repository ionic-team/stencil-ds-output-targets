import { setImportStatement, flattenImportCollection, mergeImportCollections } from './utils';

describe('setImportStatement', () => {

  it('should create a new array', () => {
    const collection = {};

    setImportStatement(collection, '@ionic/core', 'Components');

    expect(collection['@ionic/core']).toEqual(['Components']);
  });

  it('should append to existing packages', () => {
    const collection = {
      '@ionic/core': ['Components'],
    };

    setImportStatement(collection, '@ionic/core', 'Checkbox');

    expect(collection['@ionic/core']).toEqual(['Components', 'Checkbox']);
  });

});

describe('flattenImportCollection', () => {

  it('should work', () => {
    const res = flattenImportCollection({
      '@ionic/core': ['Components']
    });

    expect(res).toEqual(
      `import {
  Components
} from '@ionic/core';`
    );
  });

  it('should work with multiple imports for the same package', () => {
    const res = flattenImportCollection({
      '@ionic/core': ['Components', 'Checkbox']
    });

    expect(res).toEqual(
      `import {
  Checkbox,
  Components
} from '@ionic/core';`
    );
  });

  it('should work with multiple packages', () => {
    const res = flattenImportCollection({
      '@ionic/core': ['Components'],
      '@example/core': ['Example']
    });

    expect(res).toEqual(
      `import {
  Example
} from '@example/core';
import {
  Components
} from '@ionic/core';`
    );
  });

  it('should create a new line between scoped packages and local imports', () => {
    const res = flattenImportCollection({
      '@ionic/core': ['Components'],
      '@example/core': ['Example'],
      './angular-component-lib/utils': ['ProxyCmp']
    });
    expect(res).toEqual(
      `import {
  Example
} from '@example/core';
import {
  Components
} from '@ionic/core';

import {
  ProxyCmp
} from './angular-component-lib/utils';`
    );
  });

  it('should sort import groups alphabetically', () => {
    const res = flattenImportCollection({
      '@angular/core': ['NgModule'],
      '@angular/common': ['CommonModule'],
    });

    expect(res).toEqual(
      `import {
  CommonModule
} from '@angular/common';
import {
  NgModule
} from '@angular/core';`
    );
  });

});


describe('mergeImportCollections', () => {

  it('should merge imports collections to the same package', () => {
    const res = mergeImportCollections(
      {
        '@ionic/core': ['Components']
      },
      {
        '@ionic/core': ['Checkbox']
      }
    );

    expect(res).toEqual({
      '@ionic/core': ['Components', 'Checkbox']
    });
  });

  it('should merge imports from different packages', () => {
    const res = mergeImportCollections(
      {
        '@ionic/core': ['Components']
      },
      {
        '@example/ui': ['Checkbox']
      }
    );

    expect(res).toEqual({
      '@ionic/core': ['Components'],
      '@example/ui': ['Checkbox']
    });
  });

});
