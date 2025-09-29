# AppFolio Rendering Analysis

This document contains the diagnostic results from analyzing how AppFolio renders its listings widget on the `/vacancies` page.

## Purpose

To determine whether AppFolio uses:
- **iframe**: Content isolated in an iframe (no direct styling possible)
- **Shadow DOM**: Content in Shadow DOM (limited styling via CSS variables)
- **Direct DOM**: Regular DOM elements (full styling control)

## How to View Results

1. Visit the `/vacancies` page
2. Wait for the AppFolio widget to load
3. Open browser DevTools Console
4. Look for the "🔍 AppFolio Rendering Diagnostics" section
5. Or check `sessionStorage.getItem('appfolio-report')` for the full markdown report

## Latest Results

Results will be automatically logged to the console when visiting the vacancies page. Check the browser console for:

```
🔍 AppFolio Rendering Diagnostics
Rendering Mode: [iframe | shadow-dom | direct-dom | unknown]
```

## Debugging

If no results appear:
1. Ensure AppFolio script loaded successfully (check Network tab)
2. Verify `#appfolio-root` container exists in the DOM
3. Check console for any initialization errors
4. Try clearing browser cache and reloading

## Manual Inspection

To manually inspect the rendering method:

```javascript
// In browser console:
const container = document.getElementById('appfolio-root');

// Check for iframe
console.log('Has iframe:', !!container.querySelector('iframe'));

// Check for Shadow DOM
const hasShadow = Array.from(container.querySelectorAll('*')).some(el => el.shadowRoot);
console.log('Has Shadow DOM:', hasShadow);

// Check for direct DOM
console.log('Direct children:', container.children.length);
console.log('Child elements:', Array.from(container.children).map(el => el.tagName));
```

---

*This document is automatically updated when diagnostics run. Last template update: 2025-01-XX*
