import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn: (warning, warn) => {
        // Suppress specific warnings
        if (
          warning.code === "EVAL" &&
          warning.message.includes("@chevrotain/utils")
        ) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: {
          three: ["three"],
          "react-three": ["@react-three/fiber", "@react-three/drei"],
          "framer-motion": ["framer-motion"],
        },
      },
    },
    // Chunk size optimization
    chunkSizeWarningLimit: 1000,
    // Enable tree shaking and minification
    minify: "esbuild",
    target: "esnext",
    sourcemap: false,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "framer-motion",
    ],
    exclude: ["three/examples/jsm/loaders/GLTFLoader"],
  },
  // Performance optimizations
  define: {
    __DEV__: false,
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
