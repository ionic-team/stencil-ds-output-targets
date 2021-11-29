export const dashToCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (_, up) => up.toUpperCase());
