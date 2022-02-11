import { ComponentDecorator } from "../types";

/**
 * Creates the markup for an Angular component decorator.
 */
export function createComponentDecorator(decorator: ComponentDecorator) {
  const { selector, template, changeDetection, inputs } = decorator;

  const inputsStr = inputs.length > 0 ? `,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [${inputs.map(input => `'${input}'`).join(', ').trim()}]` : '';

  return (
    `@Component({
  selector: '${selector}',
  template: '${template}',
  changeDetection: ${changeDetection}${inputsStr}
})`
  );
}
