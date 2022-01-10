import { JSX, PropsWithChildren } from 'solid-js';

export interface HTMLStencilElement extends HTMLElement {
  componentOnReady(): Promise<this>;
}

export function createSolidComponent<PropType, ElementType extends HTMLStencilElement>(
  tag: string,
) {
  return (props: PropsWithChildren<PropType & JSX.HTMLAttributes<ElementType>>): ElementType => {
    const node = document.createElement(tag);
    for (const key in props) {
      if (key === 'children') {
        const children = Array.isArray(props[key]) ? props[key] : [props[key]];
        (children as any[]).forEach((child) => {
          if (child instanceof HTMLElement) {
            node.appendChild(child);
          } else {
            node.innerHTML = child;
          }
        });
      } else if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (
          typeof props[key] === 'string' ||
          typeof props[key] === 'number' ||
          typeof props[key] === 'boolean'
        ) {
          node.setAttribute(key, props[key]);
        } else {
          (node as Record<string, any>)[key] = (props as Record<string, any>)[key];
        }
      }
    }
    return node as ElementType;
  };
}
