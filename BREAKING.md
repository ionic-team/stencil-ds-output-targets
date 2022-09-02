# Breaking Changes

This is a comprehensive list of the breaking changes introduced in the releases of Stencil output targets.

## Versions

- [Version 0.5](#version-0.5.x)

<h2 id="version-0.5.x">Version 0.5.x</h2>

- [Angular Output Target](#version-0.5-angular)
  - [Config Options](#version-0.5-angular-config-options)

<h2 id="version-0.5-angular">Angular Output Target</h2>

<h4 id="version-0.5-angular-config-options">Config Options</h4>

The config option `directivesProxyFile` has been replaced with `proxyDeclarationFile`. Developers should update their `stencil.config.ts` with the following:

```diff
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'component-library',
-     directivesProxyFile: '../component-library-angular/src/directives/proxies.ts',
+     proxyDeclarationFile: '../component-library-angular/src/directives/proxies.ts',
      directivesArrayFile: '../component-library-angular/src/directives/index.ts',
    })
  ]
```

`componentCorePackage` is now a required option on the output target.
