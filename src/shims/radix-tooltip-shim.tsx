import * as React from "react";

// Minimal no-op Tooltip shim to avoid Radix dependency during dev
export const Provider: React.FC<{ children: React.ReactNode } & any> = ({ children }) => <>{children}</>;
export const Root: React.FC<{ children: React.ReactNode } & any> = ({ children }) => <>{children}</>;

export const Tooltip: React.FC<{ children: React.ReactNode } & any> = ({ children }) => <>{children}</>;

export const TooltipTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { asChild?: boolean }>((props, ref) => {
  const Comp: any = props.asChild ? React.Fragment : "button";
  const { children, asChild, ...rest } = props as any;
  return (
    <Comp ref={ref as any} {...rest}>
      {children}
    </Comp>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

export const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
TooltipContent.displayName = "TooltipContent";

// Additional named exports to match common Radix API usage
export const TooltipProvider = Provider;
export const TooltipArrow: React.FC<any> = () => null;

// Back-compat named exports expected by Radix usage
export default {
  Provider,
  Root,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
};
