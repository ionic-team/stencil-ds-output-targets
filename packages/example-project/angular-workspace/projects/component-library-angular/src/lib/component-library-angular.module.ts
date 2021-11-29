import { NgModule } from '@angular/core';

import {
  MyButton,
  MyCheckbox,
  MyComponent,
  MyInput,
  MyPopover,
  MyRadio,
  MyRadioGroup,
  MyRange,
} from './stencil-generated/components';

@NgModule({
  declarations: [
    MyButton,
    MyCheckbox,
    MyComponent,
    MyInput,
    MyPopover,
    MyRadio,
    MyRadioGroup,
    MyRange,
  ],
  imports: [],
  exports: [MyButton, MyCheckbox, MyComponent, MyInput, MyPopover, MyRadio, MyRadioGroup, MyRange],
})
export class ComponentLibraryAngularModule {}
