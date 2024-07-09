import React from 'react';
import type { EventName, Options, ReactWebComponent } from '@lit/react';
import { createComponent as createComponentWrapper } from '@lit/react';

// A key value map matching React prop names to event names.
type EventNames = Record<string, EventName | string>;

/**
 * Defines a custom element and creates a React component.
 * @public
 */
export const createComponent = <I extends HTMLElement, E extends EventNames = {}>({
  defineCustomElement,
  ...options
}: Options<I, E> & { defineCustomElement: () => void }) => {
  if (typeof defineCustomElement !== 'undefined') {
    defineCustomElement();
  }
  return createComponentWrapper<I, E>(options);
};

/**
 * these types are defined by a Stencil hydrate app so we have to copy the minimal types here
 */
interface RenderToStringOptions {
  fullDocument?: boolean;
  serializeShadowRoot?: boolean;
  prettyHtml?: boolean;
}
type RenderToString = (html: string, options: RenderToStringOptions) => Promise<{ html: string | null }>;
interface CreateComponentForServerSideRenderingOptions {
  tagName: string;
  renderToString: RenderToString;
}

export const createComponentForServerSideRendering = <I extends HTMLElement, E extends EventNames = {}>(
  options: CreateComponentForServerSideRenderingOptions
) => {
  return (async ({ children, ...props }: React.PropsWithChildren<{}>) => {
    /**
     * ensure we only run on server
     */
    if (!('process' in globalThis)) {
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

    /**
     * ToDo(Christian): better serialize children, e.g. this will fail if children are not strings
     */
    const toSerialize = `<${options.tagName}${stringProps}>${children || ''}</${options.tagName}>`;
    const { html } = await options.renderToString(toSerialize, {
      fullDocument: false,
      serializeShadowRoot: true,
      prettyHtml: true,
    });

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
            const __html = html.split('\n').slice(1, -1).join('\n');
            const CustomTag = `${options.tagName}`;
            return <CustomTag {...props} dangerouslySetInnerHTML={{ __html }} />;
          }

          return;
        },
      });

    // @ts-expect-error React versions may differ
    return <StencilElement />;
  }) as unknown as ReactWebComponent<I, E>;
};
