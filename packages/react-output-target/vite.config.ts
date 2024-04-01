// vite.config.ts
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'StencilReactOutputTarget',
      fileName: (format) => `stencil-react-output-target.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@stencil/core', 'typescript'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // 'ts-morph': 'tsMorph',
        },
      },
    },
  },
});
