import { NgModule } from "@angular/core";
import { DIRECTIVES } from "./proxies-array";

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES]
})
export class ComponentLibraryModule { }
