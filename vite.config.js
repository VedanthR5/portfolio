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
      external: [],
    },
    // Chunk size optimization
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "framer-motion",
    ],
  },
});
