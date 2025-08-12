import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-router-dom'
    ],
  },
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-router",
      "react-router-dom"
    ],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // React default export shim to prevent ESM default import errors
      "react-original": path.resolve(__dirname, "./node_modules/react"),
      "react": path.resolve(__dirname, "./src/shims/react-compat.ts"),
    },
  },
}));
