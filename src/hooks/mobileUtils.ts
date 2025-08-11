const MOBILE_BREAKPOINT = 768;

// Debug versioning to ensure latest module is loaded
export const __UIMO_VERSION__ = "v3";
if (typeof window !== 'undefined') {
  // Minimal log to verify module freshness without noise
  console.debug('[useIsMobileOptimized] module loaded', __UIMO_VERSION__);
}

// Pure utility (NOT a React hook) - safe to call anywhere
export function isMobileOptimized(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.innerWidth < MOBILE_BREAKPOINT;
  } catch {
    return false;
  }
}

// Backward compatibility: keep the old export name but as a plain function (no React hooks)
export function useIsMobileOptimized(): boolean {
  // Trace to confirm this wrapper is used and contains no React hooks
  if (typeof window !== 'undefined') console.debug('[useIsMobileOptimized] called');
  return isMobileOptimized();
}

export default isMobileOptimized;
