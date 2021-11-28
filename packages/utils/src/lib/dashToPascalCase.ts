import { toLowerCase } from './toLowerCase';

export const dashToPascalCase = (str: string) =>
  toLowerCase(str)
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
