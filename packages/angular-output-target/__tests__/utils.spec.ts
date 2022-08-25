import { createAngularCoreImportStatement } from '../src/utils';

describe('createAngularCoreImportStatement()', () => {
  it('should create an import statement', () => {
    const importStatement = createAngularCoreImportStatement(['Component']);

    expect(importStatement).toEqual(`import { Component } from '@angular/core';`);
  });

  it('should create an import statement with multiple imports', () => {
    const importStatement = createAngularCoreImportStatement(['Component', 'NgModule']);

    expect(importStatement).toEqual(`import { Component, NgModule } from '@angular/core';`);
  });

  it('should not create an import statement if no imports are provided', () => {
    const importStatement = createAngularCoreImportStatement([]);

    expect(importStatement).toEqual('');
  });
});
