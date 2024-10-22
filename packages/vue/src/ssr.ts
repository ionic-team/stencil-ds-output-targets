import { defineComponent, useSlots, compile, createSSRApp, type SetupContext } from 'vue';
import { type LooseRequired } from '@vue/shared';

const LOG_PREFIX = '[vue-output-target]';

/**
 * these types are defined by a Stencil hydrate app so we have to copy the minimal types here
 */
interface RenderToStringOptions {
  fullDocument?: boolean;
  serializeShadowRoot?: boolean;
  prettyHtml?: boolean;
}
export type RenderToString = (html: string, options: RenderToStringOptions) => Promise<{ html: string | null }>;

interface StencilSSRComponentOptions {
  tagName: string;
  hydrateModule: Promise<{ renderToString: RenderToString }>;
  props?: Record<string, [any, string?]>;
}

/**
 * returns true if the value is a primitive, e.g. string, number, boolean
 * @param value - the value to check
 * @returns true if the value is a primitive, false otherwise
 */
function isPrimitive(value: any) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

export function defineStencilSSRComponent(options: StencilSSRComponentOptions) {
  return defineComponent<Record<string, any>, {}, string, {}>({
    async setup(props: LooseRequired<Readonly<{}> & Readonly<{}> & {}>, context: SetupContext) {
      /**
       * resolve light dom into a string
       */
      const slots = useSlots();
      let renderedLightDom = '';
      if (typeof slots.default === 'function') {
        const ssrLightDom = createSSRApp({ render: () => slots.default!() });
        const { renderToString: vueRenderToString } = await import('vue/server-renderer');
        renderedLightDom = await vueRenderToString(ssrLightDom, { context });
      }

      /**
       * compose element props into a string
       */
      let stringProps = '';
      for (const [key, value] of Object.entries(props)) {
        if (typeof value === 'undefined') {
          continue;
        }

        /**
         * Stencils metadata tells us which properties can be serialized
         */
        const propName = options.props?.[key][1];
        const propValue = isPrimitive(value)
          ? typeof value === 'boolean'
            ? /**
               * omit boolean properties that are false all together
               */
              value
              ? '"true"'
              : undefined
            : `"${value}"`
          : Array.isArray(value) && value.every(isPrimitive)
          ? JSON.stringify(value)
          : undefined;
        if (!propName || !propValue) {
          console.warn(
            `${LOG_PREFIX} ignore component property "${key}" for ${options.tagName} ` +
              "- property type is unknown or not a primitive and can't be serialized"
          );
          continue;
        }

        stringProps += ` ${propName}=${propValue}`;
      }

      /**
       * transform component into Declarative Shadow DOM by lazy loading the hydrate module
       */
      const toSerialize = `<${options.tagName}${stringProps}>${renderedLightDom}</${options.tagName}>`;
      const { renderToString } = await options.hydrateModule;
      const { html } = await renderToString(toSerialize, {
        fullDocument: false,
        serializeShadowRoot: true,
      });

      if (!html) {
        throw new Error(`'${options.tagName}' component did not render anything.`);
      }

      return compile(
        html
          /**
           * by default Vue strips out the <style> tag, so this little trick
           * makes it work by wrapping it in a component tag
           */
          .replace('<style>', `<component :is="'style'">`)
          .replace('</style>', '</component>'),
        {
          comments: true,
          isCustomElement: (tag) => tag === options.tagName,
        }
      );
    },
    props: Object.entries(options.props || {}).reduce((acc, [key, value]) => {
      acc[key] = value[0];
      return acc;
    }, {} as Record<string, Function | Object | Number | String>),
    /**
     * the template tags can be arbitrary as they will be replaced with above compiled template
     */
    template: '<div></div>',
  });
}
