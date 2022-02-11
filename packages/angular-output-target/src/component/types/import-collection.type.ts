export type TypeImportStatement = {
  /**
   * The name of the import value. This is the value that is
   * evaluated between the brackets { } of an import statement.
   */
  value: string;
  /**
   * `true` if the import value should only use the typed import.
   *
   * ```ts
   * import type { } from 'package-name';
   * ```
   */
  typeOnly: boolean;
}

export type ImportStatement = string | TypeImportStatement;

export type ImportCollection = {
  [key in string]: ImportStatement[];
};
