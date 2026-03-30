import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAuth } from "../../context/AuthContext";

export const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full bg-[#FAFAFA] overflow-hidden text-gray-900 selection:bg-brand-500/30">
      <Sidebar />
      <div className="flex w-full flex-col pl-64 transition-all duration-300 relative">
        <Topbar />
        
        {/* We add a custom scrollbar via tailwind utilities inside the main block */}
        <main className="flex-1 overflow-y-auto w-full h-[calc(100vh-4rem)] scroll-smooth relative">
          <div className="mx-auto w-full max-w-7xl animate-in fade-in zoom-in-95 duration-500 p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
