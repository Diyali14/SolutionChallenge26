import { useEffect, useState } from "react";
import { getNeeds } from "../services/need";
import { getUserData } from "../services/user";
import { Link } from "react-router-dom";
import { FiArrowRight, FiUsers, FiHeart, FiGlobe, FiTrendingUp, FiActivity, FiShield, FiStar } from "react-icons/fi";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    CartesianGrid
} from "recharts";
//get user according to role
function Dashboard() {
    const [needs, setNeeds] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [ngos, setNgos] = useState([]);
    const [user, setUser] = useState(null);
    const [activeNeeds, setActiveNeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [needsData, userData] = await Promise.all([
                getNeeds(),
                getUserData()
            ]);

            setNeeds(needsData);
            // setVolunteers(volunteerData);
            // setNgos(ngoData);
            setUser(userData);

            const filtered = needsData.filter(
                (n) => n.status?.toLowerCase() !== "completed"
            );
            setActiveNeeds(filtered);
        } catch (err) {
            console.error("Landing page fetch error:", err);
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

    const getCategoryData = () => {
        const counts = { education: 0, health: 0, food: 0, disaster: 0, environment: 0, other: 0 };
        activeNeeds.forEach((n) => {
            const key = normalizeCategory(n.category);
            counts[key]++;
        });
        return [
            { name: "Edu", value: counts.education, color: "#7d9d85" },
            { name: "Health", value: counts.health, color: "#bc6c25" },
            { name: "Food", value: counts.food, color: "#d4a373" },
            { name: "Relief", value: counts.disaster, color: "#a5a5a5" },
            { name: "Eco", value: counts.environment, color: "#58715e" }
        ];
    };

    const getNgoTypeData = () => {
        const map = {};
        ngos.forEach((ngo) => {
            const type = ngo.type || "Other";
            map[type] = (map[type] || 0) + 1;
        });
        const colors = ["#7d9d85", "#bc6c25", "#d4a373", "#58715e", "#d1ddd4"];
        return Object.keys(map).map((key, index) => ({
            name: key,
            value: map[key],
            color: colors[index % colors.length]
        }));
    };

    return (
        <div className="min-h-screen bg-warm-50 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="floating-blob w-[800px] h-[800px] bg-sage-200/40 -top-48 -left-24 rounded-full"></div>
            <div className="floating-blob w-[600px] h-[600px] bg-warm-200/50 -bottom-24 -right-24 rounded-full" style={{ animationDelay: '6s' }}></div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 text-center lg:text-left lg:flex items-center justify-between max-w-7xl mx-auto gap-20">
                <div className="flex-1 space-y-10">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-sage-100 text-sage-800 font-black text-[10px] uppercase tracking-[0.3em] shadow-inner mb-2">
                        <FiShield className="text-sm" />
                        <span>The Impact Ecosystem</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-extrabold text-warm-900 tracking-tighter leading-[0.95]">
                        Intelligent <br />
                        <span className="text-sage-500 font-light italic">Allocation.</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-sage-700 font-medium leading-relaxed opacity-80">
                        Bridging the organizational gap between critical needs and skilled human capital through a transparent, high-trust ecosystem.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <Link to="/register/volunteer" className="btn-premium group flex items-center gap-4 py-5 shadow-2xl shadow-sage-200/50">
                            Join the Force
                            <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-500" />
                        </Link>
                        <Link to="/register/ngo" className="btn-outline-premium py-5">
                            Partner Organization
                        </Link>
                    </div>
                    <div className="flex items-center gap-8 pt-8">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-warm-50 bg-sage-200 flex items-center justify-center font-bold text-xs">U{i}</div>
                            ))}
                        </div>
                        <p className="text-xs font-bold text-sage-400 uppercase tracking-widest leading-tight">
                            Trusted by <span className="text-sage-800">2,400+</span><br /> Verified Contributors
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block flex-1 relative">
                    <div className="premium-card p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sage-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-warm-900 tracking-tighter">Mission Pulse</h3>
                                <FiStar className="text-accent-gold shadow-sm animate-spin-slow" />
                            </div>
                            <div className="space-y-6">
                                {activeNeeds.slice(0, 3).map((n, i) => (
                                    <div key={n.id} className="p-5 rounded-3xl bg-warm-50/50 border border-warm-100/50 hover:bg-white hover:shadow-xl transition-all duration-500 group flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-sage-800 uppercase tracking-tight">{n.title}</h4>
                                            <p className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">{n.location}</p>
                                        </div>
                                        <FiArrowRight className="text-sage-200 group-hover:text-sage-600 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { label: 'Active Missions', value: activeNeeds.length, icon: FiActivity, color: 'text-sage-600', bg: 'bg-sage-100' },
                        { label: 'Verified Partners', value: ngos.length, icon: FiGlobe, color: 'text-accent-terracotta', bg: 'bg-warm-100' },
                        { label: 'Human Capital', value: volunteers.length, icon: FiUsers, color: 'text-sage-900', bg: 'bg-sage-200' }
                    ].map((stat, i) => (
                        <div key={i} className="premium-card p-12 group hover:translate-y-[-5px]">
                            <div className={`w-16 h-16 rounded-[1.5rem] ${stat.bg} ${stat.color} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                <stat.icon className="text-2xl" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-5xl font-black text-warm-900 tracking-tighter">{stat.value}</h3>
                                <p className="text-xs font-black text-sage-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Strategic Insights */}
            <section className="max-w-7xl mx-auto px-6 py-20 pb-32">
                <div className="mb-16 space-y-4">
                    <span className="section-tag">Network Analytics</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-warm-900 tracking-tighter leading-tight">
                        Deep <span className="text-sage-500">Visibility.</span>
                    </h2>
                    <p className="text-lg text-sage-600 font-medium opacity-70 max-w-2xl italic">"Strategic impact requires precision monitoring of resource distribution and organizational capability."</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="premium-card p-12 border-none">
                        <h3 className="text-2xl font-black text-warm-900 mb-12 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-sage-500 rounded-full"></span>
                            Sector Demand
                        </h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getCategoryData()}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f3ef" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7d9d85', fontSize: 10, fontWeight: 900 }} />
                                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 48px -10px rgba(0,0,0,0.1)', padding: '16px' }} />
                                    <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={48}>
                                        {getCategoryData().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="premium-card p-12 border-none flex flex-col items-center">
                        <h3 className="text-2xl font-black text-warm-900 mb-12 self-start flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-sage-300 rounded-full"></span>
                            Partner Ecology
                        </h3>
                        <div className="h-72 w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={getNgoTypeData()}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={10}
                                        stroke="none"
                                    >
                                        {getNgoTypeData().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 48px -10px rgba(0,0,0,0.1)', padding: '16px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-3 gap-6 w-full pt-8 text-[10px] font-black uppercase tracking-widest text-center">
                            {getNgoTypeData().slice(0, 3).map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="w-full h-1 bg-sage-100 rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: '70%', backgroundColor: item.color }}></div>
                                    </div>
                                    <p className="text-sage-400">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Global CTA */}
            <section className="px-6 pb-20">
                <div className="max-w-5xl mx-auto premium-card bg-warm-900 p-20 text-center space-y-10 relative overflow-hidden border-none text-white shadow-3xl shadow-warm-900/40 transform hover:scale-[1.01] transition-transform duration-700">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sage-600 opacity-20 blur-[120px] -mr-48 -mt-48 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-terracotta opacity-10 blur-[100px] -ml-32 -mb-32 rounded-full"></div>

                    <div className="relative z-10 space-y-6 flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight max-w-3xl">
                            Operationalizing Compassion Through <span className="text-sage-400 italic">Advanced Systems.</span>
                        </h2>
                        <p className="text-warm-200 font-medium max-w-xl opacity-70 leading-relaxed">
                            Join the leading decentralized network for humanitarian coordination and skilled contribution.
                        </p>
                        <div className="pt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/register/volunteer" className="btn-premium bg-sage-600 hover:bg-sage-500 w-full sm:w-auto px-12 py-5 shadow-inner">
                                Initiate My Impact
                            </Link>
                            <Link to="/login" className="text-xs font-black uppercase tracking-[0.3em] hover:text-sage-400 transition-colors">
                                Existential Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
