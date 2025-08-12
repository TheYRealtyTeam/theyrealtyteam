// Hard shim: provide a non-React implementation to eliminate invalid hook calls.
// Version: v4.1
if (typeof window !== 'undefined') {
  // Ensure we can verify the latest shim loaded
  console.debug('[useIsMobileOptimized shim] module loaded v4.1')
}

// Returns true if viewport is under the mobile breakpoint.
export function isMobileOptimized(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.innerWidth < 768;
  } catch {
    return false;
  }
}

// Backwards-compatible export name. This is NOT a React hook.
export function useIsMobileOptimized(): boolean {
  if (typeof window !== 'undefined') console.debug('[useIsMobileOptimized shim] v4');
  return isMobileOptimized();
}

export default isMobileOptimized;
