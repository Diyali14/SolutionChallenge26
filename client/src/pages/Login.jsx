import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/user";
import { FiMail, FiLock, FiChevronRight, FiHeart } from "react-icons/fi";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(form.email, form.password);
            if (user.role === "ngo") {
                navigate("/ngo/dashboard");
            } else {
                navigate("/volunteer/dashboard");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center animated-gradient-bg px-6 py-12 overflow-hidden">
            {/* Elegant Background Elements */}
            <div className="floating-blob w-[500px] h-[500px] bg-sage-200/50 -top-24 -left-24"></div>
            <div className="floating-blob w-[400px] h-[400px] bg-warm-200/50 bottom-0 right-0" style={{ animationDelay: '3s' }}></div>

            <div className="w-full max-w-lg relative">
                <div className="premium-card p-12 text-center">
                    {/* Brand/Header */}
                    <div className="mb-10 text-center space-y-4">
                        <div className="inline-flex p-4 bg-sage-100 text-sage-700 rounded-3xl mb-4 shadow-inner">
                            <FiHeart className="text-4xl fill-sage-200/50" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-warm-900 tracking-tight leading-tight">
                            Welcome Back <br />
                            <span className="text-sage-500 font-light italic">Your mission continues.</span>
                        </h2>
                        <p className="text-sage-700 font-medium max-w-xs mx-auto opacity-80">
                            Empowering change through seamless resource allocation.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                <FiMail className="text-sage-500" /> Official Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="jane@example.com"
                                className="input-premium"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-sage-800 flex items-center gap-2">
                                    <FiLock className="text-sage-500" /> Security Key
                                </label>
                                <Link to="#" className="text-xs font-bold text-sage-500 hover:text-sage-700 transition-colors uppercase tracking-widest">
                                    Reset Access
                                </Link>
                            </div>
                            <input
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="input-premium"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-5 text-lg group"
                        >
                            {loading ? "Authenticating..." : (
                                <>
                                    <span>Enter Workspace</span>
                                    <FiChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="pt-8 text-center border-t border-warm-100/50 mt-10">
                            <p className="text-sm text-sage-500 font-medium">
                                Don&apos;t have an account yet?
                            </p>
                            <div className="flex justify-center gap-6 mt-4">
                                <Link to="/register/ngo" className="text-xs font-black uppercase tracking-widest text-sage-800 hover:text-sage-500 transition-colors py-2 px-4 border-2 border-sage-100 rounded-full">
                                    Register NGO
                                </Link>
                                <Link to="/register/volunteer" className="text-xs font-black uppercase tracking-widest text-sage-800 hover:text-sage-500 transition-colors py-2 px-4 border-2 border-sage-100 rounded-full">
                                    Join Volunteer
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;