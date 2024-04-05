import { createComponent } from './create-component';

import { vi, describe, it, expect } from 'vitest';

import React from 'react';

describe('createComponent', () => {

  it('should call defineCustomElement if it is defined', () => {
    const defineCustomElement = vi.fn();

    createComponent({
      defineCustomElement,
      tagName: 'my-component',
      elementClass: class Foo { } as any,
      react: React,
      events: {},
      displayName: 'MyComponent'
    });

    expect(defineCustomElement).toHaveBeenCalled();
  });

});
