/**
 * Options for the Vue Output Target
 */
export interface OutputTargetVue {
  /**
   * The NPM package name of your Stencil component library.
   * This package is used as a dependency for your Vue wrappers.
   */
  componentCorePackage?: string;
  /**
   * The output file of all the component wrappers generated by the output target.
   * This file path should point to a location within your Vue library/project.
   */
  proxiesFile: string;
  /**
   * An array of tag names to exclude from generating component wrappers for.
   * This is helpful when have a custom framework implementation of a specific
   * component or need to extend the base component wrapper behavior.
   */
  excludeComponents?: string[];
  /**
   * This is an array of `ComponentModelConfig` objects for components that
   * should be integrated with `v-model`.
   */
  componentModels?: ComponentModelConfig[];
  /**
   * This is the path to where the `defineCustomElements` function exists in your
   * built project. If `loaderDir` is not provided, the `/dist/loader` directory
   * will be used.
   */
  loaderDir?: string;
  /**
   * If `true`, polyfills will automatically be imported and the `applyPolyfills`
   * function will be called in your proxies file. This can only be used when lazy
   * loading Web Components and will not work when `includeImportCustomElements`
   * is `true`.
   */
  includePolyfills?: boolean;
  /**
   * If `true`, all Web Components will automatically be registered with the Custom
   * Elements Registry. This can only be used when lazy loading Web Components and
   * will not work when `includeImportCustomElements` is `true`.
   */
  includeDefineCustomElements?: boolean;
  /**
   * If `true`, the output target will import the custom element instance and register
   * it with the Custom Elements Registry when the component is imported inside of a
   * user's app. This can only be used with the [Custom Elements Bundle](https://stenciljs.com/docs/custom-elements)
   * and will not work with lazy loaded components.
   */
  includeImportCustomElements?: boolean;
  /**
   * This is the directory where the custom elements are imported from when using the
   * [Custom Elements Bundle](https://stenciljs.com/docs/custom-elements). Defaults
   * to the `components` directory. Only applies when `includeImportCustomElements`
   * is `true`.
   */
  customElementsDir?: string;
  /**
   * To enable server side rendering, provide the path to the hydrate module, e.g. `my-component/hydrate`.
   * By default this value is undefined and server side rendering is disabled.
   */
  hydrateModule?: string;
}

export interface ComponentModelConfig {
  elements: string | string[];
  event: string;
  targetAttr: string;
}

export interface PackageJSON {
  types: string;
}

/**
 * This is needed as Vue references this type but can't find it for unknown reason.
 */
declare global {
  interface ToggleEvent {}
}