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
});
