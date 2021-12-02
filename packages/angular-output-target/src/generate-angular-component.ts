import { dashToPascalCase, normalizePath } from './utils';
import type { ComponentCompilerMeta } from '@stencil/core/internal';

export const createComponentDefinition = (
  componentCorePackage: string,
  distTypesDir: string,
  rootDir: string,
  includeImportCustomElements: boolean = false,
  customElementsDir: string = 'components'
) => (cmpMeta: ComponentCompilerMeta) => {
  // Collect component meta
  const inputs = [
    ...cmpMeta.properties.filter((prop) => !prop.internal).map((prop) => prop.name),
    ...cmpMeta.virtualProperties.map((prop) => prop.name),
  ].sort();
  const outputs = cmpMeta.events.filter((ev) => !ev.internal).map((prop) => prop);
  const methods = cmpMeta.methods.filter((method) => !method.internal).map((prop) => prop.name);

  // Process meta
  const hasOutputs = outputs.length > 0;

  // Generate Angular @Directive
  const directiveOpts = [
    `selector: \'${cmpMeta.tagName}\'`,
    `changeDetection: ChangeDetectionStrategy.OnPush`,
    `template: '<ng-content></ng-content>'`,
  ];
  if (inputs.length > 0) {
    directiveOpts.push(`inputs: ['${inputs.join(`', '`)}']`);
  }

  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

  const outputsInterface: Set<string> = new Set();
  const outputReferenceRemap: { [p: string]: string } = {};

  outputs.forEach((output) => {
    Object.entries(output.complexType.references).forEach(([reference, refObject]) => {
      // Add import line for each local/import reference, and add new mapping name.
      // `outputReferenceRemap` should be updated only if the import interface is set in outputsInterface,
      // this will prevent global types to be remapped.
      const remappedReference = `I${cmpMeta.componentClassName}${reference}`;
      if (refObject.location === 'local' || refObject.location === 'import') {
        outputReferenceRemap[reference] = remappedReference;
        let importLocation: string = componentCorePackage;
        if (componentCorePackage !== undefined) {
          const dirPath = includeImportCustomElements ? `/${customElementsDir || 'components'}` : '';
          importLocation = `${normalizePath(componentCorePackage)}${dirPath}`;
        }
        outputsInterface.add(`import type { ${reference} as ${remappedReference} } from '${importLocation}';`);
      }
    });
  });

  const componentEvents: string[] = [
    '' // Empty first line
  ];

  // Generate outputs
  outputs.forEach((output, index) => {
    componentEvents.push(
`  /**
   * ${output.docs.text} ${output.docs.tags.map((tag) => `@${tag.name} ${tag.text}`)}
   */`);
    /**
     * The original attribute contains the original type defined by the devs.
     * This regexp normalizes the reference, by removing linebreaks,
     * replacing consecutive spaces with a single space, and adding a single space after commas.
     **/

    const outputTypeRemapped = Object.entries(outputReferenceRemap).reduce((type, [src, dst]) => {
      return type
        .replace(new RegExp(`^${src}$`, 'g'), `${dst}`)
        .replace(
          new RegExp(`([^\\w])${src}([^\\w])`, 'g'),
          (v, p1, p2) => [p1, dst, p2].join(''),
        );
    }, output.complexType.original
      .replace(/\n/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/,\s*/g, ', '));
    componentEvents.push(`  ${output.name}: EventEmitter<CustomEvent<${outputTypeRemapped.trim()}>>;`);

    if (index === outputs.length - 1) {
      // Empty line to push end `}` to new line
      componentEvents.push('\n');
    }
  });

  const lines = [
    '', // Empty first line
    `${[...outputsInterface].join('\n')}
export declare interface ${tagNameAsPascal} extends Components.${tagNameAsPascal} {${componentEvents.length > 1 ? componentEvents.join('\n') : ''}}

${getProxyCmp(
  cmpMeta.tagName,
  includeImportCustomElements,
  inputs,
  methods
)}
@Component({
  ${directiveOpts.join(',\n  ')}
})
export class ${tagNameAsPascal} {`,
  ];

  lines.push('  protected el: HTMLElement;');
  lines.push(`  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;`);
  if (hasOutputs) {
    lines.push(
      `    proxyOutputs(this, this.el, ['${outputs.map((output) => output.name).join(`', '`)}']);`,
    );
  }
  lines.push(`  }`);
  lines.push(`}`);

  return lines.join('\n');
};

function getProxyCmp(tagName: string, includeCustomElement: boolean, inputs: string[], methods: string[]): string {
  const hasInputs = inputs.length > 0;
  const hasMethods = methods.length > 0;

  const proxMeta: string[] = [
    `customElement: ${includeCustomElement ? 'define' + dashToPascalCase(tagName) : 'undefined'}`
  ];

  if (hasInputs) proxMeta.push(`inputs: ['${inputs.join(`', '`)}']`);
  if (hasMethods) proxMeta.push(`methods: ['${methods.join(`', '`)}']`);

  return `@ProxyCmp({\n  ${proxMeta.join(',\n  ')}\n})`;
}
