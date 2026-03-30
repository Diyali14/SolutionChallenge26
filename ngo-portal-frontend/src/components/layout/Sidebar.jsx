import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, ListTodo, Map, BarChart3, Bell, Settings } from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add Task", href: "/tasks/new", icon: PlusCircle },
  { name: "Tasks", href: "/tasks", icon: ListTodo },
  { name: "Tracking", href: "/tracking", icon: Map },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white/95 backdrop-blur shadow-sm transition-transform">
      <div className="flex h-16 shrink-0 items-center px-6 font-black text-xl text-brand-600 tracking-tight">
        <div className="h-8 w-8 rounded-lg bg-brand-600 mr-3 flex items-center justify-center text-white">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        NGO Flow
      </div>
      
      <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1.5">
        <div className="text-xs font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
              isActive 
                ? "bg-brand-50 text-brand-700 shadow-sm" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn("h-5 w-5 transition-colors", "group-hover:text-brand-600")} />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100/50">
          <h4 className="text-xs font-bold text-brand-900 mb-1">System Status</h4>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-[11px] text-gray-600 font-medium">All systems operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
