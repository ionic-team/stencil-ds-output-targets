export interface WrapperFunction {
  /**
   * The Framework that this function will produce files for. 
   */
  framework?: string;

  /**
   * The location that the files should be produced at
   */
  dest: string;

  /**
   * The format that this wrapper function will refer to when referring to any given custom element. 
   */
  format: "lazy" | "dist" | "dist-custom-elements" | "dist-custom-elements-bundle";

  /**
   * Optional configuration used to modify how the files are generated. 
   */
  config?: {

    /**
     * This property will either bundle the format of the Stencil code into one dependency, or it will refer to an external dependency. Somewhat originally "componentCorePackage". 
     * @default false
     */
    bundle?: boolean,

    /**
     * Setting this to true will cause files to be overwritten instead of deleted on each build. 
     * @default false
     */
    overwrite?: boolean,

    /**
     * This will allow you to customize the name of the file to be imported within the consuming design system. 
     * @default "components.ts"
     */
    consumerEntryFileName?: string,

    /**
     * Setting this will output JavaScript files instead of TypeScript files. 
     * @default false
     */
    javascript?: boolean,
  };
}