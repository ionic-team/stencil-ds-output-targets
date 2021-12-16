import { PropsWithChildren } from 'solid-js'

export function createSolidComponent<Props>(tag: string) {
  return (props: PropsWithChildren<Props>) => {
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
        (node as Record<string, any>)[key] = (props as Record<string, any>)[key];
      }
    }
    return node;
  };
}
