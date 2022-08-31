import type { Components, JSX } from "../dist/types/interfaces";

interface MyRadio extends Components.MyRadio, HTMLElement {}
export const MyRadio: {
  prototype: MyRadio;
  new (): MyRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
