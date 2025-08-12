// Compatibility shim to prevent invalid React hook usage.
// This module re-exports the non-hook mobile utility so callers using the old path keep working safely.

export { default } from './mobileUtils';
export { isMobileOptimized, useIsMobileOptimized } from './mobileUtils';
