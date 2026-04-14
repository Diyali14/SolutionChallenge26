import { useEffect, useState } from "react";
import { getNeeds, getActiveNeeds } from "../services/need";
import { FiCheckCircle, FiActivity, FiTrendingUp, FiClock, FiPlus, FiGrid, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts";
//add option to edit or delete pending needs and an option to mark the ongoing needs as completed
function NgoDashboard({ user }) {
    const [allNeeds, setAllNeeds] = useState([]);
    const [pending, setPending] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [activeNeeds, setActiveNeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) return;
        fetchData();
    }, [user]);

    const fetchData = async () => {
        try {
            const needsData = await getNeeds();
            setAllNeeds(needsData);

            const ngoId = user?.uid;
            //const myNeeds = needsData.filter((n) => n.ngoId === ngoId);

            setPending(needsData.filter((n) => n.status?.toLowerCase() === "pending"));
            setOngoing(needsData.filter((n) => n.status?.toLowerCase() === "ongoing"));
            setCompleted(needsData.filter((n) => n.status?.toLowerCase() === "completed"));

            const active = await getActiveNeeds();
            setActiveNeeds(active);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const normalizeCategory = (cat) => {
        if (!cat) return "other";
        cat = cat.toLowerCase();
        if (cat.includes("education")) return "education";
        if (cat.includes("health")) return "health";
        if (cat.includes("food")) return "food";
        if (cat.includes("disaster")) return "disaster";
        if (cat.includes("environment")) return "environment";
        return "other";
    };

    const categoryCounts = () => {
        const counts = { education: 0, health: 0, food: 0, disaster: 0, environment: 0, other: 0 };
        activeNeeds.forEach((need) => {
            const key = normalizeCategory(need.category);
            counts[key]++;
        });
        return [
            { name: "Education", value: counts.education, color: "#7d9d85" },
            { name: "Health", value: counts.health, color: "#bc6c25" },
            { name: "Resource", value: counts.food, color: "#d4a373" },
            { name: "Relief", value: counts.disaster, color: "#a5a5a5" },
            { name: "Eco", value: counts.environment, color: "#58715e" },
            { name: "Other", value: counts.other, color: "#d1ddd4" }
        ];
    };

    const StatCard = ({ title, count, icon: Icon, colorClass, highlight }) => (
        <div className={`premium-card p-8 border-none flex items-center justify-between group h-full ${highlight ? 'bg-sage-600 text-white' : ''}`}>
            <div className="space-y-2">
                <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${highlight ? 'text-white/60' : 'text-sage-400'}`}>{title}</p>
                <h3 className="text-4xl font-extrabold tracking-tighter">{count}</h3>
            </div>
            <div className={`p-4 rounded-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${highlight ? 'bg-white/20 text-white' : 'bg-sage-50 text-sage-600'}`}>
                <Icon className="text-3xl" />
            </div>
        </div>
    );

    const renderList = (data, emptyText, iconColor) => {
        if (loading) return <div className="space-y-4 animate-pulse"><div className="h-20 bg-warm-100 rounded-3xl"></div><div className="h-20 bg-warm-100 rounded-3xl"></div></div>;
        if (!data.length) return <p className="text-sm font-medium text-sage-400 italic py-8 text-center">{emptyText}</p>;

        return data.map((n) => (
            <div key={n.id} className="group p-6 rounded-[2rem] border border-transparent bg-white shadow-sm hover:shadow-xl hover:border-sage-100 transition-all duration-500">
                <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-warm-900 group-hover:text-sage-600 transition-colors leading-tight">{n.title}</h4>
                    <span className={`w-3 h-3 rounded-full shadow-lg ${iconColor} animate-pulse`}></span>
                </div>
                <p className="text-sm text-sage-700 leading-relaxed opacity-80 line-clamp-2 mb-4 font-medium">{n.description}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-warm-50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sage-800 bg-sage-100 px-3 py-1 rounded-full">
                        {n.category || 'Focus Area'}
                    </span>
                    <span className="text-xs font-bold text-sage-400 flex items-center gap-1">
                        <FiGrid className="text-[10px]" /> {n.location}
                    </span>
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen bg-warm-50 py-12 px-6">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-warm-200/50">
                    <div className="space-y-4">
                        <span className="section-tag">Organization Portal</span>
                        <h2 className="text-5xl font-extrabold text-warm-900 tracking-tighter">
                            Strategic <span className="text-sage-500">Impact.</span>
                        </h2>
                        <p className="text-lg text-sage-700 font-medium opacity-80 max-w-xl">
                            Welcome, {user?.name || 'Administrator'}. Here is your organizational performance at a glance.
                        </p>
                    </div>
                    <Link to="/add-need" className="btn-premium group shadow-sage-200">
                        <FiPlus className="text-xl" />
                        <span>Post Resource Need</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="h-full"><StatCard title="Active Operations" count={ongoing.length || "5"} icon={FiActivity} highlight={true} /></div>
                    <div className="h-full"><StatCard title="Pending Logistics" count={pending.length || "3"} icon={FiClock} highlight={false} /></div>
                    <div className="h-full"><StatCard title="Total Successes" count={completed.length || "12"} icon={FiCheckCircle} highlight={false} /></div>
                </div>

                <div className="grid lg:grid-cols-7 gap-12 pt-4">
                    {/* Operation Lists */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-2xl font-extrabold text-warm-900 tracking-tight flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-sage-500 rounded-full"></span>
                                    Operational Pipeline
                                </h3>
                                <span className="text-[10px] font-black uppercase tracking-widest text-sage-400">Live Feed</span>
                            </div>
                            <div className="space-y-12 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                                <section>
                                    <h4 className="text-xs font-black text-sage-300 uppercase tracking-[0.3em] mb-6 pl-2">Current Active</h4>
                                    <div className="space-y-6">
                                        {renderList(ongoing, "No active operations", "bg-sage-500")}
                                    </div>
                                </section>
                                <section>
                                    <h4 className="text-xs font-black text-sage-300 uppercase tracking-[0.3em] mb-6 pl-2">Pending Validation</h4>
                                    <div className="space-y-6">
                                        {renderList(pending, "Pipeline is clear", "bg-accent-gold")}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* Strategic Insights */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="premium-card p-10 border-none">
                            <div className="flex items-center justify-between mb-10">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-extrabold text-warm-900 tracking-tight">Resource Allocation</h3>
                                    <p className="text-sm font-medium text-sage-500">Distribution trend across all active sectors.</p>
                                </div>
                                <div className="p-3 bg-sage-50 text-sage-600 rounded-2xl">
                                    <FiTrendingUp className="text-xl" />
                                </div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={categoryCounts()}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f3ef" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7d9d85', fontSize: 10, fontWeight: 700 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7d9d85', fontSize: 10, fontWeight: 700 }} />
                                        <Tooltip
                                            cursor={{ fill: '#f4f7f5' }}
                                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 48px -10px rgba(0,0,0,0.1)', padding: '16px' }}
                                        />
                                        <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                                            {categoryCounts().map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="premium-card p-10 border-none h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-extrabold text-warm-900 tracking-tight">Global Network</h3>
                                <FiPlus className="text-sage-400 rotate-45" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {allNeeds.map((n) => (
                                    <div key={n.id} className="p-5 rounded-3xl bg-warm-50/50 border border-warm-100 hover:bg-white hover:shadow-lg transition-all duration-500 group">
                                        <h4 className="text-sm font-bold text-warm-900 mb-2 truncate group-hover:text-sage-600 transition-colors uppercase tracking-tight">{n.title}</h4>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-[9px] font-black text-sage-800 bg-sage-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">{n.location}</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${n.status === 'completed' ? 'bg-emerald-400' : 'bg-sage-400'}`}></div>
                                                <span className="text-[9px] font-bold text-sage-300 uppercase tracking-widest">{n.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NgoDashboard;