import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    react: 'src/react/index.ts',
    'react-output-target': 'src/react-output-target/index.ts'
  },
  splitting: true,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  minify: true
})
