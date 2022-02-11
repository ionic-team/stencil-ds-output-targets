import type { ComponentCompilerMeta } from '@stencil/core/internal';
import { OutputTargetAngular } from '..';

import { dashToPascalCase } from '../utils';
import { ComponentDecorator, ImportCollection } from './types';
import { createComponentClass } from './utils/create-component-class';
import { createComponentDecorator } from './utils/create-component-decorator';
import { createComponentInterface } from './utils/create-component-interface';
import { createComponentModuleClass } from './utils/create-component-module-class';
import { createProxyCmpDecorator } from './utils/create-proxy-cmp-decorator';

export const createComponentDefinition = (
  outputTarget: OutputTargetAngular,
  importCollections: {
    modules: ImportCollection,
    types: ImportCollection
  }
) => (cmpMeta: ComponentCompilerMeta) => {
  const {
    componentCorePackage,
    includeImportCustomElements = false,
    customElementsDir = 'components',
    singleComponentAngularModules = false
  } = outputTarget;
  // Collect component meta
  const inputs = [
    ...cmpMeta.properties.filter((prop) => !prop.internal).map((prop) => prop.name),
    ...cmpMeta.virtualProperties.map((prop) => prop.name),
  ].sort();
  const outputs = cmpMeta.events.filter((ev) => !ev.internal).map((prop) => prop);

  const componentDecorator: ComponentDecorator = {
    selector: cmpMeta.tagName,
    changeDetection: 'ChangeDetectionStrategy.OnPush',
    template: '<ng-content></ng-content>',
    inputs: inputs ?? [],
  };

  const componentClassName = dashToPascalCase(cmpMeta.tagName);

  const componentOutput =
    createComponentInterface({
      metadata: cmpMeta,
      outputs,
      includeImportCustomElements,
      customElementsDir,
      componentCorePackage: componentCorePackage!
    }, importCollections.types) +
    '\n\n' +
    createProxyCmpDecorator({ inputs }, {
      includeImportCustomElements,
      tagNamePascalCase: componentClassName
    }) +
    '\n' +
    createComponentDecorator(componentDecorator) +
    '\n' +
    createComponentClass(componentClassName, outputs) +
    '\n' +
    (singleComponentAngularModules ?
      (createComponentModuleClass(componentClassName) + '\n') : '');

  return componentOutput;

};
