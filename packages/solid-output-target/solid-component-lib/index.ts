export function createComponent<Props>(tag: string) {
  return (props: Props) => {
    const node = document.createElement(tag);
    for (const key in props) {
      if (key === 'children' && Array.isArray(props[key])) {
        (node as Record<string, any>)[key].forEach((child: HTMLElement) => {
          node.appendChild(child);
        })
      } else if (Object.prototype.hasOwnProperty.call(props, key)) {
        (node as Record<string, any>)[key] = props[key];
      }
    }
    return node;
  };
}
