import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  CheckSquare, 
  Navigation, 
  BarChart2, 
  Bell, 
  User, 
  Settings 
} from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Explore Tasks", href: "/explore", icon: Map },
  { name: "My Tasks", href: "/my-tasks", icon: CheckSquare },
  { name: "Tracking", href: "/tracking", icon: Navigation },
  { name: "Impact", href: "/impact", icon: BarChart2 },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-gray-100 shadow-sm">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2 text-brand-600 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-brand-100 rounded-xl flex justify-center items-center">
            <User size={18} className="text-brand-600" />
          </div>
          VolunLink
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-50 text-brand-700 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-50">
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-4 text-center">
          <h4 className="text-sm font-semibold text-brand-900">Need Help?</h4>
          <p className="text-xs text-brand-700 mt-1 mb-3">Contact support or view our FAQ.</p>
          <button className="w-full bg-white text-brand-700 text-xs py-2 rounded-xl border border-brand-200 hover:bg-brand-50 font-semibold transition-colors">
            Support Center
          </button>
        </div>
      </div>
    </div>
  );
};
