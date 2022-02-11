
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
