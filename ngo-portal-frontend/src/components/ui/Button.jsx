import { cn } from "../../lib/utils";

export const Button = ({ children, variant = "primary", size = "md", className, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
    secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm",
    ghost: "hover:bg-gray-100 text-gray-700",
    danger: "bg-priority-urgent text-white hover:bg-red-600"
  };
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 py-2",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <button className={cn(baseClasses, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};
