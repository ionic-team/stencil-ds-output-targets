import { Component } from "@angular/core";

import { ComponentLibraryModule } from "src/directives/component-library.module";

@Component({
  selector: 'my-button-example',
  template: `<my-button>Test</my-button>`,
  standalone: true,
  imports: [ComponentLibraryModule]
})
export class MyButtonComponent { }
