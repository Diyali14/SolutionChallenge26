import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Progress = forwardRef(({ className, value, indicatorClassName, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-100",
      className
    )}
    {...props}
  >
    <div
      className={cn("h-full w-full flex-1 bg-brand-500 transition-all duration-500 ease-in-out", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
