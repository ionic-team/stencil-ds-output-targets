# 2. Expose common utility functions through wrappers-utils

Date: 2021-11-28

## Status

2021-11-28 proposed

## Context

Stencil's wrapper functions provide a significant amount of similar code across framework packages. This code does things like read json files, write files to a system, or get the basename for any given file on any given OS. Since this code is effectively duplicated, it becomes hard to maintain or evolve the codebase to help the size of the team. 

## Decision

We will add a package called "@stencil/wrappers-utils", which holds a single declaration of the most commonly used functions in this monorepo. 

A dependency will be added for each of the wrapper functions in order to allow these to be imported. Lerna, this monorepo's tool of choice, will provide the orchestration to build the utils package prior to other packages. 

## Consequences

We should have less code overall, causing higher level of quality to be output from the team. 
