// Safe, non-React compatibility shim for legacy imports
// No React imports or hooks here; purely synchronous and side-effect free

const MOBILE_BREAKPOINT = 768

export function isMobileOptimized(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.innerWidth < MOBILE_BREAKPOINT
  } catch {
    return false
  }
}

// Back-compat export name used in older components; NOT a React hook
export function useIsMobileOptimized(): boolean {
  return isMobileOptimized()
}

export default isMobileOptimized
