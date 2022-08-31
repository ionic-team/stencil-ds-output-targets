import type { Components, JSX } from "../dist/types/interfaces";

interface MyButton extends Components.MyButton, HTMLElement {}
export const MyButton: {
  prototype: MyButton;
  new (): MyButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
