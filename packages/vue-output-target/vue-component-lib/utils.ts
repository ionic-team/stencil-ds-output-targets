import { FunctionalComponent, h } from 'vue';

const UPDATE_VALUE_EVENT = 'update:modelValue';
const MODEL_VALUE = 'modelValue';

interface InputProps extends Object {
  modelValue: string | boolean;
}

/**
 * Create a callback to define a Vue component wrapper around a Web Component.
 *
 * @prop name - The component tag name (i.e. `ion-button`)
 * @prop componentProps - An array of properties on the
 * component. These usually match up with the @Prop definitions
 * in each component's TSX file.
 * @prop modelProp - An optional string which refers to the
 * property that v-model should bind to. (i.e. v-model should
 * bind to the `value` prop for `ion-input`)
 * @prop modelUpdateEvent - An option string which refers to the
 * event that should cause v-model to update. (i.e. when the
 * `value` prop on `ion-input` changes, `ionChange` is emitted.)
 */
export const defineContainer = <Props extends object>(
  name: string,
  componentProps: string[],
  modelProp?: string,
  modelUpdateEvent?: string
) => {
  const Container = (props, opts) => createContainer(props, opts, modelProp, modelUpdateEvent);

  Container.displayName = name;
  Container.props = (modelProp) ? [...componentProps, MODEL_VALUE] : componentProps;
  Container.emits = (modelProp) ? [UPDATE_VALUE_EVENT] : [];

  return Container;
};

/**
 * Create a Vue component wrapper around a Web Component.
 * Note: The `props` here are not all properties on a component.
 * They refer to whatever properties are set on an instance of a component.
 */
const createContainer = (
  props,
  { slots, emit },
  modelProp?: string,
  modelUpdateEvent?: string
) => {

  // If using `v-model`, modelValue will be set,
  // otherwise it will be `undefined`.
  const { modelValue, ...restOfProps } = props;
  let finalProps = restOfProps;

  if (modelProp) {
    finalProps = {
      ...finalProps,
      [modelProp]: props.hasOwnProperty(MODEL_VALUE) ? modelValue : (props as any)[modelProp]
    }
  }

  if (modelUpdateEvent) {
    const onVnodeBeforeMount = (vnode: VNode) => {

      // Add a listener to tell Vue to update the v-model
      if (vnode.el) {
        vnode.el.addEventListener(modelUpdateEvent.toLowerCase(), (e: Event) => {
          emit(UPDATE_VALUE_EVENT, (e?.target as any)[modelProp]);
        });
      }
    };

    finalProps = {
      ...finalProps,
      onVnodeBeforeMount
    }
  }

  return h(
    name,
    finalProps,
    slots.default && slots.default()
  );
}
