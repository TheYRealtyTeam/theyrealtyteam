# Hooks Rendering Stabilization

Branch: fix/hooks-rendering

Summary
- Resolved nested Router error and duplicate React hook dispatcher issues causing useState/useEffect/useContext to be null.
- Centralized all providers at the root and ensured a single BrowserRouter instance.

Changes
1) Root providers & Router
- Moved BrowserRouter to src/main.tsx (single instance).
- Wrapped App with ErrorBoundary → QueryClientProvider → ThemeProvider → AuthProvider in main.tsx.
- Removed provider wrappers from App.tsx so it only declares routes and toasters.

2) React dedupe
- Vite already aliases/dedupes react, react-dom, and react/jsx-runtime. No further changes needed now.

3) Hydration/CSR guards
- Verified window/document usage is inside effects across components.

4) Hooks rules
- ESLint already enforces react-hooks rules at error level; no violations changed in this pass.

Verification checklist
- App boots without “Router inside another Router.”
- No "Cannot read properties of null (reading 'useState'/'useContext')" from React dispatcher.
- Routes render: /, /faq, /blog, /blog/:slug, /blog-admin, /tools, /vacancies, /appointment, /contact, /profile, /admin-login, /admin-dashboard, /auth/callback.
- Toaster/Sonner render under ThemeProvider.

Next steps (optional)
- If any carousel or DOM-ref errors appear, gate the specific component behind a ClientOnly wrapper.
- Replace any remaining window.location navigations for internal routes with useNavigate to avoid full reloads.

Commit log (suggested)
- fix(router): ensure single BrowserRouter at root and move providers to main
- refactor(app): remove provider wrappers from App shell (routes only)
- docs: add hooks-rendering-fix report
