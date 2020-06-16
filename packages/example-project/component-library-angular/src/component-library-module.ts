import { NgModule } from '@angular/core';
import { defineCustomElements } from 'component-library/loader';

import { TextValueAccessor } from './directives/text-value-accessor';
import { MyComponent } from './directives/proxies';

defineCustomElements(window);

const DECLARATIONS = [
  // proxies
  MyComponent,

  // Value Accessors
  TextValueAccessor,
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: [],
})
export class ComponentLibraryModule {}
