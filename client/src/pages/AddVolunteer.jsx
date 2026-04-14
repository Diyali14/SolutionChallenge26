import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../services/user";
import {
    FiMail,
    FiLock,
    FiMapPin,
    FiUser,
    FiTool,
    FiCheckCircle,
    FiArrowRight
} from "react-icons/fi";

function AddVolunteer() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        skills: "",
        location: "",
        availability: "weekend"
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

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await addUser(
                form.email.trim(),
                form.password.trim(),
                "volunteer",
                {
                    name: form.name,
                    skills: form.skills.split(",").map((s) => s.trim()),
                    location: form.location,
                    availability: form.availability
                }
            );
            navigate("/volunteer/dashboard");
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center animated-gradient-bg py-20 px-6 overflow-hidden">
            {/* Elegant Background Elements */}
            <div className="floating-blob w-[600px] h-[600px] bg-sage-200/40 -top-48 -right-24 rounded-full"></div>
            <div className="floating-blob w-[500px] h-[500px] bg-warm-200/50 -bottom-24 -left-24 rounded-full" style={{ animationDelay: '4s' }}></div>

            <div className="w-full max-w-2xl relative">
                <div className="premium-card p-12 text-center">
                    {/* Header */}
                    <div className="mb-12 space-y-4">
                        <span className="section-tag">
                             <FiUser className="text-sage-500" /> Become a Hero
                        </span>
                        <h2 className="text-4xl font-extrabold text-warm-900 tracking-tight leading-tight">
                            Join the Network of <br/>
                            <span className="text-sage-500 font-light italic">Skilled Volunteers.</span>
                        </h2>
                        <p className="text-sage-700 font-medium max-w-sm mx-auto opacity-70">
                            Your skills are the catalyst for social impact. Register now to find meaningful missions.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 text-left">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1">Full Name</label>
                                <div className="relative group">
                                    <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" />
                                    <input
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Alex Mercer"
                                        className="input-premium pl-14"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1">Account Email</label>
                                <div className="relative group">
                                    <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="alex@example.com"
                                        className="input-premium pl-14"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1">Security Key</label>
                                <div className="relative group">
                                    <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="input-premium pl-14"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1">Confirm Key</label>
                                <div className="relative group">
                                    <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="input-premium pl-14"
                                    />
                                </div>
                            </div>

                                 {/* Skills */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1">Key Talents</label>
                                <div className="relative group">
                                    <FiTool className="absolute left-6 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" />
                                    <input
                                        name="skills"
                                        required
                                        value={form.skills}
                                        onChange={handleChange}
                                        placeholder="First Aid, Teaching, Logistics, Web Dev"
                                        className="input-premium pl-14"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1">Base Location</label>
                                <div className="relative group">
                                    <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" />
                                    <input
                                        name="location"
                                        required
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="San Francisco, CA"
                                        className="input-premium pl-14"
                                    />
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1">Time Commitment</label>
                                <div className="relative">
                                    <select
                                        name="availability"
                                        required
                                        value={form.availability}
                                        onChange={handleChange}
                                        className="input-premium appearance-none cursor-pointer"
                                    >
                                        <option value="weekend">Weekends Only</option>
                                        <option value="full-time">Full-Time Commitment</option>
                                        <option value="part-time">Part-Time / Flexible</option>
                                        <option value="emergency">Emergency Relief Only</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-sage-400">
                                        <FiArrowRight className="rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-5 text-lg group"
                        >
                            {loading ? "Registering Account..." : (
                                <>
                                    <span>Register & Continue</span>
                                    <FiCheckCircle className="text-xl group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-sm text-center text-sage-500 font-bold pt-8 border-t border-warm-100/50 mt-10">
                            Already part of the network?{" "}
                            <Link to="/login" className="text-sage-700 hover:text-sage-900 underline underline-offset-4 decoration-sage-300">
                                Sign in here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddVolunteer;
