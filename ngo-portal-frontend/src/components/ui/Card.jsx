import { cn } from "../../lib/utils";

export const Card = ({ className, children, ...props }) => {
  return (
    <div className={cn("bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
};
