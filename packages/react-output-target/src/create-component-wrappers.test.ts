import { describe, it, expect } from 'vitest';
import { createComponentWrappers } from './create-component-wrappers';
import { dedent } from 'ts-dedent';
import { Project } from 'ts-morph';

describe('createComponentWrappers', () => {
  it('should generate a react component wrapper', async () => {
    const project = new Project({ useInMemoryFileSystem: true });
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
      project
    });

    const sourceFile = sourceFiles[0];

    expect(sourceFile.getFullText()).toEqual(dedent`
import { createComponent } from '@stencil-labs/react';
import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "my-package/dist/custom-elements/my-component.js";
import React from 'react';

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
    const project = new Project({ useInMemoryFileSystem: true });
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
      project
    });

    const sourceFile = sourceFiles[0];

    expect(sourceFile.getFullText()).toEqual(dedent`
import { createComponent } from '@stencil-labs/react';
import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "my-package/dist/custom-elements/my-component.js";
import React from 'react';

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

  it('should generate a react component with the use client directive', async () => {
    const project = new Project({ useInMemoryFileSystem: true });
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
      experimentalUseClient: true,
      project
    });

    const sourceFile = sourceFiles[0];

    expect(sourceFile.getFullText()).toEqual(dedent`
'use client';

import { createComponent } from '@stencil-labs/react';
import { MyComponent as MyComponentElement, defineCustomElement as defineMyComponent } from "my-package/dist/custom-elements/my-component.js";
import React from 'react';

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

  it('should not generate component wrappers for internal components', async () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFiles = await createComponentWrappers({
      components: [
        {
          tagName: 'my-component',
          internal: true,
        } as any,
      ],
      stencilPackageName: 'my-package',
      customElementsDir: 'dist/custom-elements',
      outDir: 'dist/my-output-path',
      esModules: false,
      project
    });

    expect(sourceFiles).toEqual([]);
  });

  it('should filter out excludedComponents', async () => {
    const project = new Project({ useInMemoryFileSystem: true });
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
      excludeComponents: ['my-component'],
      project
    });

    expect(sourceFiles).toEqual([]);
  });

});

