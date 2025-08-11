const MOBILE_BREAKPOINT = 768;

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
  return isMobileOptimized();
}

export default isMobileOptimized;
