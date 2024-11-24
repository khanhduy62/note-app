import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Ensure the server is accessible from outside the container
  },
  // root: '.', // Ensure this matches the directory where your `index.html` is located
  // build: {
  //   rollupOptions: {
  //     input: 'index.html', // Specify the correct entry point if necessary
  //   },
  // },
})
