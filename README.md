| Project               | Package                                                                                          | Version                                                                                                                                            | Documentation                                        |
| --------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| React Output Target   | [`@stencil/react-output-target`](https://www.npmjs.com/package/@stencil/react-output-target)     | [![version](https://img.shields.io/npm/v/@stencil/react-output-target/latest.svg)](https://www.npmjs.com/package/@stencil/react-output-target)     | [README](./packages/react/README.md)   |
| Angular Output Target | [`@stencil/angular-output-target`](https://www.npmjs.com/package/@stencil/angular-output-target) | [![version](https://img.shields.io/npm/v/@stencil/angular-output-target/latest.svg)](https://www.npmjs.com/package/@stencil/angular-output-target) | [README](./packages/angular/README.md) |
| Vue Output Target     | [`@stencil/vue-output-target`](https://www.npmjs.com/package/@stencil/vue-output-target)         | [![version](https://img.shields.io/npm/v/@stencil/vue-output-target/latest.svg)](https://www.npmjs.com/package/@stencil/vue-output-target)         | [README](./packages/vue/README.md)     |

# Introduction

Integrating web components into existing framework applications can be difficult at times. More about this can be read at https://custom-elements-everywhere.com/.
To accommodate the various issues, the Stencil team has created new output target plugins to make the process simpler.

The plugins add additional output targets for each framework binding that is included.

Check out our [example project](https://github.com/stenciljs/output-targets/blob/main/example-project/component-library) which structures a reference implementation for a common design system that contains the following components:

- [`component-library`](https://github.com/stenciljs/output-targets/blob/main/example-project/component-library) - A Stencil project that exports components
- [`component-library-angular`](https://github.com/stenciljs/output-targets/blob/main/example-project/component-library-angular) - An Angular project that consumes Stencil components and exports them as an Angular module
- [`component-library-react`](https://github.com/stenciljs/output-targets/blob/main/example-project/component-library-react) - A React + Vite project that uses Stencil components and exports them as a React component
- [`next-app`](https://github.com/stenciljs/output-targets/blob/main/example-project/next-app) - A Next.js application that consumes the Stencil components from the `component-library-react` project
- [`nuxt-app`](https://github.com/stenciljs/output-targets/blob/main/example-project/nuxt-app) - A Nuxt application that consumes the Stencil components from the `component-library-vue` project
- [`vue-app`](https://github.com/stenciljs/output-targets/blob/main/example-project/vue-app) - A Vue + Vite example application that consumes the Stencil components from the `component-library-vue` project

Detailed information for each output target can be found in each package's README.

# Maintenance Status

This project is currently maintained for the purposes of supporting the Ionic Framework.
At this time, only new issues & pull requests that support the Ionic Framework will be prioritized.

# Local development

This project uses [pnpm](https://pnpm.io/) for package management. You can install it by following the [installation instructions](https://pnpm.io/installation).

## Requirements

This project requires:

- Node.js v20.10.0 or higher.
- [pnpm](https://pnpm.io/) v9.4.0 or higher

## Getting started

To set up this project and prepare the example project to be used in your own projects run the following commands.

```bash
pnpm install
pnpm build
```

In order to work on specific output targets, you can use the `dev` command, e.g.:

```sh
pnpm run dev.angular # work on @stencil/angular-output-target
pnpm run dev.react # work on @stencil/react-output-target
pnpm run dev.vue # work on @stencil/vue-output-target
pnpm run dev # watches changes on all output targets
```

## Formatting

This project uses [Prettier](https://prettier.io/) for code formatting. You can run the following command to format the code:

```bash
pnpm prettier
```

## Testing

We are running a set of unit tests for individual output targets code as well as end-to-end tests using [WebdriverIO](https://webdriver.io/) to verify the output targets actually hydrate and interact in specific project setups. To run tests, you can use the following commands:

```sh
pnpm run test.unit.angular # run unit tests for @stencil/angular-output-target
pnpm run test.unit.react # run unit tests for @stencil/react-output-target
pnpm run test.unit.vue # run unit tests for @stencil/vue-output-target
pnpm run test.unit # run unit tests on all output targets
```

If you like to run tests on every change, run:

```sh
pnpm run test.watch.angular # watch unit tests for @stencil/angular-output-target
pnpm run test.watch.react # watch unit tests for @stencil/react-output-target
pnpm run test.watch.vue # watch unit tests for @stencil/vue-output-target
pnpm run test.watch # watch unit tests on all output targets
```

In order to run all tests including the end-to-end tests, run:

```sh
pnpm run test

# run end-to-end tests for specific frameworks
pnpm run test.e2e.nuxt
pnpm run test.e2e.next
pnpm run test.e2e.vue
pnpm run test.e2e.react
```

## Project Structure

This project is structured as following:

    .
    ├── ...
    ├── example-project                    # set of example projects we use for testing output targets
    │   ├── component-library              # a Stencil projects that exports components
    │   ├── component-library-angular      # an example of an Angular project that consumes Stencil components
    │   ├── component-library-react        # an example React + Vite project that uses Stencil components
    │   ├── component-library-vue          # a simple Vue wrapper packages that exports Stencil components with utilities
    │   ├── next-app                       # a Next.js application for testing Stencils server side rendering capabilities in React
    │   ├── nuxt-app                       # a Nuxt application for testing Stencils server side rendering capabilities in Vue
    │   └── vue-app                        # a Vue + Vite example application for testing our Vue output target
    ├── packages                           # Stencil Output target packages
    │   ├── angular                        # package that publishes the `@stencil/angular-output-target`
    │   ├── react                          # package that publishes the `@stencil/react-output-target`
    │   └── vue                            # package that publishes the `@stencil/vue-output-target`
    └── ...

## Deploying

There is a manual workflow task called "Production Release" within the GitHub Actions workflows directory. We currently do not release all packages that have been changed at once. You will need to deploy each package (vue, react, angular) individually.

You'll need to fill out a few bits of information when you submit the deploy workflow:

1. Which package should be published (Currently `vue`, `react`, or `angular`).
2. What version should be published.
3. What npm tag it should be published under (`next` or `latest`)
4. Any preid, like `alpha` or `rc`
