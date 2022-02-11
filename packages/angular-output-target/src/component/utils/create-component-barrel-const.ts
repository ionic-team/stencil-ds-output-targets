import { dashToPascalCase } from "../../utils";
import { ProxyVariableName } from "../constants/component.const";

export function createComponentBarrelConst(componentTagNames: string[]) {
  if (componentTagNames.length === 0) {
    return `export const COMPONENTS = [];`;
  }
  return (
    `export const COMPONENTS = [
  ${componentTagNames.map(c => `${ProxyVariableName}.${dashToPascalCase(c)}`).join(',\n  ')}
];`
  );
}
