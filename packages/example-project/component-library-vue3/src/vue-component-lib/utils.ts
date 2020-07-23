import { FunctionalComponent, h } from 'vue';

export interface InputProps extends Object {
  modelValue: string | boolean;
}

export const defineContainer = <Props extends object>(name: string, componentProps: string[], modelProp?: string) => {
  const Container: FunctionalComponent<Props & InputProps> = (props, { slots }) => {
    const { modelValue, ...restOfProps } = props;
    const finalProps = (modelProp) ? (
      {
        ...restOfProps,
        [modelProp]: props.hasOwnProperty('modelValue') ? modelValue : (props as any)[modelProp],
      }
    ) : restOfProps;

    console.log('processing',name,modelProp,finalProps);

    return h(
      name,
      finalProps,
      slots.default && slots.default()
    );
  }

  Container.displayName = name;
  Container.props = componentProps;
  if (modelProp) {
    Container.emits = ['update:modelValue'];
  }

  return Container;
};
