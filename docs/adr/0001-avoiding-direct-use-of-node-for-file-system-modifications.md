# 1. Avoiding direct use of Node for file system modifications

Date: 2021-11-28

## Status

2021-11-28 proposed

## Context

Wrapper functions have an opportunity to run on systems with Node, the Browser, in-memory (like within Tests), or a future where Deno is sustainably supported by Stencil. 

Stencil provides an abstracted system concept which gives you as an author within this repo the ability to interact with any given system.  

To be specific, this means all "path", "os", "process", "child_process" native Node packages - or other package in the node ecosystem that use native packages should be considered harmful to use in any of the packages within this monorepo. 

## Decision

We commit to removing all instances of "path", "os", and "child_process" in favor of Stencil's abstracted systems. 

## Consequences

By assuming this, we make the wrapper functions significantly more portable and can feel more confident in the resultant output of any given wrapper function.

We can enforce this via eslint's no-nodejs-modules rule https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-nodejs-modules.md

```
{
  ...
  "rules": {
    "import/no-nodejs-modules": true
  }
}
```