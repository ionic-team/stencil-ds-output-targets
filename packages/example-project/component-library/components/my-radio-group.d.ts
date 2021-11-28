import type { Components, JSX } from "../dist/types/interfaces";

interface MyRadioGroup extends Components.MyRadioGroup, HTMLElement {}
export const MyRadioGroup: {
  prototype: MyRadioGroup;
  new (): MyRadioGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
