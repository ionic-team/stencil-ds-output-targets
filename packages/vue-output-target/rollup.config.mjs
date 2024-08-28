import pkg from './package.json' with { type: 'json' };

const external = ['path', 'node-sass', 'fs', 'util', 'vue', 'vue/server-renderer'];
const core = {
  input: 'dist/index.js',
  external,
  output: [
    {
      format: 'cjs',
      file: pkg.exports['.'].require,
    },
    {
      format: 'es',
      file: pkg.exports['.'].import,
    },
  ],
}
const runtime = {
  input: 'dist/runtime.js',
  external,
  output: [
    {
      format: 'cjs',
      file: pkg.exports['./runtime'].require,
    },
    {
      format: 'es',
      file: pkg.exports['./runtime'].import,
    },
  ],
}

export default [core, runtime];
