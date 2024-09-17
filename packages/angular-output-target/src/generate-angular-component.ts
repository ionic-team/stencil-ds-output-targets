import type { CompilerJsDoc, ComponentCompilerEvent } from '@stencil/core/internal';

import { createComponentEventTypeImports, dashToPascalCase, formatToQuotedList } from './utils';
import type { OutputType } from './types';

/**
 * Creates an Angular component declaration from formatted Stencil compiler metadata.
 *
 * @param tagName The tag name of the component.
 * @param inputs The inputs of the Stencil component (e.g. ['myInput']).
 * @param outputs The outputs/events of the Stencil component. (e.g. ['myOutput']).
 * @param methods The methods of the Stencil component. (e.g. ['myMethod']).
 * @param includeImportCustomElements Whether to define the component as a custom element.
 * @param standalone Whether to define the component as a standalone component.
 * @returns The component declaration as a string.
 */
export const createAngularComponentDefinition = (
  tagName: string,
  inputs: readonly string[],
  outputs: readonly string[],
  methods: readonly string[],
  includeImportCustomElements = false,
  standalone = false
) => {
  const tagNameAsPascal = dashToPascalCase(tagName);

  const hasInputs = inputs.length > 0;
  const hasOutputs = outputs.length > 0;
  const hasMethods = methods.length > 0;

  // Formats the input strings into comma separated, single quoted values.
  const formattedInputs = formatToQuotedList(inputs);
  // Formats the output strings into comma separated, single quoted values.
  const formattedOutputs = formatToQuotedList(outputs);
  // Formats the method strings into comma separated, single quoted values.
  const formattedMethods = formatToQuotedList(methods);

  const proxyCmpOptions = [];

  if (includeImportCustomElements) {
    const defineCustomElementFn = `define${tagNameAsPascal}`;

    proxyCmpOptions.push(`\n  defineCustomElementFn: ${defineCustomElementFn}`);
  }

  if (hasInputs) {
    proxyCmpOptions.push(`\n  inputs: [${formattedInputs}]`);
  }

  if (hasMethods) {
    proxyCmpOptions.push(`\n  methods: [${formattedMethods}]`);
  }

  let standaloneOption = '';

  if (standalone && includeImportCustomElements) {
    standaloneOption = `\n  standalone: true`;
  }

  /**
   * Notes on the generated output:
   * - We disable @angular-eslint/no-inputs-metadata-property, so that
   * Angular does not complain about the inputs property. The output target
   * uses the inputs property to define the inputs of the component instead of
   * having to use the @Input decorator (and manually define the type and default value).
   */
  const output = `@ProxyCmp({${proxyCmpOptions.join(',')}\n})
@Component({
  selector: '${tagName}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [${formattedInputs}],${standaloneOption}
})
export class ${tagNameAsPascal} {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;${
      hasOutputs
        ? `
    proxyOutputs(this, this.el, [${formattedOutputs}]);`
        : ''
    }
  }
}`;

  return output;
};

/**
 * Sanitizes and formats the component event type.
 * @param componentClassName The class name of the component (e.g. 'MyComponent')
 * @param event The Stencil component event.
 * @returns The sanitized event type as a string.
 */
const formatOutputType = (componentClassName: string, event: ComponentCompilerEvent) => {
  const prefix = `I${componentClassName}`;
  /**
   * The original attribute contains the original type defined by the devs.
   * This regexp normalizes the reference, by removing linebreaks,
   * replacing consecutive spaces with a single space, and adding a single space after commas.
   */
  return Object.entries(event.complexType.references)
    .filter(([_, refObject]) => refObject.location === 'local' || refObject.location === 'import')
    .reduce(
      (type, [src, dst]) => {
        let renamedType = type;
        if (!type.startsWith(prefix)) {
          if (type.startsWith('{') && type.endsWith('}')) {
            /**
             * If the type starts with { and ends with }, it is an inline type.
             * For example, `{ a: string }`.
             * We don't need to rename these types, so we return the original type.
             */
            renamedType = type;
          } else {
            /**
             * If the type does not start with { and end with }, it is a reference type.
             * For example, `MyType`.
             * We need to rename these types, so we prepend the prefix.
             */
            renamedType = `I${componentClassName}${type}`;
          }
        }

        return (
          renamedType
            .replace(new RegExp(`^${src}$`, 'g'), `${dst}`)
            // Capture all instances of the `src` field surrounded by non-word characters on each side and join them.
            .replace(new RegExp(`([^\\w])${src}([^\\w])`, 'g'), (v, p1, p2) => {
              if (dst?.location === 'import') {
                /**
                 * Replaces a complex type reference within a generic type.
                 * For example, remapping a type like `EventEmitter<CustomEvent<MyEvent<T>>>` to
                 * `EventEmitter<CustomEvent<IMyComponentMyEvent<IMyComponentT>>>`.
                 */
                return [p1, `I${componentClassName}${v.substring(1, v.length - 1)}`, p2].join('');
              }
              return [p1, dst, p2].join('');
            })
        );
      },
      event.complexType.original
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/,\s*/g, ', ')
    );
};

/**
 * Creates a formatted comment block based on the JS doc comment.
 * @param doc The compiler jsdoc.
 * @returns The formatted comment block as a string.
 */
const createDocComment = (doc: CompilerJsDoc) => {
  if (doc.text.trim().length === 0 && doc.tags.length === 0) {
    return '';
  }
  return `/**
   * ${doc.text}${doc.tags.length > 0 ? ' ' : ''}${doc.tags.map((tag) => `@${tag.name} ${tag.text}`)}
   */`;
};

/**
 * Creates the component interface type definition.
 * @param outputType The output type.
 * @param tagNameAsPascal The tag name as PascalCase.
 * @param events The events to generate the interface properties for.
 * @param componentCorePackage The component core package.
 * @param customElementsDir The custom elements directory.
 * @returns The component interface type definition as a string.
 */
export const createComponentTypeDefinition = (
  outputType: OutputType,
  tagNameAsPascal: string,
  events: readonly ComponentCompilerEvent[],
  componentCorePackage: string,
  customElementsDir?: string
) => {
  const publicEvents = events.filter((ev) => !ev.internal);

  const eventTypeImports = createComponentEventTypeImports(tagNameAsPascal, publicEvents, {
    componentCorePackage,
    customElementsDir,
    outputType,
  });
  const eventTypes = publicEvents.map((event) => {
    const comment = createDocComment(event.docs);
    let eventName = event.name;
    if (/[-/]/.test(event.name)) {
      // If an event name includes a dash or a forward slash, we need to wrap it in quotes.
      // https://github.com/ionic-team/stencil-ds-output-targets/issues/212
      eventName = `'${event.name}'`;
    }
    return `${comment.length > 0 ? `  ${comment}` : ''}
  ${eventName}: EventEmitter<CustomEvent<${formatOutputType(tagNameAsPascal, event)}>>;`;
  });
  const interfaceDeclaration = `export declare interface ${tagNameAsPascal} extends Components.${tagNameAsPascal} {`;

  const typeDefinition =
    (eventTypeImports.length > 0 ? `${eventTypeImports + '\n\n'}` : '') +
    `${interfaceDeclaration}${
      eventTypes.length === 0
        ? '}'
        : `
${eventTypes.join('\n')}
}`
    }`;

  return typeDefinition;
};
