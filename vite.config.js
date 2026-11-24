import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Same output layout as Create React App had, so the compress script
// (build/static/media) and the deployment keep working unchanged.
export default defineConfig({
  base: "/",
  plugins: [react({ include: /\.(js|jsx)$/ })],
  build: {
    outDir: "build",
    // Create React App inlined images below 10 kB as data URLs.
    assetsInlineLimit: 10000,
    // The game is one bundle, as it was with Create React App.
    chunkSizeWarningLimit: 1000,
    // Create React App published source maps too.
    sourcemap: true,
    rolldownOptions: {
      output: {
        entryFileNames: "static/js/main.[hash].js",
        chunkFileNames: "static/js/[name].[hash].js",
        assetFileNames: ({ names }) =>
          names.some((name) => name.endsWith(".css"))
            ? "static/css/main.[hash][extname]"
            : "static/media/[name].[hash][extname]",
      },
    },
  },
  server: {
    port: 3000,
  },
  test: {
    // Jest-style globals (test, expect) and automatic cleanup, as before.
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
