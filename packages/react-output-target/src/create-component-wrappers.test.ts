import { describe, it, expect } from 'vitest';
import { createComponentWrappers } from './create-component-wrappers';
import { dedent } from 'ts-dedent';

describe('createComponentWrappers', () => {
  it('should generate a react component wrapper', async () => {
    const sourceFiles = await createComponentWrappers({
      components: [
        {
          tagName: 'my-component',
          componentClassName: 'MyComponent',
          events: [
            {
              originalName: 'my-event',
              name: 'myEvent',
              type: 'CustomEvent',
            },
          ],
        } as any,
      ],
      stencilPackageName: 'my-package',
      customElementsDir: 'dist/custom-elements',
      outDir: 'dist/my-output-path',
      esModules: false,
    });

    const sourceFile = sourceFiles[0];

    expect(sourceFile.getFullText()).toEqual(dedent`
import { defineCustomElement as defineMyComponent, MyComponent as MyComponentElement } from "my-package/dist/custom-elements/my-component.js";
import React from 'react';
import type { EventName } from './react-component-lib';
import { createComponent as createComponentWrapper, Options } from './react-component-lib';

const createComponent = <T extends HTMLElement, E extends Record<string, EventName | string>>({ defineCustomElement, ...options }: Options<T, E> & { defineCustomElement: () => void }) => {
    if (typeof defineCustomElement !== 'undefined') {
        defineCustomElement();
    }
    return createComponentWrapper<T, E>(options);
};

type MyComponentEvents = NonNullable<unknown>;

export const MyComponent = createComponent<MyComponentElement, MyComponentEvents>({
    tagName: 'my-component',
    elementClass: MyComponentElement,
    react: React,
    events: {} as MyComponentEvents,
    defineCustomElement: defineMyComponent
});

`);
  });

  it('should generate a react component wrapper with ES modules', async () => {
    const sourceFiles = await createComponentWrappers({
      components: [
        {
          tagName: 'my-component',
          componentClassName: 'MyComponent',
          events: [
            {
              originalName: 'my-event',
              name: 'myEvent',
              type: 'CustomEvent',
            },
          ],
        } as any,
      ],
      stencilPackageName: 'my-package',
      customElementsDir: 'dist/custom-elements',
      outDir: 'dist/my-output-path',
      esModules: true,
    });

    const sourceFile = sourceFiles[0];

    expect(sourceFile.getFullText()).toEqual(dedent`
import { defineCustomElement as defineMyComponent, MyComponent as MyComponentElement } from "my-package/dist/custom-elements/my-component.js";
import React from 'react';
import type { EventName } from './react-component-lib';
import { createComponent as createComponentWrapper, Options } from './react-component-lib';

const createComponent = <T extends HTMLElement, E extends Record<string, EventName | string>>({ defineCustomElement, ...options }: Options<T, E> & { defineCustomElement: () => void }) => {
    if (typeof defineCustomElement !== 'undefined') {
        defineCustomElement();
    }
    return createComponentWrapper<T, E>(options);
};

type MyComponentEvents = NonNullable<unknown>;

const MyComponent = createComponent<MyComponentElement, MyComponentEvents>({
    tagName: 'my-component',
    elementClass: MyComponentElement,
    react: React,
    events: {} as MyComponentEvents,
    defineCustomElement: defineMyComponent
});

export default MyComponent;

`);
  });
});
