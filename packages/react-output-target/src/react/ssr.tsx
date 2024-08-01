import React from 'react';
import type { EventName, ReactWebComponent, WebComponentProps } from '@lit/react';

// A key value map matching React prop names to event names.
type EventNames = Record<string, EventName | string>;

/**
 * these types are defined by a Stencil hydrate app so we have to copy the minimal types here
 */
interface RenderToStringOptions {
  fullDocument?: boolean;
  serializeShadowRoot?: boolean;
  prettyHtml?: boolean;
}
export type RenderToString = (html: string, options: RenderToStringOptions) => Promise<{ html: string | null }>;
interface CreateComponentForServerSideRenderingOptions {
  tagName: string;
  renderToString: RenderToString;
}

type StencilProps<I extends HTMLElement> = WebComponentProps<I> & {
  __resolveTagName?: boolean;
};

/**
 * transform a React component into a Stencil component for server side rendering
 *
 * Note: this code should only be loaded on the server side, as it uses heavy Node.js dependencies
 * that when loaded on the client side would increase the bundle size.
 */
export const createComponentForServerSideRendering = <I extends HTMLElement, E extends EventNames = {}>(
  options: CreateComponentForServerSideRenderingOptions
) => {
  return (async ({ children, ...props }: StencilProps<I> = {}) => {
    /**
     * if `__resolveTagName` is set we should return the tag name as we are shallow parsing the light dom
     * of a Stencil component via `ReactDOMServer.renderToString`
     */
    if (props.__resolveTagName) {
      return options.tagName;
    }

    /**
     * ensure we only run on server
     */
    if (!('process' in globalThis) || typeof window !== 'undefined') {
      throw new Error('`createComponentForServerSideRendering` can only be run on the server');
    }

    let stringProps = '';
    for (const [key, value] of Object.entries(props)) {
      if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
        continue;
      }
      stringProps += ` ${key}="${value}"`;
    }

    const toSerialize = `<${options.tagName}${stringProps}></${options.tagName}>`;

    /**
     * first render the component with pretty HTML so it makes it easier to
     */
    const { html: captureTags } = await options.renderToString(toSerialize, {
      fullDocument: false,
      serializeShadowRoot: true,
      prettyHtml: true,
    });

    /**
     * then, cut out the outer html tag, which will always be the first and last line of the `captureTags` string, e.g.
     * ```html
     * <my-component ...props>
     *   ...
     * </my-component>
     * ```
     */
    const startTag = captureTags?.split('\n')[0] || '';
    const endTag = captureTags?.split('\n').slice(-1)[0] || '';

    /**
     * re-render the component without formatting, as it causes hydration issues - we can
     * now use `startTag` and `endTag` to cut out the inner content of the component
     */
    const { html } = await options.renderToString(toSerialize, {
      fullDocument: false,
      serializeShadowRoot: true,
    });
    if (!html) {
      throw new Error('No HTML returned from renderToString');
    }

    /**
     * cut out the inner content of the component
     */
    const templateStartTag = '<template shadowrootmode="open">';
    const templateEndTag = '</template>';
    const hydrationComment = '<!--r.1-->';
    const isShadowComponent = html.slice(startTag.length, -endTag
      .length).startsWith(templateStartTag);
    const __html = isShadowComponent
      ? html
          .slice(startTag.length, -endTag.length)
          .slice(templateStartTag.length, -(templateEndTag + hydrationComment).length)
      : html.slice(startTag.length, -endTag.length);

    /**
     * `html-react-parser` is a Node.js dependency so we should make sure to only import it when run on the server
     */
    const { default: parse } = await import('html-react-parser');

    /**
     * parse the string into a React component
     */
    const StencilElement = () =>
      parse(html, {
        transform(reactNode, domNode) {
          if ('name' in domNode && domNode.name === options.tagName) {
            const props = (reactNode as any).props;
            /**
             * remove the outer tag (e.g. `options.tagName`) so we only have the inner content
             */
            const CustomTag = `${options.tagName}`;

            /**
             * if the component is not a shadow component we can render it with the light DOM only
             */
            if (!isShadowComponent) {
              return <CustomTag {...props}>{children}</CustomTag>;
            }

            return (
              <CustomTag {...props}>
                <template
                  // @ts-expect-error
                  shadowrootmode="open"
                  dangerouslySetInnerHTML={{ __html: hydrationComment + __html }}
                ></template>
                {children}
              </CustomTag>
            );
          }

          return;
        },
      });

    return <StencilElement />;
  }) as unknown as ReactWebComponent<I, E>;
};
