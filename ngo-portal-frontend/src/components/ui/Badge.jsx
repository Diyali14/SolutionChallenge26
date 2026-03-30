import { cn } from "../../lib/utils";

export const Badge = ({ children, status = "default", className, ...props }) => {
  const normStatus = status.toLowerCase();
  
  const mappedStatus = 
    ["active", "progress", "assigned"].includes(normStatus) ? "progress" :
    ["completed", "done", "success"].includes(normStatus) ? "completed" :
    ["urgent", "high", "danger"].includes(normStatus) ? "urgent" :
    ["pending", "waiting", "low"].includes(normStatus) ? "pending" : "default";

  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    urgent: "bg-red-50 text-red-700 border-red-200",
    progress: "bg-yellow-50 text-yellow-700 border-yellow-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", 
        variants[mappedStatus], 
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
};
