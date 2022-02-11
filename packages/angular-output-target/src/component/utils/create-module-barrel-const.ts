import { dashToPascalCase } from "../../utils";
import { ProxyVariableName } from "../constants/component.const";

export function createModuleBarrelConst(componentTagNames: string[]) {
  if (componentTagNames.length === 0) {
    return `export const MODULES = [];`;
  }
  return (
    `export const MODULES = [
  ${componentTagNames.map(c => `${ProxyVariableName}.${dashToPascalCase(c)}Module`).join(',\n  ')}
];`
  );
}
