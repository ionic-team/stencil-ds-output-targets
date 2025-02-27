# Contributing

This project uses [pnpm](https://pnpm.io/) for package management. You can install it by following the [installation instructions](https://pnpm.io/installation).

## Requirements

This project requires:

- Node.js v20.10.0 or higher.
- [pnpm](https://pnpm.io/) v9.4.0 or higher

## Getting started

Clone the repository:

```bash
git clone https://github.com/stenciljs/output-targets.git
```

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
