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
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      // Force a single React instance across the app and all deps
      { find: "react", replacement: path.resolve(__dirname, "./node_modules/react") },
      { find: "react/jsx-runtime", replacement: path.resolve(__dirname, "./node_modules/react/jsx-runtime") },
      { find: "react/jsx-dev-runtime", replacement: path.resolve(__dirname, "./node_modules/react/jsx-dev-runtime") },
      { find: "react-dom", replacement: path.resolve(__dirname, "./node_modules/react-dom") },
      // Shim Radix Tooltip to a no-op shim to avoid invalid hook calls during dev
      { find: "@radix-ui/react-tooltip", replacement: path.resolve(__dirname, "src/shims/tooltip.tsx") },
    ],
    // Ensure only a single React instance is used across app and deps
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    exclude: ["@radix-ui/react-tooltip", "@radix-ui/react-tooltip/dist/index.mjs"],
  },
  define: {
    // Force disable tooltip provider to prevent hook issues
    __RADIX_TOOLTIP_DISABLED__: true
  },
  build: {
    // Optimize chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-toast'],
          supabase: ['@supabase/supabase-js'],
          query: ['@tanstack/react-query'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          charts: ['recharts'],
          dates: ['date-fns', 'react-day-picker'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    // Improve build performance
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: mode === 'development'
  }
}));
