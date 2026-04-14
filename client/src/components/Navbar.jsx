import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/user";
import { FiPlus, FiUser, FiLogOut, FiHeart, FiActivity } from "react-icons/fi";

function Navbar({ user }) {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            await logout();
            navigate("/");
        }
    };

    return (
        <nav className="sticky top-0 z-[100] px-6 py-6 transition-all duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(28,25,23,0.03)] rounded-[2.5rem] px-8 py-3 flex items-center justify-between">

                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-sage-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sage-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <FiHeart className="text-xl fill-white/20" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-sage-900 font-['Outfit']">
                            Smart<span className="text-sage-500 font-light">Alloc</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {!user && (
                            <>
                                <NavLink to="/" active={isActive("/")} label="Home" />
                                <div className="h-4 w-[1px] bg-warm-200 mx-4"></div>
                                <Link to="/login" className="btn-premium !py-2.5 !px-6 !text-sm !rounded-2xl">
                                    Sign In
                                </Link>
                            </>
                        )}

                        {user?.role === "volunteer" && (
                            <>
                                <NavLink to="/volunteer/dashboard" active={isActive("/volunteer/dashboard")} icon={FiActivity} label="Dashboard" />
                            </>
                        )}

                        {user?.role === "ngo" && (
                            <>
                                <NavLink to="/ngo/dashboard" active={isActive("/ngo/dashboard")} icon={FiActivity} label="Overview" />
                                <NavLink to="/add-need" active={isActive("/add-need")} icon={FiPlus} label="Post Need" />
                            </>
                        )}
                    </div>

                    {/* User Actions */}
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <p className="text-[10px] font-bold text-sage-400 uppercase tracking-widest leading-none mb-1">
                                    {user.role}
                                </p>
                                <p className="text-sm font-bold text-sage-900 leading-none">
                                    {user.name || 'Account'}
                                </p>
                            </div>
                            <div className="h-10 w-[1px] bg-warm-200 mx-2 hidden sm:block"></div>
                            <button
                                onClick={handleLogout}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-warm-100 text-warm-900 hover:bg-sage-600 hover:text-white hover:shadow-lg hover:shadow-sage-200 transition-all duration-300 active:scale-95"
                                title="Sign Out"
                            >
                                <FiLogOut className="text-lg" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ to, icon: Icon, label, active }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 ${active
                    ? "bg-sage-600 text-white shadow-lg shadow-sage-200"
                    : "text-sage-600 hover:bg-sage-50 hover:text-sage-900"
                }`}
        >
            {Icon && <Icon className="text-lg" />}
            <span>{label}</span>
        </Link>
    );
}

export default Navbar;