import { defineComponent, useSlots, compile, createSSRApp } from 'vue';

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
  props?: Record<string, any>;
}

export function defineStencilSSRComponent(options: StencilSSRComponentOptions) {
  return defineComponent({
    async setup(props, context) {
      let stringProps = '';

      const slots = useSlots();
      let renderedLightDom = '';
      if (typeof slots.default === 'function') {
        const ssrLightDom = createSSRApp({ render: () => slots.default!() });
        const { renderToString: vueRenderToString } = await import('vue/server-renderer');
        renderedLightDom = await vueRenderToString(ssrLightDom, { context });
      }

      const { renderToString } = await options.hydrateModule;
      console.log('props', props);

      for (const [key, value] of Object.entries(props)) {
        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
          continue;
        }
        stringProps += ` ${key}="${value}"`;
      }
      const toSerialize = `<${options.tagName}${stringProps}>${renderedLightDom}</${options.tagName}>`;
      const { html } = await renderToString(toSerialize, {
        fullDocument: false,
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
    props: options.props || {},
    template: '<div></div>',
  });
}
