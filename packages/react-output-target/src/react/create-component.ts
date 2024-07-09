import type { EventName, Options } from '@lit/react';
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
