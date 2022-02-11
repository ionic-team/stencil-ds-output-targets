import { dashToPascalCase } from "../../utils";
import { ProxyModuleVariableName } from "../constants/component.const";

export function createModuleBarrelConst(componentTagNames: string[]) {
  if (componentTagNames.length === 0) {
    return `export const MODULES = [];`;
  }
  return (
    `export const MODULES = [
  ${componentTagNames.map(c => `${ProxyModuleVariableName}.${dashToPascalCase(c)}Module`).join(',\n  ')}
];`
  );
}
