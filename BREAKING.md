# Breaking Changes

This is a comprehensive list of the breaking changes introduced in the releases of Stencil output targets.

## Versions

- [Version 0.5](#version-0.5.x)

<h2 id="version-0.5.x">Version 0.5.x</h2>

- [Angular Output Target](#version-0.5-angular)
  - [Config Options](#version-0.5-angular-config-options)

<h2 id="version-0.5-angular">Angular Output Target</h2>

<h4 id="version-0.5-angular-config-options">Config Options</h4>

The Angular output targets renamed the `directivesProxyFile` config option with `proxyDeclarationFile`. Replace update your Angular output target usage to the new property.

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
