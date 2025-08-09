import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./demo",
  base: "/smooth-auto-scroll/", // GitHub Pages subdirectory
  resolve: {
    alias: {
      "smooth-auto-scroll": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
