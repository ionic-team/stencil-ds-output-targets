
/**
 * Creates the markup for an Angular module for a single component (SCAM).
 * @param componentClassName The name of the component class.
 */
export function createComponentModuleClass(componentClassName: string) {
  return (
    `@NgModule({
  imports: [CommonModule],
  declarations: [${componentClassName}],
  exports: [${componentClassName}]
})
export class ${componentClassName}Module {}`
  );
}
