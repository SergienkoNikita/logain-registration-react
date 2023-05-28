import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';

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
  plugins: [react()],
});
