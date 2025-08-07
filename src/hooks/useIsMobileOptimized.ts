const MOBILE_BREAKPOINT = 768;

// Safe utility (NOT a React hook): can be called anywhere without React context
export function useIsMobileOptimized(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.innerWidth < MOBILE_BREAKPOINT;
  } catch {
    return false;
  }
}

export default useIsMobileOptimized;
