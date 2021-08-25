import path from 'path';
import { dashToPascalCase, isRelativePath, normalizePath } from './utils';
import type { ComponentCompilerMeta } from '@stencil/core/internal';

export const createComponentDefinition = (
  componentCorePackage: string,
  distTypesDir: string,
  rootDir: string,
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
  if (outputs.length > 0) {
    directiveOpts.push(`outputs: ['${outputs.map((output) => output.name).join(`', '`)}']`);
  }

  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

  const typePath = path.parse(
    path.join(
      componentCorePackage,
      path.join(cmpMeta.sourceFilePath, '').replace(path.join(rootDir, 'src'), distTypesDir),
    ),
  );
  const importPath = normalizePath(path.join(typePath.dir, typePath.name));
  const outputsInterface: string[] = ['']; // Empty first line

  const outputReferenceRemap: { [p: string]: string } = {};
  outputs.forEach((output) => {
    Object.entries(output.complexType.references).forEach(([reference, refObject]) => {
      // Add import line for each local/import reference, and add new mapping name
      const remappedReference = `I${cmpMeta.componentClassName}${reference}`;
      if (refObject.location === 'local') {
        outputReferenceRemap[reference] = remappedReference;
        outputsInterface.push(`import { ${reference} as ${remappedReference} } from '${importPath}';`);
      } else if (refObject.location === 'import') {
        outputReferenceRemap[reference] = remappedReference;
        const interfacePath = normalizePath(
          isRelativePath(refObject.path!) ? path.join(typePath.dir, refObject.path!) : refObject.path!,
        );
        outputsInterface.push(`import { ${reference} as ${remappedReference} } from '${interfacePath}';`);
      }
    });
  });

  const lines = [
    `${outputsInterface.join('\n')}
export declare interface ${tagNameAsPascal} extends Components.${tagNameAsPascal} {}
${getProxyCmp(inputs, methods)}
@Component({
  ${directiveOpts.join(',\n  ')}
})
export class ${tagNameAsPascal} {`,
  ];

  // Generate outputs
  outputs.forEach((output) => {
    lines.push(
      `  /** ${output.docs.text} ${output.docs.tags.map((tag) => `@${tag.name} ${tag.text}`)}*/`,
    );
    // Regexp to replace output references with their remapped name
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
    lines.push(`  ${output.name}!: EventEmitter<CustomEvent<${outputTypeRemapped.trim()}>>;`);
  });

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

function getProxyCmp(inputs: string[], methods: string[]): string {
  const hasInputs = inputs.length > 0;
  const hasMethods = methods.length > 0;
  const proxMeta: string[] = [];

  if (!hasInputs && !hasMethods) {
    return '';
  }

  if (hasInputs) proxMeta.push(`inputs: ['${inputs.join(`', '`)}']`);
  if (hasMethods) proxMeta.push(`methods: ['${methods.join(`', '`)}']`);

  return `@ProxyCmp({\n  ${proxMeta.join(',\n  ')}\n})`;
}
