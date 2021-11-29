export function flatOne<T>(array: T[][]): T[] {
  if (array.flat) {
    return array.flat(1);
  }
  return array.reduce((result, item) => {
    result.push(...item);
    return result;
  }, [] as T[]);
}
