import pkg from './package.json' with { type: 'json' };

export default {
  input: 'dist/index.js',

  external: ['path', 'node-sass', 'fs', 'util'],

  output: [
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'es',
      file: pkg.module,
    },
  ],
};
