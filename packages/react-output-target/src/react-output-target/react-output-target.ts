import type { BuildCtx, OutputTargetCustom, OutputTargetDistCustomElements } from '@stencil/core/internal';
import { Project } from 'ts-morph';
import { createComponentWrappers } from './create-component-wrappers';

export interface ReactOutputTargetOptions {
  /**
   * Specify the output directory or path where the generated React components will be saved.
   */
  outDir: string;
  /**
   * Specify the components that should be excluded from the React output target.
   */
  excludeComponents?: string[];
  /**
   * The package name of the Stencil project.
   *
   * This value is automatically detected from the package.json file of the Stencil project.
   * If the validation fails, you can manually assign the package name.
   */
  stencilPackageName?: string;
  /**
   * Enables generating the react components as ES modules.
   * @default false
   */
  esModules?: boolean;
  /**
   * Enable this option to add the `use client;` directive to the generated React components.
   */
  experimentalUseClient?: boolean;
}

const PLUGIN_NAME = 'react-output-target';

const DIST_CUSTOM_ELEMENTS_DEFAULT_DIR = 'components';
const DIST_CUSTOM_ELEMENTS = 'dist-custom-elements';

/**
 * Creates an output target for binding Stencil components to be used in a React context
 * @public
 * @param outputTarget the user-defined output target defined in a Stencil configuration file
 * @returns an output target that can be used by the Stencil compiler
 */
export const reactOutputTarget = ({
  outDir,
  esModules,
  stencilPackageName,
  experimentalUseClient,
  excludeComponents,
}: ReactOutputTargetOptions): OutputTargetCustom => {
  let customElementsDir = DIST_CUSTOM_ELEMENTS_DEFAULT_DIR;
  return {
    type: 'custom',
    name: PLUGIN_NAME,
    validate(config) {
      /**
       * Validate the configuration to ensure that the dist-custom-elements
       * output target is defined in the Stencil configuration.
       *
       * This context is used to detect a customized output path.
       */
      const customElementsOutputTarget = (config.outputTargets || []).find(
        (o) => o.type === DIST_CUSTOM_ELEMENTS
      ) as OutputTargetDistCustomElements;
      if (customElementsOutputTarget == null) {
        throw new Error(
          `The '${PLUGIN_NAME}' requires '${DIST_CUSTOM_ELEMENTS}' output target. Add { type: '${DIST_CUSTOM_ELEMENTS}' }, to the outputTargets config.`
        );
      }
      if (customElementsOutputTarget.dir !== undefined) {
        /**
         * If the developer has configured a custom output path for the Stencil components,
         * we need to use that path when importing the components in the React components.
         */
        customElementsDir = customElementsOutputTarget.dir;
      }

      /**
       * Validate the configuration to detect the package name of the Stencil project.
       */
      if (stencilPackageName === undefined) {
        if (config.sys && config.packageJsonFilePath) {
          const { name: packageName } = JSON.parse(config.sys.readFileSync(config.packageJsonFilePath, 'utf8'));
          stencilPackageName = packageName;
        }

        if (!stencilPackageName) {
          throw new Error(
            `Unable to find the package name in the package.json file: ${config.packageJsonFilePath}. Please provide the stencilPackageName manually to the ${PLUGIN_NAME} output target.`
          );
        }
      }
    },
    async generator(_config, compilerCtx, buildCtx: BuildCtx) {
      const timespan = buildCtx.createTimeSpan(`generate ${PLUGIN_NAME} started`, true);

      const components = buildCtx.components;

      const project = new Project();

      const sourceFiles = await createComponentWrappers({
        outDir,
        components,
        stencilPackageName: stencilPackageName!,
        customElementsDir,
        esModules: esModules === true,
        experimentalUseClient: experimentalUseClient === true,
        excludeComponents,
        project,
      });

      await Promise.all(
        sourceFiles.map((sourceFile) => compilerCtx.fs.writeFile(sourceFile.getFilePath(), sourceFile.getFullText()))
      );

      timespan.finish(`generate ${PLUGIN_NAME} finished`);
    },
  };
};
