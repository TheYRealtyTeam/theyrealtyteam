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
      // Route all Radix Tooltip imports to our local safe tooltip component
      { find: "@radix-ui/react-tooltip", replacement: path.resolve(__dirname, "src/components/ui/tooltip.tsx") },
      { find: /^@radix-ui\/react-tooltip(\/.*)?$/, replacement: path.resolve(__dirname, "src/components/ui/tooltip.tsx") },
    ],
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    exclude: ["@radix-ui/react-tooltip"],
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
