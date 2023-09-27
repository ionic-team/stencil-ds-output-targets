| Project               | Package                                                                                          | Version                                                                                                                                            | Documentation                                        |
| --------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| React Output Target   | [`@stencil/react-output-target`](https://www.npmjs.com/package/@stencil/react-output-target)     | [![version](https://img.shields.io/npm/v/@stencil/react-output-target/latest.svg)](https://www.npmjs.com/package/@stencil/react-output-target)     | [README](./packages/react-output-target/README.md)   |
| Angular Output Target | [`@stencil/angular-output-target`](https://www.npmjs.com/package/@stencil/angular-output-target) | [![version](https://img.shields.io/npm/v/@stencil/angular-output-target/latest.svg)](https://www.npmjs.com/package/@stencil/angular-output-target) | [README](./packages/angular-output-target/README.md) |
| Vue Output Target     | [`@stencil/vue-output-target`](https://www.npmjs.com/package/@stencil/vue-output-target)         | [![version](https://img.shields.io/npm/v/@stencil/vue-output-target/latest.svg)](https://www.npmjs.com/package/@stencil/vue-output-target)         | [README](./packages/vue-output-target/README.md)     |

# Introduction

Integrating web components into existing framework applications can be difficult at times. More about this can be read at https://custom-elements-everywhere.com/.
To accommodate the various issues, the Stencil team has created new output target plugins to make the process simpler.

The plugins add additional output targets for each framework binding that is included.

Here is an example project using the plugins for reference: https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/example-project/component-library

Detailed information for each output target can be found in each package's README.

# Maintainance Status

This project is currently maintained for the purposes of supporting the Ionic Framework.
At this time, only new issues & pull requests that support the Ionic Framework will be prioritized.

# Local development

## Getting started

To set up this project and prepare the example project to be used in your own projects run the following commands.

```bash
npm install
npm run bootstrap
npm run build
```

This will generate all necessary builds in the example projects. You can then either publish the packages to npm or a private package manager, or use `npm pack` to start using the builds in a local project for testing purposes where you manually place the package in the project `node_modules` folder.

For example, if you have an Angular project, run `npm pack` in `packages/example-project/component-library` and `packages/example-project/component-library-angular`. Since the framework component libraries depend on the Stencil project, you will need to provide the `component-library` package in your project `node_modules` folder.

### Node Versions

This project uses [Volta](https://volta.sh/) to automatically manage what npm and node versions are used when developing. If you don't use Volta, don't worry about it... just check the root `package.json` for what version of node and npm is currently being used.

## Deploying

There is a manual workflow task called "Production Release" within the GitHub Actions workflows directory. We currently do not release all packages that have been changed at once. You will need to deploy each package (vue, react, angular) individually.

You'll need to fill out a few bits of information when you submit the deploy workflow:
1. Which package should be published (Currently `vue`, `react`, or `angular`).
2. What version should be published.
3. What npm tag it should be published under (`next` or `latest`)
4. Any preid, like `alpha` or `rc`
