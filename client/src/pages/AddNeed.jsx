import { useState } from "react";
import { addNeed } from "../services/need";
import { FiGlobe, FiAlertCircle, FiTag, FiMapPin, FiType, FiFileText, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function AddNeed({ user }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        priority: "low",
        category: "education",
        skills: "",
        status: "pending",
        ngoID: user?.uid
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formattedData = {
                ...form,
                skills: form.skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== "")
            };
            await addNeed(formattedData);
            navigate("/ngo/dashboard");
        } catch {
            alert("Error adding need");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center animated-gradient-bg py-24 px-6 overflow-hidden">
            {/* Elegant Background Elements */}
            <div className="floating-blob w-[500px] h-[500px] bg-sage-200/50 -top-24 -left-24 rounded-full"></div>
            <div className="floating-blob w-[400px] h-[400px] bg-warm-200/50 bottom-0 right-0 rounded-full" style={{ animationDelay: '3s' }}></div>

            <div className="w-full max-w-2xl relative">
                <div className="premium-card p-12 text-center">
                    {/* Header */}
                    <div className="mb-12 space-y-4">
                        <span className="section-tag">
                            <FiGlobe className="text-sage-500" /> Organizational Gap
                        </span>
                        <h2 className="text-4xl font-extrabold text-warm-900 tracking-tighter leading-tight">
                            Identify a <br />
                            <span className="text-sage-500 font-light italic">Critical Resource Void.</span>
                        </h2>
                        <p className="text-sage-700 font-medium max-w-sm mx-auto opacity-70">
                            Precision documentation of needs leads to more efficient volunteer matching and impact delivery.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 text-left">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Title */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiType className="text-sage-500" /> Operational Title
                                </label>
                                <input
                                    name="title"
                                    required
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Medical Grade Oxygen Deployment"
                                    className="input-premium"
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiTag className="text-sage-500" /> Priority Sector
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        required
                                        value={form.category}
                                        onChange={handleChange}
                                        className="input-premium appearance-none cursor-pointer"
                                    >
                                        <option value="education">Education & Literacy</option>
                                        <option value="health">Healthcare Support</option>
                                        <option value="food">Resource Logistics</option>
                                        <option value="disaster">Emergency Relief</option>
                                        <option value="environment">Environmental Action</option>
                                        <option value="other">Social Support</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-sage-400">
                                        <FiChevronRight className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Priority */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiAlertCircle className="text-sage-500" /> Urgency Index
                                </label>
                                <div className="relative">
                                    <select
                                        name="priority"
                                        required
                                        value={form.priority}
                                        onChange={handleChange}
                                        className="input-premium appearance-none cursor-pointer font-bold"
                                    >
                                        <option value="low" className="text-sage-400 font-bold">Standard Priority</option>
                                        <option value="medium" className="text-accent-gold font-bold">Medium Uregncy</option>
                                        <option value="high" className="text-accent-terracotta font-bold">High / Immediate Action</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-sage-400">
                                        <FiChevronRight className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiFileText className="text-sage-500" /> Situational Context
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Provide detailed context regarding the urgency, demographic impact, and specific logistical requirements..."
                                    rows="4"
                                    className="input-premium resize-none"
                                />
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiTag className="text-sage-500" /> Required Capabilities
                                </label>
                                <select
                                    name="skills"
                                    value={form.skills}
                                    onChange={handleChange}
                                    placeholder="e.g., Clinical Training, Logistics"
                                    className="input-premium"
                                >
                                    <option value="education">Education & Literacy</option>
                                    <option value="health">Healthcare Support</option>
                                    <option value="food">Resource Logistics</option>
                                    <option value="relief">Emergency Relief</option>
                                    <option value="eco">Environmental Action</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sage-800 ml-1 flex items-center gap-2">
                                    <FiMapPin className="text-sage-500" /> Deployment Location
                                </label>
                                <input
                                    name="location"
                                    required
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="District/City Level"
                                    className="input-premium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-5 text-lg group mt-6"
                        >
                            {loading ? "Publishing Mission..." : (
                                <>
                                    <span>Initiate Resource Request</span>
                                    <FiCheckCircle className="text-xl group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddNeed;