import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' with { type: 'json' };

const external = ['path', 'node-sass', 'fs', 'util', 'vue', 'vue/server-renderer'];
const plugins = [typescript()];
const core = {
  input: './src/index.ts',
  external,
  plugins,
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
  input: './src/runtime.ts',
  external,
  plugins,
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
