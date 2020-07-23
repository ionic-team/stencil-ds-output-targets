import { FunctionalComponent, h } from 'vue';

export const defineContainer = <Props extends object>(name: string, componentProps: string[], modelProp?: string) => {
  const Container: FunctionalComponent<Props> = (props, { slots }) => {
    const finalProps = props;

    if (modelProp) {
      finalProps = {
        ...props,
        [modelProp]: props.hasOwnProperty('modelValue') ? modelValue : (props as any)[modelProp],

      }
    }
    return h(
      name,
      finalProps,
      slots.default && slots.default()
    );
  }

  Container.displayName = name;
  Container.props = componentProps;
  if (modelProp) {
    Containers.emits = ['update:modelValue'];
  }

  return Container;
};
