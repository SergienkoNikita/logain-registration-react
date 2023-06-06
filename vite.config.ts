import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting, autoprefixer],
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      app: fileURLToPath(new URL('./src/app', import.meta.url)),
      entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
      features: fileURLToPath(new URL('./src/features', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
      ui: fileURLToPath(new URL('./src/shared/ui', import.meta.url)),
      libs: fileURLToPath(new URL('./src/shared/libs', import.meta.url)),
    },
  },
  plugins: [react()],
});
