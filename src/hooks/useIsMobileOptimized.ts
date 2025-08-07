import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Safe, client-only mobile detection hook
export function useIsMobileOptimized() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Guard for non-browser environments
    if (typeof window === "undefined") return;

    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Initial check and subscribe to changes
    check();
    mql.addEventListener("change", check);
    window.addEventListener("resize", check);

    return () => {
      mql.removeEventListener("change", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return isMobile;
}

// Provide a default export for compatibility with any default-import usages
export default useIsMobileOptimized;
