import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-brand-100 text-brand-700": variant === "default",
          "border-transparent bg-gray-100 text-gray-900": variant === "secondary",
          "text-gray-950 border-gray-200": variant === "outline",
          "border-transparent bg-red-100 text-red-700": variant === "urgent",
          "border-transparent bg-yellow-100 text-yellow-700": variant === "progress",
          "border-transparent bg-green-100 text-green-700": variant === "completed",
          "border-transparent bg-slate-100 text-slate-700": variant === "pending",
        },
        className
      )}
      {...props}
    />
  );
}
