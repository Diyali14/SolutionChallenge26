import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-[#FAFAFA]/80 backdrop-blur-md px-4 md:px-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md hidden md:flex">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search tasks, locations..."
            className="h-10 w-full rounded-full bg-white border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#FAFAFA]"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
            <span className="text-xs text-brand-600 font-medium">{user?.role}</span>
          </div>
          <img 
            src={user?.avatar || "https://i.pravatar.cc/150"} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
          />
          <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-1">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
