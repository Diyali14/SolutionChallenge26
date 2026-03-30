import { cn } from "../../lib/utils";

export const Input = ({ className, label, type = "text", ...props }) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        className={cn(
          "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm transition-colors shadow-sm",
          "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
          "placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
        )}
        {...props}
      />
    </div>
  );
};
