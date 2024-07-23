import React from 'react';
import ReactDOMServer from 'react-dom/server';
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
  return (async ({ children, ...props }: StencilProps<I>) => {
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
      throw new Error('createComponentForServerSideRendering can only be run on the server');
    }

    /**
     * `html-react-parser` is a Node.js dependency so we should make sure to only import it when run on the server
     */
    const { default: parse } = await import('html-react-parser');

    let stringProps = '';
    for (const [key, value] of Object.entries(props)) {
      if (
        key === 'children' ||
        (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean')
      ) {
        continue;
      }
      stringProps += ` ${key}="${value}"`;
    }

    const awaitedChildren = await resolveComponentTypes(children);
    const renderedChildren = ReactDOMServer.renderToString(awaitedChildren);
    const toSerialize = `<${options.tagName}${stringProps}>${renderedChildren}</${options.tagName}>`;

    const { html: captureTags } = await options.renderToString(toSerialize, {
      fullDocument: false,
      serializeShadowRoot: true,
      prettyHtml: true,
    });
    const startTag = captureTags?.split('\n')[0] || '';
    const endTag = captureTags?.split('\n').slice(-1)[0] || '';
    const { html } = await options.renderToString(toSerialize, {
      fullDocument: false,
      serializeShadowRoot: true,
    });
    const __html = html?.slice(startTag.length, -endTag.length);
    if (!html) {
      throw new Error('No HTML returned from renderToString');
    }

    const StencilElement = () =>
      parse(html, {
        transform(reactNode, domNode) {
          if ('name' in domNode && domNode.name === options.tagName) {
            const { children, ...props } = (reactNode as any).props;
            /**
             * remove the outer tag (e.g. `options.tagName`) so we only have the inner content
             */
            const CustomTag = `${options.tagName}`;
            return <CustomTag {...props} dangerouslySetInnerHTML={{ __html }} />;
          }

          return;
        },
      });

    return <StencilElement />;
  }) as unknown as ReactWebComponent<I, E>;
};

async function resolveComponentTypes<I extends HTMLElement>(children: React.ReactNode): Promise<React.ReactNode> {
  /**
   * if the children are a string we can return them as is, e.g.
   * `<div>Hello World</div>`
   */
  if (typeof children === 'string') {
    return children;
  }

  if (!children || !Array.isArray(children)) {
    return [];
  }

  return Promise.all(
    children.map(async (child): Promise<string | StencilProps<I>> => {
      if (typeof child === 'string') {
        return child;
      }

      const newProps = {
        ...child.props,
        children:
          typeof child.props.children === 'string'
            ? child.props.children
            : await resolveComponentTypes((child.props || {}).children),
      };

      const newChild = {
        ...child,
        type: typeof child.type === 'function' ? await child.type({ __resolveTagName: true }) : child.type,
        props: newProps,
      };

      return newChild;
    })
  ) as Promise<React.ReactNode>;
}
