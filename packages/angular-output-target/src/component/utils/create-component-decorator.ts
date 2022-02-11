import { ComponentDecorator } from "../types";

export function createComponentDecorator(decorator: ComponentDecorator) {
  const { selector, template, changeDetection, inputs } = decorator;
  return (
    `@Component({
  selector: '${selector}',
  template: '${template}',
  changeDetection: ${changeDetection},
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [${inputs.map(input => `'${input}'`).join(', ').trim()}]
})`
  );
}
