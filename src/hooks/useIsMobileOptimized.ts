const MOBILE_BREAKPOINT = 768;

// Non-hook utility that can be safely called anywhere (even at module scope)
export function useIsMobileOptimized() {
  if (typeof window === 'undefined') return false;
  try {
    return window.innerWidth < MOBILE_BREAKPOINT;
  } catch {
    return false;
  }
}

export default useIsMobileOptimized;

