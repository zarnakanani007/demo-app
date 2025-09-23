import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),      // Add Vite React plugin
    tailwindcss() // Tailwind plugin
  ],
  resolve: {
    alias: {
      // Force all packages to use the same React copy
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom")
    },
  },
});
