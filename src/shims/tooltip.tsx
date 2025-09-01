import type { ReactNode } from "react";

// Minimal no-op shim to avoid hook usage and invalid hook calls
export function Tooltip(props: { children: ReactNode }) { return <>{props.children}</>; }
export function TooltipProvider(props: { children: ReactNode }) { return <>{props.children}</>; }
export function TooltipTrigger(props: { children: ReactNode }) { return <>{props.children}</>; }
export function TooltipContent(props: { children: ReactNode }) { return <>{props.children}</>; }
export function TooltipArrow() { return null; }

export default Tooltip;