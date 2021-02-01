/* eslint @typescript-eslint/no-explicit-any: "off" */
import { VNode, defineComponent, getCurrentInstance, h, inject, ref, Ref } from 'vue';

export interface InputProps extends Object {
  modelValue: string | boolean;
}

const UPDATE_VALUE_EVENT = 'update:modelValue';
const MODEL_VALUE = 'modelValue';
const ROUTER_LINK_VALUE = 'routerLink';
const NAV_MANAGER = 'navManager';
const ROUTER_PROP_REFIX = 'router';

interface NavManager<T = any> {
  navigate: (options: T) => void;
}

interface ComponentOptions {
  modelProp?: string;
  modelUpdateEvent?: string;
}

const getComponentClasses = (classes: unknown) => {
  return (classes as string)?.split(' ') || [];
};

const getElementClasses = (
  ref: Ref<HTMLElement | undefined>,
  componentClasses: Set<string>,
  defaultClasses: string[] = [],
) => {
  return [...Array.from(ref.value?.classList || []), ...defaultClasses].filter(
    (c: string, i, self) => !componentClasses.has(c) && self.indexOf(c) === i,
  );
};

/**
 * Create a callback to define a Vue component wrapper around a Web Component.
 *
 * @prop name - The component tag name (i.e. `ion-button`)
 * @prop componentProps - An array of properties on the
 * component. These usually match up with the @Prop definitions
 * in each component's TSX file.
 * @prop componentOptions - An object that defines additional
 * options for the component such as router or v-model
 * integrations.
 */
export const defineContainer = <Props>(
  name: string,
  componentProps: string[] = [],
  componentEvents: string[] = [],
  componentOptions: ComponentOptions = {},
) => {
  const { modelProp, modelUpdateEvent } = componentOptions;

  /**
   * Create a Vue component wrapper around a Web Component.
   * Note: The `props` here are not all properties on a component.
   * They refer to whatever properties are set on an instance of a component.
   */
  const Container = defineComponent<Props & InputProps>((props, { attrs, slots, emit }) => {
    let modelPropValue = (props as any)[modelProp as any];
    const containerRef = ref<HTMLElement>();
    const classes = new Set(getComponentClasses(attrs.class));
    const onVnodeBeforeMount = (vnode: VNode) => {
      // Add a listener to tell Vue to update the v-model
      if (vnode.el && modelUpdateEvent && modelProp) {
        vnode.el.addEventListener(modelUpdateEvent, (e: CustomEvent<any>) => {
          modelPropValue = (e?.target as any)[modelProp];
          emit(UPDATE_VALUE_EVENT, modelPropValue);

          /**
           * We need to emit the change event here
           * rather than on the web component to ensure
           * that any v-model bindings have been updated.
           * Otherwise, the developer will listen on the
           * native web component, but the v-model will
           * not have been updated yet.
           */
          let emittedValue = e.detail;
          if (e.detail?.value) {
            emittedValue = e.detail.value;
          }
          emit(modelUpdateEvent, emittedValue);
          e.stopImmediatePropagation();
        });
      }

      if (componentEvents && componentEvents.length > 0) {
        componentEvents
          .filter((e) => e !== modelUpdateEvent)
          .forEach((componentEvent) => {
            if (vnode.el) {
              vnode.el.addEventListener(componentEvent, (event: CustomEvent<any>) => {
                let emittedValue = event.detail;
                if (event.detail?.value) {
                  emittedValue = event.detail.value;
                }
                emit(componentEvent, emittedValue);
              });
            }
          });
      }
    };

    const currentInstance = getCurrentInstance();
    const hasRouter = currentInstance?.appContext?.provides[NAV_MANAGER];
    const navManager: NavManager | undefined = hasRouter ? inject(NAV_MANAGER) : undefined;
    const handleRouterLink = (ev: Event) => {
      const { routerLink } = props as any;
      if (!routerLink) return;

      const routerProps = Object.keys(props).filter((p) => p.startsWith(ROUTER_PROP_REFIX));

      if (navManager !== undefined) {
        const navigationPayload: any = { event: ev };
        routerProps.forEach((prop) => {
          navigationPayload[prop] = (props as any)[prop];
        });
        navManager.navigate(navigationPayload);
      } else {
        console.warn(
          'Tried to navigate, but no router was found. Make sure you have mounted Vue Router.',
        );
      }
    };

    return () => {
      getComponentClasses(attrs.class).forEach((value) => {
        classes.add(value);
      });

      const oldClick = (props as any).onClick;
      const handleClick = (ev: Event) => {
        if (oldClick !== undefined) {
          oldClick(ev);
        }
        if (!ev.defaultPrevented) {
          handleRouterLink(ev);
        }
      };

      let propsToAdd = {
        ...props,
        ref: containerRef,
        class: getElementClasses(containerRef, classes),
        onClick: handleClick,
        onVnodeBeforeMount: modelUpdateEvent ? onVnodeBeforeMount : undefined,
      };

      if (modelProp) {
        propsToAdd = {
          ...propsToAdd,
          [modelProp]: Object.prototype.hasOwnProperty.call(props, 'modelValue')
            ? props.modelValue
            : (props as any)[modelProp as any],
        };
      }

      return h(name, propsToAdd, slots.default && slots.default());
    };
  });

  Container.displayName = name;
  Container.emits = [...componentEvents];
  Container.props = [...componentProps, ROUTER_LINK_VALUE];
  if (modelProp) {
    Container.props.push(MODEL_VALUE);
    Container.emits = [UPDATE_VALUE_EVENT, modelUpdateEvent];
  }

  return Container;
};
