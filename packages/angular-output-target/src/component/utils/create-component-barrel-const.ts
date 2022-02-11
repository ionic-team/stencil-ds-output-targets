import { dashToPascalCase } from "../../utils";
import { ProxyComponentVariableName } from "../constants/component.const";

export function createComponentBarrelConst(componentTagNames: string[]) {
  if (componentTagNames.length === 0) {
    return `export const COMPONENTS = [];`;
  }
  return (
    `export const COMPONENTS = [
  ${componentTagNames.map(c => `${ProxyComponentVariableName}.${dashToPascalCase(c)}`).join(',\n  ')}
];`
  );
}
