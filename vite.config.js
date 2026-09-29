import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        // Strip console/debugger statements from production bundles.
        minify: { compress: { dropConsole: true, dropDebugger: true } },
      },
    },
    // Chunk size optimization
    chunkSizeWarningLimit: 1000,
    target: "esnext",
    sourcemap: false,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "motion/react",
    ],
    exclude: ["three/examples/jsm/loaders/GLTFLoader"],
  },
  // Performance optimizations
  define: {
    __DEV__: false,
  },
});
