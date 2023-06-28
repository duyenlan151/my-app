import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development';

  return {
    plugins: [react()],
    resolve: {
      // alias: {
      // app: resolve(__dirname, 'src', 'app'),
      // components: resolve(__dirname, 'src', 'components'),
      // hooks: resolve(__dirname, 'src', '@/hooks'),
      // services: resolve(__dirname, 'src', '@/services'),
      // utils: resolve(__dirname, 'src', '@/utils'),
      // constants: resolve(__dirname, 'src', '@/constants'),
      // },
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:5]',
      },
    },
  };
});
