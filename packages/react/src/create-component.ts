import type { EventName, Options } from '@lit/react';
import { createComponent as createComponentWrapper } from '@lit/react';

export const createComponent = <T extends HTMLElement, E extends Record<string, EventName | string>>({ defineCustomElement, ...options }: Options<T, E> & { defineCustomElement: () => void }) => {
  if (typeof defineCustomElement !== 'undefined') {
    defineCustomElement();
  }
  return createComponentWrapper<T, E>(options);
};
