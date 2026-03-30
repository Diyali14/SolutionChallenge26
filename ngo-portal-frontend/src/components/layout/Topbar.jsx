import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Bell, Search } from "lucide-react";

export const Topbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Simple path to title mapping
  const path = location.pathname.split("/").filter(Boolean)[0] || "dashboard";
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white/95 px-8 backdrop-blur shadow-[0_4px_20px_-15px_rgba(0,0,0,0.1)] transition-all">
      <h1 className="text-2xl font-black tracking-tight text-gray-900 capitalize">
        {title.replace("-", " ")}
      </h1>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:flex group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="text"
            placeholder="Search portal..."
            className="h-9 w-64 rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-sm focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 shadow-sm transition-all"
          />
        </div>

        <button className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition-colors hover:text-gray-900">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 rounded-full bg-red-500 ring-[3px] ring-white"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer group">
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
              {user?.name || "NGO Organization"}
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {user?.role || "Portal"}
            </span>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold flex items-center justify-center shadow-md transition-all group-hover:shadow-lg group-hover:-translate-y-0.5 border border-black/5">
            {user?.name ? user.name.charAt(0).toUpperCase() : "N"}
          </div>
        </div>
      </div>
    </header>
  );
};
