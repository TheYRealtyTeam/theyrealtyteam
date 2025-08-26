# Vacancies Tab Implementation

## Overview
Added a new "Vacancies" navigation tab that routes to `/vacancies` and displays AppFolio property listings using a React-safe dynamic script loading approach.

## What Was Added

### 1. Navigation Tab
- **File**: `src/components/navbar/navLinks.ts`
- **Change**: Added `{ name: 'Vacancies', href: '/vacancies', isAnchorLink: false }` to the navigation links array
- **Position**: Placed between "Services" and "FAQ" for logical flow

### 2. Route Configuration
- **File**: `src/App.tsx`
- **Change**: Added lazy-loaded route for `/vacancies`
- **Implementation**: `<Route path="/vacancies" element={<Suspense fallback={<PageLoading />}><Vacancies /></Suspense>} />`

### 3. Vacancies Page Component
- **File**: `src/pages/Vacancies.tsx`
- **Features**:
  - Uses `PageLayout` for consistent site styling
  - Dynamic script loading with error handling
  - Loading states and user-friendly error messages
  - Mobile-responsive design
  - Cleanup and re-initialization safety

### 4. TypeScript Definitions
- **File**: `src/types/appfolio.d.ts`
- **Purpose**: Provides type safety for the global `window.Appfolio` object
- **Interface**: Defines the `Listing` function signature with proper configuration options

### 5. Constants Update
- **File**: `src/lib/constants.ts`
- **Change**: Added `VACANCIES: '/vacancies'` to the `ROUTES` constant

## AppFolio Script Integration

### React-Safe Implementation
Instead of using `document.write()` (which breaks in React), the implementation:

1. **Dynamic Script Loading**: Creates script element programmatically
2. **Duplicate Prevention**: Checks for existing script before loading
3. **Error Handling**: Handles both script loading and API initialization errors
4. **Cleanup Safety**: Properly manages container clearing on re-renders

### Script Loading Process
```typescript
// Check for existing script
const existingScript = document.querySelector('script[src="..."]');

// Create and load script if not present
const script = document.createElement('script');
script.src = 'https://theyteam.appfolio.com/javascripts/listing.js';
script.async = true;
script.onload = initAppfolio;
script.onerror = handleError;
document.head.appendChild(script);
```

### Appfolio Configuration
```typescript
AppfolioAPI.Listing({
  hostUrl: 'theyteam.appfolio.com',
  themeColor: '#676767',
  height: '500px',
  width: '100%',
  defaultOrder: 'date_posted'
});
```

## Mobile Responsiveness
- **Width**: 100% to fit mobile screens
- **Height**: min-height: 500px with auto expansion
- **Loading State**: Spinner with descriptive text
- **Error State**: Clear error message with retry button

## SSR/Hydration Considerations
- **Script Loading**: Occurs only on client-side in `useEffect`
- **Fallback**: `<noscript>` tag for users with JavaScript disabled
- **Error Recovery**: Graceful degradation with retry functionality

## Error Handling
1. **Script Loading Errors**: Network/CDN issues
2. **API Initialization Errors**: AppFolio service unavailable
3. **User Feedback**: Clear error messages with recovery options
4. **Console Logging**: Development debugging information

## Testing Checklist
- [ ] Navigation tab appears in header
- [ ] `/vacancies` route loads without errors
- [ ] AppFolio widget renders property listings
- [ ] Mobile view is responsive and usable
- [ ] Loading states display correctly
- [ ] Error states handle gracefully
- [ ] No console errors in development
- [ ] Script doesn't reload unnecessarily on re-visits

## Future Enhancements
- Add property filtering options
- Implement search functionality
- Add property detail modal/pages
- Integrate with contact forms for inquiries
- Add analytics tracking for listing views

## Commit History
- `feat(nav): add Vacancies nav link to header navigation`
- `feat(routes): add /vacancies route with lazy loading`
- `feat(vacancies): create React-safe AppFolio listings embed`
- `feat(types): add AppFolio TypeScript definitions`
- `docs(vacancies): add implementation documentation`