import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.{ts,tsx}", "src/**/*.test.*"],
    },
  },
});
