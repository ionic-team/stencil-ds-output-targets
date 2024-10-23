import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styleToCss from 'style-object-to-css-string';
import type { EventName, ReactWebComponent, WebComponentProps } from '@lit/react';

import { possibleStandardNames } from './constants';

const LOG_PREFIX = '[react-output-target]';

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
  properties: Record<string, string>;
  renderToString: RenderToString;
}

type StencilProps<I extends HTMLElement> = WebComponentProps<I>;

/**
 * returns true if the value is a primitive, e.g. string, number, boolean
 * @param value - the value to check
 * @returns true if the value is a primitive, false otherwise
 */
function isPrimitive(value: any) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

/**
 * Transform a React component into a Stencil component for server side rendering. This logic is executed
 * by a React framework e.g. Next.js in an Node.js environment. The function will:
 *
 *   - serialize the component (including the Light DOM) into a string (see `toSerializeWithChildren`)
 *   - transform the string with the Stencil component into a Declarative Shadow DOM component
 *   - parse the declarative shadow DOM component back into a React component
 *   - return the React component
 *
 * Note: this code should only be loaded on the server side, as it uses heavy Node.js dependencies,
 * e.g. `react-dom/server`, `html-react-parser` as well as the hydrate module, that when loaded on
 * the client side would increase the bundle size.
 */
export const createComponentForServerSideRendering = <I extends HTMLElement, E extends EventNames = {}>(
  options: CreateComponentForServerSideRenderingOptions
) => {
  return (async ({ children, ...props }: StencilProps<I> = {}) => {
    /**
     * ensure we only run on server
     */
    if (!('process' in globalThis) || typeof window !== 'undefined') {
      throw new Error('`createComponentForServerSideRendering` can only be run on the server');
    }

    /**
     * compose element props into a string
     */
    let stringProps = '';
    for (const [key, value] of Object.entries(props)) {
      let propValue = isPrimitive(value) ? `"${value}"` : undefined;

      /**
       * parse the style object into a string
       */
      if (key === 'style' && typeof value === 'object') {
        propValue = `"${styleToCss(value).replaceAll('\n', ' ')}"`;
      }

      if (!propValue) {
        continue;
      }

      const propName =
        possibleStandardNames[key as keyof typeof possibleStandardNames] || options.properties[key] || key;
      stringProps += ` ${propName}=${propValue}`;
    }

    /**
     * Attempt to serialize the components light DOM as it may have an impact on how the Stencil
     * component is being serialized. For example a Stencil component may render certain elements
     * if its light DOM contains other elements.
     */
    let serializedChildren = '';
    const toSerialize = `<${options.tagName}${stringProps} suppressHydrationWarning="true">`;
    try {
      const awaitedChildren = await resolveComponentTypes(children);
      serializedChildren = ReactDOMServer.renderToString(awaitedChildren);
    } catch (err: unknown) {
      /**
       * if rendering the light DOM fails, we log a warning and continue to render the component
       */
      const error = err instanceof Error ? err : new Error('Unknown error');
      console.warn(
        `${LOG_PREFIX} Failed to serialize light DOM for ${toSerialize.slice(0, -1)} />: ${
          error.message
        } - this may impact the hydration of the component`
      );
    }

    const toSerializeWithChildren = `${toSerialize}${serializedChildren}</${options.tagName}>`;

    /**
     * first render the component with `prettyHtml` flag so it makes it easier to
     * access the inner content of the component.
     */
    const { html } = await options.renderToString(toSerializeWithChildren, {
      fullDocument: false,
      serializeShadowRoot: true,
      prettyHtml: true,
    });

    if (!html) {
      throw new Error('No HTML returned from renderToString');
    }

    /**
     * cut out the inner content of the component
     */
    const serializedComponentByLine = html.split('\n');
    const hydrationComment = '<!--r.1-->';
    const isShadowComponent = serializedComponentByLine[1].includes('shadowrootmode="open"');
    let templateContent: undefined | string = undefined;
    if (isShadowComponent) {
      const templateEndTag = '  </template>';
      templateContent = serializedComponentByLine
        .slice(2, serializedComponentByLine.indexOf(templateEndTag))
        .join('\n')
        .trim();
    }

    /**
     * `html-react-parser` is a Node.js dependency so we should make sure to only import it when
     * run on the server and when needed.
     */
    const { default: parse } = await import('html-react-parser');

    /**
     * Parse the string back into a React component
     */
    const StencilElement = () =>
      parse(html, {
        transform(reactNode, domNode) {
          /**
           * only render the component we have been serializing before
           */
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
              const { children, ...customProps } = props || {};
              const __html = serializedComponentByLine
                /**
                 * remove the components outer tags as we want to set the inner content only
                 */
                .slice(1, -1)
                /**
                 * bring the array back to a string
                 */
                .join('\n')
                .trim()
                /**
                 * remove any whitespace between tags that may cause hydration errors
                 */
                .replace(/(?<=>)\s+(?=<)/g, '');

              return (
                <CustomTag {...customProps} suppressHydrationWarning={true} dangerouslySetInnerHTML={{ __html }} />
              );
            }

            /**
             * return original component with given props and `suppressHydrationWarning` flag and
             * set the template content based on our serialized Stencil component.
             */
            return (
              <CustomTag {...props} suppressHydrationWarning>
                <template
                  // @ts-expect-error
                  shadowrootmode="open"
                  suppressHydrationWarning={true}
                  dangerouslySetInnerHTML={{ __html: hydrationComment + templateContent }}
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

/**
 * Resolve the component types for server side rendering.
 *
 * It walks through all component childs and resolves them, e.g. call `createComponentForServerSideRendering` to
 * create a React component which we can pass into `ReactDOMServer.renderToString`. This enables us to include
 * the Light DOM of a component as part of Stencils serialization process.
 *
 * @param children - the children to resolve
 * @returns the resolved children
 */
async function resolveComponentTypes<I extends HTMLElement>(children: React.ReactNode): Promise<React.ReactNode> {
  if (typeof children === 'undefined') {
    return;
  }

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
            : await resolveComponentTypes(child.props.children),
      };

      let type = typeof child.type === 'function' ? await child.type(child.props) : child.type;
      if (type._payload && 'then' in type._payload) {
        type = {
          ...type,
          _payload: await type._payload,
        };
      }

      if (typeof type?._payload === 'function') {
        type = {
          ...type,
          $$typeof: Symbol('react.element'),
          _payload: await type._payload(child.props),
        };

        if (typeof type._payload.type === 'function') {
          return type._payload.type(child.props);
        }
      }

      const newChild = {
        ...child,
        type,
        props: newProps,
      };

      return newChild;
    })
  ) as Promise<React.ReactNode>;
}
