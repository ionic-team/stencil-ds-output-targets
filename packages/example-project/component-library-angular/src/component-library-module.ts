import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { defineCustomElements } from 'component-library/loader';

import { BooleanValueAccessor } from './directives/boolean-value-accessor';
import { NumericValueAccessor } from './directives/number-value-accessor';
import { RadioValueAccessor } from './directives/radio-value-accessor';
import { SelectValueAccessor } from './directives/select-value-accessor';
import { TextValueAccessor } from './directives/text-value-accessor';
import {
  MyComponent,
  MyButton,
  MyCheckbox,
  MyInput,
  MyPopover,
  MyRadio,
  MyRadioGroup,
  MyRange,
} from './directives/proxies';
import { CommonModule } from '@angular/common';
import { ReplaceTagDirective } from './directives/angular-component-lib/ReplaceTagDirective';

defineCustomElements(window);

const DECLARATIONS = [
  ReplaceTagDirective,

  // proxies
  MyComponent,
  MyButton,
  MyCheckbox,
  MyInput,
  MyPopover,
  MyRadio,
  MyRadioGroup,
  MyRange,

  // Value Accessors
  BooleanValueAccessor,
  NumericValueAccessor,
  RadioValueAccessor,
  SelectValueAccessor,
  TextValueAccessor,
];

@NgModule({
  declarations: DECLARATIONS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: DECLARATIONS,
  imports: [CommonModule],
  providers: [],
})
export class ComponentLibraryModule {}
