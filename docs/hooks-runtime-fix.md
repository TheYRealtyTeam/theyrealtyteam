# Hooks runtime fix – summary

Scope: Resolve runtime errors from invalid hook/context usage and ensure router/theme/providers are wired correctly. Also add tests and configuration to prevent regressions.

Key fixes
- Router context: Verified and enforced single <BrowserRouter> wrapping the app in App.tsx; ensured Navbar and all pages render under Router.
- Dedupe React: Added Vite resolve.dedupe for "react", "react-dom", and "react/jsx-runtime" to prevent duplicate React instances causing dispatcher=null in hooks.
- Sonner/Theme: Decoupled Toaster from next-themes by using local wrapper in src/components/ui/sonner.tsx. ThemeProvider remains at root with system disabled to avoid SSR pitfalls.
- Carousel: Confirmed hook usage within components and guarded event bindings against null api; relies on deduped React to avoid invalid hook calls.

Tests added
- src/__tests__/providers.smoke.test.tsx: Renders Navbar under MemoryRouter and a minimal Carousel to ensure no hook/context crashes at runtime.
- Simplified and stabilized hook unit tests to Vitest.

ESLint
- react-hooks/rules-of-hooks: error
- react-hooks/exhaustive-deps: error

Manual verification
- Navigated: /, /faq, /blog, /blog/:slug, /blog-admin, /tools, /appointment, /contact, /profile, /admin-login, /admin-dashboard, /auth/callback – no console errors after fixes.

Before/After
- Before: Repeated "Cannot read properties of null (reading 'useState'/'useRef'/'useContext')" in Navbar/useNavigation, Carousel, and Link.
- After: No runtime hook/context errors; navigation and carousel render normally.

Notes
- If hosting injects additional React copies, the Vite dedupe plus single import paths mitigate. If issues reappear, clear node_modules and reinstall.
