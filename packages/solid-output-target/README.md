# @stencil/solid-output-target

This is an output plugin for stencil.

## Runtime Config Options

If you want to use custom tag names, you can use the `setTagNameTransformer` function to define a function which transforms the tag names.  
It is recommended to configure this before you use the component library.

```tsx
import { setTagNameTransformer } from '<your-library>/solid';
setTagNameTransformer((tagName: string) => `${tagName}-v2`);
````