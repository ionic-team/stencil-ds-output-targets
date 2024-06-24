import type { Components, JSX } from "../dist/types/interfaces";

interface MyPopover extends Components.MyPopover, HTMLElement {}
export const MyPopover: {
  prototype: MyPopover;
  new (): MyPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
