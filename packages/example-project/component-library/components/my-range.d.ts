import type { Components, JSX } from "../dist/types/interfaces";

interface MyRange extends Components.MyRange, HTMLElement {}
export const MyRange: {
  prototype: MyRange;
  new (): MyRange;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
