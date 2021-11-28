# 3. Expose all wrapper functions via wrappers package

Date: 2021-11-28

## Status

2021-11-28 proposed

## Context

Each of the output targets are currently installed separately. We have the opportunity to improve the language of the "Output Targets" to become "Wrappers Functions". We can also offer these as a singular package - @stencil/wrappers - which provides the Wrapper Functions for consumption within a Stencil config file. 

## Decision

We could copy and paste the built files in order to provide each of these during a build. 

## Consequences

Customers only have to install
