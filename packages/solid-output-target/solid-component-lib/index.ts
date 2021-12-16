export function createComponent<Props>(tag: string) {
  return (props: Props) => {
    const node = document.createElement(tag);
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        (node as Record<string, any>)[key] = props[key];
      }
    }
    return node;
  };
}
