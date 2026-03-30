import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Button = forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        {
          "bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-500/20": variant === "default",
          "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-gray-900": variant === "outline",
          "bg-brand-50 text-brand-700 hover:bg-brand-100": variant === "secondary",
          "hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
          "h-10 py-2 px-4": size === "default",
          "h-9 px-3 rounded-xl": size === "sm",
          "h-11 px-8 rounded-2xl": size === "lg",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
