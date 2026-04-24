import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../services/user";
import {
    FiMail,
    FiLock,
    FiMapPin,
    FiPhone,
    FiHome,
    FiFileText,
    FiActivity,
    FiCheckCircle,
    FiAward
} from "react-icons/fi";

function AddNGO() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "",
        location: "",
        phone: "",
        description: ""
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
                "ngo",
                {
                    name: form.name,
                    type: form.type,
                    location: form.location,
                    phone: form.phone,
                    description: form.description
                }
            );
            navigate("/ngo/dashboard");
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center animated-gradient-bg py-24 px-6 overflow-hidden">
            {/* Elegant Background Elements */}
            <div className="floating-blob w-[700px] h-[700px] bg-sage-200/40 -top-48 -left-24 rounded-full"></div>
            <div className="floating-blob w-[500px] h-[500px] bg-warm-200/50 -bottom-24 -right-24 rounded-full" style={{ animationDelay: '5s' }}></div>

            <div className="w-full max-w-3xl relative">
                <div className="premium-card p-12 text-center">
                    {/* Header */}
                    <div className="mb-12 space-y-6">
                        <div className="inline-flex p-4 bg-sage-100 text-sage-600 rounded-3xl mb-2 items-center justify-center">
                            <FiAward className="text-4xl" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-warm-900 tracking-tight leading-tight">
                            Scale Your <span className="text-sage-500 font-light italic">Organizational Impact.</span>
                        </h2>
                        <p className="text-sage-700 font-medium max-w-sm mx-auto opacity-70">
                            Partner with us to streamline resource allocation and connect with verified, skilled volunteers.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 text-left">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* NGO Name */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiHome className="text-sage-500" /> Organization Name
                                </label>
                                <input
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Global Relief Alliance"
                                    className="input-premium"
                                />
                            </div>

                            {/* Email */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiMail className="text-sage-500" /> Official Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="contact@gra.org"
                                    className="input-premium"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiLock className="text-sage-500" /> Administrative Password
                                </label>
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

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiLock className="text-sage-500" /> Confirm Key
                                </label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="input-premium"
                                />
                            </div>

                            {/* Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiActivity className="text-sage-500" /> Sector of Focus
                                </label>
                                <select
                                    name="type"
                                    required
                                    value={form.type}
                                    onChange={handleChange}
                                    className="input-premium appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select Primary Sector</option>
                                    <option value="education">Education & Literacy</option>
                                    <option value="health">Healthcare & Medical</option>
                                    <option value="disaster">Disaster Relief</option>
                                    <option value="environment">Environmental Action</option>
                                    <option value="food">Resource & Relief</option>
                                    <option value="other">Social Empowerment</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiMapPin className="text-sage-500" /> Administrative Location
                                </label>
                                <input
                                    name="location"
                                    required
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="Nairobi, Kenya"
                                    className="input-premium"
                                />
                            </div>

                            {/* Phone */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiPhone className="text-sage-500" /> Contact Number
                                </label>
                                <input
                                    name="phone"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+254 712 345 678"
                                    className="input-premium"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiFileText className="text-sage-500" /> Mission Statement
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe your primary objective and current field of operation..."
                                    rows="3"
                                    className="input-premium resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-5 text-lg group mt-6"
                        >
                            {loading ? "Registering Organization..." : (
                                <>
                                    <span>Initiate Partnership</span>
                                    <FiCheckCircle className="text-xl group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-sm text-center text-sage-500 font-bold pt-8 border-t border-warm-100/50 mt-10">
                            Already registered?{" "}
                            <Link to="/login" className="text-sage-700 hover:text-sage-900 underline underline-offset-4 decoration-sage-300">
                                Enter administrative sign-in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNGO;