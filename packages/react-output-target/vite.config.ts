// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'react-output-target': 'src/react-output-target/index.ts',
        react: 'src/react/index.ts',
        ssr: 'src/react/ssr.tsx',
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@stencil/core', 'typescript', 'ts-morph', 'html-react-parser', 'node:path'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'ts-morph': 'tsMorph',
        },
      },
    },
  },
});
